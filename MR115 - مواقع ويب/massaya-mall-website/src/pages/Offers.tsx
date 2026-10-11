/*
Offers Page — Luxe Retail / Egyptian Glam
*/

import SiteShell from "@/components/SiteShell";
import { brand, offersCopy } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Sparkles } from "lucide-react";

function waLink(text: string) {
  const msg = encodeURIComponent(text);
  const phone = brand.phoneE164.replace("+", "");
  return `https://wa.me/${phone}?text=${msg}`;
}

export default function Offers() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
            <span>جديد مسايا</span>
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">{offersCopy.title}</h1>
          <p className="mt-2 text-muted-foreground">{offersCopy.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="border-white/10 bg-white/5 p-6">
              <Badge className="gold-shimmer text-primary-foreground">عرض محدود</Badge>
              <div className="mt-3 font-display text-2xl">باكدجات العروسة</div>
              <p className="mt-2 text-sm text-white/70">
                اسألي عن باكدجات المفروشات وتجهيزات العروسة… هنرشح لك الأنسب حسب ذوقك.
              </p>
              <a
                href={waLink("مرحبًا مسايا مول، عاوز/عاوزة تفاصيل باكدجات العروسة والعروض الحالية.")}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="gold-shimmer mt-4 text-primary-foreground">
                  <PhoneCall className="ms-2 h-4 w-4" />
                  اسأل عن العروض
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <Badge variant="secondary" className="bg-white/5 text-white/80">
                تحديث مستمر
              </Badge>
              <div className="mt-3 font-display text-2xl">خصومات موسمية</div>
              <p className="mt-2 text-sm text-white/70">
                عروض على فئات محددة حسب الموسم—تابعينا علشان تلحقي الأفضل.
              </p>
              <a
                href={waLink("مرحبًا مسايا مول، ممكن أحدث الخصومات والمنتجات المتاحة؟")}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" className="mt-4 border-white/15 bg-white/5 text-white hover:bg-white/10">
                  مراسلة واتساب
                </Button>
              </a>
            </Card>
          </div>

          <div className="mt-10 text-sm text-white/55">{offersCopy.note}</div>
        </section>
      </main>
    </SiteShell>
  );
}
