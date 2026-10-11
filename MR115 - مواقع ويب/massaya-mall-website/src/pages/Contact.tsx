/*
Contact Page — Luxe Retail / Egyptian Glam
*/

import SiteShell from "@/components/SiteShell";
import { brand, contactCopy } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Camera, MapPin, MessageCircle } from "lucide-react";

function waLink(text: string) {
  const msg = encodeURIComponent(text);
  const phone = brand.phoneE164.replace("+", "");
  return `https://wa.me/${phone}?text=${msg}`;
}

export default function Contact() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Badge className="gold-shimmer text-primary-foreground">تواصل</Badge>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">{contactCopy.title}</h1>
          <p className="mt-2 text-muted-foreground">{contactCopy.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <MessageCircle className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
                <span className="font-display text-xl">واتساب</span>
              </div>
              <p className="mt-2 text-sm text-white/70">أسرع طريقة لطلب منتج أو سؤال عن المتاح.</p>
              <a
                href={waLink("مرحبًا مسايا مول، ممكن أعرف المتاح والأسعار؟")}
                target="_blank"
                rel="noreferrer"
              >
                <Button className="gold-shimmer mt-4 w-full text-primary-foreground">
                  {contactCopy.ctas.whatsapp}
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <PhoneCall className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
                <span className="font-display text-xl">هاتف</span>
              </div>
              <p className="mt-2 text-sm text-white/70">اتصل بنا للاستفسار السريع.</p>
              <a href={`tel:${brand.phoneE164}`}>
                <Button variant="outline" className="mt-4 w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  {contactCopy.ctas.call}: {brand.phoneDisplay}
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <Camera className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
                <span className="font-display text-xl">إنستجرام</span>
              </div>
              <p className="mt-2 text-sm text-white/70">تابع أحدث الصور والعروض.</p>
              <a href={`https://instagram.com/${brand.instagramHandle}`} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="mt-4 w-full bg-white/5 hover:bg-white/10">
                  {contactCopy.ctas.instagram}: @{brand.instagramHandle}
                </Button>
              </a>
            </Card>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-2 text-white/85">
              <MapPin className="h-4 w-4 text-[oklch(0.83_0.13_85)]" />
              <span className="font-display text-xl">العنوان</span>
            </div>
            <div className="mt-2 text-sm text-white/70">{brand.locationAr}</div>
            <div className="mt-4 text-xs text-white/50">
              (لو عندك رابط خرائط Google للفرع ابعتهولي وأضيفه زر “افتح الخريطة”.)
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
