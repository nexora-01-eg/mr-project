import SiteShell from "@/components/SiteShell";
import { brand } from "@/lib/content";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, PhoneCall } from "lucide-react";

function waLink() {
  const phone = brand.phoneE164.replace("+", "");
  return `https://wa.me/${phone}`;
}

export default function Contact() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Badge className="pink-shimmer text-primary-foreground">تواصل معنا</Badge>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">خلي اختيارك أسهل</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            ابعتي رسالة أو اتصلي… عشان نأكد المقاس/اللون والمتاح ونرشّح لكِ ستايلات تناسب المناسبة.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <PhoneCall className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                <span className="font-display text-xl">واتساب</span>
              </div>
              <p className="mt-2 text-sm text-white/70">الأسرع للرد والاختيار.</p>
              <a href={waLink()} target="_blank" rel="noreferrer">
                <Button className="pink-shimmer mt-4 w-full text-primary-foreground">مراسلة واتساب</Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <PhoneCall className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                <span className="font-display text-xl">هاتف</span>
              </div>
              <p className="mt-2 text-sm text-white/70">اتصال مباشر للتأكيد.</p>
              <a href={`tel:${brand.phoneE164}`}>
                <Button variant="outline" className="mt-4 w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  اتصال: {brand.phoneDisplay}
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <Mail className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
                <span className="font-display text-xl">البريد</span>
              </div>
              <p className="mt-2 text-sm text-white/70">للتواصل وطلبات الجملة.</p>
              <a href={`mailto:${brand.email}`}>
                <Button variant="secondary" className="mt-4 w-full bg-white/5 hover:bg-white/10">
                  {brand.email}
                </Button>
              </a>
            </Card>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-2 text-white/85">
              <MapPin className="h-4 w-4 text-[oklch(0.79_0.13_25)]" />
              <span className="font-display text-xl">العنوان</span>
            </div>
            <div className="mt-2 text-sm text-white/70">{brand.addressAr}</div>
            <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
              <Button variant="outline" className="mt-4 border-white/15 bg-white/5 text-white hover:bg-white/10">
                افتح الخريطة
              </Button>
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
