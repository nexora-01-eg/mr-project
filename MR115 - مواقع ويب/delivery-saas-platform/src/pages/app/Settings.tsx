import { useState } from "react";
import { BadgeCheck, Shield, Users, CreditCard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/layout/PageHeader";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const { demoMode, profile } = useAuth();
  const [officeName, setOfficeName] = useState("Demo Office");
  const [pro, setPro] = useState(true);

  return (
    <div className="space-y-4">
      <PageHeader title="الإعدادات" description="إعدادات المكتب والاشتراك وإدارة المستخدمين" />

      {demoMode ? (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-primary" />
              وضع Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            التطبيق يعمل حالياً ببيانات تجريبية لأن Firebase غير مُهيأ. لإلغاء وضع Demo: جهّز .env ثم شغّل dev.
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
            إدارة المستخدمين
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          قريباً: دعوة مستخدمين، تحديد الأدوار (Owner/Manager/Dispatcher/Driver)، وتطبيق RBAC عبر Firestore Rules.
        </CardContent>
      </Card>
    </div>
  );
}
