# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from answers.models import Answer
from tasks.models import Task
from tasks.serializers import TaskSerializer
from .models import Topic, Level, TopicLevel
from .serializers import TopicSerializer, LevelSerializer, TopicLevelReadSerializer, TopicLevelWriteSerializer


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def get_queryset(self):
        return Topic.objects.all()

    @action(detail=True)
    def tasks(self, request, pk=None):
        # Get User from request
        user = request.user

        # Get Answered tasks from Answer that User've solved
        answered_task_pks = Answer.objects.filter(
            owned_by=user,
            task__main_topic__pk=pk,
        ).values_list(
            'task', flat=True
        )

        tasks = Task.objects.filter(main_topic__topic__pk=pk)

        tasks_data = TaskSerializer(
            tasks,
            many=True,
            context={
                'request': request
            },
        ).data

        # Add `"answered": True,` for answered tasks
        tasks_serializer = [
            self._add_answered_status(task, answered_task_pks)
            for task in tasks_data
        ]

        return Response(tasks_serializer)

    def _add_answered_status(self, task, answered_task_pks):
        if task['id'] in answered_task_pks:
            task['answered'] = True
        return task


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
