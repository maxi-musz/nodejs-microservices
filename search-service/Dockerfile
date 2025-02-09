FROM node:18-alpine

WORKDIR /use/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3004

CMD [ "node", "server.js" ]