FROM node:8.9.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./yarn.* ./
RUN yarn install

COPY . .

EXPOSE 4000 4001 4002

RUN yarn build

CMD [ "yarn", "start" ]