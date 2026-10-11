// src/store/index.ts
import { create } from 'zustand';
import type { Order, Driver, User } from '../types';

interface AppState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Data
  orders: Order[];
  drivers: Driver[];
  setOrders: (orders: Order[]) => void;
  setDrivers: (drivers: Driver[]) => void;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Computed
  pendingOrders: () => Order[];
  onlineDrivers: () => Driver[];
  todayOrders: () => Order[];
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  orders: [],
  drivers: [],
  setOrders: (orders) => set({ orders }),
  setDrivers: (drivers) => set({ drivers }),

  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  // Computed selectors
  pendingOrders: () => get().orders.filter((o) => o.status === 'pending'),
  onlineDrivers: () => get().drivers.filter((d) => d.status === 'online'),
  todayOrders: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return get().orders.filter((o) => o.createdAt >= today);
  },
}));
