# Pull base image
FROM python:alpine

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app
 
# Add dependencies
RUN apk update && \
    apk add --virtual .build-deps gcc python-dev musl-dev && \
    apk add --update --no-cache postgresql-dev bash openrc

# Install dependencies
RUN pip install --upgrade pip && pip install pipenv && pipenv --version
COPY ./Pipfile /code/Pipfile
RUN pipenv update --outdated && pipenv install --deploy --system

#Copy Project
COPY . /app/

#Ecpose port
EXPOSE 8000

# Run Command in shell script
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]