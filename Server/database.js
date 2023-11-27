// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// // Check for the Heroku environment variable, otherwise use the development connection string
// const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/Health-is-Wealth';

// const db = new Sequelize(CONNECTION_STRING, {
//   dialect: 'postgres', // This explicitly sets the dialect for Sequelize
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // Necessary for Heroku to allow connection
//     }
//   },
//   logging: false // Optional: Disable SQL query logging
// });

// module.exports = db;

const { Sequelize } = require('sequelize');

// Use Heroku's DATABASE_URL directly
const CONNECTION_STRING = process.env.DATABASE_URL;

const db = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessary for Heroku to allow connection
    }
  },
  logging: false // Optional: Disable SQL query logging
});

module.exports = db;
