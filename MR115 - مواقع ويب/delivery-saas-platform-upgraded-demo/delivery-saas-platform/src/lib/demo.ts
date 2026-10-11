import type { Role } from "@/lib/types";

export type DemoConfig = {
  officeId: string;
  role: Role;
  displayName: string;
  email?: string;
};

const KEY = "delivery_ops_demo_config_v1";

export function loadDemoConfig(): DemoConfig | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoConfig>;
    if (!parsed.officeId || !parsed.role || !parsed.displayName) return null;
    return {
      officeId: String(parsed.officeId),
      role: parsed.role as Role,
      displayName: String(parsed.displayName),
      email: parsed.email ? String(parsed.email) : undefined,
    };
  } catch {
    return null;
  }
}

export function saveDemoConfig(cfg: DemoConfig) {
  localStorage.setItem(KEY, JSON.stringify(cfg));
}

export function clearDemoConfig() {
  localStorage.removeItem(KEY);
}
