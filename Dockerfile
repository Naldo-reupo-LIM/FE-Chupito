#Image
FROM node:14-alpine as build

WORKDIR /application

COPY package*.json ./
COPY yarn.lock ./

RUN echo "Install dependencies" && \
    yarn install
COPY . .
RUN echo "Build application" && \
    yarn build && \
    yarn cache clean --force


# Server
FROM nginx

COPY --from=build /application/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
