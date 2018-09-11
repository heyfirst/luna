from .models import Task, Testcase
from rest_framework import serializers


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('__all__')
        depth = 2


class TestcaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Testcase
        fields = ('__all__')
