import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";

export default function LoginPage() {
  const { lang } = useI18n();
  const { demoMode } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    if (!auth || demoMode) {
      toast.error(lang === "ar" ? "Firebase غير مُهيأ" : "Firebase not configured");
      return;
    }
    e.preventDefault();
    setBusy(true);
    const id = toast.loading(lang === "ar" ? "جارٍ تسجيل الدخول..." : "Signing in...");
    try {
      await signInWithEmailAndPassword(auth!, email, password);
      toast.success(lang === "ar" ? "تم تسجيل الدخول" : "Signed in", { id });
      nav("/app/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Error", { id });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">
            {lang === "ar" ? "تسجيل الدخول" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{lang === "ar" ? "كلمة المرور" : "Password"}</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <Button className="w-full" disabled={busy}>
              {lang === "ar" ? "دخول" : "Sign in"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {lang === "ar" ? "ليس لديك حساب؟" : "No account?"} <Link className="text-primary" to="/register">{lang === "ar" ? "إنشاء حساب" : "Create one"}</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
