FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
 
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev bash

RUN pip install --upgrade pip && pip install pipenv
ADD . /app
RUN pipenv update
RUN pipenv install --deploy --system
RUN pipenv shell && python --version

WORKDIR /app

RUN python manage.py makemigrations && python manage.py migrate && python manage.py collectstatic --noinput

EXPOSE 8000


RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]