# Stage 0, "build-stage", based on Node.js, to build and compile Next App

# base image
FROM node:20.10.0-alpine AS build-stage

# create & set working directory
WORKDIR /app

# copy package.json and package-lock.json into workdir /app
COPY package*.json ./

# install dependencies
RUN npm install

# copy source files
COPY . .

ARG configuration

# run the build inside workdir /app with output path /app/dist
RUN npm run build

# Stage 2, based on NodeJS, to have only the compiled app, ready for production with SSR
FROM node:20.10.0-alpine AS serve-stage

WORKDIR app

# Install serve
RUN npm install -g serve@14.2.0

# copy dependency definitions
COPY --from=build-stage /app/package.json ./

# copy (build-stage)/app/dist in /app
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/out ./out

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD serve out
