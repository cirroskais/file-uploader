FROM node:lts-alpine AS base

WORKDIR /usr/src/app

FROM base AS build

COPY . .

RUN yarn install
RUN yarn build

FROM base AS app

COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/build/* ./

EXPOSE 3000/tcp
ENTRYPOINT [ "node", "index.js" ]

