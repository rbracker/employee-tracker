module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'your_database_user',
    password: process.env.DB_PASSWORD || 'your_database_password',
    database: process.env.DB_DATABASE || 'your_database_name',
  },
  server: {
    port: process.env.PORT || 3000,
  },
};
