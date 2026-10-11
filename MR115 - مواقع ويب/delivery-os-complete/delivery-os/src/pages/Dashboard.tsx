// src/pages/Dashboard.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Clock, Truck, CheckCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { useDashboardStats } from '../hooks';
import { useStore } from '../store';

const StatCard = ({ label, value, icon: Icon, color, sub }: any) => (
  <div className={`stat-card ${color}`}>
    <Icon size={20} className="stat-icon" />
    <p className="stat-label">{label}</p>
    <p className="stat-value">{value}</p>
    {sub && <p className="stat-sub">{sub}</p>}
  </div>
);

export default function Dashboard() {
  const stats = useDashboardStats();
  const orders = useStore((s) => s.orders);

  const weeklyChartData = Array.from({ length: 7 }, (_, i) => ({
    day: format(subDays(new Date(), 6 - i), 'EEE'),
    orders: stats.weeklyData[i] || 0,
  }));

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="page-content">
      {/* Stats row */}
      <div className="stats-grid">
        <StatCard label="Today's Orders" value={stats.totalToday} icon={Package} color="gold" sub="↑ 12% vs yesterday" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} color="amber" sub="Awaiting assignment" />
        <StatCard label="In Transit" value={stats.assigned} icon={Truck} color="blue" sub="Out for delivery" />
        <StatCard label="Delivered" value={stats.delivered} icon={CheckCircle} color="green" sub="↑ 8% completion rate" />
      </div>

      {/* Chart + Breakdown */}
      <div className="chart-section">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Orders — Last 7 Days</h3>
              <p className="card-sub">Daily volume trend</p>
            </div>
            <span className="card-total">{stats.weeklyData.reduce((a, b) => a + b, 0)}</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weeklyChartData} barSize={28}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 11 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #2a2a2e', borderRadius: 8, color: '#f4f4f5', fontSize: 13 }}
                cursor={{ fill: 'rgba(212,168,83,0.05)' }}
              />
              <Bar dataKey="orders" fill="#d4a853" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: 16 }}>Status Breakdown</h3>
          {[
            { label: 'Delivered', count: stats.delivered, color: '#22c55e' },
            { label: 'Assigned', count: stats.assigned, color: '#60a5fa' },
            { label: 'Pending', count: stats.pending, color: '#fbbf24' },
            { label: 'Cancelled', count: stats.cancelled, color: '#f87171' },
          ].map(({ label, count, color }) => {
            const total = orders.length || 1;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={label} className="breakdown-item">
                <div className="breakdown-dot" style={{ background: color }} />
                <span className="breakdown-name">{label}</span>
                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar-fill" style={{ background: color, width: `${pct}%` }} />
                </div>
                <span className="breakdown-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="section-header">
        <h3 className="section-title">Recent Orders</h3>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">{order.id}</td>
                <td>{order.customerName}</td>
                <td className="text-muted truncate">{order.deliveryAddress}</td>
                <td><span className={`badge badge-${order.status}`}>{order.status}</span></td>
                <td className="text-muted">{format(order.createdAt, 'HH:mm')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
