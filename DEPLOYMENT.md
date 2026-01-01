# EquiProfile Deployment Guide

## Quick Deployment Checklist

### Prerequisites
- [ ] Node.js 22+ installed
- [ ] MySQL 8.0+ database set up  
- [ ] Domain name configured
- [ ] SSL certificate (Let's Encrypt via Certbot)
- [ ] Server with minimum 2GB RAM

### Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/equiprofile

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_YEARLY_PRICE_ID=price_xxxxx

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=equiprofile-production
AWS_REGION=us-east-1

# OpenAI (for AI features)
OPENAI_API_KEY=sk-xxxxx

# Application
NODE_ENV=production
PORT=3000
OWNER_OPEN_ID=your-admin-openid

# Optional
REDIS_URL=redis://localhost:6379
```

### Client Environment Variables

Create `client/.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_ENV=production
```

## Installation Steps

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Run migrations
npm run db:push
```

### 3. Build Application

```bash
npm run build
```

This creates:
- `dist/client/` - Frontend static files
- `dist/index.js` - Backend server bundle

### 4. Start Production Server

```bash
# Using PM2 (recommended)
npm install -g pm2
pm2 start dist/index.js --name equiprofile
pm2 save
pm2 startup

# Or directly
NODE_ENV=production node dist/index.js
```

## Complete Feature Implementation

This deployment includes ALL features from the 2026-2027 roadmap:

✅ **Q1 2026 - UI Modernization**
- Dark/light/system theme support
- Multi-language support (EN, FR, DE, ES)
- Enhanced dashboard with quick actions and activity feed
- Accessibility improvements (WCAG 2.1 AA)
- PWA support with service worker

✅ **Q2 2026 - Collaboration**
- Complete stable management system
- Team invitation and role-based permissions
- In-app messaging with real-time capabilities
- Shared calendar with event management
- Activity feed for stable-wide updates

✅ **Q3 2026 - Enhanced Features**
- Competition results tracking
- Medical passport with QR codes and PDF export
- Training program templates
- Automated report generation
- CSV export/import for all data

✅ **Q4 2026 - Mobile Preparation**
- PWA manifest and service worker
- Offline support capabilities
- Touch-optimized interface
- Comprehensive API endpoints

✅ **2027 - Advanced Features**
- Breeding management module
- Analytics dashboard
- API key management for integrations
- Webhook support

## API Documentation

### Available Endpoints

All endpoints are type-safe via tRPC. Key routers:

- `/api/stables.*` - Stable management
- `/api/messages.*` - In-app messaging
- `/api/calendar.*` - Event management
- `/api/analytics.*` - Data analytics
- `/api/reports.*` - Report generation
- `/api/competitions.*` - Competition tracking
- `/api/trainingPrograms.*` - Training templates
- `/api/breeding.*` - Breeding records

## Deployment Verification

After deployment, verify these features work:

```bash
# 1. Health check
curl https://equiprofile.online/api/system/health

# 2. Check PWA manifest
curl https://equiprofile.online/manifest.json

# 3. Verify service worker
curl https://equiprofile.online/service-worker.js

# 4. Test database connection
npm run db:push
```

## Performance & Security

### Performance Features
- Code splitting and lazy loading
- Image optimization
- Database indexing
- Response caching
- Gzip compression

### Security Features
- JWT authentication
- Rate limiting
- Input validation (Zod schemas)
- SQL injection prevention
- XSS protection
- HTTPS enforcement
- Secure cookie handling
- CORS protection

## Monitoring

```bash
# View application logs
pm2 logs equiprofile

# Monitor resources
pm2 monit

# Check application status
pm2 status
```

## Backup & Recovery

Automated daily backups at 2 AM:

```bash
# Manual backup
mysqldump -u root -p equiprofile > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u root -p equiprofile < backup_20260101.sql
```

## Support

- Documentation: https://docs.equiprofile.online
- Email: support@equiprofile.online
- GitHub: https://github.com/amarktainetwork-blip/Equiprofile.online

---

**Status:** Production Ready ✅
**Version:** 1.0.0
**Last Updated:** 2026-01-01
