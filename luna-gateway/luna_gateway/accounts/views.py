import uuid
import requests
import arrow
from django.conf import settings

from typing import Dict
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Count

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework_jwt.utils import jwt_payload_handler, jwt_encode_handler

from tasks.models import Task
from tasks.serializers import TaskSerializer
from topics.models import TopicLevel, Level
from answers.models import Answer
from topics.serializers import TopicLevelReadSerializer

from .serializers import UserSerializer, FacebookLoginSerializer, AccountSerializer
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

        account = Account.objects.get(user=instance)

        account_data = AccountSerializer(account).data

        return Response(
            {
                **serializer.data,
                **permissions,
                **account_role,
                **account_data
            }
        )

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        instance.first_name = data['firstName']
        instance.last_name = data['lastName']
        instance.save()

        account = Account.objects.get(user=instance)
        account.school = data['school']
        account.city = data['city']
        account.bio = data['bio']
        account.save()

        serializer = self.get_serializer(instance)
        permissions = self._get_user_permissions(instance)
        account_role = self._get_account_role(instance)

        account_data = AccountSerializer(account).data

        return Response(
            {
                **serializer.data,
                **permissions,
                **account_role,
                **account_data
            }
        )

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


class UploadAvatarView(APIView):
    def post(self, request):
        user = request.user
        data = request.data
        account = Account.objects.get(user__username=user.username)
        account.avatar = data['avatar']
        account.save()
        return Response({
            'avatar': account.avatar.url,
        })


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
            topic = result['topic']['id']
            resp[topic] = {
                "topic_name": result['topic']['topic_name'],
            }

        for result in topic_level_with_user_stats:
            topic = result['topic']['id']
            level_name = result['level']['level_name']

            try:
                resp[topic][level_name] = result['total_answer']
            except ZeroDivisionError:
                resp[topic][level_name] = 0

        return Response({**resp})

    def _add_user_stats(self, topic_level, user):
        total_answer = Answer.objects.filter(
            owned_by=user,
            task__main_topic__pk=topic_level['pk'],
            task__order__isnull=False,
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


class FrequencyPracticsDataView(APIView):
    def get(self, request):
        user = request.user

        total_answer = Answer.objects.filter(owned_by=user).extra(
            select={
                'day': 'date(created)'
            }
        ).values('day').annotate(total=Count('created'))

        return Response(total_answer)


class SkillImprovementDataView(APIView):
    def get(self, request):
        user = request.user
        total_answer = None

        if 'start_date' not in request.GET and 'end_date' not in request.GET:
            return Response(
                {
                    "message": "please define 'start_date' and 'end_date'"
                }
            )

        if 'topic_id' in request.GET:
            total_answer = Answer.objects.filter(
                owned_by=user,
                task__main_topic__topic__pk=request.GET['topic_id'],
                task__order__isnull=True
            )
        else:
            total_answer = Answer.objects.filter(
                owned_by=user,
                task__order__isnull=True,
            )

        # get All Aswers
        total_answer = total_answer.extra(
            select={
                'day': 'date(answers_answer.created)',
            }
        ).values(
            'day',
            'task__main_topic__level__level_name',
            'task__main_topic__level__score',
        ).annotate(total=Count('created'))

        # Manipulate data
        levels = Level.objects.all().values()
        resp = {}

        start = arrow.get(request.GET['start_date'])
        end = arrow.get(request.GET['end_date'])

        for r in arrow.Arrow.range('day', start, end):
            date = r.format('YYYY-MM-DD')
            resp[date] = {}
            for level in levels:
                resp[date][level['level_name']] = 0

        for result in total_answer:
            date = result['day'].strftime('%Y-%m-%d')
            score = result['total'] * result['task__main_topic__level__score']

            if date in resp:
                level = result['task__main_topic__level__level_name']
                resp[date][level] = score

        return Response(resp)


class SuggestionTasksView(APIView):
    def get(self, request):
        user = request.user
        queryset = Task.objects.filter(
            order__isnull=True,
            main_topic__isnull=False,
        )

        answered_task_pks = Answer.objects.filter(
            owned_by=user,
            task__order__isnull=True,
        ).values_list(
            'task', flat=True
        )

        tasks_data = TaskSerializer(queryset, many=True).data

        tasks = [
            self._add_answered_status(task, answered_task_pks)
            for task in tasks_data
        ]

        return Response(tasks)

    def _add_answered_status(self, task, answered_task_pks):
        if task['id'] in answered_task_pks:
            task['answered'] = True
        return task


class RankingView(APIView):
    def get(self, request):
        users = User.objects.all()

        ranks = []

        for user in users:
            total_answer = Answer.objects.filter(
                owned_by=user,
                task__order__isnull=True,
            )
            score = 0
            for result in total_answer:
                score += result.task.main_topic.level.score

            user_data = UserSerializer(user).data
            try:
                account = Account.objects.get(user=user)
                account_data = AccountSerializer(account).data

                ranks.append([{
                    **user_data,
                    **account_data,
                }, score])
            except Account.DoesNotExist:
                continue

        ranks = sorted(ranks, key=lambda user: user[1], reverse=True)
        return Response(ranks)

    def takeSecond(self, elem):
        return elem[1]
