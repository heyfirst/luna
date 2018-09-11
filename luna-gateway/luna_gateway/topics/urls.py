from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'topics', views.TopicViewSet)
router.register(r'levels', views.LevelViewSet)
router.register(r'topic-levels', views.TopicLevelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
