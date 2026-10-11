import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  PhoneCall,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";

const nav = [
  { to: "/app/dashboard", key: "dashboard", icon: LayoutDashboard },
  { to: "/app/orders", key: "orders", icon: Package },
  { to: "/app/drivers", key: "drivers", icon: Users },
  { to: "/app/calls", key: "calls", icon: PhoneCall },
  { to: "/app/analytics", key: "analytics", icon: BarChart3 },
  { to: "/app/settings", key: "settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { t } = useI18n();
  const location = useLocation();

  return (
    <aside className="bg-sidebar text-sidebar-foreground border border-sidebar-border rounded-2xl p-4 h-[calc(100vh-2rem)] sticky top-4">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <Sparkles className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">{t("appName")}</div>
            <div className="text-xs text-muted-foreground">Ops Console</div>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-sidebar-accent text-sidebar-accent-foreground",
              )}
            >
              <Icon className={cn("size-4", active && "text-primary")} />
              <span className="font-medium">{t(item.key as any)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 pt-4 border-t border-sidebar-border text-xs text-muted-foreground">
        <div>Multi-tenant • RBAC</div>
      </div>
    </aside>
  );
}
