import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type Firestore,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function requireDb(): Firestore {
  if (!db) throw new Error("Firestore غير مُهيأ (Firebase)");
  return db;
}

export function officeCollectionPath(collectionName: string) {
  return collection(requireDb(), collectionName);
}

export function listenByOffice<T extends DocumentData>(
  collectionName: string,
  officeId: string,
  orderField: string = "createdAt",
  cb: (rows: (T & { id: string })[]) => void,
  onError?: (err: unknown) => void,
) {
  const q = query(
    officeCollectionPath(collectionName),
    where("officeId", "==", officeId),
    orderBy(orderField, "desc"),
  );

  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
      cb(rows);
    },
    onError,
  );
}

export async function createDoc(collectionName: string, data: Record<string, any>) {
  return addDoc(officeCollectionPath(collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateDocById(
  collectionName: string,
  id: string,
  patch: Record<string, any>,
) {
  return updateDoc(doc(requireDb(), collectionName, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocById(collectionName: string, id: string) {
  return deleteDoc(doc(requireDb(), collectionName, id));
}
