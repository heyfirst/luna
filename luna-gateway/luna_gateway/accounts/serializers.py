from rest_framework import serializers
from .models import Account
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'username')
        read_only_fields = ('username', )
        extra_kwargs = {'first_name': {'allow_blank': False, 'required': True}}


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class FacebookLoginSerializer(serializers.Serializer):
    accessToken = serializers.CharField()
