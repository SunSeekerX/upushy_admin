FROM alpine AS builder

WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache --update nodejs nodejs-npm

COPY package.json /app/package.json

RUN npm config set registry https://registry.npm.taobao.org && npm i

COPY . /app

RUN npm run build

FROM nginx:1.19.1-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
