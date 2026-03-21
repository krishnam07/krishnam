const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const authRoutes = require('./routes/auth');

dotenv.config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'dev_only_change_me_in_production';
}

if (!process.env.DB_FILE) {
  process.env.DB_FILE = './data/digital-contact.db';
}

const absoluteDbPath = path.resolve(process.cwd(), process.env.DB_FILE);
fs.mkdirSync(path.dirname(absoluteDbPath), { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'digital-contact-backend' });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  // Catch malformed JSON and unexpected errors from middleware pipeline.
  if (err && err.type === 'entity.parse.failed') {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }
  next(err);
});

const port = Number(process.env.PORT || 5000);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
