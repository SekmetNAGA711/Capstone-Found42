
const db = require('./database');

const seed = async () => {
  try {
    // This will drop the tables if they exist and recreate them
    await db.sync({ force: true });

    // Your table creation logic should be part of the sync operation
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs(
          id SERIAL PRIMARY KEY,
          imageURL VARCHAR(500),
          title VARCHAR(40),
          description TEXT
      );
    `);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

// Execute the seed function
seed();

