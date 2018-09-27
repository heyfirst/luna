# flake8: noqa

from .base import *

ALLOWED_HOSTS = ['*']
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

CSRF_TRUSTED_ORIGINS = []

CORS_ORIGIN_WHITELIST = (
    'localhost:8000',
    'localhost:3000',
    'dev.luna.codes',
    'luna.codes',
)
