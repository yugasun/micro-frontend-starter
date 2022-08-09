# build
FROM node:16-alpine AS builder
WORKDIR /root/app/
COPY . /root/app/
RUN npm i pnpm -g
RUN pnpm i && pnpm build

# deploy
FROM nginx:1.23.1-alpine
COPY --from=builder /root/app/dist /opt/www
COPY --from=builder /root/app/docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /root/app/docker/conf.d /etc/nginx/conf.d

EXPOSE 8000-8003