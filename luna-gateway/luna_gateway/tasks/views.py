# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer, TaskTopicSerializer

class TaskList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all().order_by('id')
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

class TaskDetail(APIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        task = self.get_object(pk).order_by('id')
        serializer = TaskSerializer(task)
        return Response(serializer.data)

class TaskTopicList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all().order_by('id')
        serializer = TaskTopicSerializer(tasks, many=True)
        return Response(serializer.data)

class TaskTopicDetail(APIView):
    def get_object(self, topic_id):
        try:
            return Task.objects.filter(topics__topic=topic_id)
        except Task.DoesNotExist:
            raise Http404
    
    def get(self, request, topic_id, format=None):
        task = self.get_object(topic_id).order_by('id')
        serializer = TaskTopicSerializer(task, many=True)
        return Response(serializer.data)

class TaskLevelDetail(APIView):
    def get_object(self, level_id):
        try:
            return Task.objects.filter(topics__level=level_id)
        except Task.DoesNotExist:
            raise Http404
    
    def get(self, request, level_id, format=None):
        task = self.get_object(level_id).order_by('id')
        serializer = TaskTopicSerializer(task, many=True)
        return Response(serializer.data)
