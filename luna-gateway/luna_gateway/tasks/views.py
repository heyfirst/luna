# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Task, Testcase
from .serializers import TaskSerializer, TestcaseSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

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
