FROM node:lts AS base
WORKDIR /app

# By copying only the package.json and package-lock.json here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --omit=dev

FROM base AS build-deps
RUN npm install

FROM build-deps AS build
COPY . .
# PUBLIC_* переменные Astro/Vite инлайнятся на этапе сборки (`npm run build`),
# а не читаются в рантайме. Файл .env исключён через .dockerignore, поэтому
# значения нужно явно передать как build-аргументы, иначе на проде они станут undefined.
ARG PUBLIC_API_BASE="https://api.botsync.ru/api"
ARG PUBLIC_SHARE="https://api.botsync.ru/"
ARG PUBLIC_CHAT_ID=3
ENV PUBLIC_API_BASE=$PUBLIC_API_BASE
ENV PUBLIC_SHARE=$PUBLIC_SHARE
ENV PUBLIC_CHAT_ID=$PUBLIC_CHAT_ID
RUN npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]