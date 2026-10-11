import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
          <AppSidebar />
          <main className="min-w-0">
            <Topbar />
            <div className="mt-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
