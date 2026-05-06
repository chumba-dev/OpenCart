# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make sure to include .env
COPY .env .env

EXPOSE 5000
CMD ["node", "server.js"]
