import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const map: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "قيد الانتظار", className: "bg-muted text-muted-foreground" },
  assigned: { label: "مُسند", className: "bg-accent text-accent-foreground" },
  in_progress: { label: "قيد التنفيذ", className: "bg-secondary text-secondary-foreground" },
  delivered: { label: "تم التسليم", className: "bg-primary text-primary-foreground" },
  cancelled: { label: "ملغي", className: "bg-destructive text-destructive-foreground" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const item = map[status];
  return <Badge className={cn("rounded-full", item.className)}>{item.label}</Badge>;
}
