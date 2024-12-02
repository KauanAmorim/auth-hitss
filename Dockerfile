FROM node:iron-alpine3.19

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install
COPY . /home/node/app
RUN cp -a /tmp/app/node_modules /home/node/app
WORKDIR /home/node/app

RUN npm install -g npm@latest
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
