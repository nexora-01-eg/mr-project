import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const nav = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP ALL" },
  { href: "/collections", label: "COLLECTIONS" },
  { href: "/brief", label: "DIGITAL ID" },
];

export default function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />

        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <img src={logo} alt="FOG Fashion Wear" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "relative rounded-full px-4 py-2 text-xs tracking-widest transition-colors " +
                    (active ? "text-primary" : "text-foreground/75 hover:text-foreground")
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
            <Button size="icon" variant="ghost" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/shop">
                <ShoppingBag className="ms-2 h-4 w-4" />
                Shop
              </Link>
            </Button>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="tel:+200753683415">
                <Phone className="ms-2 h-4 w-4" />
                اطلب
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost" aria-label="Location" className="hidden md:inline-flex">
              <a
                href="https://www.google.com/maps?q=16%20%D8%B3%D9%85%D9%8A%D8%B1%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B1%D8%A4%D9%88%D9%81%20%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D9%86%D8%B5%D8%B1"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
