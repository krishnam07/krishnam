const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { get, run } = require('../db');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

function buildUserResponse(userRow) {
  return {
    id: userRow.id,
    name: userRow.name,
    email: userRow.email,
    contactNumber: userRow.contact_number,
  };
}

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

router.post('/register', async (req, res) => {
  const { name, contactNumber, email, password } = req.body || {};

  if (!name || !contactNumber || !password) {
    res.status(400).json({ error: 'Name, contact number and password are required' });
    return;
  }

  if (!/^\d{10}$/.test(String(contactNumber))) {
    res.status(400).json({ error: 'Contact number must be exactly 10 digits' });
    return;
  }

  if (String(password).length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await run(
      `INSERT INTO users (name, contact_number, email, password_hash) VALUES (?, ?, ?, ?)`,
      [name.trim(), String(contactNumber), email ? String(email).trim().toLowerCase() : null, passwordHash]
    );

    const createdUser = await get(
      `SELECT id, name, email, contact_number FROM users WHERE contact_number = ?`,
      [String(contactNumber)]
    );

    const user = buildUserResponse(createdUser);
    const token = createToken(user);

    res.status(201).json({ token, user });
  } catch (error) {
    if (String(error.message).includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'Contact number or email is already registered' });
      return;
    }

    res.status(500).json({ error: 'Unable to register user' });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body || {};

  if (!identifier || !password) {
    res.status(400).json({ error: 'Identifier and password are required' });
    return;
  }

  try {
    const normalized = String(identifier).trim();
    const normalizedEmail = normalized.toLowerCase();

    const userRow = await get(
      `
      SELECT id, name, email, contact_number, password_hash
      FROM users
      WHERE contact_number = ? OR lower(email) = ? OR lower(name) = ?
      LIMIT 1
      `,
      [normalized, normalizedEmail, normalizedEmail]
    );

    if (!userRow) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const ok = await bcrypt.compare(password, userRow.password_hash);
    if (!ok) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const user = buildUserResponse(userRow);
    const token = createToken(user);

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Unable to login' });
  }
});

router.get('/profile', authRequired, async (req, res) => {
  try {
    const userRow = await get(
      `SELECT id, name, email, contact_number FROM users WHERE id = ?`,
      [req.user.sub]
    );

    if (!userRow) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(buildUserResponse(userRow));
  } catch (error) {
    res.status(500).json({ error: 'Unable to load profile' });
  }
});

module.exports = router;
