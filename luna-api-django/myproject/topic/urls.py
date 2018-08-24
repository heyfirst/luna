from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^topic/$', views.TopicList.as_view()),
]