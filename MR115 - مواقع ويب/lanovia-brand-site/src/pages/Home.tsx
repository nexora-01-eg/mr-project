import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Sparkles, Ruler, Gem, ShieldCheck, ArrowLeft } from "lucide-react";
import PageShell from "@/components/PageShell";
import heroImg from "@/assets/hero.jpeg";
import patternImg from "@/assets/pattern.jpeg";

interface HomeProps {
  targetSection?: string;
}

const categories = [
  {
    title: "سواريه",
    desc: "ستايل سهل التصوير… وفخم على الحقيقة.",
    bullets: ["قصّات مُجربة", "خامات مريحة", "ألوان الموسم"],
  },
  {
    title: "فساتين زفاف",
    desc: "تفاصيل دقيقة لليوم اللي مستحيل يتكرر.",
    bullets: ["تعديلات مقاس", "اقتراحات ستايل", "جلسة بروفة"],
  },
  {
    title: "هوم وير",
    desc: "أناقة هادية… من غير مجهود.",
    bullets: ["قماش ناعم", "شياكة يومية", "تصميمات عملية"],
  },
  {
    title: "لانجري",
    desc: "تفاصيل صغيرة تفرق في الثقة.",
    bullets: ["خامات مختارة", "مقاسات متنوعة", "تشطيبات نظيفة"],
  },
];

const customerWins = [
  {
    icon: ShieldCheck,
    title: "ثقة قبل ما تشتري",
    desc: "معلومات واضحة عن الخامة، المقاسات، وسياسة التبديل… بدل ما القرار يبقى عشوائي.",
  },
  {
    icon: Ruler,
    title: "مقاس مظبوط",
    desc: "إرشادات قياس + حجز بروفة/تعديل بسهولة. تقليل الهدر واللف والدوران.",
  },
  {
    icon: Gem,
    title: "ستايل على حسب المناسبة",
    desc: "اقتراحات إطلالة + أكسسوار + ألوان تناسب موسم الأفراح 2026/2027.",
  },
];

const brandWins = [
  {
    icon: Sparkles,
    title: "هوية واحدة في كل مكان",
    desc: "نفس الألوان والخطوط والنبرة على السوشيال والموقع والواتساب… فتِتثبت في دماغ العميل.",
  },
  {
    icon: Check,
    title: "زيادة الطلبات الجاهزة",
    desc: "العميل يجي وهو فاهم السعر التقريبي، المقاس، والاختيارات. وقت أقل في شرح نفس الكلام.",
  },
  {
    icon: ArrowLeft,
    title: "رحلة بيع أوضح",
    desc: "من اكتشاف المنتج → اختيار → تواصل → حجز/شراء. خطوة بخطوة بدل ما العميل يضيع.",
  },
];

export default function Home({ targetSection }: HomeProps) {
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 noise-overlay" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:col-span-7"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                موسم الأفراح 2026 / 2027
              </Badge>

              <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">
                لانوفيا…
                <span className="block text-primary">أناقة "تتشرح" قبل ما تتشاف</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-foreground/80">
                موقع واحد يلمّ كل حاجة: البراند ستوري، أسلوبنا، المجموعات، وسياسة البيع… عشان العميل
                يفهمك بسرعة ويختار وهو مطمّن.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/shop">تصفّح المنتجات</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/brief">شوف البريف الكامل (هوية + خطة)</Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {["خامات مختارة", "تعديلات مقاس", "تواصل سريع"].map((t) => (
                  <div key={t} className="rounded-2xl border border-border bg-background/60 p-4">
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="mt-1 text-xs text-muted-foreground">تفاصيل واضحة… بدون لف.</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
              className="md:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card">
                <div className="absolute inset-0 opacity-20">
                  <img src={patternImg} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="relative p-7">
                  <div className="font-display text-2xl">لا نبيع فستان… نبيع قرار مطمّن</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    الهدف من الهوية الرقمية الجديدة هو إن العميل يعرف بسرعة: مين Lanovia، بتقدم إيه،
                    وإزاي يشتري أو يحجز — من غير ما يسأل نفس الأسئلة كل مرة.
                  </p>

                  <Separator className="my-6" />

                  <div className="grid gap-4">
                    {["صور أقوى", "محتوى أوضح", "طلب أسرع"].map((x) => (
                      <div key={x} className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="text-sm">{x}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 h-px gold-line" />
                  <div className="mt-4 text-xs text-muted-foreground">
                    "EXPECT MORE ELEGANCE" — شعارك لازم يبان في الكلام قبل الصور.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="collections" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="font-display text-3xl">المجموعات</div>
            <p className="mt-2 text-sm text-muted-foreground">اختاري حسب المناسبة — وإحنا نظبط الباقي.</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link href="/shop">فتح المتجر</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {categories.map((c) => (
            <Card key={c.title} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  <div className="relative md:col-span-2">
                    <div className="absolute inset-0 opacity-35">
                      <img src={patternImg} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="relative p-6">
                      <div className="font-display text-2xl text-primary">{c.title}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{c.desc}</div>
                    </div>
                  </div>
                  <div className="p-6 md:col-span-3">
                    <ul className="grid gap-2 text-sm">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a href="https://wa.me/201012127793" target="_blank" rel="noreferrer">
                          احجزي دلوقتي
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link href="/brief">معايير الجودة</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT HELPS */}
      <section id="value" className="bg-secondary/35 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="font-display text-3xl">الموقع ده هيساعد العميل إزاي؟</div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                العميل بيشتري فستان وهو قلقان: هل المقاس هينفع؟ اللون طالع حلو؟ هيتعدل؟ هنا بنحوّل
                القلق ده لخطوات واضحة.
              </p>
              <div className="mt-7 grid gap-4">
                {customerWins.map((x) => (
                  <div key={x.title} className="rounded-2xl border border-border bg-background/70 p-5">
                    <div className="flex items-start gap-3">
                      <x.icon className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">{x.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground leading-7">{x.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-display text-3xl">وهيفيد البراند إزاي؟</div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                الهوية الرقمية مش شكل بس — دي نظام يخلّي كل عميل يوصلك ويكمل للشراء.
              </p>
              <div className="mt-7 grid gap-4">
                {brandWins.map((x) => (
                  <div key={x.title} className="rounded-2xl border border-border bg-background/70 p-5">
                    <div className="flex items-start gap-3">
                      <x.icon className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">{x.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground leading-7">{x.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-xl">عايز العميل يشتغل معاك؟</div>
                <p className="mt-2 text-sm text-muted-foreground leading-7">
                  خلي العرض واضح: (1) هتقدّم له إيه بالضبط، (2) هيوصل لإيه بعد ما يشتري، (3) إزاي
                  يبدأ دلوقتي. عشان كده حاطين البريف بالكامل في صفحة واحدة.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/brief">اقرأ البريف بالكامل</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://wa.me/201012127793" target="_blank" rel="noreferrer">
                      ابعت استفسارك
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-16">
        <div className="font-display text-3xl">إزاي تشتري/تحجزي في Lanovia؟</div>
        <p className="mt-3 text-sm text-muted-foreground leading-7">
          نفس الخطوات هتتكرر على السوشيال + الواتساب + داخل الفرع… بس هنا مكتوبة بوضوح.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { n: "01", t: "اختاري المنتج", d: "من المتجر أو من انستجرام." },
            { n: "02", t: "حددي المقاس", d: "هنبعتلك جدول قياسات سريع." },
            { n: "03", t: "تأكيد وحجز", d: "واتساب/مكالمة أو زيارة الفرع." },
            { n: "04", t: "استلام/تعديل", d: "استلام جاهز أو تعديل بسيط." },
          ].map((s) => (
            <div key={s.n} className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display text-2xl text-primary">{s.n}</div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <div className="mt-2 text-sm text-muted-foreground leading-7">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-secondary/35">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="font-display text-3xl">التواصل والعنوان</div>
              <p className="mt-3 text-sm text-muted-foreground leading-7">
                لو عايزة حد يساعدك تختاري، ابعتي صورة المناسبة أو لونك المفضل… وهنرشحلك الأنسب.
              </p>

              <div className="mt-7 rounded-3xl border border-border bg-background/70 p-6">
                <div className="text-sm">
                  <span className="font-semibold">العنوان:</span> شارع الجلاء البحري – ميدان أنور السادات – شبين الكوم – المنوفية
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">الهاتف:</span> 01012127793
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">Instagram:</span> lanovia_wear
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="https://wa.me/201012127793" target="_blank" rel="noreferrer">واتساب</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="tel:+201012127793">مكالمة</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href="https://www.google.com/maps?q=H275%2BJ22%2C%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85%2C%20%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9"
                      target="_blank"
                      rel="noreferrer"
                    >
                      فتح على الخريطة
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card overflow-hidden">
              <iframe
                title="Lanovia map"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=H275%2BJ22%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85&output=embed"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
