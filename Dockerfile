FROM node:10.13.0

RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install

EXPOSE 3100:3100

CMD ["node", "app.js"]