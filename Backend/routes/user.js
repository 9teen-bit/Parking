const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {

    const [existingUser] = await db.execute(
      `SELECT * FROM users WHERE username = ? `,
      [username]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    await db.execute(
      `INSERT INTO users (username,  password) VALUES (?, ?)`,
      [username,  hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    res.status(200).json({ message:"logged in" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/logout', (req, res) => {
  
  res.status(200).json({ message: 'Logged out' });
});

module.exports = router;
