#!/bin/sh
cd /app/myproject
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --clear --noinput
gunicorn -w 3 -b :8000 myproject.wsgi:application
rc-service nginx start
nginx -t