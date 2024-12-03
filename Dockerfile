FROM node:lts-alpine3.19 AS build
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:lts-alpine3.19 AS production-deps
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production

FROM node:lts-alpine3.19 AS production
WORKDIR /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist/views ./views
COPY --from=build /app/package.json ./

EXPOSE 4000
CMD ["yarn", "start"]
