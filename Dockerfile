FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . ./app
EXPOSE 3000
CMD ["node","-r","sucrase/register","./app/src/server.js"]