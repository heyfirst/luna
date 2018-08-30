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
