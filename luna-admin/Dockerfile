FROM node:8.9.4-alpine
WORKDIR /app
COPY . ./
RUN yarn install && yarn build
EXPOSE 3010 17001 22201
CMD yarn start