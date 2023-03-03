# FROM node:16 AS builder

# RUN mkdir app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app

# RUN npm run --script build
# CMD node dist/src/main


FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN DB_HOST=${DB_HOST} DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
