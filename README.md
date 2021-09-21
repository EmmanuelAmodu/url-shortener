# Run the Applicatin Manually

## Setup Backend Service
1. Ensure [nodejs](https://nodejs.org/en/download/) is installed.
1. Install nest cli `npm i -g @nestjs/cli` 
1. Install dependencies for backend service `npm install .`

## Test/Start Backend Service
1. Run backend service test `npm run test`
1. Start backend service `npm run start`

## Start Frontend Service
1. Install dependencies for front service `cd client` then `npm install .`
1. Run backend service test `npm run test`
1. Start backend service `npm run start`

# Run the Applicatin with Docker Compose

1. Ensure [docker](https://docs.docker.com/desktop/mac/install/) is installed.
1. The application uses port 3000 for the frontend and 3001 for the backend, make sure this two port is not in use.
1. Run `docker-compose build`
1. When the build is complete run `docker-compose up`
