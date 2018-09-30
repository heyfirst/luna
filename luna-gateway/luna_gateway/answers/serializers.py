from .models import Answer
from rest_framework import serializers


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        depth = 1
        fields = ('__all__')
