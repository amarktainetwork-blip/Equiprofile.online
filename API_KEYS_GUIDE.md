# EquiProfile System - Complete API Keys & Configuration Guide

## 🔑 Required API Keys for Full System Functionality

This document lists all API keys and configuration settings required to make EquiProfile 100% functional with all features working in real-time.

---

## 1. Core System (Always Required)

### Database Configuration

```env
DATABASE_URL=mysql://username:password@host:port/database
```

**Purpose**: Primary database connection for storing all application data
**Where to get it**: Configure your MySQL/MariaDB database server
**Cost**: Free (self-hosted) or varies by cloud provider

### JWT Secret

```env
JWT_SECRET=your_jwt_secret_here_minimum_32_characters
```

**Purpose**: Secure authentication tokens
**How to generate**:

```bash
openssl rand -base64 32
```

**Cost**: Free

### Admin Password

```env
ADMIN_UNLOCK_PASSWORD=your_secure_admin_password
```

**Purpose**: Access to hidden admin panel that controls the entire site
**Important**: MUST be changed from default in production
**Cost**: Free

---

## 2. Payment Processing (Stripe)

### Stripe API Keys

```env
ENABLE_STRIPE=true
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Purpose**: Real-time payment processing for subscriptions
**Where to get it**: https://dashboard.stripe.com/apikeys
**Setup Steps**:

1. Create Stripe account at https://stripe.com
2. Navigate to Developers → API keys
3. Copy both Publishable and Secret keys
4. Set up webhook endpoint for subscription events
5. Copy webhook signing secret

**Cost**: Free to start, 2.9% + $0.30 per transaction

### Stripe Price IDs

```env
STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_YEARLY_PRICE_ID=price_xxxxxxxxxxxxx
```

**Purpose**: Define subscription pricing tiers
**Setup Steps**:

1. Go to https://dashboard.stripe.com/products
2. Create product "EquiProfile"
3. Add monthly and yearly price options
4. Copy the price IDs

---

## 3. AI Features (OpenAI)

### OpenAI API Key

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

---

## 4. Weather Integration

### Weather API Key

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

---

## 5. Document Storage & Uploads

### Option A: AWS S3 (Recommended)

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

### Option B: Built-in Forge Storage API

```env
ENABLE_UPLOADS=true
BUILT_IN_FORGE_API_URL=https://your-forge-api.com
BUILT_IN_FORGE_API_KEY=your_forge_api_key
```

**Purpose**: Alternative storage solution
**Where to get it**: Configure your Forge API instance

---

## 6. Email Notifications (SMTP)

### Email Configuration

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

**Where to get it**: Any SMTP email provider
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

---

## 7. OAuth (Optional)

### OAuth Configuration

```env
OAUTH_SERVER_URL=https://your-oauth-server.com
VITE_APP_ID=your_app_id
OWNER_OPEN_ID=owner_openid
```

**Purpose**: Alternative authentication method
**Where to get it**: Your OAuth provider
**Cost**: Depends on provider

---

## 8. Additional Configuration

### Rate Limiting

```env
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Purpose**: Protect against abuse
**Cost**: Free

### Logging

```env
LOG_LEVEL=info
LOG_FILE_PATH=/var/log/equiprofile/app.log
```

**Purpose**: Application monitoring and debugging
**Cost**: Free

### Cookie Security

```env
COOKIE_DOMAIN=equiprofile.online
COOKIE_SECURE=true
```

**Purpose**: Secure session management
**Cost**: Free

### PWA (Progressive Web App)

```env
ENABLE_PWA=true
VITE_PWA_ENABLED=true
```

**Purpose**: Offline support and mobile app features
**Cost**: Free

---

## 📋 Complete Setup Checklist

### Essential (Must Have)

- [ ] Database configured (DATABASE_URL)
- [ ] JWT secret generated (JWT_SECRET)
- [ ] Admin password set (ADMIN_UNLOCK_PASSWORD)

### For Full Functionality

- [ ] Stripe keys configured for payments
- [ ] OpenAI API key for AI features
- [ ] Weather API key for weather analysis
- [ ] S3 or storage API for document uploads
- [ ] SMTP credentials for email notifications

### Optional

- [ ] OAuth configured
- [ ] PWA enabled
- [ ] Logging configured

---

## 🚀 Quick Start with All Features

### Minimal Configuration (Basic Functionality)

```env
NODE_ENV=production
PORT=3000
BASE_URL=https://equiprofile.online
DATABASE_URL=mysql://user:pass@localhost:3306/equiprofile
JWT_SECRET=<generate_with_openssl>
ADMIN_UNLOCK_PASSWORD=<secure_password>
```

### Full Configuration (All Features)

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

# PWA
ENABLE_PWA=true
VITE_PWA_ENABLED=true
```

---

## 💰 Estimated Monthly Costs

### Minimal Setup (Basic Features)

- Database (self-hosted): $0
- Basic server: $5-10/month
- **Total: $5-10/month**

### Full Setup (All Features)

- Database: $0-20/month
- Server: $10-50/month
- Stripe: Pay-per-transaction (2.9% + $0.30)
- OpenAI API: $10-50/month (usage-based)
- Weather API: $0-40/month
- AWS S3: $5-20/month
- Email (SendGrid): $0-15/month
- **Total: $25-195/month** (plus transaction fees)

---

## 🔒 Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables for all secrets**
3. **Rotate API keys regularly**
4. **Use production keys only in production**
5. **Enable rate limiting**
6. **Use HTTPS in production**
7. **Set strong admin password**
8. **Monitor API usage and costs**
9. **Enable 2FA on all service accounts**
10. **Regularly review access logs**

---

## 📞 Support

For help setting up API keys or configuring services:

- **Documentation**: See DEPLOYMENT.md
- **Email**: support@equiprofile.online
- **Issues**: https://github.com/amarktainetwork-blip/Equiprofile.online/issues

---

## 📝 Notes

- All API keys listed here are examples and must be replaced with real keys
- Some features will gracefully degrade if API keys are not configured
- The admin panel is accessible at `/admin` after unlocking with ADMIN_UNLOCK_PASSWORD
- Test all integrations in development before deploying to production
- Keep this document updated as new integrations are added

---

**Last Updated**: February 2026
**Version**: 1.0.0
