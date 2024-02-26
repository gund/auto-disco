FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*\
  && corepack enable
WORKDIR /workspace

FROM base AS prod-deps
COPY ["../../../pnpm-lock.yaml", "./package.json", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
# Disable NX daemon to avoid issues with docker builds
# See https://github.com/nrwl/nx/issues/12200
ENV NX_DAEMON false
COPY ["../../../pnpm-lock.yaml", "../../../package.json", "./"]
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ../../../ .
RUN npx nx build post-message --prod

FROM node:20-alpine AS app
WORKDIR /app
COPY --from=prod-deps /workspace/node_modules ./node_modules
COPY --from=build /workspace/dist/apps/post-message .
CMD ["node", "main.js"]
