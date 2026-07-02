FROM node:20.10.0-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG configuration
ARG GITHUB_ACCESS_TOKEN

ENV GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN

RUN npm run build

FROM node:20.10.0-alpine AS serve-stage

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build-stage /app/package.json ./
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/src/contents ./src/contents
COPY --from=build-stage /app/src/app/[locale]/projects ./src/app/[locale]/projects

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
