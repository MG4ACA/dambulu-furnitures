module.exports = {
  apps: [
    {
      name: 'rimaco-furniture-api',
      script: 'server.js',
      cwd: '/var/www/rimaco-furniture/server',
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
      error_file: '/var/log/pm2/rimaco-furniture-error.log',
      out_file: '/var/log/pm2/rimaco-furniture-out.log',
      log_file: '/var/log/pm2/rimaco-furniture-combined.log',
      time: true,
    },
  ],
};
