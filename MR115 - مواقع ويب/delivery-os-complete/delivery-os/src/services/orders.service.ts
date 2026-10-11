// src/services/orders.service.ts
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot, Timestamp,
  getDocs, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Order, OrderStatus } from '../types';

const COL = 'orders';

// Convert Firestore doc → Order
const fromDoc = (id: string, data: any): Order => ({
  id,
  officeId: data.officeId,
  customerName: data.customerName,
  customerPhone: data.customerPhone,
  pickupAddress: data.pickupAddress,
  deliveryAddress: data.deliveryAddress,
  price: data.price,
  notes: data.notes || '',
  status: data.status,
  driverId: data.driverId || null,
  createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
  updatedAt: (data.updatedAt as Timestamp)?.toDate() ?? new Date(),
});

// Real-time listener — filtered by officeId (multi-tenant)
export function subscribeToOrders(officeId: string, cb: (orders: Order[]) => void) {
  const q = query(
    collection(db, COL),
    where('officeId', '==', officeId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => fromDoc(d.id, d.data())));
  });
}

export async function createOrder(
  officeId: string,
  data: Omit<Order, 'id' | 'officeId' | 'createdAt' | 'updatedAt'>
) {
  return addDoc(collection(db, COL), {
    ...data,
    officeId,
    status: 'pending',
    driverId: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateOrder(id: string, data: Partial<Order>) {
  const { id: _id, createdAt: _c, ...rest } = data as any;
  return updateDoc(doc(db, COL, id), { ...rest, updatedAt: serverTimestamp() });
}

export async function assignDriver(orderId: string, driverId: string) {
  return updateDoc(doc(db, COL, orderId), {
    driverId,
    status: 'assigned' as OrderStatus,
    updatedAt: serverTimestamp(),
  });
}

export async function markDelivered(orderId: string) {
  return updateDoc(doc(db, COL, orderId), {
    status: 'delivered' as OrderStatus,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteOrder(id: string) {
  return deleteDoc(doc(db, COL, id));
}
