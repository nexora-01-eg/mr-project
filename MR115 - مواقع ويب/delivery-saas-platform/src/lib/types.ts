export type Role =
  | "super_admin"
  | "office_owner"
  | "manager"
  | "dispatcher"
  | "driver";

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
};

export type UserProfile = {
  id: string; // uid
  officeId?: string; // undefined for super_admin
  role: Role;
  displayName: string;
  phone?: string;
  email?: string;
  createdAt: string; // ISO
};
