#!/bin/sh
cd /app/lunaproject
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
cd /app/
gunicorn lunaproject.wsgi -b 0.0.0.0:8000