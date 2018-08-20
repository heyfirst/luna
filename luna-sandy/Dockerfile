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
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
ENV JAVA_VERSION 8u181
ENV JAVA_ALPINE_VERSION jre-1.8.0_181-b13
RUN set -x \
        && apk add --no-cache \
                openjdk8-jre="$JAVA_ALPINE_VERSION" \
        && [ "$JAVA_HOME" = "$(docker-java-home)" ]


EXPOSE 3020 17003 22203
CMD ["pm2-runtime", "--json","server.js"]