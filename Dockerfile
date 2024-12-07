FROM node:20-alpine AS base

WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json yarn.lock /temp/dev/
RUN cd /temp/dev && yarn install

RUN mkdir -p /temp/prod
COPY package.json yarn.lock /temp/prod/
RUN cd /temp/prod && yarn install --omit=dev

FROM base AS prisma
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

RUN npx prisma generate

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM base AS release
COPY --from=prisma /usr/src/app/prisma prisma
COPY --from=prisma /usr/src/app/node_modules node_modules
COPY --from=prerelease /usr/src/app/build/ ./
COPY --from=prerelease /usr/src/app/package.json .

EXPOSE 3000/tcp
CMD [ "node", "index.js" ]