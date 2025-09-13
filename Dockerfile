FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS dependencies
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
COPY patches /temp/patches
RUN cd /temp && bun install --frozen-lockfile

FROM base AS build
COPY --from=dependencies /temp .
COPY tsconfig.json vite.config.ts svelte.config.js  ./
COPY src ./src
COPY static ./static

ENV NODE_ENV=production
RUN bun run build

FROM base AS deployment
COPY --from=build /usr/src/app/build .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "./index.js" ]
