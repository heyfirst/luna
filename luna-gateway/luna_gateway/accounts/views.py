import uuid
import requests
from django.conf import settings

from typing import Dict
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_jwt.utils import jwt_payload_handler, jwt_encode_handler

from tasks.models import Task
from topics.models import TopicLevel
from answers.models import Answer
from topics.serializers import TopicLevelReadSerializer

from .serializers import UserSerializer, FacebookLoginSerializer
from .models import Account


# Create your views here.
class MeView(RetrieveUpdateAPIView):
    queryset = get_user_model()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        queryset = self.filter_queryset(self.get_queryset())
        filter_kwargs = {'username': self.request.user.username}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        permissions = self._get_user_permissions(instance)
        account_role = self._get_account_role(instance)

        return Response({
            **serializer.data,
            **permissions,
            **account_role,
        })

    def _get_user_permissions(self, user: User) -> Dict[str, Dict[str, str]]:
        permissions = {}
        for perm_name in user.get_all_permissions():
            permissions[perm_name.split('.')[1]] = True

        return {
            'permissions': permissions,
        }

    def _get_account_role(self, user: User) -> Dict[str, str]:
        return {
            'role': user.account.role,
        }


class FacebookLoginView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = FacebookLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Do Login

        accessToken = request.data['accessToken']
        requests.get(
            'https://graph.facebook.com/oauth/access_token', {
                'client_id': settings.FACEBOOK_APP_ID,
                'client_secret': settings.FACEBOOK_APP_SECRET,
                'grant_type': 'fb_exchange_token',
                'fb_exchange_token': accessToken
            }
        )

        fbRequest = requests.get(
            'https://graph.facebook.com/me', {
                'fields': 'id,first_name,last_name,email',
                'access_token': accessToken
            }
        )

        fbUser = fbRequest.json()
        account = None

        try:
            account = Account.objects.get(facebook_id=fbUser['id'])

        except Account.DoesNotExist:
            user = User.objects.create_user(username=str(uuid.uuid4()))
            user.first_name = fbUser['first_name']
            user.last_name = fbUser['last_name']
            user.save()

            account = Account.objects.create(
                user=user,
                facebook_id=fbUser['id'],
            )

        payload = jwt_payload_handler(account.user)
        token = jwt_encode_handler(payload)

        return Response({
            'accessToken': token,
        })


class LearningProgressDataView(APIView):
    def get(self, request):
        user = request.user

        topic_levels = TopicLevelReadSerializer(
            TopicLevel.objects.all(),
            many=True,
            context={
                'request': request
            },
        ).data

        topic_level_with_user_stats = [
            self._add_user_stats(topic_level, user)
            for topic_level in topic_levels
        ]

        resp = {}
        for result in topic_level_with_user_stats:
            stats = 2

            # Check Exist stats
            if (
                result['topic']['id'] in resp and
                'stats' in resp[result['topic']['id']]
            ):
                stats = resp[result['topic']['id']]['stats']

            # Calculate Stats of Topic
            try:
                stats = stats + (
                    (result['total_answer'] / result['total_tasks'] * 20) - 2
                )
            except ZeroDivisionError:
                stats = stats

            resp[result['topic']['id']] = {
                "topic_name": result['topic']['topic_name'],
                "stats": stats
            }

        return Response({**resp})

    def _add_user_stats(self, topic_level, user):
        total_answer = Answer.objects.filter(
            owned_by=user, task__main_topic__pk=topic_level['pk']
        ).count()

        total_tasks = Task.objects.filter(
            main_topic__pk=topic_level['pk'],
            order__isnull=False,
        ).count()

        return {
            "topic": topic_level['topic'],
            "level": topic_level['level'],
            "total_answer": total_answer,
            "total_tasks": total_tasks,
        }


class SkillImprovementDataView(APIView):
    pass


class FrequencypracticsDataView(APIView):
    pass
