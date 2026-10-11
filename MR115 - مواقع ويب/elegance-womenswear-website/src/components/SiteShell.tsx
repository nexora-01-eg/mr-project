import { Link, useLocation } from "wouter";
import { brand, nav } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, PhoneCall, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [loc] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 p-[2px]">
              <div className="rose-shimmer h-full w-full rounded-[0.7rem]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg">
                {brand.nameAr} <span className="opacity-70">|</span> {brand.nameAr2}
              </div>
              <div className="text-xs text-white/60">{brand.categoryAr}</div>
            </div>
          </Link>

          <nav className="ms-auto hidden items-center gap-2 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm text-white/75 hover:bg-white/5 hover:text-white",
                  loc === n.href && "bg-white/7 text-white"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2 md:ms-3">
            <a href={`tel:${brand.phoneE164}`}>
              <Button className="rose-shimmer hidden text-primary-foreground md:inline-flex">
                <PhoneCall className="ms-2 h-4 w-4" />
                اتصال
              </Button>
            </a>
            <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                className="hidden border-white/15 bg-white/5 text-white hover:bg-white/10 md:inline-flex"
              >
                <MapPin className="ms-2 h-4 w-4" />
                الخريطة
              </Button>
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10 md:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-white/10 bg-black text-white">
                <SheetHeader>
                  <SheetTitle className="font-display">القائمة</SheetTitle>
                </SheetHeader>
                <div className="mt-5 grid gap-1">
                  {nav.map((n) => (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={cn(
                        "rounded-xl px-3 py-3 text-sm text-white/80 hover:bg-white/10",
                        loc === n.href && "bg-white/10"
                      )}
                    >
                      {n.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 grid gap-2">
                  <a href={`tel:${brand.phoneE164}`}>
                    <Button className="rose-shimmer w-full text-primary-foreground">
                      <PhoneCall className="ms-2 h-4 w-4" />
                      اتصال مباشر
                    </Button>
                  </a>
                  <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
                    <Button
                      variant="outline"
                      className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                    >
                      <MapPin className="ms-2 h-4 w-4" />
                      افتح الخريطة
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 bg-black/55">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
          <div>
            <div className="font-display text-2xl">{brand.nameAr2}</div>
            <p className="mt-2 text-sm text-white/65">{brand.taglineAr}</p>
          </div>
          <div className="text-sm text-white/65">
            <div className="text-white/80">العنوان</div>
            <div className="mt-1">{brand.locationAr}</div>
            <div className="mt-3 text-white/80">الهاتف</div>
            <a className="mt-1 inline-block hover:text-white" href={`tel:${brand.phoneE164}`}>
              {brand.phoneDisplay}
            </a>
          </div>
          <div className="text-sm text-white/65">
            <div className="text-white/80">روابط سريعة</div>
            <div className="mt-2 grid gap-1">
              {nav.slice(0, 4).map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              ))}
              <a className="hover:text-white" href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
                موقعنا على الخريطة
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-6 text-xs text-white/45">
          © {new Date().getFullYear()} {brand.nameAr2}. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
