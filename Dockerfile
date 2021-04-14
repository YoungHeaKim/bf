FROM node:13.13

# Create app directory
RUN mkdir -p /usr/frontend
WORKDIR /usr/frontend

# Install app dependencies
COPY package*.json /usr/frontend/
RUN npm install

# Bundle app source
COPY . /usr/frontend
RUN npm run build

CMD [ "npm", "run", "start" ]