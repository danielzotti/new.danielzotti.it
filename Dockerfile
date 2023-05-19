# Stage 0, "build-stage", based on Node.js, to build and compile Next App

# base image
FROM node:18.12.1-alpine as build-stage

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
FROM node:18.12.1-alpine as serve-stage

WORKDIR app

# Install nextjs
RUN npm install next@13.3.0

# copy dependency definitions
COPY --from=build-stage /app/package.json ./

# copy (build-stage)/app/dist in /app
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/.next/standalone ./
COPY --from=build-stage /app/.next/static ./.next/static


# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD node server.js
