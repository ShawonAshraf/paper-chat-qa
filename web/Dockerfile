FROM node:20-bullseye

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 4200

RUN npm run build

CMD [ "node_modules/http-server/bin/http-server", "dist/web", "-p", "4200"]

