FROM node:latest

WORKDIR /home/node/app

COPY package.json .
COPY src ./src

EXPOSE 3000

RUN npm install
CMD npm run start