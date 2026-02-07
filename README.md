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
  - [Performance Optimization](#performance)
- [License](#license)
- [Support](#support)
- [Changelog](#changelog)

---

## Overview

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
- **pnpm** 10.x or higher

  ```bash
  # Install pnpm globally
  npm install -g pnpm

  # Or using corepack (recommended)
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

#### Database (Choose One)

- **SQLite** (default, no setup required) - Good for development
- **MySQL 8.0+** (recommended for production)

  ```bash
  # Ubuntu/Debian
  sudo apt-get install mysql-server

  # Create database
  mysql -u root -p -e "CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  ```

### Local Development

Get EquiProfile running locally in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git
cd Equiprofile.online

# 2. Install dependencies with frozen lockfile
pnpm install --frozen-lockfile

# 3. Copy environment configuration
cp .env.example .env

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

```bash
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

# Restart application
sudo systemctl restart equiprofile
```

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

#### TypeScript Errors

```bash
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

```bash
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

---

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
