FROM node:8.9.4-alpine
RUN npm install pm2@latest -g
WORKDIR /app
COPY . ./
RUN yarn install

ENV LANG C.UTF-8

RUN { \
		echo '#!/bin/sh'; \
		echo 'set -e'; \
		echo; \
		echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home

ENV JAVA_HOME /usr/lib/jvm/java-9-openjdk-amd64

ENV JAVA_VERSION 9~b142
ENV JAVA_DEBIAN_VERSION 9~b142-1

RUN set -x \
	&& apt-get update \
	&& apt-get install -y \
		openjdk-9-jdk-headless="$JAVA_DEBIAN_VERSION" \
	&& rm -rf /var/lib/apt/lists/* \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

EXPOSE 3020
CMD ["pm2-runtime", "--json","server.js"]