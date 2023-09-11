// Import the Sequelize library to create a Sequelize instance.
const Sequelize = require('sequelize');

// Import the dotenv library to read environment variables from a .env file.
/// Change the env.EXAMPLE.file and add your SQL password to use on your local
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, //process.env object in node.js to get our env variables
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;

// Summary
/// This code sets up a Sequelize instance for connecting to a MySQL db.
/// So it checks whether the JAWSDB_URL environment variable is set (indicating a remote database) and configures Sequelize accordingly.
/// If JAWSDB_URL is not set, it uses local configs from environment variables to connect to a local MySQL database.
