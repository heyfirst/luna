# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from answers.models import Answer
from tasks.models import Task
from tasks.serializers import TaskReadSerializer
from .models import Topic, Level, TopicLevel
from .serializers import TopicSerializer, LevelSerializer, TopicLevelReadSerializer, TopicLevelWriteSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = self.filter_queryset(self.get_queryset())

        topics_data = self.get_serializer(queryset, many=True).data
        topics = [
            self._get_topic_detail_by_user(topic, user)
            for topic in topics_data
        ]

        return Response(topics)

    @action(detail=True)
    def tasks(self, request, pk=None):
        # Get User from request
        user = request.user

        # Get Answered tasks from Answer that User've solved
        answered_task_pks = Answer.objects.filter(
            owned_by=user,
            task__main_topic__topic__pk=pk,
        ).values_list(
            'task', flat=True
        )

        tasks = Task.objects.filter(
            main_topic__topic__pk=pk,
            order__isnull=False,
        )

        tasks_data = TaskReadSerializer(
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

    def _get_topic_detail_by_user(self, topic, user):
        completed_task = Answer.objects.filter(
            owned_by=user,
            task__main_topic__topic__pk=topic['pk'],
            task__order__isnull=False,
        ).count()
        total_tasks = Task.objects.filter(
            main_topic__topic__pk=topic['pk'],
            order__isnull=False,
        ).count()

        return {
            **topic,
            "total_tasks": total_tasks,
            "completed_tasks": completed_task,
        }


class ChallengeTaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.filter(
        order__isnull=True,
        main_topic__isnull=False,
    ).order_by('-id')

    serializer_class = TaskReadSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def list(self, request, *args, **kwargs):
        user = request.user
        queryset = self.get_queryset()

        topic = request.GET.get('topic')
        level = request.GET.get('level')

        answered_task_pks = Answer.objects.filter(
            owned_by=user,
            task__order__isnull=True,
        )

        if (topic != 'All'):
            queryset = queryset.filter(main_topic__topic__topic_name=topic)

        if (level != 'All'):
            queryset = queryset.filter(main_topic__level__level_name=level)

        tasks_data = self.get_serializer(queryset, many=True).data
        tasks = [
            self._add_answered_status(
                task, answered_task_pks.values_list('task', flat=True)
            ) for task in tasks_data
        ]

        return Response(tasks)

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
