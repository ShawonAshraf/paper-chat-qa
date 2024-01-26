FROM node:20-bullseye

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
RUN npm install
# RUN npm install -g http-server
RUN npm run build --omit=dev

CMD [ "node_modules/http-server/bin/http-server", "dist/web", "-p", "4200"]

