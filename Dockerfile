FROM node:12.18.0 as builder

WORKDIR /client

# Copy package file
COPY yarn.lock .
COPY package.json .
RUN yarn

# Copy src
COPY . .

# Run test and build
RUN yarn test:unit
RUN yarn build

FROM nginx:1.19.0-alpine as server

COPY --from=builder /client/dist /src

ENV API_HOME http://localhost:3000
ENV APP_VERSION 0.0.0

ENV NGINX_ENVSUBST_OUTPUT_DIR /etc/nginx

COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
