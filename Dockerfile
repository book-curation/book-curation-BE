FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_TEST

ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
