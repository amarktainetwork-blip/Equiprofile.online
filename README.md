# EquiProfile - Professional Horse Management Platform

![EquiProfile](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

> **A comprehensive, modern web application for equestrian professionals to manage horses' health records, training schedules, feeding plans, and more.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Setup](#docker-setup)
- [Production Deployment](#production-deployment)
  - [Ubuntu 24.04 (Recommended)](#ubuntu-2404-deployment)
  - [Manual Deployment](#manual-deployment)
  - [Environment Variables](#environment-variables)
  - [SSL Setup](#ssl-setup)
- [API Keys & Integrations](#api-keys--integrations)
  - [Required (Core)](#required-core)
  - [Optional (Enhanced Features)](#optional-enhanced-features)
  - [Stripe Payment Setup](#stripe-setup)
  - [AWS S3 Storage Setup](#aws-s3-setup)
  - [OpenAI Integration](#openai-integration)
  - [Weather API](#weather-api)
  - [Email SMTP](#email-smtp)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Database Schema](#database-schema)
  - [Real-time Updates (SSE)](#realtime-sse)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Testing](#testing)
  - [Contributing Guidelines](#contributing)
  - [Code Style](#code-style)
- [Features Breakdown](#features-breakdown)
  - [Core Modules (20+)](#core-modules)
  - [Health & Vet Management](#health-vet)
  - [Training & Performance](#training)
  - [Nutrition & Feeding](#nutrition)
  - [Breeding Management](#breeding)
  - [Administrative Tools](#admin)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Testing](#testing)
  - [Code Style](#code-style)
- [Troubleshooting](#troubleshooting)
  - [Common Issues](#common-issues)
  - [Recovery Procedures](#recovery-procedures)
  - [Nginx Configuration Issues](#nginx-issues)
  - [Database Problems](#database-problems)
  - [Build Errors](#build-errors)
- [Maintenance](#maintenance)
  - [Updates & Upgrades](#updates)
  - [Backup Procedures](#backups)
  - [Monitoring](#monitoring)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
  - [Performance Optimization](#performance)
- [License](#license)
- [Support](#support)
- [Changelog](#changelog)

---

## Overview

EquiProfile is a production-ready, comprehensive horse management platform designed for equestrian professionals, stable managers, trainers, and horse owners. With **20+ feature modules** and **100+ functions**, it provides everything needed to manage horses' health, training, nutrition, breeding, and more.

### Key Highlights

- ✅ **Production-Ready** - Fully tested and deployed
- ✅ **Modern UI** - Glassmorphism design with smooth animations
- ✅ **AI-Powered** - OpenAI integration for intelligent insights
- ✅ **Mobile-First** - Responsive design works on all devices
- ✅ **Secure** - Bank-level encryption, GDPR compliant
- ✅ **Scalable** - Supports unlimited horses and users
- ✅ **Extensible** - REST API and webhook support

### Use Cases

- **Horse Owners**: Track single or multiple horses, manage health records
- **Trainers**: Manage client horses, track training sessions, share progress
- **Stable Managers**: Multi-horse management, staff scheduling, facility management
- **Veterinarians**: Access patient records, update medical records, schedule appointments
EquiProfile is a production-ready, feature-rich equestrian management platform designed for horse owners, trainers, stable managers, and veterinary professionals. Built with modern web technologies, it provides comprehensive tools for managing every aspect of horse care, from health records to training schedules, breeding management to competition tracking.

### Why EquiProfile?

- **🏥 Complete Health Management** - Track vaccinations, vet visits, medications, dental care, and more
- **📊 Advanced Analytics** - Data-driven insights for training, nutrition, and performance
- **🤖 AI-Powered Features** - Intelligent chat assistant, weather analysis, and riding recommendations
- **📱 Mobile-First Design** - Responsive interface works seamlessly on any device
- **🔒 Bank-Level Security** - End-to-end encryption, RBAC, audit logging, GDPR compliant
- **⚡ Real-time Updates** - Server-Sent Events (SSE) for instant synchronization across devices
- **💼 Multi-Stable Support** - Manage multiple facilities and teams from one platform
- **📈 Scalable Architecture** - Built to handle everything from single horse owners to large operations

---

## Features

### Core Modules (20+)

1. ✅ **User Management** - Multi-role authentication with JWT
2. ✅ **Horse Profiles** - Complete profile management with photos
3. ✅ **Health Records** - Vaccinations, vet visits, medications, dental, hoof care, deworming
4. ✅ **Training Management** - Session planning, progress tracking, performance analytics
5. ✅ **Feeding & Nutrition** - Custom feeding plans, nutrition tracking, weight management
6. ✅ **Calendar & Scheduling** - Integrated calendar with automated reminders
7. ✅ **AI Chat Assistant** - OpenAI-powered insights and recommendations
8. ✅ **Weather Analysis** - Real-time weather with riding recommendations
9. ✅ **Document Storage** - Secure cloud storage for files and photos
10. ✅ **Breeding Management** - Heat cycles, breeding records, pregnancy monitoring
11. ✅ **Competition Tracking** - Show planning, results tracking, achievements
12. ✅ **Financial Management** - Expense tracking, budgets, invoices
13. ✅ **Stable Management** - Multi-stable support, stall assignments
14. ✅ **Contacts Database** - Vets, farriers, trainers, suppliers
15. ✅ **Reports & Analytics** - Custom reports, data visualization, exports
16. ✅ **Notifications** - Email alerts, reminders, in-app notifications
17. ✅ **Mobile-Friendly** - Responsive PWA design
18. ✅ **Security** - Bank-level encryption, role-based access
19. ✅ **Admin Panel** - Hidden admin control at `/admin`
20. ✅ **Payments** - Stripe integration for subscriptions

### Landing Page Features

- **Video background** hero section with gradient fallback
- **Glassmorphism UI** with modern backdrop-blur effects
- **Advanced animations** - floating particles, 3D hover effects, animated statistics
- **Auto-rotating testimonials** carousel
- **Mobile-responsive** design with accessibility improvements
1. **User Management & Authentication** - Multi-user RBAC, JWT, OAuth, 2FA, password reset
2. **Horse Profile Management** - Complete profiles, photos, documents, search, export
3. **Health Records** - Vaccinations, vet visits, medications, dental, hoof care, deworming
4. **Training Management** - Session planning, progress tracking, performance analytics, video uploads
5. **Feeding & Nutrition** - Custom schedules, weight monitoring, body condition scoring, supplements
6. **Calendar & Scheduling** - Integrated calendar, appointments, reminders, iCal export
7. **AI-Powered Features** - Chat assistant, weather analysis, riding recommendations
8. **Document Management** - Secure storage, PDFs, images, videos, search, sharing
9. **Breeding Management** - Heat cycle tracking, pregnancy monitoring, foaling schedules
10. **Competition Management** - Scheduling, results tracking, performance records, achievements
11. **Financial Management** - Expense tracking, budgets, invoices, reports
12. **Stable Management** - Multiple stables, stall assignments, staff scheduling, inventory
13. **Contacts Management** - Vets, farriers, trainers, dentists, emergency contacts
14. **Reports & Analytics** - Comprehensive reports, data visualization, export to PDF/Excel
15. **Notifications & Reminders** - Smart alerts, email notifications, custom reminders
16. **Data Import & Export** - Bulk import (CSV/Excel/JSON), backups, migrations
17. **Mobile-Friendly Design** - Responsive, PWA capabilities, offline support
18. **Security & Privacy** - Bank-level encryption, RBAC, audit logging, GDPR compliance
19. **Admin Panel** - Hidden system control via ADMIN_UNLOCK_PASSWORD
20. **Payment & Subscriptions** - Stripe integration, multiple tiers, auto-billing

### UI/UX Features

- Modern glassmorphism design
- Smooth animations and transitions
- Dark/light mode support
- Accessibility compliance (WCAG 2.1)
- Responsive layouts for all screen sizes
- Intuitive navigation and workflows

---

## Quick Start

### Prerequisites

#### Required Software

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)

  ```bash
  # Verify installation
  node --version  # Should be v20.x or higher
  npm --version   # Should be v10.x or higher
  ```

#### Database (Choose One)

- **SQLite** (default, no setup required) - Good for development
- **MySQL 8.0+** (recommended for production)

  ```bash
  # Ubuntu/Debian
  sudo apt-get install mysql-server

  # Create database
  mysql -u root -p
  CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER 'equiprofile'@'localhost' IDENTIFIED BY 'your_secure_password';
  GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
  FLUSH PRIVILEGES;
  EXIT;
  ```

### Local Development

Get EquiProfile running locally in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git
cd Equiprofile.online

# 2. Install dependencies
npm install --legacy-peer-deps
# 2. Install dependencies with frozen lockfile
pnpm install --frozen-lockfile

# 3. Copy environment configuration
cp .env.example .env

# 4. Generate secure secrets
# JWT Secret (copy to .env)
openssl rand -base64 32

# Admin password (copy to .env)
openssl rand -base64 16

# 5. Edit .env file with your configuration
# CRITICAL: Change JWT_SECRET and ADMIN_UNLOCK_PASSWORD!
nano .env

# 6. Setup database (pushes schema to database)
npm run db:push

# 7. Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

> **Note**: The default configuration uses SQLite for easy local development. For production, configure MySQL in your `.env` file.

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## Production Deployment

### Ubuntu 24.04 Deployment

EquiProfile includes a **plug-and-play production deployment system** optimized for Ubuntu 24.04 VPS.

#### Server Requirements

- **OS**: Ubuntu 24.04 LTS (or 22.04 LTS)
- **RAM**: 2GB minimum (4GB recommended for builds)
- **Disk**: 10GB available
- **CPU**: 1 core minimum (2 cores recommended)
- **Domain**: Domain name pointing to your server IP

#### Quick Installation

Deploy to production in under 20 minutes:

```bash
# 1. SSH into your server
ssh root@your-server-ip

# 2. Clone to deployment directory
sudo mkdir -p /var/equiprofile
cd /var/equiprofile
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app

# 3. Configure environment
sudo cp .env.example .env
sudo nano .env
# REQUIRED: Set DATABASE_URL, JWT_SECRET, ADMIN_UNLOCK_PASSWORD, BASE_URL

# 4. Run installation script (Ubuntu 24.04 only)
sudo bash deployment/ubuntu24/install.sh

# The script will:
# ✅ Install Node.js 20.x LTS, npm, and nginx
# ✅ Create system user 'www-data'
# ✅ Setup application directory at /var/equiprofile/app
# ✅ Install dependencies and build application
# ✅ Install systemd service
# ✅ Configure nginx reverse proxy
# ✅ Verify installation

# 5. Setup SSL with Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 6. Verify deployment
bash scripts/smoke_prod.sh https://yourdomain.com
```

**Your EquiProfile instance is now running!** 🎉

#### Canonical Deployment Settings

- **App root**: `/var/equiprofile/app`
- **Logs directory**: `/var/log/equiprofile/`
- **Node.js listens on**: `127.0.0.1:3000` (localhost only)
- **Systemd service name**: `equiprofile`
- **Systemd service file**: `deployment/equiprofile.service`
- **Nginx config template**: `deployment/nginx/equiprofile.conf`
- **Build outputs**: `dist/public/` (static files), `dist/index.js` (server)

### Manual Deployment

If not using Ubuntu 24.04, follow these manual steps:

#### Step 1: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt-get install -y nginx

# Install MySQL
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
```

#### Step 2: Configure Database

```bash
# Create database and user
sudo mysql

CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'equiprofile'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Step 3: Deploy Application

```bash
# Clone repository
sudo mkdir -p /var/equiprofile
cd /var/equiprofile
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app

# Create environment file
sudo cp .env.example .env
sudo nano .env
# Configure all required variables (see Environment Variables section)

# Install dependencies
sudo npm ci

# Build application
sudo npm run build

# Setup systemd service
sudo cp deployment/equiprofile.service /etc/systemd/system/equiprofile.service
sudo systemctl daemon-reload
sudo systemctl enable equiprofile
sudo systemctl start equiprofile

# Setup nginx
sudo cp deployment/nginx/equiprofile.conf /etc/nginx/sites-available/equiprofile
sudo ln -s /etc/nginx/sites-available/equiprofile /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 4: Verify Deployment

```bash
# Check service status
sudo systemctl status equiprofile

# Check application logs
sudo journalctl -u equiprofile -n 50

# Test health endpoint
curl http://127.0.0.1:3000/api/health
curl https://yourdomain.com/api/health

# Run smoke tests
bash scripts/smoke_prod.sh https://yourdomain.com
```

### Environment Variables

#### Required (Core)

These **must** be configured for the application to start:

```env
# Database
DATABASE_URL=mysql://equiprofile:password@localhost:3306/equiprofile

# Security - CRITICAL: Generate secure values!
JWT_SECRET=<generate-with: openssl rand -base64 32>
ADMIN_UNLOCK_PASSWORD=<your-secure-password>

# Application
NODE_ENV=production
PORT=3000
BASE_URL=https://yourdomain.com

# PWA (disabled by default for production)
VITE_PWA_ENABLED=false
ENABLE_PWA=false
```

#### Generating Secure Secrets

```bash
# Generate JWT secret (64+ characters recommended)
openssl rand -hex 32

# Generate admin password
openssl rand -base64 24
```

### SSL Setup

Enable HTTPS with Let's Encrypt (free SSL certificates):

#### Step 1: Install Certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

#### Step 2: Obtain Certificate

```bash
# Replace with your domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter email address (for renewal notifications)
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: yes)

#### Step 3: Verify SSL

```bash
# Test your SSL setup
curl -I https://yourdomain.com

# Check SSL rating
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com
```

#### Step 4: Auto-Renewal

Certbot automatically sets up renewal. Test it:

```bash
sudo certbot renew --dry-run
```

SSL certificates will auto-renew before expiration.

---

## API Keys & Integrations

### Required (Core)

These are essential for the system to function:

#### Database Configuration

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**Purpose**: Primary database connection for storing all application data  
**Where to get it**: Configure your MySQL/MariaDB database server  
**Cost**: Free (self-hosted) or varies by cloud provider

#### JWT Secret

```env
JWT_SECRET=your_jwt_secret_here_minimum_32_characters
```

**Purpose**: Secure authentication tokens  
**How to generate**:

```bash
openssl rand -base64 32
```

**Cost**: Free

#### Admin Password

```env
ADMIN_UNLOCK_PASSWORD=your_secure_admin_password
```

**Purpose**: Access to hidden admin panel at `/admin` that controls the entire site  
**Important**: MUST be changed from default in production  
**Cost**: Free

### Optional (Enhanced Features)

These enable additional functionality:

<a name="stripe-setup"></a>
#### Stripe Payment Setup

```env
ENABLE_STRIPE=true
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_YEARLY_PRICE_ID=price_xxxxxxxxxxxxx
```

**Purpose**: Real-time payment processing for subscriptions  
**Where to get it**: https://dashboard.stripe.com/apikeys

**Setup Steps**:
1. Create Stripe account at https://stripe.com
2. Navigate to Developers → API keys
3. Copy both Publishable and Secret keys
4. Set up webhook endpoint for subscription events
5. Copy webhook signing secret
6. Go to https://dashboard.stripe.com/products
7. Create product "EquiProfile"
8. Add monthly and yearly price options
9. Copy the price IDs

**Cost**: Free to start, 2.9% + $0.30 per transaction

<a name="aws-s3-setup"></a>
#### AWS S3 Storage Setup

```env
ENABLE_UPLOADS=true
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=equiprofile-uploads
```

**Purpose**: Secure document and file storage  
**Where to get it**: https://aws.amazon.com/s3/

**Setup Steps**:
1. Create AWS account
2. Navigate to IAM → Users → Create user
3. Attach policy: `AmazonS3FullAccess`
4. Create access keys
5. Create S3 bucket in desired region
6. Configure bucket CORS if needed

**Cost**:
- First 50 TB: $0.023 per GB/month
- First 50,000 GET requests: Free
- PUT requests: $0.005 per 1,000 requests

<a name="openai-integration"></a>
#### OpenAI Integration

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

**Purpose**:
- AI-powered chat assistant
- Intelligent insights and recommendations
- Natural language processing
- Smart data analysis

**Where to get it**: https://platform.openai.com/api-keys

**Setup Steps**:
1. Create account at https://openai.com
2. Navigate to API keys section
3. Create new secret key
4. Copy and save immediately (only shown once)

**Cost**:
- Pay-as-you-go pricing
- GPT-4: ~$0.03 per 1K input tokens, ~$0.06 per 1K output tokens
- GPT-3.5-turbo: ~$0.0005 per 1K input tokens, ~$0.0015 per 1K output tokens

<a name="weather-api"></a>
#### Weather API

```env
WEATHER_API_KEY=xxxxxxxxxxxxx
WEATHER_API_PROVIDER=openweathermap
```

**Purpose**: Real-time weather analysis for riding recommendations  
**Where to get it**: https://openweathermap.org/api

**Alternative providers**:
- WeatherAPI.com
- Weatherstack
- Tomorrow.io

**Setup Steps**:
1. Sign up at https://openweathermap.org/api
2. Subscribe to API plan (free tier available)
3. Generate API key from dashboard
4. Copy API key

**Cost**:
- Free tier: 1,000 calls/day
- Paid plans: Start at $40/month for 100,000 calls/day

<a name="email-smtp"></a>
#### Email SMTP

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@equiprofile.online
```

**Purpose**:
- Send appointment reminders
- Vaccination alerts
- System notifications
- Password resets

**Recommended providers**:
- Gmail (with App Password)
- SendGrid (https://sendgrid.com)
- Mailgun (https://mailgun.com)
- Amazon SES (https://aws.amazon.com/ses/)

**Gmail Setup**:
1. Enable 2-factor authentication
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use app password in SMTP_PASSWORD

**Cost**:
- Gmail: Free (limited)
- SendGrid: Free tier 100 emails/day, paid from $15/month
- Mailgun: First 5,000 emails free/month
- Amazon SES: $0.10 per 1,000 emails

### Complete Configuration Example

#### Minimal Setup (Basic Functionality)

```env
NODE_ENV=production
PORT=3000
BASE_URL=https://equiprofile.online
DATABASE_URL=mysql://user:pass@localhost:3306/equiprofile
JWT_SECRET=<generate_with_openssl>
ADMIN_UNLOCK_PASSWORD=<secure_password>
```

#### Full Setup (All Features)

```env
# Core
NODE_ENV=production
PORT=3000
BASE_URL=https://equiprofile.online
DATABASE_URL=mysql://user:pass@localhost:3306/equiprofile
JWT_SECRET=<generate_with_openssl>
ADMIN_UNLOCK_PASSWORD=<secure_password>

# Payments
ENABLE_STRIPE=true
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_MONTHLY_PRICE_ID=price_xxx
STRIPE_YEARLY_PRICE_ID=price_xxx

# AI
OPENAI_API_KEY=sk-xxx

# Weather
WEATHER_API_KEY=xxx
WEATHER_API_PROVIDER=openweathermap

# Storage
ENABLE_UPLOADS=true
AWS_ACCESS_KEY_ID=AKIAxxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=equiprofile-uploads

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@equiprofile.online

# PWA (optional)
ENABLE_PWA=false
VITE_PWA_ENABLED=false
```

### Cost Estimate

#### Minimal Setup (Basic Features)

- Database (self-hosted): $0
- Server: $5-10/month
- **Total: $5-10/month**

#### Full Setup (All Features)

- Database: $0-20/month
- Server: $10-50/month
- Stripe: Pay-per-transaction (2.9% + $0.30)
- OpenAI API: $10-50/month (usage-based)
- Weather API: $0-40/month
- AWS S3: $5-20/month
- Email (SendGrid): $0-15/month
- **Total: $25-195/month** (plus transaction fees)
# 4. Generate secure JWT secret
openssl rand -base64 32
# Add to .env as JWT_SECRET

# 5. Set admin password
# Add to .env as ADMIN_UNLOCK_PASSWORD=your_secure_password

# 6. Initialize database
pnpm db:push

# 7. Start development server
pnpm dev
```

The application will be available at http://localhost:3000

**Default Admin Access:**
- Navigate to `/unlock` page
- Enter your ADMIN_UNLOCK_PASSWORD
- Access admin panel at `/admin`

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Production Deployment

### Ubuntu 24.04 Deployment

**Quick Deployment (20 minutes):**

```bash
# 1. Create application directory
sudo mkdir -p /var/equiprofile
cd /var/equiprofile

# 2. Clone repository
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app

# 3. Configure environment
sudo cp .env.example .env
sudo nano .env  # Set DATABASE_URL, JWT_SECRET, ADMIN_UNLOCK_PASSWORD, BASE_URL

# 4. Run deployment script
sudo bash deployment/deploy.sh --domain equiprofile.online

# 5. Verify deployment
bash scripts/smoke_prod.sh https://equiprofile.online
```

The deployment script handles:
- ✅ Node.js and dependencies installation
- ✅ Production build
- ✅ Systemd service setup
- ✅ Nginx configuration with SSL
- ✅ Service startup and verification

### Manual Deployment

#### 1. System Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install Nginx
sudo apt-get install nginx

# Install MySQL
sudo apt-get install mysql-server

# Install Certbot for SSL
sudo apt-get install certbot python3-certbot-nginx
```

#### 2. Database Configuration

```bash
# Create database and user
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'equiprofile'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Application Setup

```bash
# Clone to production directory
sudo mkdir -p /var/equiprofile
cd /var/equiprofile
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app

# Install dependencies
pnpm install --frozen-lockfile

# Configure environment
cp .env.example .env
nano .env
```

#### 4. Build Application

```bash
# Build for production
pnpm build

# Verify build output
ls -la dist/
```

#### 5. Systemd Service

Create `/etc/systemd/system/equiprofile.service`:

```ini
[Unit]
Description=EquiProfile Application
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/equiprofile/app
Environment="NODE_ENV=production"
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Security
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/equiprofile/app

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable equiprofile
sudo systemctl start equiprofile
sudo systemctl status equiprofile
```

#### 6. Nginx Configuration

Create `/etc/nginx/sites-available/equiprofile`:

```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name equiprofile.online www.equiprofile.online;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name equiprofile.online www.equiprofile.online;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/equiprofile.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/equiprofile.online/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static files
    location / {
        root /var/equiprofile/app/dist/public;
        try_files $uri $uri/ /index.html;
        
        # Cache headers for immutable assets
        location ~* ^/assets/ {
            add_header Cache-Control "public, max-age=31536000, immutable";
            access_log off;
        }
        
        # No cache for HTML
        location = /index.html {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }
    }

    # Block PWA files (return 404)
    location = /service-worker.js {
        return 404;
    }
    
    location = /manifest.json {
        return 404;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Logs
    access_log /var/log/nginx/equiprofile-access.log;
    error_log /var/log/nginx/equiprofile-error.log;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/equiprofile /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Setup

```bash
# Obtain SSL certificate
sudo certbot --nginx -d equiprofile.online -d www.equiprofile.online

# Test auto-renewal
sudo certbot renew --dry-run

# Auto-renewal is configured via systemd timer
sudo systemctl status certbot.timer
```

### Environment Variables

Create `.env` file with the following required variables:

```env
# Database (Required)
DATABASE_URL=mysql://equiprofile:password@localhost:3306/equiprofile

# Security (Required - MUST CHANGE IN PRODUCTION)
JWT_SECRET=<generate-with-openssl-rand-base64-32>
ADMIN_UNLOCK_PASSWORD=<your-secure-admin-password>

# Application
NODE_ENV=production
BASE_URL=https://equiprofile.online
PORT=3000

# Optional: See API Keys & Integrations section for full list
```

**Generate secure secrets:**

```bash
# JWT Secret (32+ characters)
openssl rand -base64 32

# Admin password (use a strong password manager)
openssl rand -base64 16
```

---

## API Keys & Integrations

### Required (Core)

These are essential for the system to function:

#### Database Configuration

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**Purpose**: Primary database connection for storing all application data  
**Where to get it**: Configure your MySQL/MariaDB database server  
**Cost**: Free (self-hosted) or varies by cloud provider

#### JWT Secret

```env
JWT_SECRET=your_jwt_secret_here_minimum_32_characters
```

**Purpose**: Secure authentication tokens  
**How to generate**:

```bash
openssl rand -base64 32
```

**Cost**: Free

#### Admin Password

```env
ADMIN_UNLOCK_PASSWORD=your_secure_admin_password
```

**Purpose**: Access to hidden admin panel that controls the entire site  
**Important**: MUST be changed from default in production  
**Cost**: Free

### Optional (Enhanced Features)

These enable additional functionality:

### Stripe Setup

For payment processing and subscription management:

```env
ENABLE_STRIPE=true
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_YEARLY_PRICE_ID=price_xxxxx
```

**Setup Steps:**
1. Create account at https://stripe.com
2. Navigate to Developers → API Keys
3. Copy Secret Key and Publishable Key
4. Create products and prices in Products section
5. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
6. Select events: `customer.subscription.*`, `invoice.*`, `payment_intent.*`
7. Copy Webhook Secret

**Cost**: Free to start, 2.9% + $0.30 per transaction

### AWS S3 Setup

For document and image storage:

```env
ENABLE_UPLOADS=true
AWS_ACCESS_KEY_ID=AKIAxxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=equiprofile-uploads
```

**Setup Steps:**
1. Create AWS account at https://aws.amazon.com
2. Navigate to IAM → Users → Create User
3. Attach policy: `AmazonS3FullAccess` (or custom restricted policy)
4. Generate access keys
5. Create S3 bucket in desired region
6. Set bucket permissions (public read for uploaded images, or private with signed URLs)

**Cost**: $0.023/GB for first 50TB storage, $0.005 per 1,000 PUT requests, free GET requests

### OpenAI Integration

For AI-powered chat assistant and intelligent features:

```env
OPENAI_API_KEY=sk-xxxxx
```

**Setup Steps:**
1. Create account at https://platform.openai.com
2. Navigate to API Keys
3. Create new secret key
4. Copy and save securely

**Cost**: 
- GPT-4: ~$0.03 per 1,000 input tokens
- GPT-3.5-Turbo: ~$0.0005 per 1,000 input tokens

### Weather API

For weather-based riding recommendations:

```env
WEATHER_API_KEY=xxxxx
WEATHER_API_PROVIDER=openweathermap
```

**Setup Steps:**
1. Create account at https://openweathermap.org/api
2. Subscribe to plan (free tier available)
3. Copy API key from account dashboard

**Cost**: Free tier with 1,000 calls/day, paid plans from $40/month

### Email SMTP

For email notifications and password resets:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@equiprofile.online
```

**Setup Steps (Gmail):**
1. Enable 2-Factor Authentication on Google account
2. Generate App Password: Account → Security → App Passwords
3. Use app password (not your regular password)

**Alternative Providers:**
- **SendGrid**: Free tier 100 emails/day, paid from $15/month
- **Mailgun**: 5,000 free emails/month, then paid
- **Amazon SES**: $0.10 per 1,000 emails

**Cost**: Gmail (free but limited), SendGrid (free tier or $15+/month), Mailgun (5,000 free/month)

### Estimated Monthly Costs

- **Minimal Setup** (Core only): $5-10/month
- **Basic Setup** (Core + Stripe + SMTP): $15-25/month + transaction fees
- **Full Setup** (All integrations): $25-195/month + transaction fees

---

## Architecture

### Tech Stack

#### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **TanStack Query** - Data fetching and caching
- **Vite** - Build tool and dev server

#### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **tRPC** - Type-safe API layer
- **Drizzle ORM** - Type-safe database ORM
- **MySQL** - Relational database
- **JWT + bcrypt** - Authentication and encryption

#### Infrastructure
- **Nginx** - Reverse proxy and static file server
- **Systemd** - Process management
- **Let's Encrypt** - SSL certificates
- **PM2** (optional) - Process manager

### Project Structure

```
Equiprofile.online/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities and helpers
│   │   ├── pages/       # Page components
│   │   └── main.tsx     # Entry point
│   └── public/          # Static assets
├── server/              # Backend Node.js application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # tRPC routes
│   ├── db/              # Database schema and migrations
│   └── lib/             # Server utilities
├── shared/              # Shared types and utilities
├── deployment/          # Deployment scripts and configs
│   ├── ubuntu24/        # Ubuntu 24.04 installation
│   ├── nginx/           # Nginx configuration
│   ├── deploy.sh        # Deployment script
│   └── equiprofile.service # Systemd service
├── scripts/             # Utility scripts
├── docs/                # Documentation
└── dist/                # Build output (generated)
    ├── public/          # Frontend static files
    └── index.js         # Backend server bundle
```

### Database Schema

EquiProfile uses MySQL with Drizzle ORM for type-safe database operations.

**Main Tables**:
- `users` - User accounts and authentication
- `horses` - Horse profiles and basic information
- `health_records` - Vaccinations, vet visits, medications
- `training_sessions` - Training logs and progress
- `feeding_schedules` - Nutrition plans and feeding times
- `breeding_records` - Heat cycles and breeding data
- `competitions` - Show entries and results
- `expenses` - Financial tracking
- `documents` - File metadata and storage
- `calendar_events` - Appointments and reminders
- `contacts` - Veterinarians, farriers, trainers

**Schema Management**:

### Tech Stack

**Frontend:**
- React 19 with TypeScript
- TailwindCSS 4 for styling
- Wouter for routing
- TanStack Query for state management
- tRPC for type-safe APIs
- Radix UI for accessible components
- Framer Motion for animations
- Chart.js / Recharts for visualizations

**Backend:**
- Node.js with Express
- TypeScript
- tRPC for API layer
- Drizzle ORM for database
- Zod for validation
- JWT for authentication
- Server-Sent Events (SSE) for real-time updates

**Database:**
- MySQL 8.0+ (production)
- SQLite (development)
- Drizzle ORM for migrations

**Infrastructure:**
- Nginx for reverse proxy and static file serving
- Systemd for process management
- Certbot for SSL certificates
- PM2 optional for advanced process management

**Integrations:**
- Stripe for payments
- AWS S3 for file storage
- OpenAI for AI features
- OpenWeatherMap for weather data
- Nodemailer for email
- OAuth providers (Google, Facebook)

### Project Structure

```
Equiprofile.online/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   │   ├── images/        # Image assets
│   │   └── videos/        # Video assets
│   └── src/
│       ├── _core/         # Core utilities
│       │   ├── hooks/     # React hooks
│       │   └── lib/       # Utility functions
│       ├── components/    # Reusable components
│       │   └── ui/        # UI component library
│       ├── contexts/      # React contexts
│       ├── pages/         # Page components
│       └── index.css      # Global styles
├── server/                # Backend application
│   ├── _core/            # Core server files
│   │   ├── index.ts      # Server entry point
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Express middleware
│   ├── db/               # Database
│   │   ├── schema.ts     # Drizzle schema
│   │   └── migrations/   # Database migrations
│   └── services/         # Business logic
├── shared/               # Shared code between client/server
│   └── types/           # TypeScript types
├── deployment/          # Deployment scripts and configs
│   ├── ubuntu24/        # Ubuntu 24.04 deployment
│   ├── nginx/           # Nginx configurations
│   └── deploy.sh        # Main deployment script
├── scripts/             # Utility scripts
├── .env.example         # Environment template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite build config
```

### Database Schema

Key tables:

- **users** - User accounts with RBAC
- **horses** - Horse profiles and information
- **health_records** - Medical history and vet visits
- **vaccinations** - Vaccination tracking
- **medications** - Medication schedules
- **training_sessions** - Training logs and progress
- **feeding_schedules** - Nutrition and feeding plans
- **appointments** - Calendar events
- **documents** - File storage metadata
- **breeding_records** - Breeding management
- **competitions** - Competition tracking
- **expenses** - Financial records
- **stables** - Multi-stable management
- **contacts** - Service provider contacts
- **notifications** - User notifications
- **audit_logs** - Security and compliance audits

### Real-time Updates (SSE)

EquiProfile uses Server-Sent Events for real-time synchronization:

**Why SSE?**
- Simpler than WebSockets
- Automatic reconnection
- Works through proxies and firewalls
- Lower overhead for one-way data flow
- Built-in browser support

**Architecture Components:**

1. **Server-Side Event Manager:**
   - Client connection management
   - Channel-based pub/sub system
   - Heartbeat every 30 seconds
   - Event history (last 50 events per channel)
   - Auto-cleanup on disconnect

2. **Client-Side Hooks:**
   - `useRealtime()` - Core connection and subscriptions
   - `useRealtimeModule()` - Module-specific event listening
   - `useOptimisticUpdate()` - Instant UI updates with sync

3. **Event Naming Convention:** `module:action:subtype`
   - Examples: `horses:created`, `health:appointment:updated`, `breeding:pregnancy:confirmed`

4. **Channel System:**
   - Global channel for system announcements
   - User channels (`user:{userId}`) for personal notifications
   - Module channels for grouped events

**Implementation Pattern:**
```typescript
// Server publishes event after CRUD operations
eventManager.publish('horses:created', {
  horseId: newHorse.id,
  name: newHorse.name
}, ['global', `user:${userId}`]);

// Client subscribes to module events
const { data } = useRealtimeModule('horses');

// Optimistic UI updates immediately
const mutation = useMutation({
  onMutate: async (newData) => {
    // Update UI immediately
    await queryClient.cancelQueries(['horses']);
    const previous = queryClient.getQueryData(['horses']);
    queryClient.setQueryData(['horses'], (old) => [...old, newData]);
    return { previous };
  },
  // Real-time sync happens automatically via SSE
});
```

**Fallback Strategy:**
- Polling if SSE not supported
- Connection lost warning
- Event history replay on reconnection
- Missed events recovery

**Monitoring:**
- `/api/realtime/stats` endpoint
- Browser DevTools inspection
- Server logs tracking
- Connection count monitoring

---

## Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Building
pnpm build            # Production build
pnpm build:safe       # Build with extra memory allocation
pnpm prebuild         # Clean before build
pnpm clean            # Remove dist folder

# Database
pnpm db:push          # Generate and run migrations

# Production
pnpm start            # Start production server

# Testing
pnpm test             # Run tests with Vitest
```

### Testing

EquiProfile uses Vitest for testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

**Test Coverage Goals:**
- 70%+ code coverage
- All critical paths tested
- Edge cases handled
- Error scenarios validated

### Contributing

We welcome contributions! Here's how to get started:

#### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/Equiprofile.online.git
cd Equiprofile.online
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev
```

#### Commit Message Guidelines

We follow Conventional Commits:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
# Push schema changes to database
npm run db:push

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

<a name="realtime-sse"></a>
### Real-time Updates (SSE)

EquiProfile supports Server-Sent Events (SSE) for real-time notifications:

- Health check reminders
- Upcoming appointments
- Training session alerts
- Weather updates
- System notifications

---

## Features Breakdown

<a name="core-modules"></a>
### Core Modules (20+)

<a name="health-vet"></a>
#### 1. Health & Vet Management

**Vaccinations**
- Track all vaccination records with automatic reminders
- Vaccination history timeline
- Veterinarian information
- Batch numbers and expiration dates
- Adverse reactions tracking
- Export vaccination certificates

**Veterinary Visits**
- Complete vet visit logging
- Diagnosis and treatment tracking
- Cost management
- Multiple vet profiles
- Visit history and emergency contacts

**Medications**
- Active medications list with dosage schedules
- Medication reminders and side effects monitoring
- Cost tracking and prescription management
- Inventory tracking with refill reminders

**Dental Care**
- Dental exam history
- Dentist information and procedure tracking
- Cost management
- Next appointment reminders

**Hoof Care**
- Farrier visit tracking and shoeing schedule
- Hoof condition monitoring
- Farrier contact management
- Cost tracking and photo uploads

**Deworming**
- Deworming schedule with product tracking
- Rotation planning
- Weight-based dosage calculations
- Next due date reminders

<a name="training"></a>
#### 2. Training & Performance

- **Training session planning** with custom programs
- **Progress tracking** with comprehensive metrics
- **Performance analytics** with data visualization
- **Training logs** with notes and video upload support
- **Goal setting and tracking**
- **Trainer assignments** and collaboration
- **Metrics tracked**: Duration, intensity, exercises, behavior, progress notes

<a name="nutrition"></a>
#### 3. Nutrition & Feeding

**Feeding Schedules**
- Custom feeding plans with meal scheduling
- Portion control and multiple feeds per day
- Special dietary requirements
- Cost tracking and inventory management

**Nutrition Logs**
- Daily feed tracking
- Weight monitoring
- Body condition scoring
- Supplement tracking
- Nutritional analysis

**Nutrition Plans**
- Custom diet plans with nutritionist recommendations
- Seasonal adjustments
- Performance-based nutrition
- Weight management programs

<a name="breeding"></a>
#### 4. Breeding Management

- **Mare heat cycle tracking**
- **Breeding records** with detailed logging
- **Pregnancy monitoring**
- **Foaling schedules**
- **Pedigree information**
- **Breeding analytics**

<a name="admin"></a>
#### 5. Administrative Tools

**Admin Panel** (accessible at `/admin`)
- System-wide control
- User management (add/remove users)
- Database operations
- System monitoring
- API key management
- Feature toggles
- Backup management
- Configuration management

**Financial Management**
- Expense tracking by category
- Budget management
- Cost per horse calculations
- Invoice generation
- Payment tracking
- Financial reports and exports

**Contacts Database**
- Comprehensive contact management
- Categories: Veterinarians, Farriers, Trainers, Dentists, Emergency contacts, Suppliers
- Quick dial/email functionality
- Communication history tracking

**Document Management**
- Secure document storage with cloud integration
- Multiple file formats (PDF, images, videos)
- Folder organization and search functionality
- Version control and sharing capabilities

**Calendar & Scheduling**
- Integrated calendar with all events
- Color-coded event types
- Multiple views (day, week, month)
- Recurring events and reminders
- iCal export and sync

**Reports & Analytics**
- Health summary reports
- Training progress reports
- Financial reports
- Vaccination schedules
- Custom reports with export to PDF/Excel
- Data visualization

#### 6. AI & Weather Features

**AI Chat Assistant** (requires OpenAI API key)
- Natural language interaction
- Horse care advice and data insights
- Training recommendations
- Health analysis and quick information lookup

**Weather Analysis** (requires Weather API key)
- Real-time weather data
- Riding condition recommendations
- Weather-based scheduling
- Temperature and humidity tracking
- Forecast integration with automated suggestions

#### 7. Payment & Subscriptions

**Stripe Integration** (requires Stripe API keys)
- Multiple subscription tiers (monthly/yearly)
- Secure payment processing
- Automatic billing
- Invoice generation
- Payment history
- Free trial (14 days)
- Custom enterprise plans

#### 8. Security & Privacy

- **Bank-level encryption** with secure data storage
- **Role-based access control** (Admin, Owner, Trainer, Viewer)
- **Audit logging** for all actions
- **Data privacy controls** with GDPR compliance
- **Regular backups** and data redundancy
- **JWT authentication** with bcrypt password hashing
- **Rate limiting** and HTTPS-only in production

---

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (Vite + Node.js)
npm run dev:client       # Start frontend only
npm run dev:server       # Start backend only

# Building
npm run build            # Build for production
npm run build:client     # Build frontend only
npm run build:server     # Build backend only

# Database
npm run db:push          # Push schema to database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode

# Code Quality
npm run check            # TypeScript type checking
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Production
npm start                # Start production server
npm run preview          # Preview production build
```

### Testing

EquiProfile uses Vitest for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Configuration files:
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration

---

## Troubleshooting

### Common Issues

<a name="nginx-issues"></a>
#### Nginx Configuration Issues

**Problem**: Nginx returns 502 Bad Gateway

**Solution**:
```bash
# Check if service is running
sudo systemctl status equiprofile

# Check backend health
curl http://127.0.0.1:3000/api/health

# Check nginx configuration
sudo nginx -t

# View nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
sudo systemctl restart equiprofile
sudo systemctl reload nginx
```

<a name="database-problems"></a>
#### Database Problems

**Problem**: Database connection fails

**Solution**:
```bash
# Verify MySQL is running
systemctl status mysql

# Test connection
mysql -u equiprofile -p -e "SELECT 1;"

# Check DATABASE_URL format
# mysql://username:password@localhost:3306/database_name

# Create database if missing
mysql -u root -p
CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
FLUSH PRIVILEGES;
```

<a name="build-errors"></a>
#### Build Errors

**Problem**: Build fails during `npm run build`

**Solution**:
```bash
# Check Node.js version (must be v20.x or higher)
node --version

# Clean and rebuild
rm -rf dist node_modules
npm ci
npm run build

# Check for memory issues
# If out of memory, increase swap:
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Check disk space
df -h

# Clean old packages
sudo apt-get autoremove
sudo apt-get clean
```

#### Service Won't Start

**Problem**: `systemctl start equiprofile` fails

**Solution**:
```bash
# Check logs
sudo journalctl -u equiprofile -n 50 --no-pager

# Verify .env file exists and is configured
ls -la /var/equiprofile/app/.env

# Check critical variables
grep JWT_SECRET /var/equiprofile/app/.env
grep DATABASE_URL /var/equiprofile/app/.env

# Check if port is in use
lsof -i :3000

# Try manual start for debugging
cd /var/equiprofile/app
sudo -u www-data node dist/index.js
```

#### SSL Certificate Issues

**Problem**: SSL certificate errors or HTTPS not working

**Solution**:
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew --dry-run  # Test
sudo certbot renew             # Actually renew

# Re-run certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Check nginx configuration
sudo nginx -t
grep ssl_certificate /etc/nginx/sites-available/equiprofile
```

#### Old UI Still Showing

**Problem**: Users see old design after deployment
feat(horses): add bulk import from CSV
fix(auth): resolve JWT expiration issue
docs: update API documentation
style(ui): improve button component styling
refactor(database): optimize query performance
test(health): add vaccination reminder tests
chore: update dependencies
```

#### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Commit with conventional commits
6. Push to your fork
7. Open a Pull Request

#### Code Review Checklist

- [ ] TypeScript compiles without errors
- [ ] Tests pass
- [ ] Linting passes (Prettier)
- [ ] Build succeeds
- [ ] Code reviewed by maintainers
- [ ] Test coverage maintained (70%+)
- [ ] Documentation updated (if needed)

### Code Style

#### TypeScript Standards

- **Strict mode enabled** - No implicit any
- **Proper types** - Avoid `any`, use proper interfaces/types
- **Type inference** - Let TypeScript infer when obvious
- **Null safety** - Handle null/undefined explicitly

#### React Best Practices

- **Functional components** - Use hooks, avoid class components
- **Small focused components** - Single responsibility principle
- **Props interface** - Define props types explicitly
- **Custom hooks** - Extract reusable logic
- **Memoization** - Use `useMemo`/`useCallback` for expensive operations

#### Backend Standards

- **tRPC routes** - Type-safe API endpoints
- **Zod validation** - Validate all inputs
- **Error handling** - Proper try/catch and error messages
- **Logging** - Use structured logging

#### Database Guidelines

- **Drizzle ORM** - Use query builder, avoid raw SQL
- **Migrations required** - All schema changes via migrations
- **Indexes** - Add indexes for frequently queried fields
- **Transactions** - Use for multi-table operations

#### File Organization

```
components/
  ├── ui/              # Reusable UI components
  ├── [Feature]/       # Feature-specific components
  └── layouts/         # Layout components

pages/
  └── [PageName].tsx   # Page components

hooks/
  └── use[HookName].ts # Custom hooks

lib/
  └── [utility].ts     # Utility functions

contexts/
  └── [Context]Context.tsx # React contexts
```

---

## Features Breakdown

### Core Modules

#### 1. User Management & Authentication

- Multi-user support with role-based access control (RBAC)
- Secure JWT authentication
- OAuth integration (Google, Facebook)
- Two-factor authentication (2FA)
- Password reset via email
- Session management
- Audit logging for security compliance

#### 2. Horse Profile Management

- Complete horse profiles with photos
- Pedigree tracking and visualization
- Document attachments
- Custom fields and tags
- Advanced search and filtering
- Bulk operations
- Data export (CSV, Excel, PDF)

### Health & Vet Management

#### 3. Health Records

- Comprehensive medical history
- Vet visit logs with notes
- Diagnosis and treatment tracking
- Medical imaging storage (X-rays, ultrasounds)
- Integration with vet contacts

#### 4. Vaccinations

- Vaccination schedule management
- Automated reminders
- Expiration tracking
- Batch administration logging
- Certificate storage

#### 5. Medications

- Medication tracking and schedules
- Dosage calculations
- Refill reminders
- Side effect logging
- Drug interaction warnings

#### 6. Dental Care

- Dental appointment scheduling
- Procedure history
- Issue tracking
- Cost management

#### 7. Hoof Care

- Farrier visit logs
- Shoeing schedules
- Hoof health monitoring
- Issue documentation with photos

#### 8. Deworming

- Deworming schedules
- Product tracking
- Rotation planning
- Effectiveness monitoring

### Training & Performance

#### 9. Training Management

- Session planning and scheduling
- Detailed progress tracking
- Performance metrics and analytics
- Video upload and review
- Training templates
- Goal setting and tracking

#### 10. Competition Management

- Event scheduling
- Results tracking
- Performance records
- Achievement badges
- Cost tracking

### Nutrition & Feeding

#### 11. Feeding & Nutrition

- Custom feeding schedules
- Meal planning
- Weight monitoring
- Body condition scoring
- Supplement tracking
- Cost analysis
- Nutritional recommendations

### Breeding Management

#### 12. Breeding Records

- Heat cycle tracking
- Breeding date logging
- Pregnancy monitoring
- Foaling schedule
- Genetics tracking
- Offspring management

### Administrative Tools

#### 13. Calendar & Scheduling

- Integrated calendar view
- Appointment scheduling
- Automated reminders
- Conflict detection
- iCal export/import
- Recurring events

#### 14. Document Management

- Secure file storage (AWS S3)
- Support for PDFs, images, videos
- OCR for searchability
- Version control
- Sharing and permissions
- Bulk upload

#### 15. AI-Powered Features

- Intelligent chat assistant
- Weather-based riding recommendations
- Predictive health alerts
- Automated report generation
- Natural language queries

#### 16. Financial Management

- Expense tracking
- Budget management
- Invoice generation
- Payment tracking
- Financial reports and analytics
- Multi-currency support

#### 17. Stable Management

- Multiple stable/facility support
- Stall assignments
- Staff scheduling
- Inventory management
- Equipment tracking

#### 18. Contacts Management

- Centralized contact database
- Category organization (vets, farriers, trainers)
- Emergency contacts
- Communication history
- Service ratings and notes

#### 19. Reports & Analytics

- Comprehensive reporting dashboard
- Customizable reports
- Data visualizations (charts, graphs)
- Export to PDF, Excel, CSV
- Scheduled report delivery
- Analytics and insights

#### 20. Notifications & Reminders

- Smart notification system
- Email and in-app alerts
- Customizable reminder schedules
- Priority-based notifications
- Notification preferences

---

## Troubleshooting

### Common Issues

#### Quick Diagnostics Commands

**Solution**:
```bash
# 1. Clear service worker (if PWA was previously enabled)
# In browser DevTools (F12):
# Application → Service Workers → Unregister
# Application → Clear Storage → Clear site data
# Hard refresh: Ctrl+Shift+R

# 2. Verify cache headers
curl -I https://yourdomain.com/
# Should show: Cache-Control: no-store, no-cache, must-revalidate

# 3. Check build version
curl https://yourdomain.com/ | grep "assets/index-"
# Should show hashed assets like: /assets/index-abc123.js
```

### Recovery Procedures

#### Emergency Rollback

If deployment fails or causes issues:

```bash
# 1. Find previous good commit
cd /var/equiprofile/app
git log --oneline -10

# 2. Reset to previous commit
sudo git reset --hard <commit-sha>

# 3. Rebuild
sudo rm -rf dist
sudo npm ci
sudo npm run build

# 4. Restart
sudo systemctl restart equiprofile

# 5. Verify
curl http://127.0.0.1:3000/api/health
```

#### Restore Configuration Files

```bash
# Restore nginx config from repo
sudo cp /var/equiprofile/app/deployment/nginx/equiprofile.conf \
  /etc/nginx/sites-available/equiprofile
sudo nginx -t && sudo systemctl reload nginx

# Restore systemd service from repo
sudo cp /var/equiprofile/app/deployment/equiprofile.service \
  /etc/systemd/system/equiprofile.service
sudo systemctl daemon-reload
sudo systemctl restart equiprofile
```

#### Nuclear Option - Full Redeployment

```bash
# 1. Backup .env file
sudo cp /var/equiprofile/app/.env /tmp/.env.backup

# 2. Stop services
sudo systemctl stop equiprofile

# 3. Remove app directory
sudo rm -rf /var/equiprofile/app

# 4. Clone fresh
cd /var/equiprofile
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app

# 5. Restore .env
sudo cp /tmp/.env.backup .env

# 6. Run full deployment
sudo bash deployment/deploy.sh --domain yourdomain.com

# 7. Verify
bash scripts/smoke_prod.sh https://yourdomain.com
```

### Diagnostic Commands

```bash
# Check service status
systemctl status equiprofile

# View recent logs
journalctl -u equiprofile -n 100 --no-pager

# Follow logs in real-time
journalctl -u equiprofile -f

# Check nginx logs
tail -f /var/log/nginx/equiprofile-error.log
tail -f /var/log/nginx/equiprofile-access.log

# Test health endpoint
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3000/api/health/ping

# Check version/build info
curl http://127.0.0.1:3000/api/version

# Check listening ports
ss -tlnp | grep -E ':(80|443|3000)'

# Check disk space
df -h

# Check memory
free -h

# View deployment logs
ls -lt /var/equiprofile/_ops/deploy_*.log | head -1
```

---

## Maintenance

<a name="updates"></a>
### Updates & Upgrades

#### Update Application
# Check application status
systemctl status equiprofile

# Check Nginx status
systemctl status nginx

# Test application health
curl -s http://127.0.0.1:3000/api/health

# View application logs
journalctl -u equiprofile -n 50 --no-pager

# View Nginx error logs
tail -50 /var/log/nginx/error.log
```

### Recovery Procedures

#### 1. Application Won't Start

**Symptoms**: Service fails to start or immediately crashes

**Diagnosis:**
```bash
# Check service logs
journalctl -u equiprofile -n 100 --no-pager

# Check if .env exists
ls -la /var/equiprofile/app/.env

# Test database connection
mysql -u equiprofile -p -h localhost equiprofile

# Check if port 3000 is available
sudo lsof -i :3000
```

**Solutions:**
- Verify `.env` file exists and has correct values
- Test MySQL connection manually
- Kill any process using port 3000
- Rebuild application: `cd /var/equiprofile/app && pnpm build`
- Check Node.js version: `node --version` (should be 20.x+)

#### 2. 502 Bad Gateway

**Symptoms**: Nginx returns 502 error

**Diagnosis:**
```bash
# Verify application is running
systemctl status equiprofile

# Test health endpoint directly
curl http://127.0.0.1:3000/api/health

# Check Nginx proxy configuration
sudo nginx -t
```

**Solutions:**
```bash
# Start application if not running
sudo systemctl start equiprofile

# Reload Nginx configuration
sudo systemctl reload nginx

# Check Nginx logs for details
tail -100 /var/log/nginx/error.log

# Verify proxy_pass is correct (should be http://127.0.0.1:3000)
cat /etc/nginx/sites-available/equiprofile | grep proxy_pass
```

#### 3. Deployment Failed Mid-way

**Symptoms**: Deployment script errors or incomplete deployment

**Diagnosis:**
```bash
# Check deployment logs
cat /var/equiprofile/app/deployment.log

# Check build output
ls -la /var/equiprofile/app/dist/
```

**Solutions:**
```bash
# Clean and rebuild
cd /var/equiprofile/app
pnpm clean
pnpm build

# Restart service
sudo systemctl restart equiprofile

# Verify Nginx configuration
sudo nginx -t
sudo systemctl reload nginx

# Re-run deployment script if needed
sudo bash deployment/deploy.sh --domain your-domain.com
```

#### 4. Users Seeing Old Version

**Symptoms**: Cached old version after deployment

**Diagnosis:**
```bash
# Check if PWA is properly blocked
curl -I https://equiprofile.online/service-worker.js
# Should return 404

curl -I https://equiprofile.online/manifest.json
# Should return 404

# Check cache headers
curl -I https://equiprofile.online/index.html
# Should have Cache-Control: no-cache
```

**Solutions:**
```bash
cd /var/equiprofile/app

# Pull latest changes
sudo git pull origin main

# Install dependencies
sudo npm ci

# Rebuild
sudo npm run build

# Restart service
sudo systemctl restart equiprofile

# Verify
bash scripts/smoke_prod.sh https://yourdomain.com
```

#### Update System Packages

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Update Node.js dependencies
cd /var/equiprofile/app
npm update
npm audit
# Verify Nginx configuration blocks PWA files
sudo cat /etc/nginx/sites-available/equiprofile | grep -A2 "service-worker"

# Reload Nginx
sudo systemctl reload nginx

# Clear browser cache
# Instruct users: Ctrl+Shift+Delete → Clear cache → Hard reload (Ctrl+Shift+R)
```

#### 5. Database Connection Lost

**Symptoms**: Application can't connect to database

**Diagnosis:**
```bash
# Check if MySQL is running
systemctl status mysql

# Test connection
mysql -u equiprofile -p -h localhost equiprofile

# Check DATABASE_URL in .env
cat /var/equiprofile/app/.env | grep DATABASE_URL
```

**Solutions:**
```bash
# Start MySQL if not running
sudo systemctl start mysql

# Verify credentials match .env
# Format: mysql://username:password@host:port/database

# Rebuild after updates
sudo npm run build
sudo systemctl restart equiprofile
```

<a name="backups"></a>
### Backup Procedures

#### Database Backup

**For MySQL**:
```bash
# Manual backup
mysqldump -u equiprofile -p equiprofile > backup-$(date +%Y%m%d).sql

# Restore
mysql -u equiprofile -p equiprofile < backup-20260109.sql
```

**For SQLite**:
```bash
# Backup
cp /var/equiprofile/app/data/equiprofile.db backup-$(date +%Y%m%d).db

# Restore
cp backup-20260109.db /var/equiprofile/app/data/equiprofile.db
sudo systemctl restart equiprofile
```

#### Automated Backup Script

```bash
# Create backup script
cat > /usr/local/bin/backup-equiprofile << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/equiprofile"
DATE=$(date +%Y%m%d-%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u equiprofile -p'password' equiprofile > $BACKUP_DIR/db-$DATE.sql
gzip $BACKUP_DIR/db-$DATE.sql

# Backup environment file
cp /var/equiprofile/app/.env $BACKUP_DIR/.env-$DATE

# Backup uploads (if any)
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz /var/equiprofile/app/uploads 2>/dev/null

# Keep last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup-equiprofile

# Schedule daily backup at 2 AM
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-equiprofile
```

<a name="monitoring"></a>
### Monitoring

#### Application Monitoring

```bash
# Check application health
watch -n 5 'curl -s http://127.0.0.1:3000/api/health | jq'

# Monitor resource usage
htop

# Check service uptime
systemctl status equiprofile | grep Active
### Nginx Configuration Issues

#### SSL Certificate Problems

```bash
# Check certificate expiration
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

#### Configuration Syntax Errors

```bash
# Test Nginx configuration
sudo nginx -t

# If errors, check syntax in config file
sudo nano /etc/nginx/sites-available/equiprofile

# Reload after fixing
sudo systemctl reload nginx
```

### Database Problems

#### Database Won't Start

```bash
# Check MySQL status
systemctl status mysql

# View MySQL logs
sudo tail -100 /var/log/mysql/error.log

# Start MySQL
sudo systemctl start mysql
```

#### Migration Errors

```bash
# Check current schema
cd /var/equiprofile/app
pnpm drizzle-kit introspect

# Generate new migration
pnpm db:push

# Manual migration (if needed)
mysql -u equiprofile -p equiprofile < drizzle/migrations/xxxx.sql
```

### Build Errors

#### Out of Memory During Build

```bash
# Use safe build command
pnpm build:safe

# Or increase memory manually
NODE_OPTIONS='--max_old_space_size=4096' pnpm build
```

#### Log Monitoring

```bash
# View recent logs
journalctl -u equiprofile -n 100

# Follow logs in real-time
journalctl -u equiprofile -f

# View nginx access logs
tail -f /var/log/nginx/equiprofile-access.log

# View nginx error logs
tail -f /var/log/nginx/equiprofile-error.log

# Search for errors
journalctl -u equiprofile | grep -i error
```

#### Resource Monitoring

```bash
# Check disk usage
df -h

# Check memory usage
free -m

# Check CPU usage
top

# Check network connections
ss -tuln | grep :3000
```

### Log Rotation

Logs are automatically rotated at `/etc/logrotate.d/equiprofile`:

- Rotated daily
- Keep 14 days of logs
- Compressed after rotation
- Reload service after rotation

**Manual log rotation**:

```bash
# Test rotation
sudo logrotate -d /etc/logrotate.d/equiprofile

# Force rotation
sudo logrotate -f /etc/logrotate.d/equiprofile
```

### Performance Tuning

For high-traffic deployments:

**1. Increase worker processes in nginx**:
```nginx
# /etc/nginx/nginx.conf
worker_processes auto;
worker_connections 1024;
```

**2. Enable connection pooling for MySQL**:
```env
# .env
DATABASE_POOL_SIZE=10
```
# Check for type errors
pnpm check

# View detailed errors
pnpm tsc --noEmit

# Clean and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install --frozen-lockfile
```

### Emergency Rollback

If all else fails, rollback to a previous version:

```bash
# Option 1: Rollback via git
cd /var/equiprofile/app
git log --oneline -10  # Find last working commit
git reset --hard <commit-hash>
pnpm install --frozen-lockfile
pnpm build
sudo systemctl restart equiprofile

# Option 2: Switch to stable branch
git checkout main
git pull origin main
pnpm install --frozen-lockfile
pnpm build
sudo systemctl restart equiprofile

# Option 3: Full fresh clone (nuclear option)
cd /var/equiprofile
sudo mv app app.backup
sudo git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git app
cd app
sudo cp ../app.backup/.env .env  # Restore environment
pnpm install --frozen-lockfile
pnpm build
sudo systemctl restart equiprofile
```

---

## Maintenance

### Updates & Upgrades

#### Application Updates

```bash
# Pull latest changes
cd /var/equiprofile/app
git pull origin main

# Install dependencies
pnpm install --frozen-lockfile

# Run database migrations
pnpm db:push

# Build
pnpm build

# Restart service
sudo systemctl restart equiprofile

# Verify
curl https://equiprofile.online/api/health
```

#### System Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js (if needed)
# Check current version
node --version

# Update to latest LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update pnpm
npm install -g pnpm@latest
```

### Backup Procedures

#### Database Backup

**3. Increase Node.js memory**:
```bash
# Edit /etc/systemd/system/equiprofile.service
Environment="NODE_OPTIONS=--max_old_space_size=4096"

sudo systemctl daemon-reload
sudo systemctl restart equiprofile
```

---

## Contributing

We welcome contributions to EquiProfile! Here's how you can help:

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/Equiprofile.online.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run tests: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits focused and atomic
- Write clear commit messages

### Code Review Process

1. All submissions require review
2. Changes should pass all tests
3. Code should follow style guidelines
4. Documentation should be updated

---

## License

MIT License

Copyright (c) 2026 Amarktai Network

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Support

### Documentation

- **Quick Start Guide**: See above or QUICK_START.md
- **Deployment Guide**: See DEPLOYMENT.md
- **API Keys Setup**: See API_KEYS_GUIDE.md
- **Features Documentation**: See FEATURES_BREAKDOWN.md
- **Recovery Guide**: See RECOVERY.md
- **Ubuntu 24.04 Guide**: See deployment/ubuntu24/README.md

### Getting Help

- **GitHub Issues**: https://github.com/amarktainetwork-blip/Equiprofile.online/issues
- **Email**: support@equiprofile.online
- **Website**: https://equiprofile.online
- **Part of**: [Amarktai Network](https://www.amarktai.com)

### Security

For security issues, please email: security@equiprofile.online

Do not open public issues for security vulnerabilities.

### Useful Commands

```bash
# Service management
sudo systemctl start|stop|restart|status equiprofile

# View logs
sudo journalctl -u equiprofile -f

# Nginx
sudo nginx -t
sudo systemctl reload nginx

# Database
mysql -u equiprofile -p equiprofile  # MySQL
sqlite3 /var/equiprofile/app/data/equiprofile.db  # SQLite

# Health checks
curl http://127.0.0.1:3000/api/health
bash scripts/smoke_prod.sh https://yourdomain.com
```

---

## Next Steps

After successful deployment:
# Create backup directory
sudo mkdir -p /var/backups/equiprofile

# Backup database
mysqldump -u equiprofile -p equiprofile > /var/backups/equiprofile/db-$(date +%Y%m%d-%H%M%S).sql

# Automated daily backup (cron)
sudo crontab -e
# Add line:
# 0 2 * * * mysqldump -u equiprofile -pYOUR_PASSWORD equiprofile > /var/backups/equiprofile/db-$(date +\%Y\%m\%d).sql
```

#### File Backup

```bash
# Backup uploaded files (if using local storage)
sudo tar -czf /var/backups/equiprofile/uploads-$(date +%Y%m%d).tar.gz /var/equiprofile/app/uploads/

# Backup .env file
sudo cp /var/equiprofile/app/.env /var/backups/equiprofile/.env.backup
```

#### Restore from Backup

```bash
# Restore database
mysql -u equiprofile -p equiprofile < /var/backups/equiprofile/db-YYYYMMDD.sql

# Restore files
sudo tar -xzf /var/backups/equiprofile/uploads-YYYYMMDD.tar.gz -C /
```

### Monitoring

#### Health Checks

```bash
# Application health
curl https://equiprofile.online/api/health

# Should return:
# {"status":"ok","timestamp":"...","uptime":...}

# Real-time stats
curl https://equiprofile.online/api/realtime/stats
```

#### Service Monitoring

```bash
# Service status
systemctl status equiprofile

# Logs (follow mode)
journalctl -u equiprofile -f

# Recent errors
journalctl -u equiprofile -p err -n 50

# Nginx access logs
tail -f /var/log/nginx/equiprofile-access.log

# Nginx error logs
tail -f /var/log/nginx/equiprofile-error.log
```

#### Resource Monitoring

```bash
# CPU and memory usage
top
# Or better:
htop

# Disk usage
df -h

# Application memory usage
ps aux | grep node

# Database size
mysql -u equiprofile -p -e "SELECT table_schema 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 'Size (MB)' FROM information_schema.tables WHERE table_schema = 'equiprofile' GROUP BY table_schema;"
```

#### Automated Monitoring

Set up monitoring with systemd timers or cron:

```bash
# Create monitoring script
sudo nano /usr/local/bin/equiprofile-monitor.sh
```

```bash
#!/bin/bash
# EquiProfile Health Monitor

HEALTH_URL="http://127.0.0.1:3000/api/health"
ALERT_EMAIL="admin@equiprofile.online"

# Check health endpoint
if ! curl -sf "$HEALTH_URL" > /dev/null; then
    echo "EquiProfile health check failed!" | mail -s "ALERT: EquiProfile Down" "$ALERT_EMAIL"
    systemctl restart equiprofile
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "Disk usage is ${DISK_USAGE}%" | mail -s "ALERT: High Disk Usage" "$ALERT_EMAIL"
fi
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/equiprofile-monitor.sh

# Add to cron (run every 5 minutes)
sudo crontab -e
# Add line:
# */5 * * * * /usr/local/bin/equiprofile-monitor.sh
```

### Performance Optimization

#### Database Optimization

```bash
# Analyze and optimize tables
mysql -u equiprofile -p equiprofile -e "OPTIMIZE TABLE users, horses, health_records, training_sessions, feeding_schedules;"

# Check slow queries
mysql -u equiprofile -p -e "SHOW VARIABLES LIKE 'slow_query_log';"
mysql -u equiprofile -p -e "SET GLOBAL slow_query_log = 'ON';"
mysql -u equiprofile -p -e "SET GLOBAL long_query_time = 2;"

# View slow query log
sudo tail -f /var/log/mysql/slow-query.log
```

#### Application Performance

```bash
# Monitor Node.js performance
# Install clinic
npm install -g clinic

# Profile application
clinic doctor -- node dist/index.js

# Analyze memory usage
node --inspect dist/index.js
# Connect Chrome DevTools to node://inspect
```

#### Nginx Caching

Add to Nginx configuration for better performance:

```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

# Browser caching for static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

---

## License

MIT License - see [LICENSE](LICENSE) file for details

Copyright © 2026 Amarktai Network

1. ✅ Create admin account at `https://yourdomain.com/register`
2. ✅ Access admin panel at `https://yourdomain.com/admin` with ADMIN_UNLOCK_PASSWORD
3. ✅ Configure API keys for optional features
4. ✅ Set up database backups
5. ✅ Configure email notifications (optional)
6. ✅ Enable billing if needed (ENABLE_STRIPE=true)
7. ✅ Customize branding with `/theme-override.css`
8. ✅ Set up monitoring and alerts
9. ✅ Review security checklist

---

**Congratulations! Your EquiProfile instance is ready!** 🎉

**Status**: Production-Ready  
**Version**: 1.0.0  
**Last Updated**: February 2026  
**Part of**: [Amarktai Network](https://www.amarktai.com)  
**License**: MIT

---

_EquiProfile - Professional Horse Management Made Simple_
## Support

### Getting Help

- **Documentation**: This README and docs folder
- **Issues**: [GitHub Issues](https://github.com/amarktainetwork-blip/Equiprofile.online/issues)
- **Discussions**: [GitHub Discussions](https://github.com/amarktainetwork-blip/Equiprofile.online/discussions)

### Commercial Support

For commercial support, custom development, or enterprise deployments:
- Email: support@amarktai.network
- Website: https://amarktai.network

### Contributing

We welcome contributions! See the [Contributing](#contributing) section for guidelines.

---

## Changelog

### Version 2.0.0 (January 7, 2026)

#### Added
- Ubuntu 24.04 deployment system with automated setup
- Health check endpoints (`/api/health`)
- PWA disable control via Nginx (production ready)
- Safe environment configuration system
- Feature flags system with admin controls
- Real-time updates via Server-Sent Events (SSE)
- AI-powered chat assistant
- Weather-based riding recommendations
- Advanced breeding management
- Financial tracking and reporting
- Multi-stable support

#### Changed
- Migrated to pnpm for package management
- Improved build process with memory optimization
- Enhanced security with proper environment variable handling
- Updated to React 19
- Upgraded to TailwindCSS 4
- Improved TypeScript strict mode compliance

#### Fixed
- JWT expiration handling
- File upload security
- Nginx caching issues
- Database connection pooling
- Memory leaks in long-running processes

#### Security
- Implemented proper RBAC
- Added audit logging
- Enhanced password security
- Added rate limiting
- Improved CSRF protection

### Version 1.0.0 (Initial Release)

- Core horse management features
- Health records and vaccinations
- Training management
- Feeding schedules
- Calendar and appointments
- Document storage
- User authentication
- Multi-user support

---

**Built with ❤️ by [Amarktai Network](https://amarktai.network)**

**Production Ready** | **TypeScript** | **Modern Stack** | **Open Source**
