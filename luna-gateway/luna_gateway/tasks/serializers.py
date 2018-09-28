from .models import Task, Testcase
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            'pk',
            'url',
            'task_name',
            'description',
            'main_topic',
            'secondary_topics',
            'created',
            'modified',
        )
        depth = 2


class TestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testcase
        fields = ('__all__')
