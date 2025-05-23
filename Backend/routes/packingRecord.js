const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { platenumber, entrytime, exittime } = req.body;
  const duration = (new Date(exittime) - new Date(entrytime)) / (1000 * 60 * 60); 
  try {
    await db.execute(
      'INSERT INTO parkingrecord (platenumber, entrytime, exittime, duration) VALUES (?, ?, ?, ?)',
      [platenumber, entrytime, exittime, duration.toFixed(2)]
    );
    res.status(201).json({ message: 'Parking record added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all records  
router.get('/get', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM parkingrecord');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a record
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { exittime } = req.body;
  try {
    const [[record]] = await db.execute('SELECT entrytime FROM parkingrecord WHERE record_id = ?', [id]);
    const duration = (new Date(exittime) - new Date(record.entrytime)) / (1000 * 60 * 60);
    await db.execute(
      'UPDATE parkingrecord SET exittime = ?, duration = ? WHERE record_id = ?',
      [exittime, duration.toFixed(2), id]
    );
    res.json({ message: 'Record updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM parkingrecord WHERE record_id = ?', [req.params.id]);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
