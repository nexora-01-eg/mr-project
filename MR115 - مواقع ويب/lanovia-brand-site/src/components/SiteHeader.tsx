import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Phone, AtSign, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-primary.png";

const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "المتجر" },
  { href: "/brief", label: "البريف" },
];

export default function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <img src={logo} alt="Lanovia لانوفيا" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <div className="font-display text-lg leading-none">Lanovia</div>
              <div className="text-xs text-muted-foreground leading-none">EXPECT MORE ELEGANCE</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "relative rounded-full px-4 py-2 text-sm transition-colors " +
                    (active
                      ? "text-primary"
                      : "text-foreground/80 hover:text-foreground")
                  }
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <a href="tel:+201012127793">
                <Phone className="ms-2 h-4 w-4" />
                01012127793
              </a>
            </Button>

            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a
                href="https://wa.me/201012127793"
                target="_blank"
                rel="noreferrer"
              >
                <Sparkles className="ms-2 h-4 w-4" />
                احجزي / اسألي
              </a>
            </Button>

            <div className="hidden lg:flex items-center gap-1 ms-2">
              <Button asChild size="icon" variant="ghost" aria-label="Instagram">
                <a
                  href="https://www.instagram.com/lanovia_wear"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AtSign className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="icon" variant="ghost" aria-label="المتجر">
                <Link href="/shop">
                  <ShoppingBag className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost" aria-label="العنوان">
                <a
                  href="https://www.google.com/maps?q=H275%2BJ22%2C%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85%2C%20%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
