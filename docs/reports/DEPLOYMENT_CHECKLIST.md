# Production Deployment Checklist

## Pre-Deployment

### Server Setup
- [ ] Ubuntu 22.04 LTS installed on Webdock VPS
- [ ] SSH access configured with key-based authentication
- [ ] Firewall configured (UFW)
  ```bash
  sudo ufw allow 22/tcp
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```
- [ ] fail2ban installed and configured
  ```bash
  sudo apt install fail2ban
  sudo systemctl enable fail2ban
  ```

### Domain Configuration
- [ ] Domain pointed to VPS IP address
- [ ] DNS propagated (check with `dig equiprofile.online`)
- [ ] Cloudflare configured (optional but recommended)

### Dependencies Installed
- [ ] Node.js 22.x installed
- [ ] pnpm installed globally
- [ ] MySQL 8.0 installed and secured
- [ ] Nginx installed
- [ ] PM2 installed globally
- [ ] Certbot installed for SSL

## Database Setup

- [ ] MySQL database created: `equiprofile`
- [ ] MySQL user created with proper permissions
- [ ] Database user password is strong (16+ characters)
- [ ] MySQL root password set
- [ ] Remote root login disabled
- [ ] Test database connection works

```sql
CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'equiprofile'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
FLUSH PRIVILEGES;
```

## Application Deployment

### Repository Setup
- [ ] Application cloned to `/var/www/equiprofile`
- [ ] Correct ownership: `chown -R $USER:$USER /var/www/equiprofile`
- [ ] Dependencies installed: `pnpm install`

### Environment Configuration
- [ ] `.env` file created from `.env.example`
- [ ] `client/.env` created from `client/.env.example`
- [ ] All environment variables configured:

#### Server `.env`
- [ ] `DATABASE_URL` - MySQL connection string
- [ ] `JWT_SECRET` - Generated with `openssl rand -base64 32`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `BASE_URL` - Your production URL
- [ ] `OWNER_OPEN_ID` - Your OAuth ID for admin access

#### Stripe Configuration
- [ ] Stripe account created (live mode)
- [ ] Products created (Monthly £7.99, Yearly £79.90)
- [ ] `STRIPE_SECRET_KEY` - Live key from Stripe dashboard
- [ ] `STRIPE_PUBLISHABLE_KEY` - Live key
- [ ] `STRIPE_WEBHOOK_SECRET` - From webhook endpoint
- [ ] `STRIPE_MONTHLY_PRICE_ID` - Monthly price ID
- [ ] `STRIPE_YEARLY_PRICE_ID` - Yearly price ID

#### OpenAI Configuration
- [ ] `OPENAI_API_KEY` - For AI weather analysis

#### AWS S3 Configuration (for uploads)
- [ ] S3 bucket created
- [ ] IAM user created with S3 access
- [ ] `AWS_ACCESS_KEY_ID`
- [ ] `AWS_SECRET_ACCESS_KEY`
- [ ] `AWS_REGION`
- [ ] `AWS_S3_BUCKET`

#### Client `.env`
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `VITE_ENV=production`

### Database Migration
- [ ] Run migrations: `pnpm db:push`
- [ ] Verify tables created
- [ ] Test database connection

```bash
mysql -u equiprofile -p equiprofile -e "SHOW TABLES;"
```

### Build Application
- [ ] Run build: `pnpm build`
- [ ] Verify `dist/` directory created
- [ ] Check for build errors
- [ ] Test build locally: `NODE_ENV=production node dist/index.js`

## Nginx Configuration

- [ ] Nginx config created: `/etc/nginx/sites-available/equiprofile`
- [ ] Config content:

```nginx
server {
    listen 80;
    server_name equiprofile.online www.equiprofile.online;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- [ ] Symbolic link created: `sudo ln -s /etc/nginx/sites-available/equiprofile /etc/nginx/sites-enabled/`
- [ ] Nginx config tested: `sudo nginx -t`
- [ ] Nginx restarted: `sudo systemctl restart nginx`

## SSL Certificate

- [ ] Certbot run: `sudo certbot --nginx -d equiprofile.online -d www.equiprofile.online`
- [ ] Email provided for renewal notices
- [ ] Agree to terms
- [ ] HTTP to HTTPS redirect configured
- [ ] Auto-renewal tested: `sudo certbot renew --dry-run`

## PM2 Process Manager

- [ ] PM2 ecosystem config exists: `ecosystem.config.js`
- [ ] Application started: `pm2 start ecosystem.config.js --env production`
- [ ] Application running: `pm2 status`
- [ ] Startup script configured: `pm2 startup`
- [ ] Process list saved: `pm2 save`
- [ ] Logs accessible: `pm2 logs equiprofile`

## Stripe Webhook Setup

- [ ] Go to Stripe Dashboard → Developers → Webhooks
- [ ] Add endpoint: `https://equiprofile.online/api/webhooks/stripe`
- [ ] Select events:
  - [ ] `checkout.session.completed`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
  - [ ] `invoice.payment_succeeded`
  - [ ] `invoice.payment_failed`
- [ ] Copy webhook signing secret
- [ ] Update `.env` with `STRIPE_WEBHOOK_SECRET`
- [ ] Restart application: `pm2 restart equiprofile`
- [ ] Test webhook with Stripe CLI or test event

## Backup Configuration

- [ ] Backup script exists: `/usr/local/bin/equiprofile-backup.sh`
- [ ] Script is executable: `chmod +x /usr/local/bin/equiprofile-backup.sh`
- [ ] Backup directory created: `mkdir -p /var/backups/equiprofile`
- [ ] Log directory created: `mkdir -p /var/log`
- [ ] Test backup manually: `sudo /usr/local/bin/equiprofile-backup.sh`
- [ ] Cron job configured: `sudo crontab -e`

```cron
# Daily backup at 2 AM
0 2 * * * /usr/local/bin/equiprofile-backup.sh
```

- [ ] First backup completed successfully
- [ ] Backup files verified

## Testing

### Health Check
- [ ] Visit: `https://equiprofile.online/api/health`
- [ ] Response shows all services healthy

### Authentication
- [ ] Can access homepage
- [ ] Login with OAuth works
- [ ] Session persists after refresh
- [ ] Logout works

### Subscription Flow
- [ ] Trial users can access features
- [ ] Pricing page displays correctly
- [ ] Stripe checkout redirects properly
- [ ] Payment test completes (use test card)
- [ ] Webhook processes successfully
- [ ] User subscription status updates
- [ ] Access granted after payment

### Core Features
- [ ] Can create horse profile
- [ ] Can upload documents
- [ ] Can add health records
- [ ] Can schedule training sessions
- [ ] Can check weather analysis
- [ ] Can manage feeding plans

### Admin Functions
- [ ] Admin dashboard accessible
- [ ] User management works
- [ ] System stats display
- [ ] Activity logs visible

## Monitoring

- [ ] Health check endpoint responding: `/api/health`
- [ ] PM2 monitoring: `pm2 monit`
- [ ] Nginx logs: `tail -f /var/log/nginx/access.log`
- [ ] Application logs: `pm2 logs equiprofile`
- [ ] Error tracking configured (optional: Sentry)
- [ ] Uptime monitoring configured (optional: Pingdom, UptimeRobot)

## Security Verification

- [ ] HTTPS working and enforced
- [ ] Rate limiting active (test with rapid requests)
- [ ] Helmet headers present (check with browser DevTools)
- [ ] Webhook signature verification working
- [ ] File upload size limits enforced
- [ ] SQL injection protected (ORM-based queries)
- [ ] XSS protection enabled
- [ ] CORS properly configured

## Performance

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Database queries optimized
- [ ] Static assets cached
- [ ] Gzip compression enabled

## Documentation

- [ ] README.md updated with production info
- [ ] DEPLOYMENT.md reviewed and accurate
- [ ] API documentation available
- [ ] Admin documentation available
- [ ] Backup recovery process documented

## Post-Deployment

### First 24 Hours
- [ ] Monitor logs continuously
- [ ] Check for errors
- [ ] Verify webhooks processing
- [ ] Test backup restoration
- [ ] Monitor server resources (CPU, RAM, disk)

### First Week
- [ ] Review error logs daily
- [ ] Monitor payment processing
- [ ] Check backup success
- [ ] Verify email notifications (if configured)
- [ ] Gather user feedback

### Ongoing
- [ ] Weekly security updates
- [ ] Monthly dependency updates
- [ ] Quarterly security audit
- [ ] Regular backup testing
- [ ] Performance monitoring

## Rollback Plan

If critical issues occur:

1. **Stop Application**
   ```bash
   pm2 stop equiprofile
   ```

2. **Restore Database**
   ```bash
   gunzip < /var/backups/equiprofile/YYYY/MM/db_TIMESTAMP.sql.gz | mysql -u equiprofile -p equiprofile
   ```

3. **Revert Code**
   ```bash
   cd /var/www/equiprofile
   git reset --hard PREVIOUS_COMMIT
   pnpm install
   pnpm build
   ```

4. **Restart Application**
   ```bash
   pm2 restart equiprofile
   ```

## Support Contacts

- **Hosting:** Webdock support
- **Domain:** Domain registrar support
- **Stripe:** https://support.stripe.com
- **Development:** [Your contact info]

## Sign-off

- [ ] All checklist items completed
- [ ] Deployment tested end-to-end
- [ ] Documentation updated
- [ ] Team notified
- [ ] Ready for production traffic

**Deployed By:** _________________  
**Date:** _________________  
**Time:** _________________  
**Version:** 1.0.0

---

## Common Issues and Solutions

### Application won't start
- Check logs: `pm2 logs equiprofile`
- Verify .env file exists and is correct
- Check database connection
- Ensure port 3000 is not in use

### Stripe webhooks not working
- Verify webhook URL in Stripe dashboard
- Check STRIPE_WEBHOOK_SECRET is correct
- Review webhook logs in Stripe dashboard
- Check application logs for signature errors

### Database connection fails
- Verify MySQL is running: `sudo systemctl status mysql`
- Check DATABASE_URL format
- Verify user permissions
- Test connection manually

### SSL certificate issues
- Renew certificate: `sudo certbot renew`
- Check certificate expiry: `sudo certbot certificates`
- Verify DNS is correct

### High memory usage
- Check PM2 stats: `pm2 monit`
- Review application logs for memory leaks
- Consider increasing VPS resources
- Optimize database queries
