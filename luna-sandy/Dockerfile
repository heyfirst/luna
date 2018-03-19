FROM node:8.9.4-alpine
WORKDIR /app
COPY . ./
RUN yarn install && yarn build
EXPOSE 3030 17003 22203
CMD yarn start