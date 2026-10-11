import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import patternImg from "@/assets/pattern.jpeg";
import logoMono from "@/assets/logo-monogram.png";

type Category = "سواريه" | "زفاف" | "هوم وير" | "لانجري";

type Product = {
  id: string;
  name: string;
  category: Category;
  priceHint: string;
  note: string;
};

const products: Product[] = [
  { id: "p1", name: "فستان سواريه ساتان – قصة A", category: "سواريه", priceHint: "اسألي عن السعر", note: "ألوان متعددة + تعديل مقاس" },
  { id: "p2", name: "فستان سواريه دانتيل – كتف واحد", category: "سواريه", priceHint: "اسألي عن السعر", note: "مناسب للحفلات والكتب كتاب" },
  { id: "p3", name: "فستان زفاف دانتيل – ذيل خفيف", category: "زفاف", priceHint: "حسب التفاصيل", note: "جلسة بروفة + تعديل" },
  { id: "p4", name: "فستان زفاف سادة – قَصّة ملكي", category: "زفاف", priceHint: "حسب التفاصيل", note: "اختيارات طرحة وإكسسوار" },
  { id: "p5", name: "طقم هوم وير – خامة ناعمة", category: "هوم وير", priceHint: "اسألي عن السعر", note: "مريح وشيك" },
  { id: "p6", name: "لانجري – تشطيب فاخر", category: "لانجري", priceHint: "اسألي عن السعر", note: "مقاسات متنوعة" },
];

function ProductCard({ p }: { p: Product }) {
  const msg = encodeURIComponent(`عايزه تفاصيل عن: ${p.name}`);
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute inset-0 opacity-30">
          <img src={patternImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <img src={logoMono} alt="" className="h-20 w-20 rounded-2xl opacity-95" />
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{p.name}</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20">{p.category}</Badge>
          <span className="text-xs text-muted-foreground">{p.priceHint}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-7">{p.note}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a href={`https://wa.me/201012127793?text=${msg}`} target="_blank" rel="noreferrer">
              <Sparkles className="ms-2 h-4 w-4" />
              اسألي على واتساب
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="tel:+201012127793">
              <ShoppingBag className="ms-2 h-4 w-4" />
              احجزي بالمكالمة
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Shop() {
  const byCat = (cat: Category) => products.filter((p) => p.category === cat);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-display text-4xl">المتجر</div>
              <p className="mt-2 text-sm text-muted-foreground leading-7">
                هنا شكل المتجر وطريقة عرض المنتجات. عند تجهيز صور المنتجات وأسعارها، بنستبدل البيانات دي بسهولة.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/brief">خطة المحتوى + الهوية</Link>
            </Button>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue="سواريه" className="w-full">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="سواريه">سواريه</TabsTrigger>
              <TabsTrigger value="زفاف">زفاف</TabsTrigger>
              <TabsTrigger value="هوم وير">هوم وير</TabsTrigger>
              <TabsTrigger value="لانجري">لانجري</TabsTrigger>
            </TabsList>

            {(["سواريه", "زفاف", "هوم وير", "لانجري"] as Category[]).map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-6">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {byCat(cat).map((p) => (
                    <ProductCard key={p.id} p={p} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-10 rounded-3xl border border-border bg-secondary/35 p-6">
            <div className="font-display text-xl">عايزة المتجر يبقى كامل (دفع وشحن)؟</div>
            <p className="mt-2 text-sm text-muted-foreground leading-7">
              نقدر نطوّر المرحلة الجاية لإضافة: دفع أونلاين، شحن، كوبونات، وإدارة مخزون. دلوقتي ركّزنا على "عرض المنتجات + تحويل سريع لواتساب" لأنه أسرع طريق للمبيعات.
            </p>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
