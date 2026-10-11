import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/lib/types";
import type { Permission } from "@/lib/rbac";
import { hasMinRole, hasPermission } from "@/lib/rbac";

export function RequireRole({
  min,
  children,
}: {
  min: Role;
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();

  if (loading) return null;
  if (!profile) return <Navigate to="/app/dashboard" replace />;

  if (!hasMinRole(profile.role, min)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
}

export function RequirePermission({
  permission,
  children,
}: {
  permission: Permission;
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();

  if (loading) return null;
  if (!profile) return <Navigate to="/app/dashboard" replace />;

  if (!hasPermission(profile, permission)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <>{children}</>;
}
