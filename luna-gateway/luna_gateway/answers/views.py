import requests
from rest_framework import viewsets, views
from rest_framework.response import Response
from django.conf import settings

from tasks.models import Task, Testcase
from .models import Answer
from .serializers import AnswerSerializer


# Create your views here.
class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )


class TestCodeView(views.APIView):
    def post(self, request):
        data = request.data.copy()
        username = request.user.username
        task_id = data['taskID']

        task = Task.objects.get(id=task_id)
        testcases = Testcase.objects.filter(task=task, is_hidden=False)

        submisison = {
            "username": username,
            "code": data['code'],
            "testcases": list(testcases.values()),
        }

        resp = requests.post(
            f'{settings.LUNA_SANDY_URL}/submission',
            json={**submisison},
        )

        return Response({
            "task_id": task.id,
            "submission": resp.json(),
        })


class SubmitCodeView(views.APIView):
    def post(self, request):
        data = request.data.copy()
        username = request.user.username
        task_id = data['taskID']

        task = Task.objects.get(id=task_id)
        testcases = Testcase.objects.filter(task=task)

        submisison = {
            "username": username,
            "code": data['code'],
            "testcases": list(testcases.values()),
        }

        resp = requests.post(
            f'{settings.LUNA_SANDY_URL}/submission',
            json={**submisison},
        )
        submisison = resp.json()

        if (submisison['pass'] is True):
            Answer.objects.create(
                task=task, source_code=data['code'], owned_by=request.user
            )
            return Response({
                "task_id": task.id,
                "submission": submisison,
            })
        else:
            return Response({
                "task_id": task.id,
                "submission": submisison,
            })
