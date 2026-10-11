import { LogOut, MoonStar, Languages, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const { lang, toggleLang, t } = useI18n();
  const { profile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-3 border border-border bg-card rounded-2xl px-4 py-3 sticky top-4 z-10">
      <div className="min-w-0">
        <div className="font-semibold truncate">{t("appName")}</div>
        <div className="text-xs text-muted-foreground truncate">
          {profile?.officeId ? `Office: ${profile.officeId}` : "Platform"} • {profile?.role ?? "—"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={toggleLang} title={t("language")}
        >
          <Languages className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleTheme} title={theme === "dark" ? "Light" : "Dark"}
        >
          <MoonStar className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <UserCircle2 className="size-4" />
              <span className="text-sm">{profile?.displayName ?? (lang === "ar" ? "حساب" : "Account")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              {lang === "ar" ? "إعدادات الحساب" : "Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => void logout()}>
              <LogOut className="size-4" />
              <span>{lang === "ar" ? "تسجيل الخروج" : "Logout"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
