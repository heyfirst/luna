from .models import Topic, Level, TopicLevel
from rest_framework import serializers


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = (
            'pk',
            'url',
            'topic_name',
        )


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = (
            'pk',
            'url',
            'level_name',
        )


class TopicLevelReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicLevel
        depth = 1
        fields = (
            'pk',
            'url',
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
            'url',
            'level',
            'topic',
            'outcome',
            'expected_tasks',
        )
