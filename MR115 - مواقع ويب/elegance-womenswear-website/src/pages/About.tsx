import SiteShell from "@/components/SiteShell";
import { brand, pillars } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Star } from "lucide-react";

export default function About() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="inline-flex items-center gap-2">
            <Badge className="rose-shimmer text-primary-foreground">عن المتجر</Badge>
            <div className="text-sm text-white/65">{brand.hoursAr}</div>
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl">{brand.nameAr2}… ذوق أعلى من العادي</h1>
          <p className="mt-2 text-muted-foreground max-w-3xl">
            في {brand.nameAr2} بنختار القطع على مبدأ واحد: "القطعة لازم ترفع الإطلالة". ستايلات عملية ومناسبة
            للمشاوير، الشغل، والمناسبات—بخامات محترمة وتفاصيل مدروسة.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 p-6 md:col-span-2">
              <div className="flex items-center gap-2 text-white/85">
                <Sparkles className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <div className="font-display text-2xl">وعدنا في كل قطعة</div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {pillars.map((p) => (
                  <div key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="font-display">{p.title}</div>
                    <div className="mt-2 text-sm text-white/70 leading-6">{p.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-white/85">
                <Star className="h-4 w-4 text-[oklch(0.78_0.12_30)]" />
                <div className="font-display text-2xl">تقييم العملاء</div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="font-display text-4xl">{brand.rating.toFixed(1)}</div>
                <div className="mt-1 text-sm text-white/70">({brand.reviewsCount} مراجعات)</div>
              </div>
              <div className="mt-4 text-sm text-white/60">
                "Elegance goods has a taste better than coffee." — تعليق عميل
              </div>
              <div className="mt-6 text-xs text-white/45">
                (لو تحب/ي نضيف اقتباسات أكتر من المراجعات ابعتلي نصوصها.)
              </div>
            </Card>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
