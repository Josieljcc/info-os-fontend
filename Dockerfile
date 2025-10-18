# Etapa 1: Build
FROM node:20-alpine AS builder
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
RUN npm install --ignore-scripts && \
    npm run build

# Etapa 2: Servir arquivos estáticos
FROM nginx:1.26-alpine

# Criar usuário não-root e configurar nginx em uma única instrução
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-user -g nginx-user nginx-user && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-user:nginx-user /var/run/nginx.pid

# Copiar arquivos estáticos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do nginx para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configurar permissões e configuração do nginx em uma única instrução
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown nginx-user:nginx-user /etc/nginx/conf.d/default.conf && \
    sed -i '/user  nginx;/d' /etc/nginx/nginx.conf && \
    sed -i 's,/var/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf && \
    sed -i "/^http {/a\    proxy_temp_path /tmp/proxy_temp;\n    client_body_temp_path /tmp/client_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;" /etc/nginx/nginx.conf

# Mudar para usuário não-root
USER nginx-user

# Expor porta 8080 (não requer privilégios de root)
EXPOSE 8080

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
