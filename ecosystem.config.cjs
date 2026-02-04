module.exports = {
  apps: [
    {
      name: 'dambulu-furniture-api',
      script: 'server.js',
      cwd: '/var/www/dambulu-furnitures/server',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: '/var/log/pm2/dambulu-furniture-error.log',
      out_file: '/var/log/pm2/dambulu-furniture-out.log',
      log_file: '/var/log/pm2/dambulu-furniture-combined.log',
      time: true,
    },
  ],
};
