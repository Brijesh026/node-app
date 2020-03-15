const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const router = express.Router();

// open database in memory
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE users(name text UNIQUE)');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/submit', (req, res) => {
    db.run(`INSERT INTO users(name) VALUES(?)`, [req.body.name], function(err) {
        if (err) {
          return console.error(err.message); 
        }
        console.log(`A unique user " ${req.body.name} " has been added to the database.`);
      }); 
    res.redirect('/');
});
 
router.post('/close', (req, res) => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
    res.redirect('/');
    setTimeout(()=> {
        process.exit(0);
    }, 1000);
});   
  

module.exports = router;