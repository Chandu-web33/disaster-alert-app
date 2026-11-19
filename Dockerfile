# Frontend - Nginx serving static files + proxying /api/ to backend
FROM nginx:alpine as production

WORKDIR /usr/share/nginx/html

# Remove default nginx content
RUN rm -rf ./*

# Copy all HTML pages
COPY index.html          ./
COPY login.html          ./
COPY register.html       ./
COPY dashboard.html      ./
COPY admin-dashboard.html ./

# Copy static assets
COPY assets/ ./assets/

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

LABEL maintainer="disaster-alert@example.com"
LABEL version="2.0"
LABEL description="Disaster Alert - Frontend (Nginx + API proxy)"

CMD ["nginx", "-g", "daemon off;"]
