// App shell: Noir Ops — dark luxury admin console, Arabic-first RTL with EN toggle.

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { AuthProvider } from "@/contexts/AuthContext";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "@/components/layout/AppShell";


import DashboardPage from "@/pages/app/Dashboard";
import OrdersPage from "@/pages/app/Orders";
import DriversPage from "@/pages/app/Drivers";
import CallsPage from "@/pages/app/Calls";
import AnalyticsPage from "@/pages/app/Analytics";
import SettingsPage from "@/pages/app/Settings";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <I18nProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <HashRouter>
                <Routes>
                  <Route path="/app" element={<AppShell />} >
                    <Route index element={<Navigate to="/app/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="drivers" element={<DriversPage />} />
                    <Route path="calls" element={<CallsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                </Routes>
              </HashRouter>
            </TooltipProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
