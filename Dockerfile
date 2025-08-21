# 1. Node.js ile build aşaması
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Nginx ile serve aşaması
FROM nginx:alpine

# Build dosyalarını Nginx’in root dizinine kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Varsayılan Nginx config kullanabiliriz, port 80 expose
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
