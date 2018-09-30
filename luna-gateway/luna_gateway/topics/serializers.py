from .models import Topic, Level, TopicLevel
from rest_framework import serializers


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = (
            'pk',
            'topic_name',
            'description',
        )


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            'pk',
            'level_name',
            'score',
        )


class TopicLevelReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicLevel
        depth = 1
        fields = (
            'pk',
            'level',
            'topic',
            'outcome',
            'expected_tasks',
        )


class TopicLevelWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicLevel
        fields = (
            'pk',
            'level',
            'topic',
            'outcome',
            'expected_tasks',
        )
