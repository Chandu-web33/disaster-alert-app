# 🚀 Disaster Alert System - Complete Guide

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Running the Application](#running-the-application)
3. [All Commands](#all-commands)
4. [Testing the Application](#testing-the-application)
5. [Presentation Guide](#presentation-guide)
6. [User Credentials](#user-credentials)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    DISASTER ALERT SYSTEM                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (Port 8082)                                        │
│  ├── HTML/CSS/JavaScript                                     │
│  ├── Login Page (Landing)                                    │
│  ├── User Dashboard                                          │
│  ├── Admin Dashboard                                         │
│  └── Public Homepage                                         │
│                                                               │
│  Backend API (Port 5000)                                     │
│  ├── Node.js + Express                                       │
│  ├── JWT Authentication                                      │
│  ├── REST API                                                │
│  └── Rate Limiting + Security                                │
│                                                               │
│  Database (Port 27017)                                       │
│  ├── MongoDB                                                 │
│  ├── Alerts Collection                                       │
│  ├── Users Collection                                        │
│  └── Subscriptions Collection                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Running the Application

### Step 1: Start MongoDB (Automatically Connected)
MongoDB starts automatically when backend starts.

### Step 2: Start Backend API
```powershell
# Open Terminal 1
cd "C:\Users\Chandu\Downloads\devops expo\disaster-alert-app\backend"
npm start
```

**You should see:**
```
🚀 Disaster Alert API running on port 5000
📡 Environment: development
✅ MongoDB connected
🌱 Seeded 10 sample alerts
🌱 Seeded default admin user (admin@disasteralert.com / admin123)
```

### Step 3: Start Frontend Server
```powershell
# Open Terminal 2 (new terminal)
cd "C:\Users\Chandu\Downloads\devops expo\disaster-alert-app"
powershell -ExecutionPolicy Bypass -File start-server.ps1
```

**You should see:**
```
Starting Disaster Alert System...
Server URL: http://localhost:8082/
Server is running!
Opening browser...
```

---

## 📟 All Commands

### Backend Commands

```powershell
# Navigate to backend
cd "C:\Users\Chandu\Downloads\devops expo\disaster-alert-app\backend"

# Install dependencies
npm install

# Start production server
npm start

# Start development server (auto-reload)
npm run dev

# Stop server
Ctrl+C
```

### Frontend Commands

```powershell
# Navigate to project root
cd "C:\Users\Chandu\Downloads\devops expo\disaster-alert-app"

# Start frontend server
powershell -ExecutionPolicy Bypass -File start-server.ps1

# Stop server
Ctrl+C
```

### Database Commands

```powershell
# MongoDB starts automatically with backend

# Access MongoDB shell (if needed)
mongosh

# Inside mongosh:
use disasteralert
db.alerts.find().pretty()
db.users.find().pretty()
db.subscriptions.find().pretty()
```

### Docker Commands (Optional - Full Stack)

```powershell
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo

# Stop all services
docker compose down

# Stop and remove all data
docker compose down -v

# Rebuild after code changes
docker compose up -d --build
```

---

## 🧪 Testing the Application

### 1. Access the Application
- **Landing Page:** http://localhost:8082
- **Homepage:** http://localhost:8082/index.html
- **Login:** http://localhost:8082/login.html (default)
- **Register:** http://localhost:8082/register.html
- **User Dashboard:** http://localhost:8082/dashboard.html
- **Admin Dashboard:** http://localhost:8082/admin-dashboard.html

### 2. Test User Registration
1. Go to http://localhost:8082
2. Click "Sign Up Free" or go to Register page
3. Fill in:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** test123
4. Click through steps and submit
5. Should redirect to User Dashboard

### 3. Test User Login
1. Go to http://localhost:8082
2. Click "User Login" tab
3. Enter:
   - **Email:** john@example.com
   - **Password:** test123
4. Click "Sign In"
5. Should see "Login successful!" and redirect to User Dashboard

### 4. Test Admin Login
1. Go to http://localhost:8082
2. Click "Admin Login" tab
3. Enter:
   - **Admin username:** admin@disasteralert.com
   - **Admin password:** admin123
   - **OTP:** 123456
4. Click "Admin Sign In"
5. Should redirect to Admin Dashboard

### 5. Test API Directly
Open browser and visit:
- http://localhost:5000/api/health
- http://localhost:5000/api/alerts
- http://localhost:5000/api/stats

---

## 🎤 Presentation Guide

### Opening (2 minutes)
```
"Hello everyone! Today I'll present the Disaster Alert System - 
a real-time emergency notification platform built with modern 
DevOps practices."

Show: Homepage (http://localhost:8082/index.html)
- Point out: Real-time alerts, statistics, disaster types
```

### Architecture Demo (3 minutes)
```
"Our system consists of three main components:"

1. Frontend (Port 8082)
   - Show: Browser at localhost:8082
   - "Static files served by PowerShell HTTP listener"
   
2. Backend API (Port 5000)
   - Show: Terminal with backend running
   - "Node.js + Express REST API with JWT authentication"
   - Show: http://localhost:5000/api/health
   
3. Database (Port 27017)
   - Show: Backend terminal showing "MongoDB connected"
   - "MongoDB storing alerts, users, and subscriptions"
```

### Feature Demo (5 minutes)

**1. User Registration (1 min)**
```
Navigate to: http://localhost:8082/register.html
"Users can register for personalized disaster alerts"
- Fill form and register
- Show successful registration
```

**2. User Login & Dashboard (2 min)**
```
Navigate to: http://localhost:8082
"Login page is our landing page with user and admin tabs"
- Login as regular user
- Show User Dashboard:
  ✓ Personalized greeting
  ✓ Real-time alert statistics
  ✓ Critical alerts from database
  ✓ Interactive world map with disaster markers
  ✓ Alert preferences
```

**3. Admin Dashboard (1 min)**
```
Logout and login as admin
- Username: admin@disasteralert.com
- Password: admin123
- OTP: 123456

Show Admin Dashboard:
✓ System overview
✓ Alert management
✓ User management
✓ Analytics
```

**4. API Integration (1 min)**
```
Open: http://localhost:5000/api/alerts
"All data comes from our REST API"

Show backend terminal logs:
- GET /api/alerts
- POST /api/auth/login
- GET /api/stats
```

### DevOps Features (3 minutes)

**1. Docker Support**
```
Show: docker-compose.yml
"Application is fully containerized:
- Frontend container (Nginx)
- Backend container (Node.js)
- MongoDB container
- All connected via Docker network"
```

**2. CI/CD Pipeline**
```
Show: .github/workflows/ci-cd.yml
"Automated pipeline includes:
✓ Code quality checks
✓ Security scanning
✓ Docker image building
✓ Automated testing
✓ Deployment"
```

**3. Environment Configuration**
```
Show: backend/.env
"Separate configs for dev and production:
- Environment variables
- Database URLs
- JWT secrets
- Port configurations"
```

### Technical Highlights (2 minutes)
```
"Key technical features:

1. Security
   ✓ JWT authentication
   ✓ Password hashing (bcrypt)
   ✓ Rate limiting
   ✓ CORS protection
   ✓ Helmet security headers

2. Real-time Features
   ✓ Live alert updates (30s polling)
   ✓ Interactive maps (Leaflet.js)
   ✓ WebSocket ready architecture

3. Scalability
   ✓ Stateless API design
   ✓ Docker containerization
   ✓ MongoDB for horizontal scaling
   ✓ Load balancer ready (Nginx)

4. Monitoring
   ✓ Health check endpoints
   ✓ Structured logging
   ✓ API request logging
   ✓ Error tracking"
```

### Closing (1 minute)
```
"In summary, we've built a production-ready disaster alert 
system with:
✓ Full-stack architecture (Frontend + Backend + Database)
✓ Authentication & authorization
✓ Real-time data synchronization
✓ DevOps best practices (Docker, CI/CD)
✓ Security & scalability built-in

Thank you! Any questions?"
```

---

## 👤 User Credentials

### Pre-seeded Admin Account
```
Email: admin@disasteralert.com
Password: admin123
OTP: 123456 (or any 6 digits)
Role: admin
```

### Test User Account (Create your own)
```
Name: John Doe
Email: john@example.com
Password: test123
Role: user
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      Register new user
POST   /api/auth/login         Login user
GET    /api/auth/me            Get current user (requires token)
```

### Alerts
```
GET    /api/alerts             Get all alerts
GET    /api/alerts?level=critical   Filter by severity
GET    /api/alerts/:id         Get single alert
POST   /api/alerts             Create alert (admin only)
PUT    /api/alerts/:id         Update alert (admin only)
DELETE /api/alerts/:id         Delete alert (admin only)
```

### Statistics
```
GET    /api/stats              Dashboard statistics
```

### Subscriptions
```
POST   /api/subscriptions      Subscribe to alerts
GET    /api/subscriptions      List all (admin only)
DELETE /api/subscriptions/:email   Unsubscribe
```

### Health Check
```
GET    /api/health             Service health status
```

---

## 🛠️ Troubleshooting

### Issue: Backend won't start
```powershell
# Solution 1: Check if port 5000 is in use
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Solution 2: Reinstall dependencies
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Frontend won't start
```powershell
# Solution 1: Check if port 8082 is in use
netstat -ano | findstr :8082
taskkill /PID <PID> /F

# Solution 2: Use different port
# Edit start-server.ps1, change:
$port = 8083
```

### Issue: MongoDB connection failed
```powershell
# Solution: Check MongoDB status
# If using Docker:
docker ps | findstr mongo

# If installed locally:
net start MongoDB
```

### Issue: CORS errors in browser
```
Solution: Make sure backend is running and CORS is configured
Check backend/server.js for:
app.use(cors({ origin: ['http://localhost:8082'] }))
```

### Issue: "Connection error" on login/register
```
Solution: 
1. Check backend is running (Terminal 1)
2. Check backend logs for errors
3. Verify API_BASE in frontend JS files points to http://localhost:5000
```

---

## 📊 Demo Flow Chart

```
Start
  ↓
1. Show Homepage (index.html)
  ↓
2. Navigate to Login (default landing)
  ↓
3. Register New User
  ↓
4. View User Dashboard
   - Show real-time alerts
   - Show interactive map
   - Show statistics
  ↓
5. Logout
  ↓
6. Login as Admin
  ↓
7. View Admin Dashboard
   - Show system metrics
   - Show alert management
  ↓
8. Show API Endpoints
   - /api/health
   - /api/alerts
   - /api/stats
  ↓
9. Show Backend Terminal Logs
  ↓
10. Show Docker Setup (optional)
  ↓
11. Q&A
```

---

## 🎯 Key Presentation Tips

1. **Start with Visual Impact**
   - Open homepage first
   - Show live disaster alerts
   - Demonstrate interactive map

2. **Flow Naturally**
   - Public homepage → Login → Register → User Dashboard → Admin
   - Show real user journey

3. **Highlight Technical Depth**
   - Show terminal with backend logs
   - Open browser DevTools (F12) to show API calls
   - Demonstrate real-time updates

4. **Emphasize DevOps**
   - Show docker-compose.yml
   - Mention CI/CD pipeline
   - Talk about scalability

5. **Be Ready for Questions**
   - How does authentication work? (JWT tokens)
   - How do you scale? (Docker + MongoDB + Load balancer)
   - Security measures? (bcrypt, helmet, rate limiting, CORS)
   - Real-time updates? (Polling every 30s, WebSocket ready)

---

## 📱 Quick Reference URLs

```
Frontend:     http://localhost:8082
Backend:      http://localhost:5000
API Health:   http://localhost:5000/api/health
API Alerts:   http://localhost:5000/api/alerts
API Stats:    http://localhost:5000/api/stats

Login:        http://localhost:8082/login.html
Register:     http://localhost:8082/register.html
User Dash:    http://localhost:8082/dashboard.html
Admin Dash:   http://localhost:8082/admin-dashboard.html
Homepage:     http://localhost:8082/index.html
```

---

## ✅ Pre-Presentation Checklist

- [ ] Backend running (Terminal 1)
- [ ] Frontend running (Terminal 2)
- [ ] Browser tabs ready:
  - [ ] Homepage
  - [ ] Login page
  - [ ] API health endpoint
  - [ ] API alerts endpoint
- [ ] Test user registered
- [ ] Admin credentials ready
- [ ] Docker Desktop running (if showing Docker demo)
- [ ] Code editor open (VS Code) with key files
- [ ] PowerPoint/slides ready (optional)

---

**Built with ❤️ for DevOps Excellence | Full-Stack Disaster Alert System**
