FROM node:8.9.4-alpine
WORKDIR /app
COPY . ./
RUN yarn install && yarn build
EXPOSE 3000 17000 22200
CMD yarn start