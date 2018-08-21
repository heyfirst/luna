#!/bin/sh
cd /app/myproject
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python3 manage.py runserver 0.0.0.0:8000