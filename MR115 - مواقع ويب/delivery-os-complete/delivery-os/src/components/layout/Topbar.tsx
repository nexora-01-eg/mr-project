// src/components/layout/Topbar.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useStore } from '../../store';
import toast from 'react-hot-toast';

const PAGE_TITLES: Record<string, string> = {
  '/':        'Dashboard',
  '/orders':  'Orders',
  '/drivers': 'Drivers',
};

export default function Topbar() {
  const { pathname } = useLocation();
  const user = useStore((s) => s.user);
  const title = PAGE_TITLES[pathname] ?? 'Dashboard';

  async function handleSignOut() {
    await signOut(auth);
    toast.success('Signed out');
  }

  return (
    <header className="topbar">
      <h1 className="page-title">{title}</h1>
      <div className="topbar-right">
        <div className="live-dot" title="Real-time sync active" />
        <span style={{ fontSize: 12, color: 'var(--text3)', marginRight: 4 }}>Live</span>
        <button className="topbar-btn" onClick={handleSignOut} title="Sign out">
          Sign out
        </button>
        <div className="avatar" title={user?.name ?? 'User'}>
          {user?.name?.slice(0, 2).toUpperCase() ?? 'AD'}
        </div>
      </div>
    </header>
  );
}
