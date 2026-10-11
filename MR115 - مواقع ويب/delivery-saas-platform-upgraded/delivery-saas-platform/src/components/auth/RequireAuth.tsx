import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Project rule: No traditional login UI.
 * - Demo mode: always allow (mock profile exists)
 * - Production: anonymous auth auto-sign-in in AuthContext
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { profile, loading, demoMode } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  // Demo mode always has a profile.
  if (demoMode) return <>{children}</>;

  // Production should also end up with a profile; if not, keep user in /app but show fallback.
  if (!profile) {
    return <Navigate to="/app/dashboard" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
