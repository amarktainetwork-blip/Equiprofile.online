# EquiProfile - Professional Horse Management Platform

![EquiProfile](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)

A comprehensive, modern web application for equestrian professionals to manage their horses' health records, training schedules, feeding plans, and more.

## 🌟 Features

### Core Features
- **Horse Profile Management** - Detailed profiles with breed, age, discipline, and photos
- **Health Records** - Track vaccinations, vet visits, medications, and medical history
- **Training Scheduler** - Plan and log training sessions with progress tracking
- **Feeding Plans** - Manage feeding schedules and nutrition information
- **AI Weather Analysis** - Get intelligent riding recommendations based on weather
- **Document Storage** - Secure cloud storage for important documents
- **Subscription Management** - 7-day free trial, flexible monthly/yearly plans

### Admin Features
- **User Management** - View, suspend, and manage user accounts
- **System Analytics** - Monitor subscriptions, activity, and system health
- **Settings Management** - Configure system-wide settings
- **Activity Logs** - Track all system activities
- **Automated Backups** - Daily database and file backups

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22.x or higher
- **pnpm** 10.x or higher
- **MySQL** 8.0 or higher
- **AWS S3** account (for file storage)
- **OpenAI API key** (for weather analysis)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git
cd Equiprofile.online
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=mysql://username:password@localhost:3306/equiprofile

# Application Settings
NODE_ENV=development
PORT=3000

# Authentication
JWT_SECRET=your_secure_jwt_secret_here

# Stripe Payment Integration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI for Weather Analysis
OPENAI_API_KEY=sk-...

# AWS S3 Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=equiprofile-uploads

# Admin Configuration (optional)
ADMIN_EMAIL=admin@equiprofile.online
```

4. **Setup the database**
```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE equiprofile;"

# Run migrations
pnpm db:push
```

5. **Start development server**
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📦 Build & Deploy

### Build for Production

```bash
# Build frontend and backend
pnpm build

# Start production server
pnpm start
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Type checking
pnpm check

# Format code
pnpm format
```

## 🏗️ Project Structure

```
Equiprofile.online/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
├── server/                # Backend Node.js application
│   ├── _core/            # Core server functionality
│   │   ├── trpc.ts       # tRPC setup
│   │   ├── context.ts    # Request context
│   │   ├── oauth.ts      # OAuth integration
│   │   └── llm.ts        # AI/LLM integration
│   ├── routers.ts        # API route definitions
│   ├── db.ts             # Database queries
│   └── storage.ts        # File storage operations
├── drizzle/              # Database schema and migrations
│   ├── schema.ts         # Database schema
│   └── migrations/       # Migration files
├── shared/               # Shared types and constants
├── scripts/              # Utility scripts
└── dist/                 # Production build output
```

## 🔧 API Documentation

### Authentication

The application uses OAuth 2.0 for authentication. Supported providers:
- Google
- GitHub
- Microsoft

Session management is handled via secure HTTP-only cookies.

### API Endpoints

All API endpoints are exposed via tRPC. Key routers include:

#### User Routes (`/api/trpc/user.*`)
- `getProfile` - Get current user profile
- `updateProfile` - Update user profile
- `getSubscriptionStatus` - Get subscription details
- `getDashboardStats` - Get dashboard statistics

#### Horse Routes (`/api/trpc/horses.*`)
- `list` - List all horses
- `get` - Get horse by ID
- `create` - Create new horse
- `update` - Update horse details
- `delete` - Delete horse

#### Health Records (`/api/trpc/healthRecords.*`)
- `listAll` - List all health records
- `listByHorse` - List records for specific horse
- `create` - Create health record
- `update` - Update health record
- `delete` - Delete health record
- `getReminders` - Get upcoming reminders

#### Training (`/api/trpc/training.*`)
- `listAll` - List all training sessions
- `listByHorse` - List sessions for specific horse
- `getUpcoming` - Get upcoming sessions
- `create` - Create training session
- `update` - Update session
- `complete` - Mark session as complete
- `delete` - Delete session

#### Admin Routes (`/api/trpc/admin.*`) - Requires admin role
- `getUsers` - List all users
- `getUserDetails` - Get detailed user info
- `suspendUser` - Suspend user account
- `unsuspendUser` - Unsuspend user account
- `deleteUser` - Delete user account
- `getStats` - Get system statistics
- `getSettings` - Get system settings
- `updateSetting` - Update system setting

## 🔒 Security

### Authentication & Authorization
- OAuth 2.0 authentication
- Role-based access control (user/admin)
- Session-based authentication with HTTP-only cookies
- JWT tokens for API access

### Data Protection
- All passwords are hashed using bcrypt
- Sensitive data encrypted at rest
- HTTPS enforced in production
- CORS protection enabled
- Rate limiting on API endpoints

### Best Practices
- Input validation using Zod schemas
- SQL injection prevention via Drizzle ORM
- XSS protection via React
- CSRF protection on state-changing operations

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Webdock VPS deployment
- Nginx configuration
- SSL certificate setup
- PM2 process management
- Automated backups
- Monitoring setup

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact:
- Email: support@equiprofile.online
- Documentation: [https://docs.equiprofile.online](https://docs.equiprofile.online)
- Issues: [GitHub Issues](https://github.com/amarktainetwork-blip/Equiprofile.online/issues)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/), [Express](https://expressjs.com/), and [tRPC](https://trpc.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)

---

Made with ❤️ for equestrian professionals worldwide.
