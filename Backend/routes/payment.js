const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { platenumber, amountpaid, paymentdate } = req.body;
  try {
    const [fetchplate] = await db.query('SELECT * FROM parkingrecord WHERE platenumber=?', platenumber)
    const record_id = fetchplate[0].record_id
    console.log(fetchplate[0])
    await db.execute(
      'INSERT INTO payment (record_id, amountpaid, paymentdate) VALUES (?, ?, ?)',
      [record_id, amountpaid, paymentdate]
    );
    res.status(201).json({ message: 'Payment recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT p.*, r.platenumber FROM payment p
       JOIN parkingrecord r ON p.record_id = r.record_id`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/report/daily', async (req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT 
           r.platenumber,
           r.entrytime,
           r.exittime,
           r.duration,
           p.amountpaid
         FROM payment p
         INNER JOIN parkingrecord r ON p.record_id = r.record_id`
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
