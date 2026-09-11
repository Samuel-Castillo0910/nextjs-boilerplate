FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN adduser -D -H -u 10001 webapp && \
    chown -R webapp:webapp /usr/share/nginx/html && \
    chown -R webapp:webapp /var/cache/nginx /var/run
USER webapp
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
