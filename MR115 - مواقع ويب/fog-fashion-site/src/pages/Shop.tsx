import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

import hoodie from "@/assets/collections/hoodie.jpeg";
import jacket from "@/assets/collections/jacket.jpeg";
import bottoms from "@/assets/collections/bottoms.jpeg";
import polos from "@/assets/collections/polos.jpeg";

type Cat = "Hoodie" | "Jacket" | "Bottoms" | "Polo";

const data: Record<Cat, { title: string; img: string; bullets: string[] }[]> = {
  Hoodie: [
    { title: "Hoodie — Essential", img: hoodie, bullets: ["خامة تقيلة", "ألوان أساسية", "مقاسات متنوعة"] },
  ],
  Jacket: [
    { title: "Jacket — Black", img: jacket, bullets: ["ستايل عملي", "مناسب للشتا", "تفاصيل بسيطة"] },
  ],
  Bottoms: [
    { title: "Denim Bottoms", img: bottoms, bullets: ["قماش متين", "ستايل يومي", "قصات متعددة"] },
  ],
  Polo: [
    { title: "Polo Colors", img: polos, bullets: ["ألوان كتير", "خامة مريحة", "شكل نظيف"] },
  ],
};

function ProductCard({ title, img, bullets }: { title: string; img: string; bullets: string[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/2]">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="font-display tracking-widest">{title}</div>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">تفاصيل سريعة</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href="tel:+200753683415">
              <ShoppingBag className="ms-2 h-4 w-4" />
              اطلب
            </a>
          </Button>
          <Button className="flex-1" variant="outline" asChild>
            <a href="#contact">اسأل</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Shop() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-display text-4xl">SHOP ALL</div>
              <p className="mt-2 text-sm text-muted-foreground leading-7">
                دي صفحة عرض (نموذج). أول ما تبعت صور المنتجات/الأسعار، بنحوّلها لكتالوج كامل.
              </p>
            </div>
            <Badge className="bg-primary/15 text-primary border-primary/25">FOG • MEN</Badge>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="Hoodie" className="w-full">
              <TabsList className="flex flex-wrap">
                <TabsTrigger value="Hoodie">Hoodie</TabsTrigger>
                <TabsTrigger value="Jacket">Jacket</TabsTrigger>
                <TabsTrigger value="Bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="Polo">Polo</TabsTrigger>
              </TabsList>

              {(Object.keys(data) as Cat[]).map((cat) => (
                <TabsContent key={cat} value={cat} className="mt-6">
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {data[cat].map((p) => (
                      <ProductCard key={p.title} title={p.title} img={p.img} bullets={p.bullets} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
