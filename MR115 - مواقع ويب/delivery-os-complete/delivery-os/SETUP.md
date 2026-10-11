# 🚀 DeliveryOS — Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → Name it `delivery-os`
3. Disable Google Analytics (optional for MVP)
4. Click **Create project**

---

## Step 2: Enable Authentication

1. In Firebase Console → **Authentication** → Get Started
2. Click **Email/Password** → Enable → Save

---

## Step 3: Create Firestore Database

1. Firebase Console → **Firestore Database** → Create database
2. Choose **production mode** (we'll set rules manually)
3. Select region closest to your users (e.g., `europe-west1` for Egypt)

---

## Step 4: Add Web App

1. Firebase Console → Project Overview → Click `</>` (Web)
2. App nickname: `delivery-os-web`
3. Copy the config object — you'll need it next

---

## Step 5: Environment Variables

Create `.env.local` in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Step 6: Deploy Firestore Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (select Firestore only)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

---

## Step 7: Firestore Indexes

Create these composite indexes in Firebase Console → Firestore → Indexes:

| Collection | Fields | Order |
|---|---|---|
| `orders` | `officeId` ASC, `createdAt` DESC | — |
| `drivers` | `officeId` ASC, `createdAt` ASC | — |

---

## Step 8: Seed Sample Data

```bash
# Download service account key from:
# Firebase Console → Project Settings → Service Accounts → Generate new private key
# Save as scripts/serviceAccountKey.json

# Run seed
npx ts-node scripts/seedData.ts
```

---

## Step 9: Create First Admin User

After running the app:
1. Register a user via Firebase Auth
2. In Firestore, manually create a document in `users/` collection:

```json
{
  "id": "<firebase_auth_uid>",
  "name": "Admin User",
  "email": "admin@youroffice.com",
  "role": "admin",
  "officeId": "office_express_cairo"
}
```

---

## Step 10: Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 📁 Project Structure

```
delivery-os/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       ├── Table.tsx
│   │       └── StatCard.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Orders.tsx
│   │   └── Drivers.tsx
│   ├── hooks/
│   │   └── index.ts          # useOrders, useDrivers, useDashboardStats
│   ├── services/
│   │   ├── orders.service.ts
│   │   └── drivers.service.ts
│   ├── store/
│   │   └── index.ts          # Zustand store
│   ├── lib/
│   │   └── firebase.ts
│   └── types/
│       └── index.ts
├── scripts/
│   └── seedData.ts
├── firestore.rules
├── .env.local
└── package.json
```

---

## 🔐 Multi-tenant Architecture

Every data query is filtered by `officeId`:
- Orders: `where('officeId', '==', user.officeId)`
- Drivers: `where('officeId', '==', user.officeId)`
- Firestore Rules enforce this on the server side

To add a new office:
1. Create document in `offices/` collection
2. Set `subscriptionStatus: 'active'`
3. Create users with matching `officeId`

---

## 🚀 V2 Roadmap

- [ ] Google Maps integration (driver live location)
- [ ] WhatsApp notifications via Twilio
- [ ] Auto-assign nearest driver (Geolocation)
- [ ] Mobile app for drivers (React Native + Expo)
- [ ] Analytics page with revenue charts
- [ ] Stripe subscription billing
- [ ] PDF invoice generator
