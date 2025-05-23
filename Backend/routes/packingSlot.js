const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { PlateNumber, DriverName, PhoneNumber, SlotStatus } = req.body;
  try {
    await db.execute(
      'INSERT INTO parkingslot (platenumber, drivername, phonenumber, slotstatus) VALUES (?, ?, ?, ?)',
      [PlateNumber, DriverName, PhoneNumber, SlotStatus]
    );
    res.status(201).json({ message: 'Parking slot assigned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM parkingslot');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
