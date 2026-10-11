import heroImg from "@/assets/hero.jpeg";
import catSets from "@/assets/cat-sets.jpeg";
import catOuterwear from "@/assets/cat-outerwear.jpeg";
import catAbayas from "@/assets/cat-abayas.jpeg";

import { Link } from "wouter";
import { motion } from "framer-motion";
import SiteShell from "@/components/SiteShell";
import { brand, categories, heroCopy, pillars } from "@/lib/content";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, PhoneCall, Sparkles, ShoppingBag } from "lucide-react";

const catImages: Record<string, string> = {
  sets: catSets,
  outerwear: catOuterwear,
  abayas: catAbayas,
  dresses: catSets,
};

function waLink() {
  const phone = brand.phoneE164.replace("+", "");
  return `https://wa.me/${phone}`;
}

export default function Home() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="relative overflow-hidden angled">
          <div className="absolute inset-0">
            <img src={heroImg} alt="خلفية فخمة" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-black/85" />
          </div>

          <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85">
                <span className="h-2 w-2 rounded-full pink-shimmer" />
                <span>{heroCopy.kicker}</span>
              </div>

              <h1 className="mt-5 font-display text-4xl leading-[1.15] md:text-6xl">{heroCopy.title}</h1>
              <p className="mt-4 text-base leading-7 text-white/80 md:text-lg">{heroCopy.subtitle}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/products">
                  <Button className="pink-shimmer text-primary-foreground hover:opacity-95">
                    <ShoppingBag className="ms-2 h-4 w-4" />
                    {heroCopy.ctaPrimary}
                  </Button>
                </Link>

                <a href={waLink()} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <PhoneCall className="ms-2 h-4 w-4" />
                    {heroCopy.ctaSecondary}
                  </Button>
                </a>

                <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="bg-white/5 hover:bg-white/10">
                    <MapPin className="ms-2 h-4 w-4" />
                    موقعنا على الخريطة
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Sparkles className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                    <span>بناتي شيك — تفاصيل ترفع الإطلالة</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <PhoneCall className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                    <span>{brand.phoneDisplay}</span>
                  </div>
                </div>
                <a
                  className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 hover:bg-black/45"
                  href={`mailto:${brand.email}`}
                >
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Mail className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                    <span>{brand.email}</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">أقسامنا</h2>
              <p className="mt-2 text-muted-foreground">اختاري الفئة… وهتلاقي ستايلك.</p>
            </div>
            <Link href="/gallery">
              <Button variant="secondary" className="bg-white/5 hover:bg-white/10">
                شوفي الصور
              </Button>
            </Link>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {categories.map((c, idx) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
              >
                <Link href={`/products?cat=${c.key}`}>
                  <Card className="group overflow-hidden border-white/10 bg-white/5 hover:bg-white/7">
                    <div className="relative aspect-square">
                      <img
                        src={catImages[c.key] || catSets}
                        alt={c.name}
                        className="h-full w-full object-cover opacity-92 transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                      <div className="absolute bottom-0 p-5">
                        <Badge className="pink-shimmer text-primary-foreground">{brand.taglineAr}</Badge>
                        <h3 className="mt-3 font-display text-2xl">{c.name}</h3>
                        <p className="mt-1 text-sm text-white/75">{c.blurb}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16">
          <div className="grid gap-4 md:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h4 className="font-display text-lg">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
