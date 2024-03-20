require('dotenv').config();
module.exports = {
  "development": {
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD,
    "database":process.env.DB_DATABASE_NAME,
    "port":process.env.DB_PORT,
    "host":process.env.DB_DATABASE_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD,
    "database":process.env.DB_DATABASE_NAME,
    "port":process.env.DB_PORT,
    "host":process.env.DB_DATABASE_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username":process.env.DB_USERNAME,
    "password":process.env.DB_PASSWORD,
    "database":process.env.DATABASE_NAME,
    "port":process.env.PORT,
    "host":process.env.DATABASE_HOST,
    "dialect": "mysql"
  }
}
