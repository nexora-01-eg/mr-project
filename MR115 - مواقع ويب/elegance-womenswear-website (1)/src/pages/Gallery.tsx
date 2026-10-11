import SiteShell from "@/components/SiteShell";
import refGallery from "@/assets/zaini/ref-gallery.png";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Gallery() {
  return (
    <SiteShell>
      <main className="grain">
        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <Badge className="pink-shimmer text-primary-foreground">الصور</Badge>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">مجموعة ستايلات من Zaini Fashion</h1>
          <p className="mt-2 text-muted-foreground">
            لقطات من الموديلات المتاحة… لو عجبك ستايل ابعتي اسكرين/رقم الصف وهنرد عليك فورًا.
          </p>

          <div className="mt-8">
            <Card className="overflow-hidden border-white/10 bg-white/5">
              <img src={refGallery} alt="مجموعة صور المنتجات" className="w-full object-cover" />
            </Card>
          </div>

          <div className="mt-6 text-xs text-white/50">
            (لو تبعتي صور منفصلة لكل قطعة بدل الصورة المجمعة—أحوّلها لكتالوج منتجات بصور وأسعار لكل منتج.)
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
