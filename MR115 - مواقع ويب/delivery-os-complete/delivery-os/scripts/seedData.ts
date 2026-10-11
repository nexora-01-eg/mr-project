// scripts/seedData.ts
// Run: npx ts-node scripts/seedData.ts
// ⚠️ Only run once on a fresh project

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json'; // download from Firebase Console

initializeApp({ credential: cert(serviceAccount as any) });
const db = getFirestore();

const OFFICE_ID = 'office_express_cairo';

async function seed() {
  // 1. Create office
  await db.collection('offices').doc(OFFICE_ID).set({
    name: 'Express Cairo',
    subscriptionStatus: 'active',
    createdAt: Timestamp.now(),
  });
  console.log('✅ Office created');

  // 2. Create drivers
  const drivers = [
    { name: 'Karim Youssef', phone: '0100 111 2222', status: 'online' },
    { name: 'Hassan Said', phone: '0111 222 3333', status: 'online' },
    { name: 'Adel Mostafa', phone: '0122 333 4444', status: 'offline' },
  ];

  const driverIds: string[] = [];
  for (const d of drivers) {
    const ref = await db.collection('drivers').add({ ...d, officeId: OFFICE_ID, createdAt: Timestamp.now() });
    driverIds.push(ref.id);
    console.log(`✅ Driver: ${d.name}`);
  }

  // 3. Create sample orders
  const statuses = ['pending', 'pending', 'assigned', 'delivered', 'delivered', 'cancelled'];
  const orders = [
    { customerName: 'Ahmed Hassan', customerPhone: '0100 123 4567', pickupAddress: '5 Tahrir Sq, Cairo', deliveryAddress: '12 Nasr City', price: 85, notes: 'Fragile' },
    { customerName: 'Sara Mahmoud', customerPhone: '0111 234 5678', pickupAddress: '3 Heliopolis', deliveryAddress: '8 Maadi', price: 120, notes: '' },
    { customerName: 'Mohamed Ali', customerPhone: '0122 345 6789', pickupAddress: '7 Zamalek', deliveryAddress: '22 Dokki', price: 65, notes: 'Call before delivery' },
    { customerName: 'Fatma Ibrahim', customerPhone: '0100 456 7890', pickupAddress: '15 Mohandessin', deliveryAddress: '6th October City', price: 200, notes: 'Large package' },
    { customerName: 'Omar Khaled', customerPhone: '0115 567 8901', pickupAddress: '9 New Cairo', deliveryAddress: '45 Helwan', price: 95, notes: '' },
    { customerName: 'Nour El-Din', customerPhone: '0101 678 9012', pickupAddress: '2 Garden City', deliveryAddress: '18 Shubra', price: 75, notes: 'Ring twice' },
  ];

  for (let i = 0; i < orders.length; i++) {
    const status = statuses[i];
    await db.collection('orders').add({
      ...orders[i],
      officeId: OFFICE_ID,
      status,
      driverId: status === 'assigned' || status === 'delivered' ? driverIds[0] : null,
      createdAt: Timestamp.fromDate(new Date(Date.now() - i * 3600000)),
      updatedAt: Timestamp.now(),
    });
    console.log(`✅ Order: ${orders[i].customerName}`);
  }

  console.log('\n🎉 Seed complete! Your database is ready.');
}

seed().catch(console.error);
