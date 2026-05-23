# 🇦🇫 Afghanistan Tourism Portal

[![PHP Version](https://img.shields.io/badge/PHP-8.1%2B-777BB4?style=flat-square&logo=php)](https://php.net)
[![Laravel Version](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![React Version](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📖 Overview

**Afghanistan Tourism Portal (ATP)** is a comprehensive web platform designed to promote tourism in Afghanistan by showcasing the country's rich cultural heritage, historical landmarks, and natural beauty. The system allows tourists to discover sightseeing locations, book hotels, rent cars, and connect with certified tour guides.

> **Note:** This project was developed as a final-year undergraduate monograph at Kabul University, Faculty of Computer Science, Information Systems Department, under the supervision of Asst. Prof. Mohammad Zafar Shafaq.

### 🎯 Purpose

- Promote Afghanistan as a safe and attractive tourist destination
- Provide a centralized platform for tourism-related information and services
- Enable tourists to plan visits, book accommodations, and arrange transportation
- Support local tourism businesses (hotels, drivers, tour guides)
- Collect tourism data to inform policy and infrastructure decisions

### 🏗️ Built With

| Technology | Purpose |
|------------|---------|
| [Laravel](https://laravel.com) | Backend API and business logic |
| [React](https://reactjs.org) | Dynamic, component-based user interface |
| [Inertia.js](https://inertiajs.com) | Seamless SPA experience without API boilerplate |
| [PrimeReact](https://www.primefaces.org/primereact) | UI component library |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [MySQL](https://mysql.com) | Relational database |
| [Vite](https://vitejs.dev) | Fast development build tool |

### 📋 Key Features

#### For Tourists (Users)
- 🔍 Browse sightseeing places by province and category
- 🏨 Search and book hotels across Afghanistan
- 🚗 Rent cars from verified drivers
- 👨‍🦯 View and select certified tour guides
- ❤️ Like and save favorite destinations
- 📅 Plan personalized itineraries

#### For Administrators
- 👑 **Super Admin** – Full system control (add, edit, delete hotels, transports, sightseeing, guides)
- 🔐 **Admin** – Manage own profile and submit requests for approval
- ✅ Approve/reject tour guide, hotel, and transport registration requests
- 📊 View booking analytics and user activity

#### For Service Providers
- 🏨 Hotels can list their properties
- 🚗 Drivers can register their vehicles
- 👨‍🦯 Tour guides can apply for certification

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Requirement | Minimum Version |
|-------------|----------------|
| PHP | 8.1+ |
| Composer | 2.x |
| Node.js | 18.x+ |
| NPM | 9.x+ |
| MySQL | 8.0+ |

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/najibullahjafari/tourism_portal_backend.git
cd tourism_portal_backend
```
#### 2. Backend Setup
```
# Copy environment configuration
cp .env.example .env

# Install PHP dependencies
composer install

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_DATABASE=your_database_name
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed
```
#### 3. Frontend Setup
```
bash
# Install Node dependencies
npm install

# Build assets for development
npm run dev

# For production build
npm run build
```

### 4. Start the Application
```
bash
# Terminal 1: Start Laravel backend
php artisan serve

# Terminal 2: Start Vite development server (if not using watch)
npm run dev
Visit http://localhost:8000 to access the application.
```
### 📁 Project Structure
```
tourism_portal_backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Application controllers
│   │   ├── Middleware/       # Custom middleware
│   │   └── Requests/         # Form validation requests
│   ├── Models/               # Eloquent models (Hotel, Transport, Sightseeing, etc.)
│   └── Providers/            # Service providers
├── database/
│   ├── migrations/           # Database schema migrations
│   └── seeders/              # Database seeders
├── resources/
│   ├── js/                   # React components (Inertia)
│   │   ├── Components/       # Reusable UI components
│   │   ├── Layouts/          # Page layout templates
│   │   ├── Pages/            # Page-specific components
│   │   └── Services/         # API service calls
│   └── views/                # Blade templates (app.blade.php)
├── routes/
│   ├── web.php               # Web routes (Inertia)
│   └── api.php               # API routes
├── public/
│   └── themes/               # Theme CSS files
└── vendor/                   # Composer dependencies
```
### 🗄️ Database Schema (ER Model)
The system includes the following core entities:
Users – System users (Super Admin, Admin, Tourists)
Sightseeing – Tourist destinations, historical sites, natural landmark
Hotels – Accommodation listings with amenities
Transport – Vehicle rentals (cars, drivers)
TourGuides – Certified local guides
Bookings – User reservations for hotels, transport, and guides
Requests – Service provider registration requests (pending approval)
Refer to the ER Diagram in the project documentation.

### 🎨 Theme Customization
```
This project includes the AppConfig component for real-time theme customization:
Available Themes
Category	Themes
Bootstrap	bootstrap4-light-blue, bootstrap4-dark-purple
Material Design	md-light-indigo, md-dark-deeppurple
Tailwind	tailwind-light, tailwind-dark
Fluent UI	fluent-light, fluent-dark
PrimeOne 2022	lara-light-indigo, lara-dark-blue
### Applying a Theme
Click the cog icon (⚙️) on the dashboard sidebar
Select your preferred theme from the configuration panel
Copy the generated theme link
Paste it in resources/views/app.blade.php
<link id="theme-css" href="{{ asset('/themes/lara-light-indigo/theme.css') }}" rel="stylesheet">
```
### Update the theme value in LayoutContext:
```
const [layoutConfig, setLayoutConfig] = useState({
    theme: "lara-light-indigo",
    // ... other settings
});
```
### 👥 User Roles & Permissions
```
Role	Permissions
Super Admin	Full CRUD operations on hotels, transports, sightseeing, guides. Approve/reject all requests. Manage users.
Admin	Submit registration requests. Manage own profile.
Tourist (User)	View sightseeing. Like/book hotels, transport, guides. View own bookings.
🔧 System Requirements
Hardware (Server)
OS: Linux (Ubuntu 20.04+ recommended) / Windows / macOS
RAM: 2GB minimum (4GB recommended for production)
Storage: 10GB free space
```
### Software
Web server (Apache/Nginx) or Laravel Sail (Docker)
MySQL 8.0+
PHP 8.1+ with extensions: BCMath, Ctype, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML

### Browser Support
Google Chrome (latest)
Mozilla Firefox (latest)
Brave (latest)
Safari (latest)

### 📈 Future Work
Based on the original monograph, planned enhancements include:

✅ Online hosting – Deploy for public access 

🔄 User reviews & ratings – Feedback system for hotels and guides

💳 Payment gateway integration – PayPal, Stripe for online bookings 

📱 Mobile application – Native Android/iOS apps (Flutter) 

🔒 Enhanced security – Advanced authentication and data protection 

📊 Scalability improvements – Load balancing and caching strategies 

🤖 AI-powered recommendations – Personalized destination suggestions 

### 🤝 Contributing
This project was a collaborative academic effort. For bug reports or suggestions:
```
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
```
### 📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

### 👨‍💻 Authors
Name	Role

Najibullah Jafari	Full-Stack Developer  
Mohammad Bassir Payenda	Co-Developer 

✔ Supervisor 

Asst. Prof. Mohammad Zafar Shafaq 
Head of Computer Science Faculty, Kabul University 

✔ Department Head 

Assoc. Prof. Mohammad Shuaib Zarinkhail 
Head of Information Systems Department 

✔ Dean 

Assoc. Prof. Amir Kror Shahidzay 
Dean of Computer Science Faculty 
 
### 🙏 Acknowledgments
Faculty of Computer Science, Kabul University
Information Systems Department
All faculty members who provided guidance and feedback
Family for their spiritual support throughout the project

### 📞 Contact
For questions or collaboration opportunities:
GitHub: @najibullahjafari
Email: [najib202020202020@gmail.com]

###⭐ If this project was helpful, please consider giving it a star on GitHub!
