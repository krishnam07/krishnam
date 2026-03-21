# Digital Contact Mobile App

Separate React Native (Expo) mobile app for Digital Contact with compact mobile-first UI and small, clean icon buttons.

This workspace now includes a backend API and SQLite database in `backend/`.

## Features included

- Home screen with compact actions: Get Started, Sign In, Profile, Your QR Code, Scan
- Login/Register connected to existing backend auth APIs
- Profile screen with session persistence (AsyncStorage)
- Mobile-optimized button/icon sizing and spacing

## Setup

1. Install mobile dependencies:

```bash
cd 
npm install
```

2. Install backend dependencies:

```bash
npm --prefix backend install
```

3. Start backend API:

```bash
npm run backend
```

4. Set API URL for Expo app (important for physical device):

Option A (recommended): create `.env` in `mobile-app/` from `.env.example` and set `EXPO_PUBLIC_API_URL`.

Windows PowerShell:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://YOUR_LOCAL_IP:5005/api"
```

Example value: `http://192.168.1.10:5005/api`

Notes:

- Android emulator fallback is `http://10.0.2.2:5005/api`
- iOS simulator/local web fallback is `http://localhost:5005/api`
- Physical devices must use your machine LAN IP

5. Start Expo:

```bash
npm start
```

Then run on Android/iOS emulator or Expo Go.

## Notes

- `QRScreen` and `ScannerScreen` are scaffolded placeholders ready for your QR generator/scanner integration.
- The app is intentionally compact for mobile screens with small and clear controls.

## Backend API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (Bearer token)

Backend files are in `backend/` and SQLite DB is created at `backend/data/digital-contact.db`.
