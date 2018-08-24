#!/bin/sh
cd /app/myproject
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
# gunicorn -w 3 -b 0.0.0.0:8000 myproject.wsgi:application
python manage.py runserver