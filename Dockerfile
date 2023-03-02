FROM node:16 AS builder

RUN mkdir app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run --script build
CMD node dist/src/main
