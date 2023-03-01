FROM node:16 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run --script build
CMD node dist/src/main.js
