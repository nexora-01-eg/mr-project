import { useMemo, useState } from "react";
import { Plus, Trophy, Zap, Activity, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { useMockStore, type DriverRow } from "@/stores/mockStore";

function score(d: DriverRow) {
  const speed = 1 / Math.max(10, d.averageDeliveryTime);
  return d.rating * 0.5 + d.totalOrders * 0.3 + speed * 100 * 0.2;
}

export default function DriversPage() {
  const drivers = useMockStore((s) => s.drivers);
  const createDriver = useMockStore((s) => s.createDriver);
  const updateDriver = useMockStore((s) => s.updateDriver);
  const officeId = useMockStore((s) => s.officeId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DriverRow | null>(null);

  const leaderboard = useMemo(() => {
    const sorted = [...drivers].sort((a, b) => score(b) - score(a));
    return sorted.slice(0, 5);
  }, [drivers]);

  const fastest = useMemo(() => {
    return [...drivers].sort((a, b) => a.averageDeliveryTime - b.averageDeliveryTime)[0];
  }, [drivers]);

  const mostActive = useMemo(() => {
    return [...drivers].sort((a, b) => b.totalOrders - a.totalOrders)[0];
  }, [drivers]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="السائقون"
        description="إدارة السائقين + نظام ترتيب (Gamification)"
        right={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="size-4" />
            إضافة سائق
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="size-5 text-primary" />
              أفضل السائقين
            </CardTitle>
            <div className="text-xs text-muted-foreground">Score = (Rating×0.5) + (Orders×0.3) + (Speed×0.2)</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((d, idx) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/40 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        تقييم {d.rating.toFixed(1)} • {d.totalOrders} طلب • متوسط {d.averageDeliveryTime} دقيقة
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {idx === 0 ? <Badge className="rounded-full">Top Driver</Badge> : null}
                    {fastest?.id === d.id ? (
                      <Badge variant="secondary" className="rounded-full">
                        Fastest
                      </Badge>
                    ) : null}
                    {mostActive?.id === d.id ? (
                      <Badge variant="outline" className="rounded-full">
                        Most Active
                      </Badge>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="size-5 text-primary" />
              شارات اليوم
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-xl border border-border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Zap className="size-4 text-primary" />
                الأسرع
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {fastest ? `${fastest.name} — ${fastest.averageDeliveryTime} دقيقة` : "—"}
              </div>
            </div>
            <div className="rounded-xl border border-border p-3">
              <div className="flex items-center gap-2 font-medium">
                <Activity className="size-4 text-primary" />
                الأكثر نشاطاً
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {mostActive ? `${mostActive.name} — ${mostActive.totalOrders} طلب` : "—"}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              هذه الشارات تُستخدم لتحفيز السائقين ورفع الأداء (Gamification).
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة السائقين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التقييم</TableHead>
                  <TableHead>الطلبات</TableHead>
                  <TableHead>السرعة</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.phone}</TableCell>
                    <TableCell>
                      <Badge variant={d.status === "online" ? "default" : "secondary"}>
                        {d.status === "online" ? "Online" : "Offline"}
                      </Badge>
                    </TableCell>
                    <TableCell>{d.rating.toFixed(1)}</TableCell>
                    <TableCell>{d.totalOrders}</TableCell>
                    <TableCell>{d.averageDeliveryTime} دقيقة</TableCell>
                    <TableCell className="text-left">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditing(d);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[720px]">
          <DialogHeader>
            <DialogTitle>{editing ? "تعديل سائق" : "إضافة سائق"}</DialogTitle>
          </DialogHeader>
          <DriverForm
            key={editing?.id ?? "new"}
            initial={editing}
            officeId={officeId}
            onCancel={() => setOpen(false)}
            onSave={(data) => {
              if (editing) {
                updateDriver(editing.id, data);
                toast.success("تم تحديث السائق");
              } else {
                createDriver(data as any);
                toast.success("تمت إضافة السائق");
              }
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DriverForm({
  initial,
  officeId,
  onCancel,
  onSave,
}: {
  initial: DriverRow | null;
  officeId: string;
  onCancel: () => void;
  onSave: (data: Omit<DriverRow, "id">) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [status, setStatus] = useState<"online" | "offline">(initial?.status ?? "online");
  const [rating, setRating] = useState<number>(initial?.rating ?? 4.5);
  const [totalOrders, setTotalOrders] = useState<number>(initial?.totalOrders ?? 0);
  const [avg, setAvg] = useState<number>(initial?.averageDeliveryTime ?? 35);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الاسم</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الهاتف</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الحالة</label>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">التقييم</label>
          <Input type="number" min={0} max={5} step={0.1} value={String(rating)} onChange={(e) => setRating(Number(e.target.value || 0))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">إجمالي الطلبات</label>
          <Input type="number" min={0} value={String(totalOrders)} onChange={(e) => setTotalOrders(Number(e.target.value || 0))} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">متوسط وقت التوصيل (دقيقة)</label>
        <Input type="number" min={10} value={String(avg)} onChange={(e) => setAvg(Number(e.target.value || 0))} />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} type="button">
          إلغاء
        </Button>
        <Button
          onClick={() =>
            onSave({
              officeId,
              name,
              phone,
              status,
              rating,
              totalOrders,
              averageDeliveryTime: avg,
            })
          }
          type="button"
        >
          حفظ
        </Button>
      </div>
    </div>
  );
}
