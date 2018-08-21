#!/bin/sh
cd /app/lunaproject
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
cd /app/
gunicorn myproject.wsgi --workers=3 -b 0.0.0.0:8000