import { useMemo, useState } from "react";
import { Plus, PhoneCall, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { PageHeader } from "@/components/layout/PageHeader";
import { useMockStore, type CallRow } from "@/stores/mockStore";

export default function CallsPage() {
  const calls = useMockStore((s) => s.calls);
  const officeId = useMockStore((s) => s.officeId);
  const createCall = useMockStore((s) => s.createCall);
  const createOrder = useMockStore((s) => s.createOrder);

  const [open, setOpen] = useState(false);

  const sorted = useMemo(() => {
    return [...calls].sort((a, b) => b.lastCallDate.localeCompare(a.lastCallDate));
  }, [calls]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="سجل المكالمات"
        description="CRM مبسط: تسجيل المكالمات وتحويلها إلى طلبات"
        right={
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            مكالمة جديدة
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>آخر مكالمة</TableHead>
                  <TableHead>ملاحظات</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.phone}</TableCell>
                    <TableCell>{c.name ?? "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(c.lastCallDate).toLocaleString("ar-EG")}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.notes ?? "—"}</TableCell>
                    <TableCell className="text-left">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          createOrder({
                            officeId,
                            customerName: c.name ?? "عميل",
                            customerPhone: c.phone,
                            pickupAddress: "—",
                            deliveryAddress: "—",
                            price: 0,
                            status: "pending",
                            notes: c.notes,
                          });
                          toast.success("تم تحويل المكالمة إلى طلب (قيد الانتظار)");
                        }}
                      >
                        <ArrowUpRight className="size-4" />
                        تحويل إلى طلب
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
        <DialogContent className="sm:max-w-[680px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PhoneCall className="size-5 text-primary" />
              تسجيل مكالمة
            </DialogTitle>
          </DialogHeader>
          <CallForm
            officeId={officeId}
            onCancel={() => setOpen(false)}
            onSave={(data) => {
              createCall(data as any);
              toast.success("تم حفظ المكالمة");
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CallForm({
  officeId,
  onCancel,
  onSave,
}: {
  officeId: string;
  onCancel: () => void;
  onSave: (data: Omit<CallRow, "id">) => void;
}) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الهاتف</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">الاسم (اختياري)</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
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
              phone,
              name: name || undefined,
              notes: notes || undefined,
              lastCallDate: new Date().toISOString(),
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
