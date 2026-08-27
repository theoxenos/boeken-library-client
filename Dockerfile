FROM node:lts-alpine AS build
WORKDIR /app
ENV VITE_API_URL=http://localhost:3000/api
COPY package*.json .
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine AS production
#COPY nginx.conf /etc/nginx/
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

