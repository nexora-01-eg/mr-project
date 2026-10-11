// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Truck } from 'lucide-react';
import { useStore } from '../../store';

const NAV = [
  { path: '/',        label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders',  label: 'Orders',    icon: Package },
  { path: '/drivers', label: 'Drivers',   icon: Truck },
];

export default function Sidebar() {
  const user = useStore((s) => s.user);
  const pendingOrders = useStore((s) => s.pendingOrders)();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brand-icon">🚀</div>
        DeliveryOS
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-section">Main</div>
        {NAV.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={16} className="nav-icon" />
            {label}
            {label === 'Orders' && pendingOrders.length > 0 && (
              <span className="nav-badge">{pendingOrders.length}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Office badge */}
      <div className="sidebar-footer">
        <div className="office-badge">
          <div className="office-avatar">
            {user?.name?.slice(0, 2).toUpperCase() ?? 'OF'}
          </div>
          <div>
            <div className="office-name">{user?.name ?? 'Office Admin'}</div>
            <div className="office-role">{user?.role ?? 'admin'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
