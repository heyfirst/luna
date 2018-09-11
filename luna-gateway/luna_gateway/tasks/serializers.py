from .models import Task
from topics.models import TopicLevel
from rest_framework import serializers


class TopicSerialzer(serializers.ModelSerializer):
    class Meta:
        model = TopicLevel
        fields = ('__all__')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('__all__')


class TaskTopicSerializer(serializers.ModelSerializer):
    topics = TopicSerialzer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'task_name', 'description', 'topics')
