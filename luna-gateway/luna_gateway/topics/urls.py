from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^topics/$', views.TopicList.as_view()),
]
