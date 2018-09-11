from django.urls import path

from .views import MeView, FacebookLoginView

app_name = 'accounts'
urlpatterns = [
    path('me/', MeView.as_view(), name='my-user'),
    path('fb-login/', FacebookLoginView.as_view(), name='fb-login'),
]
