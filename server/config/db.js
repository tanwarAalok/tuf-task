const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

const initializeBannerTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS banner (
      id INT AUTO_INCREMENT PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      timer INT NOT NULL,
      isVisible BOOLEAN NOT NULL DEFAULT TRUE,
      link VARCHAR(255),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;

    try {
        await db.query(createTableQuery);
        console.log("Banner table is ready.");
    } catch (err) {
        console.error("Error creating banner table:", err);
    }
};

initializeBannerTable();

module.exports = db;
