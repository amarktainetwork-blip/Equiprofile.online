#!/bin/bash
# ==========================================
# EquiProfile One-Command Deployment Script
# ==========================================
# This script handles complete deployment of EquiProfile
# Safe to run multiple times (idempotent)
#
# Usage: sudo bash deployment/deploy.sh

set -e

LOG_FILE="/var/log/equiprofile-deploy.log"
DEPLOY_DIR="/var/www/equiprofile"

# Ensure we're running with proper permissions
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Setup logging
exec > >(tee -a "$LOG_FILE") 2>&1

echo "======================================"
echo "EquiProfile Deployment"
echo "Started: $(date)"
echo "======================================"

# Step 1: Stop service if running
echo ""
echo "[1/9] Stopping service..."
systemctl stop equiprofile || echo "Service not running (this is okay on first install)"

# Step 2: Navigate to deployment directory
echo ""
echo "[2/9] Checking deployment directory..."
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "ERROR: Deployment directory $DEPLOY_DIR does not exist"
    echo "Please ensure the application is cloned/copied to $DEPLOY_DIR"
    exit 1
fi

cd "$DEPLOY_DIR"
echo "Working directory: $(pwd)"

# Step 3: Pull latest code (if git repo)
echo ""
echo "[3/9] Updating code..."
if [ -d ".git" ]; then
    sudo -u www-data git pull origin main || echo "Git pull failed or not a git repo"
else
    echo "Not a git repository, skipping pull"
fi

# Step 4: Install dependencies
echo ""
echo "[4/9] Installing dependencies..."
if ! command -v pnpm &> /dev/null; then
    echo "ERROR: pnpm is not installed. Please install it first:"
    echo "  npm install -g pnpm"
    exit 1
fi

sudo -u www-data pnpm install --frozen-lockfile

# Step 5: Build application
echo ""
echo "[5/9] Building application..."
sudo -u www-data pnpm build

# Verify build output exists
if [ ! -f "dist/index.js" ]; then
    echo "ERROR: Build failed - dist/index.js not found"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "ERROR: Build failed - dist/public/ not found"
    exit 1
fi

echo "Build successful!"

# Step 6: Install systemd service
echo ""
echo "[6/9] Installing systemd service..."
if [ ! -f /etc/systemd/system/equiprofile.service ]; then
    if [ -f deployment/systemd/equiprofile.service ]; then
        cp deployment/systemd/equiprofile.service /etc/systemd/system/
        systemctl daemon-reload
        echo "Systemd service installed"
    else
        echo "WARNING: deployment/systemd/equiprofile.service not found"
    fi
else
    echo "Systemd service already installed"
    # Reload in case it changed
    cp deployment/systemd/equiprofile.service /etc/systemd/system/ 2>/dev/null || true
    systemctl daemon-reload
fi

# Step 7: Check nginx configuration
echo ""
echo "[7/9] Checking nginx configuration..."
if [ ! -f /etc/nginx/sites-available/equiprofile ]; then
    echo "WARNING: Nginx config not installed at /etc/nginx/sites-available/equiprofile"
    echo "Please:"
    echo "  1. Edit deployment/nginx-equiprofile.conf and replace YOUR_DOMAIN_HERE"
    echo "  2. Copy to /etc/nginx/sites-available/equiprofile"
    echo "  3. Create symlink: ln -s /etc/nginx/sites-available/equiprofile /etc/nginx/sites-enabled/"
    echo "  4. Run certbot: certbot --nginx -d yourdomain.com"
else
    # Test nginx config
    if nginx -t 2>/dev/null; then
        echo "Nginx configuration is valid"
        systemctl reload nginx
        echo "Nginx reloaded"
    else
        echo "WARNING: Nginx configuration test failed"
        echo "Please check nginx configuration manually"
    fi
fi

# Step 8: Start service
echo ""
echo "[8/9] Starting application service..."
systemctl start equiprofile
systemctl enable equiprofile

# Wait for service to start
sleep 3

# Step 9: Health checks
echo ""
echo "[9/9] Running health checks..."

# Check if service is running
if systemctl is-active --quiet equiprofile; then
    echo "✓ Service is running"
else
    echo "✗ Service failed to start"
    echo "Check logs with: journalctl -u equiprofile -n 50"
    exit 1
fi

# Check local health endpoint
if curl -sf http://127.0.0.1:3000/healthz > /dev/null; then
    echo "✓ Local health check passed"
else
    echo "✗ Local health check failed"
    echo "Service may still be starting, or there's a configuration issue"
fi

# Try HTTPS check (may fail if SSL not configured)
DOMAIN=$(grep server_name /etc/nginx/sites-available/equiprofile 2>/dev/null | grep -v "#" | awk '{print $2}' | tr -d ';' | head -n1)
if [ -n "$DOMAIN" ] && [ "$DOMAIN" != "YOUR_DOMAIN_HERE" ]; then
    if curl -sfI https://$DOMAIN > /dev/null 2>&1; then
        echo "✓ HTTPS check passed (https://$DOMAIN)"
    else
        echo "! HTTPS check failed (https://$DOMAIN)"
        echo "  This is normal if SSL certificates are not configured yet"
    fi
fi

echo ""
echo "======================================"
echo "Deployment Complete!"
echo "Finished: $(date)"
echo "======================================"
echo ""
echo "Next steps:"
echo "  - View logs: journalctl -u equiprofile -f"
echo "  - Check status: systemctl status equiprofile"
echo "  - View this log: cat $LOG_FILE"
echo ""
