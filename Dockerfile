FROM nginx:alpine

# Maintainer yisas
LABEL maintainer="yisasthemanuel@gmail.com"

# Eliminar configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copiar contenido estático
COPY dist/ /usr/share/nginx/html/

# Exponer puerto
EXPOSE 80

# Ejecutar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
