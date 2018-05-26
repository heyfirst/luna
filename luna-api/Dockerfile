FROM node:8.9.4-alpine
RUN npm install pm2@latest -g
WORKDIR /app
COPY . ./
RUN yarn install
EXPOSE 3010 17002 22202
CMD ["pm2-runtime", "--json","server.js"]