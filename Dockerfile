FROM node:lts-alpine AS build
WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY package*.json .
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/nginx.conf /etc/nginx/
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
