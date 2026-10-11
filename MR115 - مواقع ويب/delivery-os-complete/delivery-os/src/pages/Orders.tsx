// src/pages/Orders.tsx
import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useStore } from '../store';
import {
  createOrder, updateOrder, deleteOrder as deleteOrderSvc,
  assignDriver, markDelivered,
} from '../services/orders.service';
import type { Order, OrderStatus } from '../types';

const STATUS_FILTERS: (OrderStatus | 'all')[] = ['all', 'pending', 'assigned', 'delivered', 'cancelled'];

// ---- Order Form Modal ----
function OrderModal({ order, onClose }: { order?: Order; onClose: () => void }) {
  const user = useStore((s) => s.user)!;
  const [form, setForm] = useState({
    customerName: order?.customerName || '',
    customerPhone: order?.customerPhone || '',
    pickupAddress: order?.pickupAddress || '',
    deliveryAddress: order?.deliveryAddress || '',
    price: order?.price?.toString() || '',
    notes: order?.notes || '',
    status: order?.status || 'pending',
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleSubmit() {
    if (!form.customerName || !form.customerPhone || !form.pickupAddress || !form.deliveryAddress) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const data = { ...form, price: parseFloat(form.price) || 0, driverId: order?.driverId || null };
      if (order) {
        await updateOrder(order.id, data as any);
        toast.success('Order updated!');
      } else {
        await createOrder(user.officeId, data as any);
        toast.success('Order created!');
      }
      onClose();
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{order ? 'Edit Order' : 'New Order'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Customer Name *</label>
              <input value={form.customerName} onChange={set('customerName')} placeholder="Full name" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input value={form.customerPhone} onChange={set('customerPhone')} placeholder="01xx xxx xxxx" />
            </div>
            <div className="form-group">
              <label>Pickup Address *</label>
              <input value={form.pickupAddress} onChange={set('pickupAddress')} placeholder="Pickup location" />
            </div>
            <div className="form-group">
              <label>Delivery Address *</label>
              <input value={form.deliveryAddress} onChange={set('deliveryAddress')} placeholder="Delivery location" />
            </div>
            <div className="form-group">
              <label>Price (EGP)</label>
              <input type="number" value={form.price} onChange={set('price')} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={set('status')}>
                {['pending', 'assigned', 'delivered', 'cancelled'].map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="form-group full">
              <label>Notes</label>
              <textarea value={form.notes} onChange={set('notes')} placeholder="Special instructions..." />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : order ? 'Save Changes' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Assign Driver Modal ----
function AssignModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const drivers = useStore((s) => s.drivers);
  const online = drivers.filter((d) => d.status === 'online');
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAssign() {
    if (!selected) { toast.error('Select a driver first'); return; }
    setLoading(true);
    try {
      await assignDriver(orderId, selected);
      toast.success('Driver assigned!');
      onClose();
    } catch { toast.error('Assignment failed'); }
    finally { setLoading(false); }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Assign Driver</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {online.length === 0 ? (
            <div className="empty-state">🚚 No online drivers available</div>
          ) : (
            online.map((d) => (
              <div
                key={d.id}
                className={`driver-option ${selected === d.id ? 'selected' : ''}`}
                onClick={() => setSelected(d.id)}
              >
                <div className="driver-option-avatar">{d.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}</div>
                <div>
                  <p style={{ fontWeight: 500, fontSize: 13.5, color: 'var(--text)' }}>{d.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text3)' }}>{d.phone}</p>
                </div>
                <span className="badge badge-online">Online</span>
              </div>
            ))
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAssign} disabled={loading || !selected}>
            {loading ? 'Assigning...' : 'Assign Driver'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main Orders Page ----
export default function Orders() {
  const orders = useStore((s) => s.orders);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | 'assign' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    let list = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
    if (search) list = list.filter((o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [orders, filter, search]);

  async function handleDelete(id: string) {
    if (!confirm(`Delete order ${id}?`)) return;
    try {
      await deleteOrderSvc(id);
      toast.success('Order deleted');
    } catch { toast.error('Delete failed'); }
  }

  async function handleMarkDelivered(id: string) {
    try {
      await markDelivered(id);
      toast.success('Marked as delivered!');
    } catch { toast.error('Update failed'); }
  }

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="page-content">
      <div className="section-header">
        <h2 className="section-title">All Orders</h2>
        <button className="btn btn-primary" onClick={() => setModal('create')}>
          <Plus size={15} /> New Order
        </button>
      </div>

      <div className="table-wrap">
        <div className="table-header">
          <div className="filters">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? `All (${orders.length})` : f === 'pending' ? `Pending (${pendingCount})` : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <input
            className="search-input"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Delivery Address</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">📭 No orders found</div>
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customerName}</td>
                  <td className="text-muted">{order.customerPhone}</td>
                  <td className="text-muted truncate">{order.deliveryAddress}</td>
                  <td className="price">{order.price} EGP</td>
                  <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                  <td>
                    <div className="actions-cell">
                      {order.status === 'pending' && (
                        <button className="action-btn success" onClick={() => { setSelectedOrder(order); setModal('assign'); }}>
                          Assign
                        </button>
                      )}
                      {order.status === 'assigned' && (
                        <button className="action-btn success" onClick={() => handleMarkDelivered(order.id)}>
                          ✓ Delivered
                        </button>
                      )}
                      <button className="action-btn" onClick={() => { setSelectedOrder(order); setModal('edit'); }}>Edit</button>
                      <button className="action-btn danger" onClick={() => handleDelete(order.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal === 'create' && <OrderModal onClose={() => setModal(null)} />}
      {modal === 'edit' && selectedOrder && <OrderModal order={selectedOrder} onClose={() => setModal(null)} />}
      {modal === 'assign' && selectedOrder && <AssignModal orderId={selectedOrder.id} onClose={() => setModal(null)} />}
    </div>
  );
}
