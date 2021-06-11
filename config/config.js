require('dotenv').config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_hostname = process.env.DB_HOSTNAME;

module.exports = 
{
  "development": {
    "username": db_username,
      "password": db_password,
        "database": db_name,
          "host": db_hostname,
            "dialect": "mysql"
  },
  "test": {
    "username": db_username,
      "password": db_password,
        "database": db_name,
          "host": db_hostname,
            "dialect": "mysql"
  },
  "production": {
    "username": db_username,
      "password": db_password,
        "database": db_name,
          "host": db_hostname,
            "dialect": "mysql"
  }
}
