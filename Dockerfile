FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# wildcard for both package.json and package-lock.json
COPY package*.json /usr/src/app
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# If running for production uncomment
# CMD [ "npm", "run","init" ]


CMD [ "npm", "run","start:dev" ]