FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1
 
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add postgresql-dev bash
RUN pip install --upgrade pip && pip install pipenv && pipenv --version

ADD . /app
WORKDIR /app

RUN pwd && ls -a
RUN pipenv update --outdated
RUN pipenv install --deploy --system
RUN pipenv shell

RUN python manage.py makemigrations && python manage.py migrate && python manage.py collectstatic --noinput

EXPOSE 8000

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]