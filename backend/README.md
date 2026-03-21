# Digital Contact Backend

Node.js + Express backend with SQLite database for the mobile app.

## Features

- User registration (`POST /api/auth/register`)
- User login (`POST /api/auth/login`)
- Profile fetch with JWT (`GET /api/auth/profile`)
- Health endpoint (`GET /api/health`)
- Auto-creates SQLite DB at `backend/data/digital-contact.db`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   copy .env.example .env
   ```
3. Start server:
   ```bash
   npm start
   ```

Server runs on `http://localhost:5000` by default.

## API examples

Register:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "contactNumber": "9876543210",
  "email": "jane@example.com",
  "password": "secret123"
}
```

Login:

```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "jane@example.com",
  "password": "secret123"
}
```

Profile:

```http
GET /api/auth/profile
Authorization: Bearer <token>
```
