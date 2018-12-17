from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'tasks', views.TaskViewSet, base_name='task')
router.register(r'testcases', views.TescaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(
        'completed/', views.TaskCompletedView.as_view(), name='task-completed'
    ),
    path(
        'last-order/',
        views.TaskLastOfOrderView.as_view(),
        name='task-completed'
    )
]
