# syntax=docker/dockerfile:1.7

# Multi-stage Next 16 standalone image. Used as Lambda container fallback or Fargate runtime.

ARG NODE_VERSION=24
ARG PNPM_VERSION=10.33.2

# --- deps -----------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS deps
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml .npmrc ./
RUN pnpm fetch --prod=false

RUN pnpm install --frozen-lockfile --offline

# --- build ----------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS build
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public env (runtime env is injected at deploy time)
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

RUN pnpm build

# --- runtime --------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
USER nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
