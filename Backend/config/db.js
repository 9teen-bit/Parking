const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pssms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

const createTables = async () => {
  try {
   
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100),
        password VARCHAR(255)
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS parkingslot (
        slotnumber INT AUTO_INCREMENT PRIMARY KEY,
        platenumber VARCHAR(50),
        drivername VARCHAR(100),
        phonenumber VARCHAR(20),
        slotstatus ENUM('available', 'occupied') DEFAULT 'available'
      )
    `);


    await db.execute(`
      CREATE TABLE IF NOT EXISTS parkingrecord (
        record_id INT AUTO_INCREMENT PRIMARY KEY,
        platenumber VARCHAR(50),
        entrytime DATETIME,
        exittime DATETIME,
        duration FLOAT
      ) 
    `);


    await db.execute(`
      CREATE TABLE IF NOT EXISTS payment (
        paymentid INT AUTO_INCREMENT PRIMARY KEY,
        record_id INT,
        amountpaid FLOAT,
        paymentdate DATE,
        FOREIGN KEY (record_id) REFERENCES parkingrecord(record_id) ON DELETE CASCADE
      )
    `);

    console.log("✅ All PSSMS tables created successfully.");
  } catch (err) {
    console.error("❌ Failed to create tables:", err.message);
  }
};

createTables();

module.exports = db;
