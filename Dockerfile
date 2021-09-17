FROM node:14-alpine
RUN npm i g npm
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @nestjs/cli
RUN npm install -g prisma
RUN prisma generate
RUN npm link webpack
RUN npm run build
CMD ["npm", "run", "start:prod"]
