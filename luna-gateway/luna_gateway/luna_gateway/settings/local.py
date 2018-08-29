# flake8: noqa

from .base import *

ALLOWED_HOSTS = ['*']

CORS_ORIGIN_WHITELIST = (
    'localhost:8000',
    'localhost:3000',
)
