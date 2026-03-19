# 🚀 Furniture - Nginx Configuration Deployment Guide

This guide provides detailed instructions for setting up Nginx for Furniture website at `furnitures.lumicore-labs.com`.

---

## 📋 Nginx Configuration Overview

**Domain:** `furnitures.lumicore-labs.com`  
**SSL Certificate:** Let's Encrypt (Auto-renewable)  
**HTTP/HTTPS:** Full HTTPS with HTTP redirect  
**Backend API:** Express.js on port 5000  
**Frontend:** Vue.js SPA (Static files in `/dist`)

---

## 🔧 Pre-Deployment Checklist

Before deploying Nginx, ensure you have:

- ✅ VPS with Ubuntu (Hostinger or similar)
- ✅ SSH access to your VPS
- ✅ Domain `furnitures.lumicore-labs.com` pointing to your VPS IP
- ✅ Node.js and npm installed
- ✅ MySQL database set up
- ✅ Project files at `/var/www/furniture`
- ✅ Backend running on port 5000
- ✅ Frontend built in `/var/www/furniture/client/dist`

---

## 📥 Step 1: Install Nginx

```bash
# Update package manager
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Start Nginx
sudo systemctl start nginx

# Verify installation
nginx -v
sudo systemctl status nginx
```

---

## 📄 Step 2: Create Nginx Configuration

Create the Nginx configuration file for Furniture:

```bash
# Create the configuration file
sudo nano /etc/nginx/sites-available/furniture
```

### Nginx Configuration

Add the following configuration to `/etc/nginx/sites-available/furniture`:

```nginx
# Upstream backend
upstream furniture_backend {
    server localhost:5000;
    keepalive 64;
}

server {
    listen 80;
    server_name furnitures.lumicore-labs.com www.furnitures.lumicore-labs.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend - Serve Vue.js app
    location / {
        root /var/www/furniture/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API - Proxy to Express.js
    location /api/ {
        proxy_pass http://furniture_backend/api/;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Disable cache for API
        proxy_cache_bypass $http_upgrade;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://furniture_backend/health;
        access_log off;
    }

    # Serve uploaded images
    location /uploads {
        alias /var/www/furniture/server/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Logs
    access_log /var/log/nginx/furniture-access.log;
    error_log /var/log/nginx/furniture-error.log;
}
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

### Enable the Site

```bash
# Create symbolic link to enable the site
sudo ln -sf /etc/nginx/sites-available/furniture /etc/nginx/sites-enabled/

# Remove default Nginx site (optional, but recommended)
sudo rm -f /etc/nginx/sites-enabled/default
```

---

## 🔐 Step 3: Install SSL Certificate with Let's Encrypt

### Install Certbot

```bash
# Install Certbot and Nginx plugin
sudo apt install certbot python3-certbot-nginx -y
```

### Generate SSL Certificate

```bash
# Request SSL certificate for your domain
sudo certbot --nginx -d furnitures.lumicore-labs.com -d www.furnitures.lumicore-labs.com
```

**Interactive prompts:**
1. Enter your email address
2. Agree to Let's Encrypt terms
3. Optionally share your email with EFF
4. **Select option 2** when asked about redirecting HTTP to HTTPS

Certbot will automatically update your Nginx configuration to include the HTTPS server block.

### Verify SSL Installation

```bash
# Check certificate details
sudo certbot certificates

# Expected output should show:
# Certificate Path: /etc/letsencrypt/live/furnitures.lumicore-labs.com/fullchain.pem
# Private Key Path: /etc/letsencrypt/live/furnitures.lumicore-labs.com/privkey.pem
```

### HTTPS Server Block (Auto-configured by Certbot)

After running Certbot, your configuration will include an HTTPS server block similar to:

```nginx
server {
    listen 443 ssl http2;
    server_name furnitures.lumicore-labs.com www.furnitures.lumicore-labs.com;

    ssl_certificate /etc/letsencrypt/live/furnitures.lumicore-labs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/furnitures.lumicore-labs.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend - Serve Vue.js app
    location / {
        root /var/www/furniture/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API - Proxy to Express.js
    location /api/ {
        proxy_pass http://furniture_backend/api/;
        proxy_http_version 1.1;

        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Disable cache for API
        proxy_cache_bypass $http_upgrade;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://furniture_backend/health;
        access_log off;
    }

    # Serve uploaded images
    location /uploads {
        alias /var/www/furniture/server/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Logs
    access_log /var/log/nginx/furniture-access.log;
    error_log /var/log/nginx/furniture-error.log;
}
```

---

## ✅ Step 4: Test Nginx Configuration

Before reloading, test that the configuration is valid:

```bash
# Test Nginx configuration syntax
sudo nginx -t

# Expected output:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

---

## 🔄 Step 5: Reload Nginx

```bash
# Reload Nginx with new configuration
sudo systemctl reload nginx

# Verify Nginx is running
sudo systemctl status nginx
```

---

## 🌐 Step 6: Verify Your Website

Open your browser and navigate to:

```
https://furnitures.lumicore-labs.com
```

**Verify these endpoints work:**

1. **Homepage** - `https://furnitures.lumicore-labs.com`
2. **Products Page** - `https://furnitures.lumicore-labs.com/products`
3. **API Health** - `https://furnitures.lumicore-labs.com/api/` (should connect to backend)
4. **Uploads** - `https://furnitures.lumicore-labs.com/uploads/` (serves product images)

---

## 🚀 Step 7: Start the Backend Server with PM2

### Install PM2 Globally (if not already installed)

```bash
sudo npm install -g pm2
```

### Start the Backend with PM2

```bash
# Navigate to server directory
cd /var/www/furniture/server

# Install dependencies (production only)
npm install --omit=dev

# Start the backend with PM2
pm2 start server.js --name furniture-api

# Save PM2 configuration to persist it
pm2 save

# Enable PM2 to start on system boot
pm2 startup

# Check that the backend is running
pm2 status
```

### Useful PM2 Commands

```bash
# View real-time logs
pm2 logs furniture-api

# Restart the backend
pm2 restart furniture-api

# Stop the backend
pm2 stop furniture-api

# Monitor resource usage
pm2 monit

# View all PM2 processes
pm2 list
```

---

## 📋 Nginx Configuration Details

### Upstream Backend

The configuration defines an upstream backend pool for load balancing and connection reuse:

```nginx
upstream furniture_backend {
    server localhost:5000;
    keepalive 64;
}
```

- **Purpose:** Routes all API requests to Express.js backend
- **Connection Pool:** Maintains up to 64 idle connections for better performance
- **Port:** Backend runs on port 5000

### HTTP Server Block

- **Listening:** Port 80 (HTTP)
- **Server Names:** `furnitures.lumicore-labs.com` and `www.furnitures.lumicore-labs.com`
- **Behavior:** Redirects all HTTP traffic to HTTPS automatically (when SSL is enabled)
- **Headers:** Includes security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

### HTTPS Server Block

Available after Certbot installation:

- **Listening:** Port 443 with HTTP/2 support
- **SSL/TLS:** Uses Let's Encrypt certificates
- **TLS Versions:** TLS 1.2 and TLS 1.3 only
- **Cipher Suites:** Strong modern ciphers for maximum security
- **HSTS:** Strict-Transport-Security header prevents downgrade attacks
- **Security Headers:** All security headers enabled

### Frontend Routing

- **Root Directory:** `/var/www/furniture/client/dist` (Vue.js production build)
- **Default File:** `index.html` (SPA entry point)
- **Fallback Rule:** All requests resolve via `try_files $uri $uri/ /index.html` for Vue Router
- **Static Asset Caching:** 1-year cache for files like `.js`, `.css`, `.png`, etc. (immutable)

### Backend API Proxy

- **Endpoint:** `/api/` requests proxy to upstream `furniture_backend`
- **Protocol:** HTTP/1.1 with connection upgrade support
- **Headers:** Preserves original client IP, forwarded protocol, and host information
- **Timeouts:**
  - Connection timeout: 60 seconds
  - Send timeout: 60 seconds
  - Read timeout: 60 seconds
- **Cache Bypass:** API responses never cached (fresh data on every request)

### Health Check Endpoint

- **Path:** `/health` routes to `http://furniture_backend/health`
- **Logging:** Access log disabled to reduce noise
- **Purpose:** Quick backend health verification

### Upload Directory

- **Location:** `/uploads/` serves from `/var/www/furniture/server/uploads`
- **Caching:** 30-day cache with immutable flag
- **File Access:** Returns 404 if file doesn't exist
- **Use Case:** Product images and user-uploaded files

### Logging

- **Access Log:** `/var/log/nginx/furniture-access.log` (all requests)
- **Error Log:** `/var/log/nginx/furniture-error.log` (errors only)

---

## 🔧 Nginx Maintenance

### View Nginx Logs

```bash
# View access log (last 20 lines)
sudo tail -n 20 /var/log/nginx/access.log

# View error log (last 20 lines)
sudo tail -n 20 /var/log/nginx/error.log

# Real-time log streaming
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Reload Configuration (After Changes)

```bash
# Test configuration first
sudo nginx -t

# Reload if test passes
sudo systemctl reload nginx
```

### Restart Nginx

```bash
# Stop Nginx
sudo systemctl stop nginx

# Start Nginx
sudo systemctl start nginx

# Or restart in one command
sudo systemctl restart nginx
```

---

## 🔄 SSL Certificate Auto-Renewal

Let's Encrypt certificates expire every 90 days. Certbot automatically handles renewal:

```bash
# Verify renewal is scheduled
sudo systemctl status certbot.timer

# Manually test renewal (without actual renewal)
sudo certbot renew --dry-run

# Manually renew (if needed)
sudo certbot renew
```

---

## 🚨 Troubleshooting

### Issue: "Cannot connect to backend API"

```bash
# Check if backend is running on port 5000
sudo netstat -tulpn | grep 5000

# Check Express backend logs
cd /var/www/furniture
pm2 logs furniture-api
```

### Issue: "SSL certificate not found"

```bash
# Verify certificate files exist
ls -la /etc/letsencrypt/live/furnitures.lumicore-labs.com/

# If not found, run Certbot again
sudo certbot --nginx -d furnitures.lumicore-labs.com -d www.furnitures.lumicore-labs.com
```

### Issue: "Permission denied" errors

```bash
# Ensure proper ownership
sudo chown -R www-data:www-data /var/www/furniture

# Ensure proper permissions
sudo chmod -R 755 /var/www/furniture
```

### Issue: "Vue Router not working / 404 errors"

Check that `try_files $uri $uri/ /index.html;` is in the nginx.conf location block.

```bash
# Verify the configuration
sudo cat /etc/nginx/sites-available/furniture | grep -A 5 "try_files"
```

### Issue: "Images/uploads not loading"

```bash
# Verify uploads directory exists and is accessible
ls -la /var/www/furniture/server/uploads

# Check nginx configuration for uploads location
sudo cat /etc/nginx/sites-available/furniture | grep -A 5 "/uploads"
```

---

## 📊 Performance Optimization

The Nginx configuration includes several optimizations:

1. **Gzip Compression** - Reduces file sizes for faster transfer
2. **Browser Caching** - 30-day cache for static assets
3. **SSL Session Caching** - Improves HTTPS performance
4. **HTTP/2** - Faster multiplexed requests
5. **Proxy Timeouts** - 300s timeouts for long-running API requests

---

## 🔄 Updating Nginx Configuration

If you need to update the configuration:

```bash
# Copy updated nginx.conf from project
sudo cp /var/www/furniture/nginx.conf /etc/nginx/sites-available/furniture

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Verify changes
curl -I https://furnitures.lumicore-labs.com
```

---

## 📞 Domain & DNS Setup

Ensure your DNS records are properly configured:

```
A Record:    furnitures.lumicore-labs.com  →  YOUR_VPS_IP
CNAME Record: www.furnitures.lumicore-labs.com  →  furnitures.lumicore-labs.com
```

Test DNS resolution:

```bash
# Check DNS resolution
nslookup furnitures.lumicore-labs.com
dig furnitures.lumicore-labs.com
```

---

## 📋 Quick Reference Commands

| Task | Command |
|------|---------|
| Start Nginx | `sudo systemctl start nginx` |
| Stop Nginx | `sudo systemctl stop nginx` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Reload Config | `sudo systemctl reload nginx` |
| Test Config | `sudo nginx -t` |
| View Status | `sudo systemctl status nginx` |
| View Access Log | `sudo tail -f /var/log/nginx/access.log` |
| View Error Log | `sudo tail -f /var/log/nginx/error.log` |
| Renew SSL | `sudo certbot renew` |
| Check SSL | `sudo certbot certificates` |

---

## 📝 Configuration File Locations

| File | Location |
|------|----------|
| Project Nginx Config | `/var/www/furniture/nginx.conf` |
| Enabled Site Config | `/etc/nginx/sites-enabled/furniture` |
| Available Site Config | `/etc/nginx/sites-available/furniture` |
| Main Nginx Config | `/etc/nginx/nginx.conf` |
| SSL Certificate | `/etc/letsencrypt/live/furnitures.lumicore-labs.com/fullchain.pem` |
| SSL Private Key | `/etc/letsencrypt/live/furnitures.lumicore-labs.com/privkey.pem` |
| Access Log | `/var/log/nginx/access.log` |
| Error Log | `/var/log/nginx/error.log` |

---

## ✨ Next Steps

After Nginx is deployed:

1. ✅ Verify SSL certificate is working
2. ✅ Test all website functionality
3. ✅ Monitor Nginx logs for errors
4. ✅ Set up automated SSL renewal (should be automatic)
5. ✅ Configure monitoring/alerts for uptime
6. ✅ Set up backups for database and uploads

---

**Last Updated:** March 18, 2026  
**Domain:** furnitures.lumicore-labs.com  
**Project:** Furniture
