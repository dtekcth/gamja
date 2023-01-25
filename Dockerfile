FROM node:19 as build
WORKDIR /build

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /build/dist /usr/share/nginx/html
