import { useMemo, useState } from "react";
import { Plus, Search, Trash2, Pencil, Wand2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/orders/StatusBadge";
import { useMockStore, type OrderRow } from "@/stores/mockStore";
import type { OrderStatus } from "@/lib/types";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "قيد الانتظار" },
  { value: "assigned", label: "مُسند" },
  { value: "in_progress", label: "قيد التنفيذ" },
  { value: "delivered", label: "تم التسليم" },
  { value: "cancelled", label: "ملغي" },
];

function smartSuggestDriver(drivers: { id: string; status: string; rating: number; totalOrders: number; averageDeliveryTime: number }[]) {
  // Mock AI logic: prioritize online + higher rating + lower avg time + lower workload.
  const ranked = drivers
    .filter((d) => d.status === "online")
    .map((d) => ({
      id: d.id,
      score: d.rating * 0.55 + (1 / Math.max(10, d.averageDeliveryTime)) * 20 + (1 / Math.max(1, d.totalOrders)) * 10,
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.id;
}

export default function OrdersPage() {
  const orders = useMockStore((s) => s.orders);
  const drivers = useMockStore((s) => s.drivers);
  const createOrder = useMockStore((s) => s.createOrder);
  const updateOrder = useMockStore((s) => s.updateOrder);
  const deleteOrder = useMockStore((s) => s.deleteOrder);
  const officeId = useMockStore((s) => s.officeId);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [editing, setEditing] = useState<OrderRow | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (!q.trim()) return true;
      const hay = `${o.customerName} ${o.customerPhone} ${o.pickupAddress} ${o.deliveryAddress}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [orders, q, status]);

  function onNew() {
    setEditing(null);
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="الطلبات"
        description="إدارة الطلبات، التصفية، والإسناد الذكي للسائقين"
        right={
          <>
            <Button variant="outline" onClick={() => toast.message("قريباً: إسناد تلقائي كامل عبر Cloud Functions")}
            >
              <Wand2 className="size-4" />
              إسناد ذكي
            </Button>
            <Button onClick={onNew}>
              <Plus className="size-4" />
              طلب جديد
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="بحث بالاسم/الهاتف/العنوان"
                  className="w-[320px] pr-9"
                />
              </div>

              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">{filtered.length} طلب</div>
          </div>

          <div className="mt-4 rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العميل</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>السائق</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o) => {
                  const drv = drivers.find((d) => d.id === o.driverId);
                  return (
                    <TableRow key={o.id}>
                      <TableCell>
                        <div className="font-medium">{o.customerName}</div>
                        <div className="text-xs text-muted-foreground">{o.customerPhone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{o.pickupAddress} → {o.deliveryAddress}</div>
                      </TableCell>
                      <TableCell>{o.price} ج.م</TableCell>
                      <TableCell>
                        <StatusBadge status={o.status} />
                      </TableCell>
                      <TableCell>
                        {drv ? (
                          <div>
                            <div className="font-medium text-sm">{drv.name}</div>
                            <div className="text-xs text-muted-foreground">{drv.status === "online" ? "متاح" : "غير متاح"}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setEditing(o);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => {
                              deleteOrder(o.id);
                              toast.success("تم حذف الطلب");
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
            <DialogTitle>{editing ? "تعديل طلب" : "إنشاء طلب"}</DialogTitle>
          </DialogHeader>
          <OrderForm
            key={editing?.id ?? "new"}
            initial={editing}
            officeId={officeId}
            drivers={drivers}
            onCancel={() => setOpen(false)}
            onSave={(data) => {
              if (editing) {
                updateOrder(editing.id, data);
                toast.success("تم تحديث الطلب");
              } else {
                createOrder(data as any);
                toast.success("تم إنشاء الطلب");
              }
              setOpen(false);
            }}
            onSuggest={() => {
              const suggested = smartSuggestDriver(drivers);
              if (!suggested) {
                toast.message("لا يوجد سائق متاح الآن");
                return;
              }
              toast.success("تم اقتراح سائق بناءً على التوفر/التقييم/السرعة");
              return suggested;
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrderForm({
  initial,
  officeId,
  drivers,
  onCancel,
  onSave,
  onSuggest,
}: {
  initial: OrderRow | null;
  officeId: string;
  drivers: { id: string; name: string; status: string }[];
  onCancel: () => void;
  onSave: (data: Omit<OrderRow, "id" | "createdAt">) => void;
  onSuggest: () => string | undefined;
}) {
  const [customerName, setCustomerName] = useState(initial?.customerName ?? "");
  const [customerPhone, setCustomerPhone] = useState(initial?.customerPhone ?? "");
  const [pickupAddress, setPickupAddress] = useState(initial?.pickupAddress ?? "");
  const [deliveryAddress, setDeliveryAddress] = useState(initial?.deliveryAddress ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [status, setStatus] = useState<OrderStatus>(initial?.status ?? "pending");
  const [driverId, setDriverId] = useState<string>(initial?.driverId ?? "unassigned");

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">اسم العميل</label>
          <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">هاتف العميل</label>
          <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">عنوان الاستلام</label>
          <Input value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">عنوان التسليم</label>
          <Input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">السعر</label>
          <Input
            value={String(price)}
            onChange={(e) => setPrice(Number(e.target.value || 0))}
            type="number"
            min={0}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الحالة</label>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">السائق</label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const suggested = onSuggest();
                if (suggested) setDriverId(suggested);
              }}
              type="button"
            >
              <Wand2 className="size-4" />
              اقتراح
            </Button>
          </div>
          <Select value={driverId} onValueChange={setDriverId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">بدون</SelectItem>
              {drivers.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name} {d.status === "online" ? "(متاح)" : "(غير متاح)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">ملاحظات</label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} type="button">
          إلغاء
        </Button>
        <Button
          onClick={() =>
            onSave({
              officeId,
              customerName,
              customerPhone,
              pickupAddress,
              deliveryAddress,
              price,
              notes: notes || undefined,
              status,
              driverId: driverId === "unassigned" ? undefined : driverId,
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
