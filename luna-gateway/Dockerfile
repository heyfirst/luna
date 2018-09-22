# Pull base image
FROM python:3.7-alpine

# Set work directory
WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip && pip install pipenv
ADD . /app

RUN pipenv install --deploy --system

EXPOSE 8000

RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
