from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'answers', views.AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(
        'solve/test-code',
        views.TestCodeView.as_view(),
        name='test-code',
    ),
    path(
        'solve/submit-code',
        views.SubmitCodeView.as_view(),
        name='submit-code',
    ),
]
