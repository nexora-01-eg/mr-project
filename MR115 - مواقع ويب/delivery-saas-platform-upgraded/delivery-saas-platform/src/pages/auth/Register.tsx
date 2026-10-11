import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import type { UserProfile } from "@/lib/types";

// NOTE: In a real SaaS, office creation & role assignment should happen via
// server-side admin flows / Cloud Functions to prevent privilege escalation.
// Here we default the first user to office_owner with an officeId you set later.

export default function RegisterPage() {
  const { lang } = useI18n();
  const { demoMode } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    if (!auth || !db || demoMode) {
      toast.error(lang === "ar" ? "Firebase غير مُهيأ" : "Firebase not configured");
      return;
    }
    e.preventDefault();
    setBusy(true);
    const id = toast.loading(lang === "ar" ? "جارٍ إنشاء الحساب..." : "Creating account...");
    try {
      const cred = await createUserWithEmailAndPassword(auth!, email, password);
      await updateProfile(cred.user, { displayName: name });

      const profile: UserProfile = {
        id: cred.user.uid,
        role: "office_owner",
        displayName: name,
        email,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db!, "users", cred.user.uid), profile, { merge: true });

      toast.success(lang === "ar" ? "تم إنشاء الحساب" : "Account created", { id });
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
            {lang === "ar" ? "إنشاء حساب" : "Register"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{lang === "ar" ? "الاسم" : "Name"}</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{lang === "ar" ? "كلمة المرور" : "Password"}</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <Button className="w-full" disabled={busy}>
              {lang === "ar" ? "إنشاء" : "Create"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {lang === "ar" ? "لديك حساب؟" : "Already have an account?"} <Link className="text-primary" to="/login">{lang === "ar" ? "تسجيل الدخول" : "Login"}</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
