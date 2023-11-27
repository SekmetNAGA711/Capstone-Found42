require('dotenv').config()
const CONNECTION_STRING = process.env.CONNECTION_STRING
const {Sequelize} = require('sequelize')

const db = new Sequelize(CONNECTION_STRING)

module.exports = db


// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// // Check for the Heroku environment variable, otherwise use the development connection string
// const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/Health-is-Wealth';

// const db = new Sequelize(CONNECTION_STRING, {
//   dialect: 'postgres', 
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false 
//     }
//   },
//   logging: false 
// });

// module.exports = db;

// const { Sequelize } = require('sequelize');


// const CONNECTION_STRING = process.env.DATABASE_URL;

// const db = new Sequelize(CONNECTION_STRING, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false 
//     }
//   },
//   logging: false 
// });

// module.exports = db;
