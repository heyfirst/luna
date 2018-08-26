FROM python:3.7
ENV PYTHONUNBUFFERED 1

WORKDIR /app
 
RUN apt-get update && apt-get install -y \
		gcc nginx\
		gettext \
        libpq-dev \
	--no-install-recommends && rm -rf /var/lib/apt/lists/*
    
RUN pip install --upgrade pip && pip install pipenv && pipenv --version

ADD . /app

RUN pwd && ls -a
RUN pipenv update --outdated
RUN pipenv install --deploy --system

EXPOSE 8000

ADD ./nginx-django.conf /etc/nginx/conf.d

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]