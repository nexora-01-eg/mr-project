// src/services/drivers.service.ts
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot, Timestamp, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Driver } from '../types';

const COL = 'drivers';

const fromDoc = (id: string, data: any): Driver => ({
  id,
  officeId: data.officeId,
  name: data.name,
  phone: data.phone,
  status: data.status,
  createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
});

export function subscribeToDrivers(officeId: string, cb: (drivers: Driver[]) => void) {
  const q = query(
    collection(db, COL),
    where('officeId', '==', officeId),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => fromDoc(d.id, d.data())));
  });
}

export async function createDriver(officeId: string, data: Pick<Driver, 'name' | 'phone'>) {
  return addDoc(collection(db, COL), {
    ...data,
    officeId,
    status: 'offline',
    createdAt: serverTimestamp(),
  });
}

export async function setDriverStatus(id: string, status: 'online' | 'offline') {
  return updateDoc(doc(db, COL, id), { status });
}

export async function deleteDriver(id: string) {
  return deleteDoc(doc(db, COL, id));
}
