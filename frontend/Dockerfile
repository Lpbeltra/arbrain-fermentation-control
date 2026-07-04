# Estágio de build - compila o app React/Vite
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Dentro do Docker o front chama a API via caminho relativo "/api",
# que o nginx repassa para o container do backend (ver nginx.conf)
ENV VITE_API_URL=/api
RUN npm run build

# Estágio final - nginx servindo os arquivos estáticos e fazendo proxy da API
FROM nginx:alpine AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
