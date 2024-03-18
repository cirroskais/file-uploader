FROM node:lts-alpine AS base

WORKDIR /usr/src/app

FROM base AS build

RUN yarn install
RUN yarn build

FROM base AS app

COPY --from=build build/* .

USER app
EXPOSE 3000/tcp
ENTRYPOINT [ "node", "index.js" ]

