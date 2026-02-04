# 🚀 Dambulu Furniture Shop - VPS Deployment Guide

This guide will help you deploy the Dambulu Furniture website to your Hostinger VPS (Ubuntu).

## Prerequisites
- ✅ VPS with Ubuntu (4GB RAM)
- ✅ Node.js (latest) installed
- ✅ PM2 installed
- ✅ MySQL installed
- ✅ SSH access
- ✅ Domain name pointed to your VPS IP

---

## 📋 Step-by-Step Deployment

### Step 1: Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP
# Or use Hostinger's browser terminal
```

### Step 2: Check if Nginx is Installed
```bash
nginx -v
# If not installed:
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Step 3: Create Project Directory
```bash
sudo mkdir -p /var/www/dambulu-furnitures
cd /var/www/dambulu-furnitures
```

### Step 4: Clone Your Repository
```bash
# Option A: If using GitHub
git clone https://github.com/YOUR_USERNAME/dambulu-furnitures.git .

# Option B: Or upload files using SFTP/SCP
```

### Step 5: Create MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# In MySQL shell:
CREATE DATABASE dambulu_furniture CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'furniture_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON dambulu_furniture.* TO 'furniture_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 6: Configure Backend Environment
```bash
cd /var/www/dambulu-furnitures/server

# Create production .env file
nano .env
```

Add this content (update with your values):
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
DB_HOST=localhost
DB_USER=furniture_user
DB_PASSWORD=YourSecurePassword123!
DB_NAME=dambulu_furniture
DB_PORT=3306

# CORS
CORS_ORIGIN=https://YOUR_DOMAIN.com
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

### Step 7: Install Backend Dependencies & Initialize Database
```bash
cd /var/www/dambulu-furnitures/server
npm install

# Initialize database tables and sample data
npm run db:init
```

### Step 8: Build the Frontend
```bash
cd /var/www/dambulu-furnitures/client

# Update API URL for production
nano src/services/api.js
```

Update the baseURL to your domain:
```javascript
const API = axios.create({
  baseURL: 'https://YOUR_DOMAIN.com/api',
  // ... rest of config
})
```

Then build:
```bash
npm install
npm run build
```

### Step 9: Configure Nginx
```bash
# Copy the nginx config
sudo cp /var/www/dambulu-furnitures/nginx.conf /etc/nginx/sites-available/dambulu-furniture

# Edit and replace YOUR_DOMAIN.com with actual domain
sudo nano /etc/nginx/sites-available/dambulu-furniture

# Enable the site
sudo ln -sf /etc/nginx/sites-available/dambulu-furniture /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 10: Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Follow the prompts - select option to redirect HTTP to HTTPS
```

### Step 11: Start the Backend with PM2
```bash
cd /var/www/dambulu-furnitures

# Create log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start the app
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration to auto-start on reboot
pm2 save
pm2 startup
# Run the command it outputs
```

### Step 12: Set Proper Permissions
```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/dambulu-furnitures

# Set permissions for uploads directory
sudo chmod -R 755 /var/www/dambulu-furnitures/server/uploads

# Allow PM2 user to access
sudo chown -R $USER:$USER /var/www/dambulu-furnitures/server/uploads
```

---

## 🔧 Useful Commands

### PM2 Commands
```bash
# View running apps
pm2 list

# View logs
pm2 logs dambulu-furniture-api

# Restart app
pm2 restart dambulu-furniture-api

# Stop app
pm2 stop dambulu-furniture-api

# Monitor resources
pm2 monit
```

### Nginx Commands
```bash
# Test config
sudo nginx -t

# Reload
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Commands
```bash
# Login to MySQL
mysql -u furniture_user -p dambulu_furniture

# View products
SELECT id, name, price FROM products;

# View quotes
SELECT * FROM quotes ORDER BY created_at DESC;
```

---

## 🔄 Updating the Application

When you need to deploy updates:

```bash
cd /var/www/dambulu-furnitures

# Pull latest changes
git pull origin main

# Update backend
cd server
npm install
pm2 restart dambulu-furniture-api

# Update frontend
cd ../client
npm install
npm run build

# Clear nginx cache (if any)
sudo systemctl reload nginx
```

---

## 🛠️ Troubleshooting

### Backend not working?
```bash
# Check PM2 status
pm2 status

# View backend logs
pm2 logs dambulu-furniture-api --lines 100

# Check if port 5000 is in use
sudo netstat -tulpn | grep 5000
```

### Frontend not loading?
```bash
# Check nginx error log
sudo tail -f /var/log/nginx/error.log

# Make sure dist folder exists
ls -la /var/www/dambulu-furnitures/client/dist
```

### Database connection failed?
```bash
# Test MySQL connection
mysql -u furniture_user -p -e "SELECT 1"

# Check .env file
cat /var/www/dambulu-furnitures/server/.env
```

### SSL certificate issues?
```bash
# Renew certificate
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates
```

---

## 📁 Project Structure on VPS

```
/var/www/dambulu-furnitures/
├── client/
│   ├── dist/          # Built frontend files (served by Nginx)
│   ├── src/
│   └── package.json
├── server/
│   ├── db/
│   │   ├── connection.js
│   │   └── init.js
│   ├── uploads/       # Product images
│   ├── server.js
│   ├── .env           # Production environment
│   └── package.json
├── ecosystem.config.cjs
├── nginx.conf
└── README.md
```

---

## 🎉 You're Done!

Your website should now be live at:
- **Frontend**: https://YOUR_DOMAIN.com
- **API**: https://YOUR_DOMAIN.com/api
- **Health Check**: https://YOUR_DOMAIN.com/api/health

Need help? Check the troubleshooting section or review the logs.
