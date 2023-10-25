FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN npx prisma generate

CMD [ "npm","run","start:prod" ]

EXPOSE 3000
