FROM nginx:latest

EXPOSE 443

RUN apt-get update && apt-get install -y openssl && apt-get clean

RUN mkdir -p /etc/ssl/private /etc/ssl/certs && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/localhost.key \
    -out /etc/ssl/certs/localhost.crt \
    -subj "/CN=localhost"

COPY ./dist/front-end/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf


