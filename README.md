# 🚨 Disaster Alert Web Application

A real-time disaster alert and emergency notification system built with modern web technologies and DevOps best practices.

![Status](https://img.shields.io/badge/status-active-success)
![Docker](https://img.shields.io/badge/docker-enabled-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Docker Deployment](#docker-deployment)
- [DevOps Pipeline](#devops-pipeline)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)

## 🎯 Overview

The Disaster Alert System is a comprehensive web application designed to provide real-time notifications about natural disasters and emergency situations. It helps communities stay informed and safe by delivering instant alerts about earthquakes, floods, hurricanes, wildfires, and other critical events.

### Key Objectives

- **Real-Time Monitoring**: Track disasters as they happen
- **Multi-Channel Alerts**: SMS, email, and push notifications
- **Location-Based**: Personalized alerts based on user location
- **High Availability**: 99.9% uptime with containerized deployment
- **Scalable Architecture**: Handle millions of concurrent users

## ✨ Features

### Core Functionality

- 🔔 **Active Alert Dashboard**: View all current disaster warnings
- 🗺️ **Interactive Alert Map**: Visual representation of disaster locations
- 📧 **Alert Subscriptions**: Customize notification preferences
- 📊 **Real-Time Statistics**: Monitor affected regions and populations
- 🎯 **Alert Filtering**: Sort by severity (Critical, Warning, Watch)
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🌐 **Multi-Disaster Support**: Earthquakes, floods, hurricanes, wildfires, storms, landslides

### Technical Features

- ⚡ **Fast Performance**: Optimized assets and caching
- 🔒 **Security Headers**: Protection against common vulnerabilities
- 🐳 **Containerized**: Full Docker and Docker Compose support
- 🚀 **CI/CD Pipeline**: Automated testing and deployment
- 📈 **Health Monitoring**: Built-in health check endpoints
- 🔄 **Auto-Restart**: Container restart policies configured

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library

### DevOps & Infrastructure
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **Nginx**: High-performance web server
- **Git**: Version control
- **GitHub Actions**: CI/CD automation

### Future Integrations
- **Node.js/Express**: Backend API (planned)
- **MongoDB**: Database for alert storage (planned)
- **Redis**: Caching layer (planned)
- **WebSocket**: Real-time updates (planned)
- **AWS/Azure**: Cloud deployment (planned)

## 🚀 Getting Started

### Prerequisites

- Git installed
- Docker installed
- Docker Compose installed (optional)
- Web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/disaster-alert-app.git
cd disaster-alert-app
```

2. **Open directly in browser**
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

## 🐳 Docker Deployment

### Option 1: Using Docker

**Build the image:**
```bash
docker build -t disaster-alert-app .
```

**Run the container:**
```bash
docker run -d -p 8081:80 --name disaster-alert disaster-alert-app
```

**Access the application:**
```
http://localhost:8081
```

### Option 2: Using Docker Compose (Recommended)

**Start the application:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop the application:**
```bash
docker-compose down
```

**Restart the application:**
```bash
docker-compose restart
```

### Docker Commands Cheatsheet

```bash
# View running containers
docker ps

# View container logs
docker logs disaster-alert

# Execute command in container
docker exec -it disaster-alert sh

# Stop container
docker stop disaster-alert

# Remove container
docker rm disaster-alert

# Remove image
docker rmi disaster-alert-app

# Health check
docker inspect --format='{{.State.Health.Status}}' disaster-alert

# View container resource usage
docker stats disaster-alert
```

## 🔄 DevOps Pipeline

### CI/CD Workflow

The project includes a complete GitHub Actions pipeline:

1. **Code Quality**: HTML/CSS/JS validation
2. **Security Scan**: Vulnerability detection
3. **Build**: Docker image creation
4. **Test**: Integration and smoke tests
5. **Deploy**: Automated deployment to production

### Pipeline Stages

```yaml
Code Quality → Security Scan → Build → Test → Deploy
```

### Running Pipeline Locally

```bash
# Build
docker build -t disaster-alert-app:test .

# Test
docker run -d -p 8081:80 disaster-alert-app:test
curl http://localhost:8081/health

# Deploy
docker-compose up -d
```

## 📁 Project Structure

```
disaster-alert-app/
├── index.html                 # Main application file
├── assets/
│   ├── css/
│   │   └── style.css         # Application styles
│   └── js/
│       └── app.js            # Application logic
├── nginx.conf                # Nginx configuration
├── Dockerfile                # Docker build instructions
├── docker-compose.yml        # Docker Compose configuration
├── .dockerignore            # Docker ignore rules
├── .gitignore               # Git ignore rules
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # CI/CD pipeline
├── README.md                # Project documentation
└── DESIGN.md                # Figma design documentation
```

## ⚙️ Configuration

### Environment Variables

```bash
# Port configuration (docker-compose.yml)
PORTS=8081:80

# Timezone
TZ=UTC

# Restart policy
RESTART=unless-stopped
```

### Nginx Configuration

The application uses custom Nginx configuration with:
- Gzip compression
- Security headers
- Static asset caching
- Health check endpoint
- Error handling

### Health Monitoring

Health check endpoint available at:
```
http://localhost:8081/health
```

## 📊 Monitoring & Logs

### View Application Logs

```bash
# Docker logs
docker logs disaster-alert -f

# Docker Compose logs
docker-compose logs -f disaster-alert-web
```

### Monitor Resources

```bash
# Resource usage
docker stats disaster-alert

# Health status
docker inspect --format='{{.State.Health.Status}}' disaster-alert
```

## 🎨 Figma Design

The application design was created in Figma with:
- Responsive layouts (Desktop, Tablet, Mobile)
- Component library for consistent UI
- Color system and typography
- Interactive prototypes

**Design File**: [View in Figma](https://figma.com/your-design-link)

## 🔐 Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- XSS Protection
- Referrer Policy
- HTTPS ready configuration

## 📈 Performance Optimization

- Gzip compression enabled
- Static asset caching (1 year)
- Minification ready
- CDN integration for Font Awesome
- Optimized Docker image (Alpine-based)

## 🧪 Testing

```bash
# Run local tests
./test.sh

# Integration tests
docker-compose -f docker-compose.test.yml up

# Load testing (if tools installed)
ab -n 1000 -c 10 http://localhost:8081/
```

## 🚢 Deployment Options

### 1. Local Deployment
- Direct Docker run
- Docker Compose

### 2. Cloud Deployment
- AWS ECS/EKS
- Azure Container Instances
- Google Cloud Run
- DigitalOcean App Platform

### 3. Container Orchestration
- Kubernetes
- Docker Swarm
- Nomad

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Font Awesome for icons
- Nginx for web server
- Docker for containerization
- GitHub for version control and CI/CD

## 📞 Support

For support, email disaster-alert@example.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Backend API development (Node.js/Express)
- [ ] Database integration (MongoDB)
- [ ] Real-time WebSocket updates
- [ ] Mobile app (React Native)
- [ ] SMS integration (Twilio)
- [ ] Email notifications (SendGrid)
- [ ] Push notifications (FCM)
- [ ] Machine learning for disaster prediction
- [ ] Integration with government disaster APIs
- [ ] Multi-language support

---

**Built with ❤️ for safer communities | Powered by DevOps**
