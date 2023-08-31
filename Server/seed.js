const db = require('./database')
const seed = () => {
    db.query(`
    CREATE TABLE blogs(
        id SERIAL PRIMARY KEY,
        imageURL VARCHAR(500),
        title VARCHAR(40),
        description TEXT);
        
    `).then(()=>{
      console.log('Seeded')
    }) 
}

module.exports = seed