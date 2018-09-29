# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from answers.models import Answer
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
            serializer = self.get_serializer(task)
            return Response(serializer.data)
        if (task.order is None):
            serializer = self.get_serializer(task)
            return Response(serializer.data)
        else:
            before_task = Task.objects.get(order=task.order - 1)
            try:
                Answer.objects.get(
                    owned_by=user,
                    task=before_task,
                )
                serializer = self.get_serializer(task)
                return Response(serializer.data)
            except Answer.DoesNotExist:
                serializer = self.get_serializer(task)
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


class TescaseViewSet(viewsets.ModelViewSet):
    queryset = Testcase.objects.all()
    serializer_class = TestcaseSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )
