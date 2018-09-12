from .models import Task, Testcase
from rest_framework import serializers


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = (
            'pk',
            'url',
            'task_name',
            'description',
            'topics',
            'created',
            'modified',
        )
        depth = 2


class TestcaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Testcase
        fields = ('__all__')
