# 🚨 Disaster Alert System

A comprehensive real-time disaster alert and monitoring system with user and admin dashboards, interactive maps, and real-time notifications.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-5.0%2B-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based login/registration system
- 🗺️ **Interactive Map** - Real-time disaster visualization with custom icons
- 📱 **Real-time Alerts** - Get notified about disasters in your area
- 📊 **Dashboard** - View critical alerts and statistics
- 🎨 **Modern UI** - Clean, responsive design with purple/teal theme
- 🔔 **Alert Preferences** - Customize notification settings

### Admin Features
- 👨‍💼 **Admin Panel** - Comprehensive management dashboard
- ➕ **Alert Management** - Create, edit, and delete disaster alerts
- 📈 **Analytics** - View trends and statistics
- 👥 **User Management** - Monitor registered users
- 🌍 **Global Map View** - Track all active disasters worldwide
- 📊 **Real-time Stats** - System health and metrics

### Alert Types Supported
- 🔥 Wildfires
- 💧 Floods & Tsunamis
- 🏚️ Earthquakes
- 🌪️ Hurricanes, Cyclones, Typhoons
- ⛰️ Landslides
- ⚡ Severe Weather & Storms
- 🌋 Volcanic Eruptions

## 🛠️ Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript** - Core web technologies
- **Leaflet.js** - Interactive maps
- **Font Awesome** - Icons
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server (production)
- **PowerShell** - Development server script

## 📁 Project Structure

```
disaster-alert-app/
├── backend/                    # Backend API
│   ├── models/                # MongoDB models
│   │   ├── User.js           # User schema
│   │   └── Alert.js          # Alert schema
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── alerts.js         # Alert CRUD routes
│   │   └── stats.js          # Statistics routes
│   ├── middleware/           # Custom middleware
│   │   └── auth.js           # JWT verification
│   ├── seed.js               # Database seeding
│   ├── server.js             # Main server file
│   └── package.json          # Backend dependencies
│
├── assets/                    # Frontend assets
│   ├── css/                  # Stylesheets
│   │   ├── style.css         # Global styles
│   │   ├── dashboard.css     # User dashboard styles
│   │   └── admin.css         # Admin dashboard styles
│   ├── js/                   # JavaScript files
│   │   ├── auth.js           # Authentication logic
│   │   ├── dashboard.js      # User dashboard logic
│   │   ├── admin.js          # Admin dashboard logic
│   │   └── app.js            # Main app logic
│   └── images/               # Static images
│
├── *.html                     # Frontend pages
│   ├── index.html            # Landing page
│   ├── login.html            # Login page
│   ├── register.html         # Registration page
│   ├── dashboard.html        # User dashboard
│   └── admin-dashboard.html  # Admin dashboard
│
├── docker-compose.yml         # Docker orchestration
├── Dockerfile                 # Docker image config
├── nginx.conf                 # Nginx configuration
├── start-server.ps1          # Development server script
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v5.0 or higher)
- **Git**
- **Docker** (optional, for containerized deployment)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/disaster-alert-app.git
cd disaster-alert-app
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Configure environment variables**
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/disaster-alert
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# Using MongoDB service
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. **Seed the database**
```bash
cd backend
node seed.js
```

6. **Start the backend server**
```bash
npm start
```
Backend will run on `http://localhost:5000`

7. **Start the frontend server**

**Using PowerShell (Windows):**
```powershell
powershell -ExecutionPolicy Bypass -File start-server.ps1
```

**Using Python (Cross-platform):**
```bash
python -m http.server 8085
```

**Using Node.js http-server:**
```bash
npx http-server -p 8085
```

Frontend will run on `http://localhost:8085`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start all services**
```bash
docker-compose up -d
```

2. **Access the application**
- Frontend: `http://localhost:8085`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

3. **Stop services**
```bash
docker-compose down
```

4. **View logs**
```bash
docker-compose logs -f
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/server.js` or create `.env` file:

```javascript
PORT=5000                    // Server port
MONGODB_URI=mongodb://...    // MongoDB connection string
JWT_SECRET=your_secret       // JWT signing key
```

### Frontend Configuration

Edit API base URL in JavaScript files:
```javascript
const API_BASE = 'http://localhost:5000/api';
```

## 📖 Usage

### Default Admin Credentials
```
Email: admin@disasteralert.com
Password: admin123
```

### User Registration
1. Navigate to `http://localhost:8085/register.html`
2. Fill in the registration form (3 steps)
3. Click "Create Account"
4. You'll be redirected to the user dashboard

### Creating Alerts (Admin)
1. Login as admin
2. Go to Admin Dashboard
3. Click "Create New Alert"
4. Fill in disaster details:
   - Type (Earthquake, Flood, etc.)
   - Severity Level (Critical, Warning, Watch)
   - Location and coordinates
   - Description and affected population
5. Click "Create Alert"

### Viewing Alerts (User)
- View all critical alerts on the dashboard
- Click on map markers to see detailed information
- Alerts auto-refresh every 30 seconds

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Alert Endpoints

#### Get All Alerts
```http
GET /api/alerts
```

#### Get Alert by ID
```http
GET /api/alerts/:id
```

#### Create Alert (Admin Only)
```http
POST /api/alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "Wildfire",
  "level": "critical",
  "location": "California, USA",
  "description": "Massive wildfire spreading rapidly",
  "coordinates": {
    "lat": 34.0522,
    "lng": -118.2437
  },
  "affected": "50K",
  "magnitude": "Level 5"
}
```

#### Update Alert (Admin Only)
```http
PUT /api/alerts/:id
Authorization: Bearer <token>
```

#### Delete Alert (Admin Only)
```http
DELETE /api/alerts/:id
Authorization: Bearer <token>
```

### Statistics Endpoints

#### Get Dashboard Stats
```http
GET /api/stats
```

#### Get User Count
```http
GET /api/users/public
```

## 📸 Screenshots

### User Dashboard
- Interactive map with custom disaster icons
- Critical alerts grid layout
- Real-time statistics
- Modern purple/teal theme

### Admin Dashboard
- Comprehensive management panel
- Alert creation and editing
- User statistics
- System health monitoring
- Analytics and trends

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- Font Awesome for icons
- Leaflet.js for mapping functionality
- MongoDB team for the database
- Express.js community

## 📞 Support

For support, email support@disasteralert.com or open an issue in the GitHub repository.

## 🔮 Future Enhancements

- [ ] SMS and Email notifications
- [ ] Mobile app (React Native)
- [ ] AI-powered disaster prediction
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Emergency contact management
- [ ] Historical data analysis
- [ ] Integration with government alert systems

---

Made with ❤️ for a safer world 🌍
