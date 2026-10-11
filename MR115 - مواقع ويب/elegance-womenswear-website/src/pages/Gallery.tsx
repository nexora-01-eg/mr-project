/*
Gallery — uses user-provided collage images.
*/

import SiteShell from "@/components/SiteShell";
import g1 from "@/assets/gallery-1.png";
import g2 from "@/assets/gallery-2.png";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Gallery() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Badge className="rose-shimmer text-primary-foreground">مجموعة الصور</Badge>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">ستايلات من المحل</h1>
          <p className="mt-2 text-muted-foreground">
            صور من موديلات ولوكّات مختلفة… علشان تختاري الأقرب لذوقك.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[g1, g2].map((src, idx) => (
              <Card key={idx} className="overflow-hidden border-white/10 bg-white/5">
                <img src={src} alt={`صور من المتجر ${idx + 1}`} className="w-full object-cover" />
              </Card>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/50">
            (لو عندك صور منفصلة لكل منتج بدل الكولاج—ابعتهم وأنا أعمل صفحة منتجات بصور لكل قطعة.)
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
