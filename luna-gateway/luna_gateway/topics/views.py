# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from tasks.models import Task
from tasks.serializers import TaskSerializer
from .models import Topic, Level, TopicLevel
from .serializers import TopicSerializer, LevelSerializer, TopicLevelReadSerializer, TopicLevelWriteSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    @action(detail=True)
    def tasks(self, request, pk=None):
        tasks = Task.objects.filter(main_topic__pk=pk).distinct('pk')
        serializer = TaskSerializer(
            tasks,
            many=True,
            context={'request': request},
        )
        return Response(serializer.data)


class LevelViewSet(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )


class TopicLevelViewSet(viewsets.ModelViewSet):
    queryset = TopicLevel.objects.all()
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return TopicLevelReadSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return TopicLevelWriteSerializer
        return TopicLevelReadSerializer
