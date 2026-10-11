import type { LegacyRole, Role, UserProfile } from "@/lib/types";

export type Permission =
  | "dashboard.view"
  | "orders.read"
  | "orders.write"
  | "drivers.read"
  | "drivers.write"
  | "calls.read"
  | "calls.write"
  | "analytics.view"
  | "settings.view"
  | "settings.manage"
  | "users.read"
  | "users.invite"
  | "users.manage";

export const roleLabel: Record<Role, { ar: string; en: string }> = {
  super_admin: { ar: "سوبر أدمن", en: "Super Admin" },
  admin: { ar: "أدمن", en: "Admin" },
  manager: { ar: "مدير", en: "Manager" },
  dispatcher: { ar: "مُنسّق", en: "Dispatcher" },
  viewer: { ar: "مشاهدة فقط", en: "Viewer" },
  driver: { ar: "سائق", en: "Driver" },
};

/**
 * Legacy role mapping (from previous scaffold) to new roles.
 * - office_owner -> admin
 */
export function normalizeRole(role: Role | LegacyRole): Role {
  if (role === "office_owner") return "admin";
  // keep others if same token exists
  return role as Role;
}

export const roleRank: Record<Role, number> = {
  super_admin: 100,
  admin: 80,
  manager: 60,
  dispatcher: 40,
  viewer: 20,
  driver: 10,
};

export function hasMinRole(userRoleRaw: Role | LegacyRole, required: Role) {
  const userRole = normalizeRole(userRoleRaw);
  return roleRank[userRole] >= roleRank[required];
}

export const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [
    "dashboard.view",
    "orders.read",
    "orders.write",
    "drivers.read",
    "drivers.write",
    "calls.read",
    "calls.write",
    "analytics.view",
    "settings.view",
    "settings.manage",
    "users.read",
    "users.invite",
    "users.manage",
  ],
  admin: [
    "dashboard.view",
    "orders.read",
    "orders.write",
    "drivers.read",
    "drivers.write",
    "calls.read",
    "calls.write",
    "analytics.view",
    "settings.view",
    "settings.manage",
    "users.read",
    "users.invite",
    "users.manage",
  ],
  manager: [
    "dashboard.view",
    "orders.read",
    "orders.write",
    "drivers.read",
    "drivers.write",
    "calls.read",
    "calls.write",
    "analytics.view",
    "settings.view",
    "users.read",
  ],
  dispatcher: [
    "dashboard.view",
    "orders.read",
    "orders.write",
    "drivers.read",
    "drivers.write",
    "calls.read",
    "calls.write",
    "analytics.view",
    "settings.view",
  ],
  viewer: [
    "dashboard.view",
    "orders.read",
    "drivers.read",
    "calls.read",
    "analytics.view",
    "settings.view",
  ],
  driver: ["dashboard.view"],
};

export function hasPermission(profile: UserProfile | null, permission: Permission) {
  if (!profile) return false;
  const role = normalizeRole(profile.role);
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canWrite(roleRaw: Role | LegacyRole) {
  const role = normalizeRole(roleRaw);
  return role === "super_admin" || role === "admin" || role === "manager" || role === "dispatcher";
}
