import type { Role } from "@/lib/types";

export const roleRank: Record<Role, number> = {
  super_admin: 100,
  office_owner: 80,
  manager: 60,
  dispatcher: 40,
  driver: 10,
};

export function hasMinRole(userRole: Role, required: Role) {
  return roleRank[userRole] >= roleRank[required];
}
