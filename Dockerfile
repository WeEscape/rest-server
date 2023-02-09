FROM node:16-alpine as build

WORKDIR /app
COPY package* .  
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY .env .
COPY --from=build /app/api/node_modules node_modules
COPY --from=build /app/api/dist dist

CMD ["node","dist/main"]


CMD ["npm","run", "start"]