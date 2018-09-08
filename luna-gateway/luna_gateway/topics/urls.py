from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^topics/$', views.TopicList.as_view()),
    url(r'^topics/(?P<pk>[0-9]+)/$', views.TopicDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)