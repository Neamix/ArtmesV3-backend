FROM node:22-alpine as base
WORKDIR /app
COPY package*.json .

FROM base as development 
RUN npm i 
COPY . .
CMD ["npm","run","dev"]