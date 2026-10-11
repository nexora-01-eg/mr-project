import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  right,
}: PropsWithChildren<{ title: string; description?: string; right?: React.ReactNode }>) {
  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between")}
    >
      <div>
        <div className="text-2xl font-semibold tracking-tight">{title}</div>
        {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}
