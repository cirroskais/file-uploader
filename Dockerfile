FROM node:lts-alpine AS base

WORKDIR /usr/src/app

FROM base AS install

RUN mkdir dev
COPY package.json dev/
COPY yarn.lock dev/
RUN cd /usr/src/app/dev && yarn install

RUN mkdir prod
COPY package.json prod/
COPY yarn.lock prod/
RUN cd /usr/src/app/prod && yarn install --production

FROM base AS build

COPY --from=install /usr/src/app/dev/node_modules node_modules
COPY . .

RUN yarn build

FROM base AS app

COPY --from=install /usr/src/app/prod/node_modules node_modules
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/build/ .
COPY --from=build /usr/src/app/drizzzle.config.js .
COPY --from=build /usr/src/app/src/lib/server/database ./src/lib/server/database 

EXPOSE 3000/tcp
CMD [ "node", "index.js" ]