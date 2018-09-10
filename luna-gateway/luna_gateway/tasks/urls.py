from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^tasks/$', views.TaskList.as_view()),
    url(r'^tasks/(?P<pk>[0-9]+)/$', views.TaskDetail.as_view()),
    url(r'^tasks/topic/$', views.TaskTopicList.as_view()),
    url(r'^tasks/topic/(?P<topic_id>[0-9]+)/$', views.TaskTopicDetail.as_view()),
    url(r'^tasks/level/(?P<level_id>[0-9]+)/$', views.TaskLevelDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)