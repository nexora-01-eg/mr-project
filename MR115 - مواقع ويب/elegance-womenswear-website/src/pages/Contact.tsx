import SiteShell from "@/components/SiteShell";
import { brand } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Badge className="rose-shimmer text-primary-foreground">تواصل معنا</Badge>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">خلي اختيارك أسهل</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            اتصلي بينا لو محتاجة نرشح ستايل معين، نأكد المقاسات، أو نجهز لكِ لوك كامل.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <PhoneCall className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <span className="font-display text-xl">هاتف</span>
              </div>
              <p className="mt-2 text-sm text-white/70">أسرع طريقة للتأكيد والحجز.</p>
              <a href={`tel:${brand.phoneE164}`}>
                <Button className="rose-shimmer mt-4 w-full text-primary-foreground">
                  اتصال: {brand.phoneDisplay}
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <MapPin className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <span className="font-display text-xl">العنوان</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{brand.locationAr}</p>
              <a href={brand.mapsQueryUrl} target="_blank" rel="noreferrer">
                <Button variant="outline" className="mt-4 w-full border-white/15 bg-white/5 text-white hover:bg-white/10">
                  افتح الخريطة
                </Button>
              </a>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <Clock className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <span className="font-display text-xl">مواعيد العمل</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{brand.hoursAr}</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                لو عندك مواعيد مختلفة لرمضان/العيد ابعتها وأحدّثها فورًا.
              </div>
            </Card>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
