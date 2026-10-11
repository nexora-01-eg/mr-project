// src/components/layout/AppLayout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useStore } from '../../store';
import { subscribeToOrders } from '../../services/orders.service';
import { subscribeToDrivers } from '../../services/drivers.service';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import type { User } from '../../types';

type AuthState = 'loading' | 'authed' | 'unauthed';

export default function AppLayout() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const { setUser, setOrders, setDrivers } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) { setAuthState('unauthed'); return; }

      // Load user profile from Firestore
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (!snap.exists()) { setAuthState('unauthed'); return; }

      const userData = { id: firebaseUser.uid, ...snap.data() } as User;
      setUser(userData);
      setAuthState('authed');

      // Subscribe to real-time data
      const unsubOrders = subscribeToOrders(userData.officeId, setOrders);
      const unsubDrivers = subscribeToDrivers(userData.officeId, setDrivers);

      return () => { unsubOrders(); unsubDrivers(); };
    });

    return () => unsub();
  }, []);

  if (authState === 'loading') {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading DeliveryOS...</p>
      </div>
    );
  }

  if (authState === 'unauthed') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
