# Etapa 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY index.html ./
COPY src ./src
COPY public ./public

# Configurar variáveis de ambiente para o build
ARG VITE_BACK_END_BASE_URL
ENV VITE_BACK_END_BASE_URL=$VITE_BACK_END_BASE_URL

# Instalar dependências e construir o projeto
RUN npm install --ignore-scripts
RUN npm run build

# Etapa 2: Servir arquivos estáticos
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
