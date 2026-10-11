import { useMemo, useState } from "react";
import { BadgeCheck, Shield, Users, CreditCard, Lock, Copy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { roleLabel, rolePermissions, normalizeRole, type Permission } from "@/lib/rbac";
import type { Role } from "@/lib/types";
import { clearDemoConfig, loadDemoConfig, saveDemoConfig } from "@/lib/demo";

const roleOrder: Role[] = ["admin", "manager", "dispatcher", "viewer", "driver", "super_admin"];

function permLabel(p: Permission) {
  const map: Record<Permission, string> = {
    "dashboard.view": "عرض لوحة التحكم",
    "orders.read": "قراءة الطلبات",
    "orders.write": "تعديل/إنشاء الطلبات",
    "drivers.read": "قراءة السائقين",
    "drivers.write": "تعديل/إنشاء السائقين",
    "calls.read": "قراءة المكالمات",
    "calls.write": "تعديل/إنشاء المكالمات",
    "analytics.view": "عرض التحليلات",
    "settings.view": "عرض الإعدادات",
    "settings.manage": "إدارة إعدادات المكتب",
    "users.read": "عرض المستخدمين",
    "users.invite": "دعوة مستخدمين",
    "users.manage": "إدارة أدوار المستخدمين",
  };
  return map[p] ?? p;
}

export default function SettingsPage() {
  const { demoMode, profile } = useAuth();
  const [officeName, setOfficeName] = useState("Demo Office");
  const [pro, setPro] = useState(true);

  const demoCfg = demoMode ? loadDemoConfig() : null;
  const [demoOfficeId, setDemoOfficeId] = useState(demoCfg?.officeId ?? (profile?.officeId ?? "demo-office"));
  const [demoRole, setDemoRole] = useState<Role>(demoCfg?.role ?? normalizeRole(profile?.role as any));
  const [demoName, setDemoName] = useState(demoCfg?.displayName ?? (profile?.displayName ?? "Demo User"));

  const myRole = normalizeRole(profile?.role as any);

  const roleCards = useMemo(() => {
    return roleOrder
      .filter((r) => r !== "super_admin")
      .map((r) => ({
        role: r,
        title: roleLabel[r].ar,
        perms: rolePermissions[r],
      }));
  }, []);

  return (
    <div className="space-y-4">
      <PageHeader title="الإعدادات" description="إعدادات المكتب + الصلاحيات (RBAC)" />

      {demoMode ? (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-primary" />
              وضع Demo (تحكم تجريبي)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              التطبيق يعمل حالياً ببيانات تجريبية لأن Firebase غير مُهيأ. يمكنك من هنا تغيير دور المستخدم وTenant (officeId) وإعادة توليد البيانات.
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">اسم المستخدم (Demo)</label>
                <Input value={demoName} onChange={(e) => setDemoName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">officeId (Tenant)</label>
                <Input value={demoOfficeId} onChange={(e) => setDemoOfficeId(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">الدور (Role)</label>
                <select
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm"
                  value={demoRole}
                  onChange={(e) => setDemoRole(e.target.value as Role)}
                >
                  <option value="admin">admin</option>
                  <option value="manager">manager</option>
                  <option value="dispatcher">dispatcher</option>
                  <option value="viewer">viewer</option>
                  <option value="driver">driver</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                className="gap-2"
                onClick={() => {
                  saveDemoConfig({
                    officeId: demoOfficeId.trim() || "demo-office",
                    role: demoRole,
                    displayName: demoName.trim() || "Demo User",
                    email: "demo@local",
                  });
                  window.location.reload();
                }}
              >
                تطبيق التغييرات
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  clearDemoConfig();
                  window.location.reload();
                }}
              >
                رجوع للإعدادات الافتراضية
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              تلميح: تغيير officeId يعيد توليد بيانات Mock على نفس officeId (مع عزل كامل بين Tenants في واجهة العرض).
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              إعدادات المكتب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">اسم المكتب</label>
              <Input value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
            </div>
            <div className="text-xs text-muted-foreground">
              OfficeId الحالي: <span className="text-foreground">{profile?.officeId ?? "—"}</span>
            </div>
            <Button variant="outline" onClick={() => {}}>
              حفظ (قريباً عبر Firestore)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              الاشتراك والخطط
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <div className="font-medium">Pro</div>
                <div className="text-xs text-muted-foreground">Feature gating (مثال)</div>
              </div>
              <Switch checked={pro} onCheckedChange={setPro} />
            </div>
            <div className="text-sm text-muted-foreground">
              {pro ? "الميزات المتقدمة مُفعلة" : "خطة Basic: بعض الميزات ستكون مقفولة"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Users & Roles (RBAC)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="size-4 text-primary" />
              <span className="text-muted-foreground">دورك الحالي:</span>
              <span className="font-semibold text-foreground">{roleLabel[myRole]?.ar ?? String(myRole)}</span>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={async () => {
                const text = JSON.stringify(rolePermissions, null, 2);
                await navigator.clipboard.writeText(text);
              }}
            >
              <Copy className="size-4" />
              نسخ الـPermissions JSON
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {roleCards.map((rc) => (
              <Card key={rc.role} className="border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Lock className="size-4" />
                      </span>
                      {rc.title}
                    </span>
                    <span className="text-xs text-muted-foreground">{rc.role}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {rc.perms.map((p) => (
                    <div
                      key={p}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2"
                    >
                      <div className="text-sm">{permLabel(p)}</div>
                      <div className="text-[11px] text-muted-foreground">{p}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-xs text-muted-foreground">
            ملاحظة: هذه واجهة 
0MVP لعرض مصفوفة الصلاحيات. خطوة “Invite users + Assign roles” ستكون في مرحلة لاحقة (Invite-only).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
