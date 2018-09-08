# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Topic
from .serializers import TopicSerializer

class TopicList(APIView):
    def get(self, request, format=None):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)

class TopicDetail(APIView):
    def get_object(self, pk):
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic)
        return Response(serializer.data)