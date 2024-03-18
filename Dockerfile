FROM node:lts-alpine AS base

WORKDIR /usr/src/app

FROM base AS install

RUN mkdir dev
COPY package.json dev/
COPY yarn.lock dev/
RUN cd /usr/src/app/dev && yarn install

# Not needed as of now since adapter-node
# packs all of our dependencies for us.

# RUN mkdir prod
# COPY package.json prod/
# COPY yarn.lock prod/
# RUN cd /usr/src/app/prod && yarn install --production

FROM base AS build

COPY --from=install /usr/src/app/dev/node_modules node_modules
COPY . .

RUN yarn build

FROM base AS app

# COPY --from=install /usr/src/app/prod/node_modules node_modules
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/build/ .

EXPOSE 3000/tcp
CMD [ "node", "index.js" ]

