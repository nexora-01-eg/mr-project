import { useMemo } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { useMockStore } from "@/stores/mockStore";

const COLORS = ["var(--primary)", "oklch(0.62 0.23 25)", "oklch(0.74 0.02 260)"];

export default function AnalyticsPage() {
  const orders = useMockStore((s) => s.orders);

  const revenue = useMemo(() => {
    return orders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.price, 0);
  }, [orders]);

  const rates = useMemo(() => {
    const total = orders.length || 1;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const successRate = Math.round((delivered / total) * 100);
    const cancelRate = Math.round((cancelled / total) * 100);

    const pie = [
      { name: "تم التسليم", value: delivered },
      { name: "ملغي", value: cancelled },
      { name: "أخرى", value: Math.max(0, total - delivered - cancelled) },
    ];

    return { successRate, cancelRate, pie };
  }, [orders]);

  return (
    <div className="space-y-4">
      <PageHeader title="التحليلات" description="إيرادات، أداء، ونسب نجاح التشغيل" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الإيراد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{revenue} ج.م</div>
            <div className="text-sm text-muted-foreground mt-1">(Delivered orders only)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>نسبة النجاح</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{rates.successRate}%</div>
            <div className="text-sm text-muted-foreground mt-1">Delivered / Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>نسبة الإلغاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{rates.cancelRate}%</div>
            <div className="text-sm text-muted-foreground mt-1">Cancelled / Total</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>توزيع حالات الطلبات</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie data={rates.pie} dataKey="value" nameKey="name" outerRadius={110} label>
                {rates.pie.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
