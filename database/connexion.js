const mysql = require('mysql2');

const connexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connexion.connect((err) => {
    if (err) {
        console.log('Erreur connexion MySQL :', err);
        return;
    }

    console.log('Connecté à MySQL');
});

module.exports = connexion;