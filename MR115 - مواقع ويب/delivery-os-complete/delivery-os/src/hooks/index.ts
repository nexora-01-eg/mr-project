// src/hooks/useOrders.ts
import { useEffect } from 'react';
import { subscribeToOrders } from '../services/orders.service';
import { useStore } from '../store';

export function useOrders() {
  const { user, orders, setOrders } = useStore();

  useEffect(() => {
    if (!user?.officeId) return;
    const unsub = subscribeToOrders(user.officeId, setOrders);
    return () => unsub();
  }, [user?.officeId]);

  return orders;
}

// src/hooks/useDrivers.ts
import { useEffect } from 'react';
import { subscribeToDrivers } from '../services/drivers.service';
import { useStore } from '../store';

export function useDrivers() {
  const { user, drivers, setDrivers } = useStore();

  useEffect(() => {
    if (!user?.officeId) return;
    const unsub = subscribeToDrivers(user.officeId, setDrivers);
    return () => unsub();
  }, [user?.officeId]);

  return drivers;
}

// src/hooks/useDashboardStats.ts
import { useMemo } from 'react';
import { useStore } from '../store';
import { subDays, startOfDay, isAfter } from 'date-fns';

export function useDashboardStats() {
  const orders = useStore((s) => s.orders);
  const todayOrders = useStore((s) => s.todayOrders)();

  const stats = useMemo(() => ({
    totalToday: todayOrders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    assigned: orders.filter((o) => o.status === 'assigned').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
    weeklyData: Array.from({ length: 7 }, (_, i) => {
      const day = startOfDay(subDays(new Date(), 6 - i));
      const nextDay = startOfDay(subDays(new Date(), 5 - i));
      return orders.filter(
        (o) => isAfter(o.createdAt, day) && !isAfter(o.createdAt, nextDay)
      ).length;
    }),
  }), [orders]);

  return stats;
}
