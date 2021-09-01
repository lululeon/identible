# Identible

## regular app
1. Run `npm i` command
1. Setup database settings inside `.env` file
1. Run `npm run up` command if you don't have postgres and want to kick off a tiny dockerized instance*
1. Run one of the following:
    - `npm run dev` to run in developer mode with nodemon
    - `npm run test` to run the test suite
    - `npm start` to start the server.

## dockerized app
1. Run `npm run dckr:build` to build the standalone dockerized app*.
1. Run `npm run dckr:run` to run the container
    <small>_*Note: if you make your dockerized pg use a folder **inside** the project as a data store, it will automatically strip readable permissions from that folder, and the docker build process will fail when it encounters a non-readable entry while scanning for files (yes, even if the file is listed in .dockerignore). Put your data folder outside the project entirely, or be prepared to `sudo chmod g+r` on it each time you run the docker build command._</small>
