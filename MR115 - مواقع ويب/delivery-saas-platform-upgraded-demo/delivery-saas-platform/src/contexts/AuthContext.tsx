import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserProfile } from "@/lib/types";
import { loadDemoConfig } from "@/lib/demo";
import { useMockStore } from "@/stores/mockStore";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  demoMode: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const demoProfile: UserProfile = {
  id: "demo-user",
  officeId: "demo-office",
  role: "admin",
  displayName: "Mohamed (Demo)",
  email: "demo@local",
  createdAt: new Date().toISOString(),
};

function getDemoProfile(): UserProfile {
  const cfg = loadDemoConfig();
  if (!cfg) return demoProfile;
  return {
    ...demoProfile,
    officeId: cfg.officeId,
    role: cfg.role,
    displayName: cfg.displayName,
    email: cfg.email ?? demoProfile.email,
    createdAt: new Date().toISOString(),
  };
}

async function ensureProfile(uid: string): Promise<UserProfile> {
  // Default: single-office demo until you wire real tenant provisioning.
  const ref = doc(db!, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as UserProfile;

  const profile: UserProfile = {
    id: uid,
    officeId: "demo-office",
    role: "admin",
    displayName: "مستخدم",
    createdAt: new Date().toISOString(),
  };
  await setDoc(ref, profile, { merge: true });
  return profile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const seed = useMockStore((s) => s.seed);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const demoMode = !auth || !db;

  useEffect(() => {
    let cancelled = false;

    async function bootDemo() {
      const p = getDemoProfile();
      seed(p.officeId!);
      setUser(null);
      setProfile(p);
      setLoading(false);
    }

    if (demoMode) {
      void bootDemo();
      return () => {
        cancelled = true;
      };
    }

    const unsub = onAuthStateChanged(auth!, async (u) => {
      if (cancelled) return;

      // No UI login: sign in anonymously automatically.
      if (!u) {
        setLoading(true);
        await signInAnonymously(auth!);
        return;
      }

      setUser(u);
      setLoading(true);
      try {
        const p = await ensureProfile(u.uid);
        setProfile(p);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [demoMode, seed]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      demoMode,
      logout: async () => {
        if (demoMode) return;
        // logout here resets the anonymous session; app will auto-login again.
        await signOut(auth!);
      },
    }),
    [user, profile, loading, demoMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
