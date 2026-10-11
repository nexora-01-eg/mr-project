// Design system reminder (Noir Ops): dark luxury, crisp borders, soft-gold accents.

import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { isFirebaseConfigured } from "@/lib/runtime";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

if (isFirebaseConfigured()) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  _app = initializeApp(firebaseConfig);
  _auth = getAuth(_app);
  _db = getFirestore(_app);
  _storage = getStorage(_app);
  setPersistence(_auth, browserLocalPersistence);
}

export const firebaseApp = _app;
export const auth = _auth;
export const db = _db;
export const storage = _storage;

export function getFirebaseOrThrow(): { app: FirebaseApp; auth: Auth; db: Firestore; storage: FirebaseStorage } {
  if (!_app || !_auth || !_db || !_storage) {
    throw new Error(
      "Firebase غير مُهيأ. انسخ .env.example إلى .env وأدخل بيانات Firebase ثم أعد التشغيل.",
    );
  }
  return { app: _app, auth: _auth, db: _db, storage: _storage };
}
