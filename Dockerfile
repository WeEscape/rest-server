# 1 stage
FROM node:16-alpine as build
WORKDIR /app
COPY package* .  
RUN npm install --silent
COPY . .
RUN npm run build

# 2 stage
FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY .env .
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist
CMD ["node","dist/app.js"]