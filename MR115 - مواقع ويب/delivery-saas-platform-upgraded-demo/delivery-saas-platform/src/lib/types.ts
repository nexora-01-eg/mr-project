export type Role =
  | "super_admin" // platform operator (cross-tenant)
  | "admin"
  | "manager"
  | "dispatcher"
  | "viewer"
  | "driver";

export type LegacyRole =
  | "office_owner"
  | "dispatcher"
  | "manager"
  | "driver"
  | "super_admin";

export type OrderStatus =
  | "pending"
  | "assigned"
  | "in_progress"
  | "delivered"
  | "cancelled";

export type Office = {
  id: string;
  name: string;
  plan: "basic" | "pro";
  createdAt: string; // ISO
  industry?: "restaurant" | "logistics" | "office";
  currency?: string;
  timezone?: string;
  branding?: {
    logoUrl?: string;
    baseColor?: string;
  };
};

export type UserProfile = {
  id: string; // uid
  officeId?: string; // undefined for super_admin
  role: Role | LegacyRole;
  displayName: string;
  phone?: string;
  email?: string;
  createdAt: string; // ISO
};
