export function isFirebaseConfigured() {
  const v = import.meta.env;
  return Boolean(
    v.VITE_FIREBASE_API_KEY &&
      v.VITE_FIREBASE_AUTH_DOMAIN &&
      v.VITE_FIREBASE_PROJECT_ID &&
      v.VITE_FIREBASE_APP_ID,
  );
}
