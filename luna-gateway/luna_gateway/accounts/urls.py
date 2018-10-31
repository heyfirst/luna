from django.urls import path

from .views import (
    MeView,
    FacebookLoginView,
    LearningProgressDataView,
    FrequencyPracticsDataView,
    SkillImprovementDataView,
    SuggestionTasksView,
)

app_name = 'accounts'
urlpatterns = [
    path('me/', MeView.as_view(), name='my-user'),
    path('fb-login/', FacebookLoginView.as_view(), name='fb-login'),
    path(
        'learning-progress/',
        LearningProgressDataView.as_view(),
        name='learning-progress'
    ),
    path(
        'frequency-practics/',
        FrequencyPracticsDataView.as_view(),
        name='frequency-practics'
    ),
    path(
        'skill-improvement/',
        SkillImprovementDataView.as_view(),
        name='skill-improvement'
    ),
    path(
        'suggestion-tasks/',
        SuggestionTasksView.as_view(),
        name='suggestion-tasks'
    ),
]
