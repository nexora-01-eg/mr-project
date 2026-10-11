// src/pages/Drivers.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../store';
import { createDriver, setDriverStatus, deleteDriver as deleteDriverSvc } from '../services/drivers.service';
import type { Driver } from '../types';

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

// ---- Add Driver Modal ----
function DriverModal({ onClose }: { onClose: () => void }) {
  const user = useStore((s) => s.user)!;
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit() {
    if (!form.name || !form.phone) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await createDriver(user.officeId, form);
      toast.success(`Driver ${form.name} added!`);
      onClose();
    } catch { toast.error('Failed to add driver'); }
    finally { setLoading(false); }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New Driver</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input value={form.name} onChange={set('name')} placeholder="Driver full name" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input value={form.phone} onChange={set('phone')} placeholder="01xx xxx xxxx" />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Adding...' : 'Add Driver'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Driver Card ----
function DriverCard({ driver }: { driver: Driver }) {
  const orders = useStore((s) => s.orders);
  const activeOrders = orders.filter((o) => o.driverId === driver.id && o.status === 'assigned').length;
  const deliveredOrders = orders.filter((o) => o.driverId === driver.id && o.status === 'delivered').length;
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    try {
      const next = driver.status === 'online' ? 'offline' : 'online';
      await setDriverStatus(driver.id, next);
      toast.success(`${driver.name} is now ${next}`);
    } catch { toast.error('Update failed'); }
    finally { setLoading(false); }
  }

  async function handleDelete() {
    if (!confirm(`Remove driver ${driver.name}?`)) return;
    try {
      await deleteDriverSvc(driver.id);
      toast.success(`${driver.name} removed`);
    } catch { toast.error('Delete failed'); }
  }

  return (
    <div className="driver-card">
      <div className="driver-top">
        <div className="driver-avatar">{initials(driver.name)}</div>
        <div className="driver-info">
          <div className="driver-name">{driver.name}</div>
          <div className="driver-phone">{driver.phone}</div>
        </div>
        <span className={`badge badge-${driver.status}`}>{driver.status}</span>
      </div>
      <div className="driver-stats">
        <div className="driver-stat-item">
          <div className="driver-stat-val">{activeOrders}</div>
          <div className="driver-stat-label">Active Orders</div>
        </div>
        <div className="driver-stat-item">
          <div className="driver-stat-val">{deliveredOrders}</div>
          <div className="driver-stat-label">Delivered</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="action-btn" style={{ flex: 1, textAlign: 'center' }} onClick={toggleStatus} disabled={loading}>
          {driver.status === 'online' ? 'Set Offline' : 'Set Online'}
        </button>
        <button className="action-btn danger" onClick={handleDelete}>Remove</button>
      </div>
    </div>
  );
}

// ---- Main Drivers Page ----
export default function Drivers() {
  const drivers = useStore((s) => s.drivers);
  const [modal, setModal] = useState(false);

  const online = drivers.filter((d) => d.status === 'online').length;
  const offline = drivers.filter((d) => d.status === 'offline').length;

  return (
    <div className="page-content">
      <div className="section-header">
        <h2 className="section-title">Drivers</h2>
        <button className="btn btn-primary" onClick={() => setModal(true)}>+ Add Driver</button>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div className="stat-card green" style={{ flex: 1, padding: '14px 18px' }}>
          <div className="stat-label">Online</div>
          <div className="stat-value">{online}</div>
        </div>
        <div className="stat-card" style={{ flex: 1, padding: '14px 18px' }}>
          <div className="stat-label">Offline</div>
          <div className="stat-value">{offline}</div>
        </div>
        <div className="stat-card gold" style={{ flex: 1, padding: '14px 18px' }}>
          <div className="stat-label">Total Drivers</div>
          <div className="stat-value">{drivers.length}</div>
        </div>
      </div>

      {drivers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚚</div>
          <div className="empty-text">No drivers yet. Add your first driver!</div>
        </div>
      ) : (
        <div className="drivers-grid">
          {drivers.map((d) => <DriverCard key={d.id} driver={d} />)}
        </div>
      )}

      {modal && <DriverModal onClose={() => setModal(false)} />}
    </div>
  );
}
