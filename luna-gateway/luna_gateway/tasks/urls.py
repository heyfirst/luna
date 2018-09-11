from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'tasks', views.TaskViewSet)
router.register(r'testcases', views.TescaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
