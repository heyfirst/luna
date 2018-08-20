FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
 
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev bash

RUN pip install --upgrade pip
RUN pip install pipenv
ADD . /app
RUN pipenv install --deploy --system

WORKDIR /app

RUN python manage.py makemigrations && python manage.py migrate && python manage.py collectstatic --noinput

EXPOSE 8000

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]