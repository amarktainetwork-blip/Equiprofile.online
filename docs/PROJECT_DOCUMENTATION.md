# EquiProfile — Project Documentation

**Single source of truth for architecture, APIs, deployment, testing, and operations.**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Frontend Structure](#3-frontend-structure)
4. [Backend Structure](#4-backend-structure)
5. [Database Models](#5-database-models)
6. [API Routes](#6-api-routes)
7. [Environment Variables](#7-environment-variables)
8. [Feature Flags](#8-feature-flags)
9. [Deployment Instructions](#9-deployment-instructions)
10. [Testing Instructions](#10-testing-instructions)
11. [Troubleshooting](#11-troubleshooting)
12. [Security](#12-security)
13. [Performance Optimization](#13-performance-optimization)

---

## 1. Project Overview

EquiProfile is a comprehensive, production-grade web application for equestrian professionals. It enables horse owners, trainers, and stable managers to track horses' health records, training schedules, feeding plans, appointments, breeding, finances, and more — all from a single, mobile-first dashboard.

**Tech Stack:**
- **Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js + Express + tRPC
- **Database**: MySQL 8 via Drizzle ORM
- **Auth**: JWT (local email/password) + OAuth support
- **Payments**: Stripe (optional, feature-flagged)
- **File Uploads**: AWS S3 (optional, feature-flagged)
- **AI**: OpenAI GPT (optional)
- **Email**: SMTP (optional)

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Nginx (Reverse Proxy)                    │
│              SSL termination + static asset CDN              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │   Node.js / Express  │  :3000
                │                      │
                │  ┌────────────────┐  │
                │  │  tRPC Router   │  │  /api/trpc
                │  └────────────────┘  │
                │  ┌────────────────┐  │
                │  │  REST Routes   │  │  /api/auth, /api/webhooks
                │  └────────────────┘  │
                │  ┌────────────────┐  │
                │  │  SSE Events    │  │  /api/realtime/events
                │  └────────────────┘  │
                │  ┌────────────────┐  │
                │  │  Static Files  │  │  /assets, SPA fallback
                │  └────────────────┘  │
                └──────────┬──────────┘
                           │
              ┌────────────▼─────────────┐
              │       MySQL 8 Database    │
              └──────────────────────────┘
```

**Key decisions:**
- Single-server monolith (Express serves both API and built React app)
- tRPC for type-safe client↔server communication
- Drizzle ORM for type-safe DB queries
- Feature flags via env vars — app starts without Stripe/S3/OpenAI

---

## 3. Frontend Structure

```
client/
├── public/
│   ├── assets/
│   │   ├── marketing/          # All marketing/public assets
│   │   │   ├── hero/           # Hero section: landingfinal.mp4, hero-horse.jpg
│   │   │   ├── auth/           # Auth pages: auth-bg.svg
│   │   │   ├── brand/          # Logo SVGs, horse illustrations
│   │   │   ├── features/       # Feature icons (SVG)
│   │   │   ├── landing/        # Landing page images
│   │   │   ├── about/          # About page assets
│   │   │   ├── pricing/        # Pricing plan illustrations
│   │   │   ├── contact/        # Contact page hero
│   │   │   └── dashboard/      # Dashboard preview image
│   │   └── pattern.svg         # Background pattern (CSS)
│   ├── images/
│   │   ├── gallery/            # Gallery photos (1,2,10,12,15,17,18,19,20,21,23)
│   │   ├── aboutus.jpg         # About page hero
│   │   ├── contactus.jpg       # Contact page hero
│   │   ├── price3.jpg          # Pricing page image
│   │   └── stable.jpg          # Features page
│   ├── videos/
│   │   └── loginfinal.mp4      # Auth pages background video
│   ├── favicon.svg
│   ├── manifest.json
│   ├── robots.txt
│   ├── service-worker.js
│   └── theme-override.css      # Non-render-blocking CSS overrides
│
└── src/
    ├── _core/                  # Auth hooks, tRPC setup, shared context
    ├── components/             # Reusable UI components
    │   ├── ui/                 # shadcn/ui primitives
    │   ├── DashboardLayout.tsx # Main dashboard shell + bottom nav
    │   ├── AuthSplitLayout.tsx # Login/Register split layout
    │   └── ...
    ├── config/
    │   └── marketingAssets.ts  # Single source of truth for all asset paths
    ├── content/                # Static content (features list, etc.)
    ├── contexts/               # React contexts (Theme, etc.)
    ├── hooks/                  # Custom hooks
    ├── lib/                    # Utilities (trpc client, cn, etc.)
    └── pages/                  # One file per route
        ├── Home.tsx            # Landing/marketing home
        ├── Dashboard.tsx       # Authenticated dashboard home
        ├── Horses.tsx
        ├── Calendar.tsx        # Fully wired to calendar.getEvents
        ├── Stable.tsx          # Fully wired to stables router
        ├── Messages.tsx        # Fully wired to messages router
        ├── Settings.tsx        # Real mutations (updateProfile, changePassword, etc.)
        ├── BillingPage.tsx
        └── ...
```

### Key Design Choices

- **Code splitting**: All protected dashboard pages are `React.lazy()` loaded — initial JS bundle is ~259KB instead of ~831KB
- **Mobile-first**: `DashboardLayout` renders a bottom navigation bar on mobile (<1024px): Home | Horses | Calendar | Messages | More (sheet)
- **Asset config**: All media paths live in `client/src/config/marketingAssets.ts` — change a path there and it updates everywhere

---

## 4. Backend Structure

```
server/
├── _core/
│   ├── index.ts              # Express app entry point, middleware, routes
│   ├── authRouter.ts         # REST auth routes (/signup /login /logout /change-password)
│   ├── context.ts            # tRPC context (JWT → User)
│   ├── cookies.ts            # Cookie helpers
│   ├── email.ts              # SMTP email wrapper
│   ├── env.ts                # Environment variable validation + feature flags
│   ├── llm.ts                # OpenAI wrapper
│   ├── rateLimit.ts          # Express rate limiters
│   ├── realtime.ts           # SSE pub/sub system
│   ├── sdk.ts                # Auth SDK (JWT sign/verify, OAuth)
│   ├── systemRouter.ts       # /health, /version procedures
│   └── trpc.ts               # tRPC procedures + middleware
├── routers.ts                # All tRPC routers (main file)
├── db.ts                     # All database query functions
├── stripe.ts                 # Stripe integration
├── storage.ts                # S3 file upload helpers
├── csvExport.ts              # CSV export utilities
├── notification.ts           # Reminder notifications
├── reminderScheduler.ts      # Cron-like reminder scheduler
└── *.test.ts                 # Vitest test files
```

---

## 5. Database Models

All models are defined in `drizzle/schema.ts`.

| Table | Purpose |
|-------|---------|
| `users` | User accounts with subscription, preferences, and profile |
| `horses` | Horse profiles linked to users |
| `healthRecords` | Health events (vet visits, injuries, etc.) |
| `vaccinations` | Vaccination records per horse |
| `dewormings` | Deworming records |
| `treatments` | Medical treatments |
| `dentalRecords` | Dental care records |
| `hoofCareRecords` | Hoof care records |
| `xrays` | X-ray attachments |
| `trainingSessions` | Training log entries |
| `trainingProgramTemplates` | Reusable training templates |
| `trainingPrograms` | Active training programs |
| `feedCosts` | Feeding cost tracking |
| `appointments` | Scheduled vet/farrier/trainer appointments |
| `events` | Calendar events |
| `tasks` | Task/todo items |
| `contacts` | Vet/farrier/trainer contact book |
| `stables` | Stable/yard management |
| `stableMembers` | Stable membership (up to 5 users) |
| `stableInvites` | Pending stable invitations |
| `messageThreads` | Message thread metadata |
| `messages` | Individual messages in threads |
| `documents` | Uploaded document metadata |
| `reports` | Saved report definitions |
| `reportSchedules` | Scheduled report delivery |
| `notes` | AI assistant notes |
| `chatLeads` | Sales chat lead capture |
| `breeding` | Breeding program records |
| `foals` | Foal profiles |
| `lessonBookings` | Lesson scheduling |
| `trainerAvailability` | Trainer schedule availability |
| `competitions` | Competition entries and results |
| `nutritionLogs` | Nutrition tracking logs |
| `nutritionPlans` | Nutrition plan definitions |
| `pedigree` | Pedigree tree nodes |
| `weatherLogs` | Weather condition logs |
| `activityLog` | Audit trail of user actions |
| `siteSettings` | Admin-configurable site settings |

---

## 6. API Routes

### REST Routes (Express)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup` | None | Create new account |
| POST | `/api/auth/login` | None | Email/password login |
| POST | `/api/auth/logout` | None | Clear session cookie |
| POST | `/api/auth/request-reset` | None | Send password reset email |
| POST | `/api/auth/reset-password` | None | Complete password reset |
| POST | `/api/auth/change-password` | Session | Change password (requires current password) |
| POST | `/api/contact` | None | Contact form submission |
| GET  | `/healthz` | None | Health check |
| GET  | `/build` | None | Build info |
| GET  | `/api/realtime/events` | Session | SSE event stream |

### tRPC Routers (all under `/api/trpc`)

| Router | Key Procedures |
|--------|----------------|
| `auth` | `me`, `logout` |
| `adminUnlock` | `unlock`, `getStatus`, `revoke` |
| `user` | `getProfile`, `updateProfile`, `updateNotificationPreferences`, `getNotificationPreferences`, `getDashboardStats`, `getSubscriptionStatus` |
| `horses` | `list`, `get`, `create`, `update`, `delete`, `getStats` |
| `healthRecords` | `listAll`, `create`, `update`, `delete` |
| `vaccinations` | `list`, `create`, `update`, `delete` |
| `trainingSessions` | `list`, `create`, `update`, `delete` |
| `appointments` | `list`, `create`, `update`, `delete` |
| `calendar` | `getEvents`, `createEvent`, `updateEvent`, `deleteEvent` |
| `tasks` | `list`, `create`, `update`, `delete`, `complete` |
| `stables` | `list`, `get`, `create`, `update`, `addMember`, `removeMember`, `getActivity`, `getMemberHorses` |
| `messages` | `getThreads`, `getMessages`, `createThread`, `sendMessage` |
| `documents` | `list`, `upload`, `delete` |
| `billing` | `getPricing`, `getStatus`, `createCheckout`, `createPortal` |
| `analytics` | `getTrainingStats`, `getHealthStats`, `getOverview` |
| `notes` | `list`, `create`, `delete` |
| `ai` | `chat`, `getPromptSuggestions` |
| `weather` | `getCurrent`, `updateLocation` |
| `admin` | `getUsers`, `getStats`, `suspendUser`, `unsuspendUser` |

---

## 7. Environment Variables

### Required (minimum to start)

```env
DATABASE_URL=mysql://user:password@localhost:3306/equiprofile
JWT_SECRET=your_random_min_32_char_string_here
ADMIN_UNLOCK_PASSWORD=your_secure_admin_password
NODE_ENV=production
```

### Optional (enhanced features)

```env
# Stripe Billing (set ENABLE_STRIPE=true to activate)
ENABLE_STRIPE=false
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_INDIVIDUAL_MONTHLY_PRICE_ID=price_...
STRIPE_INDIVIDUAL_YEARLY_PRICE_ID=price_...
STRIPE_STABLE_MONTHLY_PRICE_ID=price_...
STRIPE_STABLE_YEARLY_PRICE_ID=price_...

# File Uploads (set ENABLE_UPLOADS=true to activate)
ENABLE_UPLOADS=false
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=equiprofile-uploads
AWS_REGION=eu-west-2

# AI / OpenAI (optional)
OPENAI_API_KEY=sk-...

# Email / SMTP (optional)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=...
SMTP_FROM=EquiProfile <noreply@yourdomain.com>

# OAuth (optional)
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
OAUTH_REDIRECT_URI=https://yourdomain.com/api/oauth/callback

# App Config
PORT=3000
COOKIE_DOMAIN=yourdomain.com
COOKIE_SECURE=true
BASE_URL=https://yourdomain.com
```

Copy `.env.example` from the repo root for the full template.

---

## 8. Feature Flags

EquiProfile uses env-var feature flags so the app starts cleanly without external services:

| Flag | Default | Controls |
|------|---------|---------|
| `ENABLE_STRIPE` | `false` | Billing UI, Stripe checkout, webhooks |
| `ENABLE_UPLOADS` | `false` | File/document/image upload UI and S3 |

When a flag is `false`, related tRPC procedures throw `PRECONDITION_FAILED` and the UI hides those options.

To enable: set `ENABLE_STRIPE=true` **and** provide the required `STRIPE_*` variables.

---

## 9. Deployment Instructions

### Prerequisites

- Ubuntu 20.04+ VPS
- Node.js 22+ (`nvm install 22`)
- MySQL 8+
- Nginx
- Systemd

### Quick Deploy (Ubuntu 24.04)

```bash
# Use the automated setup script
chmod +x deployment/ubuntu24/setup.sh
sudo ./deployment/ubuntu24/setup.sh
```

### Manual Deploy Steps

```bash
# 1. Clone repository
git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git /var/equiprofile
cd /var/equiprofile

# 2. Install dependencies
npm install --omit=dev

# 3. Set environment variables
cp .env.example .env
nano .env   # Fill in required values

# 4. Run database migrations
npm run db:push

# 5. Build application
npm run build

# 6. Start with systemd
sudo systemctl start equiprofile
sudo systemctl enable equiprofile

# 7. Verify
curl http://localhost:3000/healthz
```

### Nginx Configuration (example)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Rollback

```bash
git log --oneline -10
git checkout <previous-commit-hash>
npm install --omit=dev && npm run build
sudo systemctl restart equiprofile
```

### Post-Deployment Smoke Test

```bash
curl http://localhost:3000/healthz         # → {"status":"ok"}
curl http://localhost:3000/api/health      # → {"status":"healthy"}
curl http://localhost:3000/build           # → {"version":"..."}
```

---

## 10. Testing Instructions

### Run All Tests

```bash
npm run test
# or: node_modules/.bin/vitest run
```

### Run Specific Test File

```bash
node_modules/.bin/vitest run server/horses.test.ts
node_modules/.bin/vitest run server/settings.test.ts
```

### Test Structure

All tests live under `server/*.test.ts` and use **Vitest** with **vi.mock** for DB isolation.

| File | Coverage |
|------|---------|
| `server/auth.login.test.ts` | Login flow |
| `server/auth.logout.test.ts` | Logout flow |
| `server/auth.reset.test.ts` | Password reset |
| `server/admin.test.ts` | Admin procedures |
| `server/horses.test.ts` | Horse CRUD |
| `server/health.test.ts` | Health records |
| `server/training.test.ts` | Training sessions |
| `server/notes.test.ts` | Notes |
| `server/api.test.ts` | API surface |
| `server/settings.test.ts` | Settings mutations (changePassword, notification prefs) |

### Run Preflight Checks

```bash
npm run preflight
# Validates package.json deps and Express route patterns
```

---

## 11. Troubleshooting

### App Won't Start

1. Check env vars: `cat .env | grep -E "^(DATABASE_URL|JWT_SECRET|ADMIN_UNLOCK_PASSWORD)"`
2. Check DB connection: `mysql -u root -p -e "SHOW DATABASES;"`
3. Check build: `npm run build`
4. Check logs: `sudo journalctl -u equiprofile -n 100 -f`

### Database Connection Failed

```bash
# Verify MySQL is running
systemctl status mysql

# Test connection
mysql -u equiprofile_user -p -h localhost equiprofile
```

### Build Errors

```bash
# Clean build artifacts
rm -rf dist node_modules
npm install
npm run build
```

### Stale Service Worker / Old Assets

Users may see stale content after deployment. Solutions:
1. Hard refresh: `Ctrl+Shift+R`
2. Clear in DevTools: Application → Service Workers → Unregister
3. Bump version in `package.json` before deploying (service worker versioning is automated on build)

### Admin Section Not Appearing

1. Open browser console
2. Run: `showAdmin()`
3. Enter the `ADMIN_UNLOCK_PASSWORD` from your `.env`

---

## 12. Security

### Authentication

- **Local auth**: bcrypt (cost factor 10) for password hashing; JWT (HS256) for sessions
- **Session cookies**: `HttpOnly`, `Secure` (in production), `SameSite: lax`
- **Rate limiting**: 5 login attempts / 15 min; 100 API requests / 15 min
- **Password change**: Requires current password verification before allowing update

### Authorization

- `publicProcedure` — no auth
- `protectedProcedure` — valid session required
- `subscribedProcedure` — active trial or paid subscription
- `adminUnlockedProcedure` — admin role + 30-min timed unlock session

### Input Validation

All tRPC inputs use Zod schemas with strict length limits. All DB queries use parameterized statements via Drizzle ORM.

### CodeQL Analysis

CodeQL JavaScript analysis returns **0 alerts** on the current codebase. The SPA fallback route (`app.use("*", ...)`) is a confirmed false-positive for the `js/missing-rate-limiting` rule — it serves a static pre-built HTML file and is protected by the global API rate limiter.

---

## 13. Performance Optimization

### Bundle Size

- **Code splitting**: All 35+ protected pages use `React.lazy()` + `<Suspense>`
- **Vite manualChunks**: Vendor chunks split by library group (react-core, radix-ui, framer-motion, charts, i18n, etc.)
- **Initial JS bundle**: ~259KB (was ~831KB before splitting)

### Video / Media

- **Hero video**: `landingfinal.mp4` (3.8MB) with `preload="none"` and `poster` fallback image — defers video load until after initial paint
- **Auth video**: `/videos/loginfinal.mp4` with `preload="none"`
- **LCP preload hint**: `<link rel="preload" fetchpriority="high">` for hero poster image
- **Unused assets removed**: Gallery images reduced from 22 to 11, old hero.mp4 (5.9MB) removed

### CSS

- `theme-override.css`: Loaded via `rel="preload" onload` (non-render-blocking)
- Tailwind CSS with PurgeCSS in production build

### Caching

- Static assets served with long-lived cache headers via Express static middleware
- Service worker caches hashed assets with cache-first strategy
- API requests use network-first to ensure fresh data
