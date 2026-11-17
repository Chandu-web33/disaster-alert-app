# Multi-stage Dockerfile for Disaster Alert Application

# Stage 1: Build stage (if needed for future enhancements)
FROM nginx:alpine as production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy application files
COPY index.html ./
COPY assets/ ./assets/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port 80
EXPOSE 80

# Add metadata labels
LABEL maintainer="disaster-alert@example.com"
LABEL version="1.0"
LABEL description="Disaster Alert Web Application - Real-time emergency notification system"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
