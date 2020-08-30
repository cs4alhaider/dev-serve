FROM node:12

ENV NODE_ENV production

WORKDIR /src

COPY /src/package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "start"]