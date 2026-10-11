import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Smart auto-assignment (server-side) — simplified reference implementation.
// In production: add distance calculation (Maps API), geohash, rate limiting, and audit logs.
export const suggestDriverForOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError("unauthenticated", "Auth required");

  const officeId = String(data.officeId || "");
  if (!officeId) throw new functions.https.HttpsError("invalid-argument", "officeId required");

  const driversSnap = await db
    .collection("drivers")
    .where("officeId", "==", officeId)
    .where("status", "==", "online")
    .get();

  const drivers = driversSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  if (!drivers.length) return { driverId: null };

  // Score = rating + inverse(avgTime) + inverse(workload)
  const ranked = drivers
    .map((d) => {
      const rating = Number(d.rating || 0);
      const avg = Math.max(10, Number(d.averageDeliveryTime || 60));
      const workload = Math.max(1, Number(d.currentWorkload || 1));
      const score = rating * 0.55 + (1 / avg) * 20 + (1 / workload) * 10;
      return { id: d.id, score };
    })
    .sort((a, b) => b.score - a.score);

  return { driverId: ranked[0].id };
});
