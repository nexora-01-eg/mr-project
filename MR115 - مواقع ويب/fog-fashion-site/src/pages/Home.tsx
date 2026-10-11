import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Flame, BadgePercent } from "lucide-react";

import hero from "@/assets/hero.jpeg";
import pattern from "@/assets/pattern.jpeg";

import hoodie from "@/assets/collections/hoodie.jpeg";
import jacket from "@/assets/collections/jacket.jpeg";
import bottoms from "@/assets/collections/bottoms.jpeg";
import polos from "@/assets/collections/polos.jpeg";

interface HomeProps {
  targetSection?: string;
}

const collections = [
  { title: "HOODIE & SWEATSHIRT", href: "/shop", img: hoodie },
  { title: "JACKET", href: "/shop", img: jacket },
  { title: "BOTTOMS", href: "/shop", img: bottoms },
  { title: "POLO", href: "/shop", img: polos },
];

const featured = [
  { name: "Flannel Winter Shirt", price: "990 LE", old: "1,730 LE", save: "Save 740 LE" },
  { name: "Gabardine Checkered Shirt", price: "990 LE", old: "1,730 LE", save: "Save 740 LE" },
  { name: "Classic Polo", price: "—", old: "—", save: "New" },
  { name: "Denim Bottoms", price: "—", old: "—", save: "Top" },
];

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  return (
    <PageShell>
      {/* HERO SLIDER (روح cleverwears) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/75" />
          <div className="absolute inset-0 fog-noise" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="grid gap-8 md:grid-cols-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="md:col-span-7"
                  >
                    <Badge className="bg-primary/15 text-primary border-primary/25">NEW DROP</Badge>
                    <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95]">
                      FOG
                      <span className="block text-foreground/85">FASHION WEAR</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-foreground/75 leading-7 max-w-xl">
                      ملابس رجالي… ستايل عملي وجودة محترمة. خليك جاهز قبل زيادة الأسعار.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/shop">
                          <ShoppingBag className="ms-2 h-4 w-4" />
                          SHOP ALL
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/collections">Our Collections</Link>
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
                    className="md:col-span-5"
                  >
                    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card edge-glow">
                      <div className="absolute inset-0 opacity-25">
                        <img src={pattern} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="relative p-7">
                        <div className="font-display text-xl">عرض لفترة محدودة</div>
                        <div className="mt-2 text-sm text-muted-foreground leading-7">
                          نفس سعر السنة اللي فاتت على اختيارات الشتوي.
                        </div>
                        <Separator className="my-6" />
                        <div className="grid gap-3">
                          <div className="flex items-center gap-2">
                            <BadgePercent className="h-4 w-4 text-primary" />
                            <span className="text-sm">خصومات واضحة</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-primary" />
                            <span className="text-sm">Top Sellers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="grid gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-7">
                    <Badge className="bg-primary/15 text-primary border-primary/25">WINTER</Badge>
                    <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[0.95]">
                      WINTER
                      <span className="block text-foreground/85">COLLECTION</span>
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-foreground/75 leading-7 max-w-xl">
                      Flannel / Gabardine / Essentials… اختيارات تمشي مع اليوم كله.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="/shop">Shop Winter</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/brief">Digital Identity</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <div className="grid gap-3">
                      {[hoodie, jacket, polos].map((img, idx) => (
                        <div key={idx} className="overflow-hidden rounded-2xl border border-border">
                          <img src={img} alt="" className="h-32 w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section id="collections" className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="font-display text-3xl">OUR COLLECTIONS</div>
            <p className="mt-2 text-sm text-muted-foreground">اختار القسم… ووصل للمنتج بسرعة.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/shop">VIEW ALL</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link key={c.title} href={c.href} className="group">
              <Card className="overflow-hidden bg-card">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/2]">
                    <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="font-display text-lg tracking-widest">{c.title}</div>
                      <div className="mt-1 text-xs text-foreground/70">Tap to shop</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS (شكل قريب من cleverwears) */}
      <section id="featured" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-display text-3xl">FEATURED</div>
              <p className="mt-2 text-sm text-muted-foreground">أمثلة شكل العرض — بنستبدلها بمنتجاتك الحقيقية.</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/shop">OPEN SHOP</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <Card key={p.name} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/2] bg-background">
                    <img src={pattern} alt="" className="h-full w-full object-cover opacity-30" />
                    <div className="absolute inset-0 fog-noise" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="rounded-full border border-border bg-background/60 px-4 py-2 text-xs">Photo</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.price}</span>
                      <span className="line-through opacity-60">{p.old}</span>
                    </div>
                    <div className="mt-2 text-xs text-primary">{p.save}</div>
                    <div className="mt-4">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                        <a href="tel:+200753683415">Order</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-card p-7 edge-glow">
            <div className="font-display text-3xl">CONTACT</div>
            <p className="mt-3 text-sm text-muted-foreground leading-7">
              عايز تسأل عن مقاس/ألوان/توافر؟ اطلب دلوقتي أو ابعت رسالة.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="tel:+200753683415">اتصل الآن</a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
              </Button>
            </div>
            <Separator className="my-6" />
            <div className="text-sm text-muted-foreground leading-7">
              <div>📍 16 سمير عبد الرؤوف — مدينة نصر — القاهرة</div>
              <div>☎ 02 46301304</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card overflow-hidden">
            <iframe
              title="FOG map"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=16%20%D8%B3%D9%85%D9%8A%D8%B1%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B1%D8%A4%D9%88%D9%81%20%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D9%86%D8%B5%D8%B1&output=embed"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
