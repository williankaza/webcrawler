# Dockerfile

FROM node:12.13.0-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./app

COPY .env /app

RUN npm install
