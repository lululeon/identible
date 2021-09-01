FROM node:14-stretch

# Create app directory
RUN mkdir -p /usr/src/identible

# ensure the 'node' user (see further down) can write to it
RUN chown node /usr/src/identible

# make app dir the current working dir
WORKDIR /usr/src/identible

# Install app dependencies (following command presumes a robust .dockerignore file is in place!)
COPY package*.json ./

# Install dependencies - see https://docs.npmjs.com/cli/ci.html
RUN npm ci

# Bundle app source
COPY ./src src
COPY ./jest.config.js jest.config.js
COPY ./tsconfig.json tsconfig.json

# expose the port that the app runs on
EXPOSE 3000

# don't run stuff as root, whenever poss.. The underlying node images
# exposes a user node in group node, so use that.
# NOTE: gh worfklows forbid USER directives and everything must run as root else won't work. But not using this dockerfile in gh.
USER node

# run the app
CMD [ "npm", "start" ]
