FROM node:8.9.4-alpine
RUN npm install pm2@latest -g
WORKDIR /app
COPY . ./
RUN yarn install && yarn build
EXPOSE 3010 17001 22201
CMD pm2 start server.js