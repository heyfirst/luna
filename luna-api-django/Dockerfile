FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1

WORKDIR /app
 
RUN apk update && \
    apk add --virtual build-deps gcc python-dev musl-dev && \
    apk add --update nginx postgresql-dev bash
RUN pip install --upgrade pip && pip install pipenv && pipenv --version
ADD . /app

RUN pwd && ls -a
RUN pipenv update --outdated
RUN pipenv install --deploy --system

EXPOSE 8000

COPY ./django_nginx.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/django_nginx.conf /etc/nginx/sites-enabled
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]