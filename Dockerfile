FROM node:17.9.0

RUN mkdir -p /usr/src/ForestFriends
WORKDIR /usr/src/ForestFriends

COPY package.json /usr/src/ForestFriends
RUN npm install
RUN npm install -g ts-node

COPY . /usr/src/ForestFriends

CMD [ "ts-node", "index.ts"]