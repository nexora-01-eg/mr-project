/*
Products — Elegance Womenswear
- Call-first ordering (no payment backend)
*/

import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import SiteShell from "@/components/SiteShell";
import { brand, categories, products, type Product } from "@/lib/content";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { PhoneCall, Search, Sparkles, MapPin } from "lucide-react";

function priceLabel(p: Product) {
  if (!p.price) return "اسألي عن السعر";
  return `${p.price.toLocaleString("ar-EG")} ج`;
}

export default function Products() {
  const [loc] = useLocation();
  const urlCat = useMemo(() => {
    const q = loc.split("?")[1] || "";
    const params = new URLSearchParams(q);
    return params.get("cat") || "all";
  }, [loc]);

  const [cat, setCat] = useState(urlCat);
  const [q, setQ] = useState("");

  useEffect(() => {
    setCat(urlCat);
  }, [urlCat]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      const byCat = cat === "all" ? true : p.categoryKey === cat;
      const byQ = !needle ? true : (p.name + " " + p.description).toLowerCase().includes(needle);
      return byCat && byQ;
    });
  }, [cat, q]);

  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                <Sparkles className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <span>كتالوج اليجانس</span>
              </div>
              <h1 className="mt-4 font-display text-4xl md:text-5xl">المنتجات</h1>
              <p className="mt-2 text-muted-foreground">
                اختاري القطعة… واتصلي بينا عشان نأكد المقاس/اللون والمتاح.
              </p>
            </div>

            <div className="w-full md:w-[360px]">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/55" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="ابحثي بالاسم أو الوصف…"
                  className="border-white/10 bg-white/5 pr-10 text-white placeholder:text-white/40"
                />
              </div>
            </div>
          </div>

          <div className="mt-7">
            <Tabs value={cat} onValueChange={setCat}>
              <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-full border border-white/10 bg-white/5 data-[state=active]:rose-shimmer data-[state=active]:text-primary-foreground"
                >
                  الكل
                </TabsTrigger>
                {categories.map((c) => (
                  <TabsTrigger
                    key={c.key}
                    value={c.key}
                    className="rounded-full border border-white/10 bg-white/5 data-[state=active]:rose-shimmer data-[state=active]:text-primary-foreground"
                  >
                    {c.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/75">
              لا توجد نتائج… جرّبي كلمة مختلفة.
            </div>
          )}

          <div className="mt-10 grid gap-3 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="font-display text-2xl">عايزة تشوفي الموديلات المتاحة النهارده؟</div>
              <p className="mt-2 text-sm text-white/65">
                اتصلي بينا… وهنقولك المتاح فورًا (مقاسات/ألوان/أسعار).
              </p>
              <a href={`tel:${brand.phoneE164}`}>
                <Button className="rose-shimmer mt-4 text-primary-foreground">
                  <PhoneCall className="ms-2 h-4 w-4" />
                  اتصال الآن
                </Button>
              </a>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="font-display text-2xl">تحبي تزورينا وتجرّبي على راحتك؟</div>
              <p className="mt-2 text-sm text-white/65">افتحي الخريطة… وخدي أقرب طريق.</p>
              <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="mt-4 border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <MapPin className="ms-2 h-4 w-4" />
                  افتح الخريطة
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function ProductCard({ p }: { p: Product }) {
  const catName = categories.find((c) => c.key === p.categoryKey)?.name || "";

  return (
    <Card className="overflow-hidden border-white/10 bg-white/5">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-white/55">{catName}</div>
            <div className="mt-1 font-display text-xl leading-tight">{p.name}</div>
          </div>
          {p.badge && <Badge className="rose-shimmer text-primary-foreground">{p.badge}</Badge>}
        </div>

        <div className="mt-3 text-sm leading-6 text-white/70">{p.description}</div>

        <ul className="mt-4 grid gap-2 text-sm text-white/70">
          {p.bullets.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.12_30)]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between">
          <div className="font-display text-lg">{priceLabel(p)}</div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="bg-white/5 hover:bg-white/10">
                  تفاصيل
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/10 bg-black text-white">
                <DialogHeader>
                  <DialogTitle className="font-display">{p.name}</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-white/70">{p.description}</div>
                <div className="mt-4 grid gap-2">
                  {p.bullets.map((f) => (
                    <div key={f} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <div className="font-display text-lg">{priceLabel(p)}</div>
                  <a href={`tel:${brand.phoneE164}`}>
                    <Button className="rose-shimmer text-primary-foreground">
                      <PhoneCall className="ms-2 h-4 w-4" />
                      اسألي عن المتاح
                    </Button>
                  </a>
                </div>
              </DialogContent>
            </Dialog>

            <a href={`tel:${brand.phoneE164}`}>
              <Button className="rose-shimmer text-primary-foreground">
                <PhoneCall className="ms-2 h-4 w-4" />
                اتصال
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
