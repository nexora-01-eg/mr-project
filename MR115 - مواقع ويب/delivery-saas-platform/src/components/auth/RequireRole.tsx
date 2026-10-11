import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/lib/types";
import { hasMinRole } from "@/lib/rbac";

export function RequireRole({
  min,
  children,
}: {
  min: Role;
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth();

  if (loading) return null;
  if (!profile) return <Navigate to="/login" replace />;

  if (!hasMinRole(profile.role, min)) {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
