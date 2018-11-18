# from django.shortcuts import render
from rest_framework import viewsets, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from answers.models import Answer
from answers.serializers import AnswerSerializer
from .models import Task, Testcase
from .serializers import TaskSerializer, TestcaseSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def retrieve(self, request, *args, **kwargs):
        task = self.get_object()
        user = request.user

        if (task.order == 1):
            return self._get_task_or_task_with_answer(task, user)

        elif (task.order is None):
            return self._get_task_or_task_with_answer(task, user)

        else:
            before_task = Task.objects.get(
                main_topic=task.main_topic,
                order=task.order - 1,
            )
            try:
                Answer.objects.get(
                    owned_by=user,
                    task=before_task,
                )
                return self._get_task_or_task_with_answer(task, user)
            except Answer.DoesNotExist:
                return Response(
                    {
                        "messages": "You should to solve the before task"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

    @action(detail=True)
    def testcases(self, request, pk=None):
        testcases = Testcase.objects.filter(task__pk=pk, is_hidden=False)
        serializer = TestcaseSerializer(
            testcases,
            many=True,
            context={'request': request},
        )
        return Response(serializer.data)

    def _get_task_or_task_with_answer(self, task, user):
        task_json = self.get_serializer(task).data
        try:
            answer_data = Answer.objects.get(
                owned_by=user,
                task=task,
            )
            answer = AnswerSerializer(answer_data).data
            return Response({
                **task_json,
                "answer": answer,
            })
        except Answer.DoesNotExist:
            return Response({
                **task_json,
            })


class TescaseViewSet(viewsets.ModelViewSet):
    queryset = Testcase.objects.all()
    serializer_class = TestcaseSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )


class TaskCompletedView(views.APIView):
    def get(self, request):
        user = request.user
        answer_pks = Answer.objects.filter(owned_by=user).values_list(
            'task', flat=True
        )

        tasks = Task.objects.filter(pk__in=answer_pks)

        data = TaskSerializer(tasks, many=True).data

        print(data)

        return Response(data)
