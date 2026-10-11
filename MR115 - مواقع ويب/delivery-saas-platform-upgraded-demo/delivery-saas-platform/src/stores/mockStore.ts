import { create } from "zustand";
import { nanoid } from "nanoid";
import type { OrderStatus } from "@/lib/types";

export type OrderRow = {
  id: string;
  officeId: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  price: number;
  notes?: string;
  status: OrderStatus;
  driverId?: string;
  createdAt: string; // ISO
};

export type DriverRow = {
  id: string;
  officeId: string;
  name: string;
  phone: string;
  status: "online" | "offline";
  rating: number;
  totalOrders: number;
  averageDeliveryTime: number; // minutes
};

export type CallRow = {
  id: string;
  officeId: string;
  phone: string;
  name?: string;
  lastCallDate: string; // ISO
  notes?: string;
};

type MockState = {
  officeId: string;
  orders: OrderRow[];
  drivers: DriverRow[];
  calls: CallRow[];
  seed: (officeId: string) => void;
  createOrder: (o: Omit<OrderRow, "id" | "createdAt">) => void;
  updateOrder: (id: string, patch: Partial<OrderRow>) => void;
  deleteOrder: (id: string) => void;
  createDriver: (d: Omit<DriverRow, "id">) => void;
  updateDriver: (id: string, patch: Partial<DriverRow>) => void;
  createCall: (c: Omit<CallRow, "id">) => void;
};

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const useMockStore = create<MockState>((set, get) => ({
  officeId: "demo-office",
  orders: [],
  drivers: [],
  calls: [],
  seed: (officeId) => {
    set({
      officeId,
      drivers: [
        {
          id: "drv-1",
          officeId,
          name: "أحمد علي",
          phone: "01000000001",
          status: "online",
          rating: 4.8,
          totalOrders: 312,
          averageDeliveryTime: 28,
        },
        {
          id: "drv-2",
          officeId,
          name: "محمد حسن",
          phone: "01000000002",
          status: "online",
          rating: 4.5,
          totalOrders: 260,
          averageDeliveryTime: 31,
        },
        {
          id: "drv-3",
          officeId,
          name: "سارة خالد",
          phone: "01000000003",
          status: "offline",
          rating: 4.9,
          totalOrders: 180,
          averageDeliveryTime: 24,
        },
      ],
      orders: [
        {
          id: "ord-1",
          officeId,
          customerName: "عمرو",
          customerPhone: "01111111111",
          pickupAddress: "مدينة نصر",
          deliveryAddress: "الزمالك",
          price: 85,
          status: "assigned",
          driverId: "drv-1",
          createdAt: daysAgo(0),
          notes: "اتصال قبل الوصول",
        },
        {
          id: "ord-2",
          officeId,
          customerName: "منى",
          customerPhone: "01222222222",
          pickupAddress: "العباسية",
          deliveryAddress: "المعادي",
          price: 120,
          status: "delivered",
          driverId: "drv-2",
          createdAt: daysAgo(1),
        },
        {
          id: "ord-3",
          officeId,
          customerName: "خالد",
          customerPhone: "01033333333",
          pickupAddress: "الهرم",
          deliveryAddress: "الدقي",
          price: 70,
          status: "pending",
          createdAt: daysAgo(2),
        },
      ],
      calls: [
        {
          id: "call-1",
          officeId,
          phone: "01111111111",
          name: "عمرو",
          lastCallDate: daysAgo(0),
          notes: "طلب عاجل",
        },
        {
          id: "call-2",
          officeId,
          phone: "01099999999",
          name: "عميل جديد",
          lastCallDate: daysAgo(1),
          notes: "يسأل عن الأسعار",
        },
      ],
    });
  },
  createOrder: (o) =>
    set((s) => ({
      orders: [
        {
          ...o,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
        ...s.orders,
      ],
    })),
  updateOrder: (id, patch) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    })),
  deleteOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),

  createDriver: (d) => set((s) => ({ drivers: [{ ...d, id: nanoid() }, ...s.drivers] })),
  updateDriver: (id, patch) =>
    set((s) => ({
      drivers: s.drivers.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    })),

  createCall: (c) => set((s) => ({ calls: [{ ...c, id: nanoid() }, ...s.calls] })),
}));
