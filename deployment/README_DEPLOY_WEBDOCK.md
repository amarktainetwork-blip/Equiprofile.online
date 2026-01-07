# EquiProfile Deployment Guide - Webdock Ubuntu

Complete step-by-step guide for deploying EquiProfile on Ubuntu 22.04+ (Webdock or any VPS).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Fresh Installation](#fresh-installation)
- [Post-Installation](#post-installation)
- [Updating](#updating)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements

- **Operating System**: Ubuntu 22.04 LTS or 24.04 LTS
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk**: Minimum 10GB free space
- **Domain**: A domain name pointed to your server's IP address

### Required Software

The following software needs to be installed before deploying EquiProfile:

1. **Node.js 20+**
2. **pnpm** (package manager)
3. **nginx** (web server / reverse proxy)
4. **MySQL 8.0+** (database)
5. **Certbot** (for SSL certificates)

---

## Fresh Installation

### Step 1: Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 2: Install Node.js

```bash
# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
```

### Step 3: Install pnpm

```bash
npm install -g pnpm

# Verify installation
pnpm --version  # Should show 10.x.x or higher
```

### Step 4: Install nginx

```bash
sudo apt install -y nginx

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify nginx is running
sudo systemctl status nginx
```

### Step 5: Install MySQL

```bash
sudo apt install -y mysql-server

# Secure MySQL installation
sudo mysql_secure_installation

# Create database for EquiProfile
sudo mysql -u root -p
```

In the MySQL prompt:

```sql
CREATE DATABASE equiprofile CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'equiprofile'@'localhost' IDENTIFIED BY 'your_secure_password_here';
GRANT ALL PRIVILEGES ON equiprofile.* TO 'equiprofile'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 6: Install Certbot (for SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Step 7: Clone EquiProfile

```bash
# Create deployment directory
sudo mkdir -p /var/www/equiprofile
sudo chown -R www-data:www-data /var/www/equiprofile

# Clone repository
cd /var/www
sudo -u www-data git clone https://github.com/amarktainetwork-blip/Equiprofile.online.git equiprofile

cd equiprofile
```

### Step 8: Configure Environment

```bash
# Copy environment template
sudo -u www-data cp .env.example .env

# Edit configuration
sudo nano .env
```

**Critical environment variables to configure:**

```env
# Database
DATABASE_URL=mysql://equiprofile:your_secure_password_here@localhost:3306/equiprofile

# Security (MUST CHANGE!)
JWT_SECRET=<generate with: openssl rand -base64 32>
ADMIN_UNLOCK_PASSWORD=<your_secure_admin_password>

# Application
NODE_ENV=production
PORT=3000
BASE_URL=https://yourdomain.com

# Optional: Stripe (for billing)
ENABLE_STRIPE=false

# Optional: File uploads
ENABLE_UPLOADS=false
```

> **Important**: Generate a secure JWT secret with:
> ```bash
> openssl rand -base64 32
> ```

### Step 9: Deploy Application

```bash
# Run the deployment script
sudo bash deployment/deploy.sh
```

The deployment script will:
- Install dependencies
- Build the application
- Install systemd service
- Start the application
- Run health checks

### Step 10: Configure Nginx

```bash
# Edit the nginx configuration with your domain
sudo nano /var/www/equiprofile/deployment/nginx-equiprofile.conf
```

Replace `YOUR_DOMAIN_HERE` with your actual domain (e.g., `equiprofile.example.com`).

```bash
# Copy to nginx sites
sudo cp /var/www/equiprofile/deployment/nginx-equiprofile.conf /etc/nginx/sites-available/equiprofile

# Create symlink
sudo ln -s /etc/nginx/sites-available/equiprofile /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 11: Setup SSL Certificate

```bash
# Run Certbot to obtain SSL certificate
sudo certbot --nginx -d yourdomain.com

# Follow the prompts
# Certbot will automatically configure nginx for HTTPS
```

> **Note**: Ensure your domain's DNS A record points to your server's IP address before running certbot.

### Step 12: Verify Installation

```bash
# Check service status
sudo systemctl status equiprofile

# Check application logs
sudo journalctl -u equiprofile -f

# Test health endpoint
curl https://yourdomain.com/healthz

# Expected response: {"ok":true,"timestamp":"..."}
```

### Step 13: Setup Firewall (Optional but Recommended)

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Post-Installation

### Create Admin User

1. Visit `https://yourdomain.com/register`
2. Create your first account
3. This account will need to be promoted to admin in the database:

```bash
sudo mysql -u root -p equiprofile
```

```sql
UPDATE users SET role='admin' WHERE email='your@email.com';
EXIT;
```

### Test All Features

- [ ] Login works
- [ ] Can create horses
- [ ] Can add health records
- [ ] Can schedule training sessions
- [ ] Dashboard loads correctly
- [ ] No console errors (check browser dev tools)

---

## Updating

To update EquiProfile to the latest version:

```bash
cd /var/www/equiprofile

# Pull latest code
sudo -u www-data git pull origin main

# Run deployment script
sudo bash deployment/deploy.sh
```

The deployment script handles:
- Stopping the service
- Installing new dependencies
- Rebuilding the application
- Restarting the service

---

## Troubleshooting

### Service Won't Start

```bash
# Check service status
sudo systemctl status equiprofile

# View detailed logs
sudo journalctl -u equiprofile -n 100 --no-pager

# Common issues:
# - Database connection failed: Check DATABASE_URL in .env
# - Port already in use: Check if another process is using port 3000
# - Permission issues: Ensure www-data owns /var/www/equiprofile
```

### White Screen / Nothing Loads

```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/equiprofile-error.log

# Check application logs
sudo journalctl -u equiprofile -f

# Verify build output exists
ls -la /var/www/equiprofile/dist/
```

### CSS/JS Files Return HTML Instead

This usually means the SPA fallback is catching asset requests.

```bash
# Test asset MIME types
curl -I https://yourdomain.com/assets/index-abc123.js

# Should return: Content-Type: application/javascript
# If it returns text/html, the server config needs adjustment
```

### Database Connection Errors

```bash
# Test MySQL connection
mysql -u equiprofile -p equiprofile

# If connection fails:
# 1. Verify DATABASE_URL in .env is correct
# 2. Verify MySQL user exists and has permissions
# 3. Check MySQL is running: sudo systemctl status mysql
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

### Permission Issues

```bash
# Fix ownership
sudo chown -R www-data:www-data /var/www/equiprofile

# Fix permissions
sudo chmod -R 755 /var/www/equiprofile
sudo chmod 600 /var/www/equiprofile/.env
```

### Application Won't Build

```bash
# Clear node_modules and rebuild
cd /var/www/equiprofile
sudo -u www-data rm -rf node_modules
sudo -u www-data pnpm install
sudo -u www-data pnpm build
```

---

## Maintenance Tasks

### View Logs

```bash
# Application logs (real-time)
sudo journalctl -u equiprofile -f

# Application logs (last 100 lines)
sudo journalctl -u equiprofile -n 100

# Nginx access logs
sudo tail -f /var/log/nginx/equiprofile-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/equiprofile-error.log
```

### Restart Service

```bash
sudo systemctl restart equiprofile
```

### Check Resource Usage

```bash
# Memory and CPU usage
htop

# Disk usage
df -h

# Check specific process
ps aux | grep node
```

### Backup Database

```bash
# Create backup directory
mkdir -p /var/backups/equiprofile

# Backup database
sudo mysqldump -u equiprofile -p equiprofile > /var/backups/equiprofile/equiprofile-$(date +%Y%m%d).sql

# Compress backup
gzip /var/backups/equiprofile/equiprofile-$(date +%Y%m%d).sql
```

### Restore Database

```bash
# Restore from backup
sudo mysql -u equiprofile -p equiprofile < /var/backups/equiprofile/equiprofile-20240101.sql
```

---

## Security Checklist

After installation, verify these security measures are in place:

- [ ] Firewall enabled (ufw) with only necessary ports open
- [ ] SSL certificate installed and auto-renewal configured
- [ ] JWT_SECRET changed from default
- [ ] ADMIN_UNLOCK_PASSWORD changed from default
- [ ] Database user has limited permissions (not root)
- [ ] .env file has restricted permissions (600)
- [ ] Regular backups configured
- [ ] System updates enabled

---

## Support

For issues or questions:

- **GitHub Issues**: https://github.com/amarktainetwork-blip/Equiprofile.online/issues
- **Documentation**: Check the `/docs` folder in the repository
- **Email**: support@equiprofile.online

---

**Deployment Guide Version**: 1.0  
**Last Updated**: 2026-01-07
