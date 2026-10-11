import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Package, Clock, CheckCircle2, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { useMockStore } from "@/stores/mockStore";

function dayLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ar-EG", { weekday: "short" });
}

export default function DashboardPage() {
  const orders = useMockStore((s) => s.orders);
  const drivers = useMockStore((s) => s.drivers);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
    const pending = orders.filter((o) => o.status === "pending").length;
    const assigned = orders.filter((o) => o.status === "assigned").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const revenueToday = todayOrders.reduce((sum, o) => sum + (o.status === "delivered" ? o.price : 0), 0);
    return { today: todayOrders.length, pending, assigned, delivered, revenueToday };
  }, [orders]);

  const orders7 = useMemo(() => {
    const days: { key: string; count: number; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toDateString();
      const list = orders.filter((o) => new Date(o.createdAt).toDateString() === key);
      days.push({
        key,
        count: list.length,
        revenue: list.filter((o) => o.status === "delivered").reduce((s, o) => s + o.price, 0),
      });
    }
    return days.map((d) => ({ day: dayLabel(d.key), orders: d.count, revenue: d.revenue }));
  }, [orders]);

  const topDrivers = useMemo(() => {
    return [...drivers].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }, [drivers]);

  return (
    <div className="space-y-4">
      <PageHeader title="لوحة التحكم" description="نظرة سريعة على التشغيل اليومي" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi icon={Package} title="طلبات اليوم" value={stats.today} />
        <Kpi icon={Clock} title="قيد الانتظار" value={stats.pending} />
        <Kpi icon={CheckCircle2} title="تم التسليم" value={stats.delivered} />
        <Kpi icon={Wallet} title="إيراد اليوم" value={`${stats.revenueToday} ج.م`} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>الطلبات خلال 7 أيام</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orders7} margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أفضل السائقين</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topDrivers.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">تقييم {d.rating.toFixed(1)} • {d.totalOrders} طلب</div>
                </div>
                <div className="text-primary font-semibold">{d.averageDeliveryTime}m</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اتجاه الإيرادات</CardTitle>
        </CardHeader>
        <CardContent className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={orders7} margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
          </div>
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
