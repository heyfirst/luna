FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1

WORKDIR /app
 
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add --update nginx postgresql-dev bash openrc
RUN pip install --upgrade pip && pip install pipenv && pipenv --version
ADD . /app

RUN pwd && ls -a
RUN pipenv update --outdated
RUN pipenv install --deploy --system

EXPOSE 8000

ADD ./nginx.conf /etc/nginx/nginx.conf

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]