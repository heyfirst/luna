#!/bin/sh
cd /app/luna_gateway
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput

cd /app/
uwsgi --ini luna_gateway.ini
