FROM node:23-alpine3.20

WORKDIR /src

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env


RUN apk add --no-cache curl
RUN npm install


COPY . .

RUN npx prisma generate


EXPOSE 8080


CMD ["npm", "run", "start"]