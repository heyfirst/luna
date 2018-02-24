FROM node:8.9.4 as build
WORKDIR /app
COPY . ./
RUN yarn install && yarn build

FROM node:8.9.4-alpine
WORKDIR /app
COPY --from=build /app/.next .next
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json package.json
COPY --from=build /app/yarn.lock yarn.lock
RUN yarn install --prod

CMD yarn start