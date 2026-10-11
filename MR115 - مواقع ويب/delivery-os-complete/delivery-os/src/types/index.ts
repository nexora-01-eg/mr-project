// src/types/index.ts

export type OrderStatus = 'pending' | 'assigned' | 'delivered' | 'cancelled';
export type DriverStatus = 'online' | 'offline';
export type UserRole = 'admin' | 'staff';

export interface Order {
  id: string;
  officeId: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  price: number;
  notes: string;
  status: OrderStatus;
  driverId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  officeId: string;
  name: string;
  phone: string;
  status: DriverStatus;
  createdAt: Date;
}

export interface Office {
  id: string;
  name: string;
  subscriptionStatus: 'active' | 'trial' | 'inactive';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  officeId: string;
}

export interface DashboardStats {
  totalToday: number;
  pending: number;
  assigned: number;
  delivered: number;
  cancelled: number;
  weeklyData: number[];
}
