FROM node:8.9.4-alpine

RUN npm install pm2@latest -g
WORKDIR /app
COPY . ./
RUN yarn install

# Default to UTF-8 file.encoding
ENV LANG C.UTF-8

# add a simple script that can auto-detect the appropriate JAVA_HOME value
# based on whether the JDK or only the JRE is installed
RUN { \
	echo '#!/bin/sh'; \
	echo 'set -e'; \
	echo; \
	echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
	} > /usr/local/bin/docker-java-home \
	&& chmod +x /usr/local/bin/docker-java-home
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

ENV JAVA_VERSION 8u201
ENV JAVA_ALPINE_VERSION 8.201.08-r0

RUN set -x \
	&& apk add --no-cache \
	openjdk8="$JAVA_ALPINE_VERSION" \
	&& [ "$JAVA_HOME" = "$(docker-java-home)" ]

EXPOSE 3020
CMD ["pm2-runtime", "--json","server.js"]