import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import patternImg from "@/assets/pattern.jpeg";

export default function Brief() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/10 text-primary border-primary/20">الهوية الرقمية الجديدة</Badge>
            <Badge variant="outline">Lanovia | لانوفيا</Badge>
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl">البريف الكامل (مكتوب للعميل)</h1>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-7">
            الصفحة دي معمولة عشان العميل يفهم بسرعة: أنت بتقدّم إيه، ليه يثق فيك، وإزاي يبتدي يشتري/يحجز.
            وكمان بتوضح للبراند نظام شغل موحّد في العالم الرقمي.
          </p>

          <Separator className="my-10" />

          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-5 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 opacity-30">
                    <img src={patternImg} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="relative p-7">
                    <div className="font-display text-2xl text-primary">جوهر البراند</div>
                    <ul className="mt-4 space-y-3 text-sm leading-7">
                      <li><b>الوعد:</b> "أناقة محسوبة + تفاصيل نظيفة".</li>
                      <li><b>الأسلوب:</b> فخامة هادية، قصّات واضحة، خامات مريحة.</li>
                      <li><b>المشاعر:</b> ثقة، راحة، إحساس إن الاختيار صح.</li>
                      <li><b>الشعار:</b> EXPECT MORE ELEGANCE.</li>
                    </ul>

                    <div className="mt-6 rounded-2xl border border-border bg-background/70 p-5">
                      <div className="text-sm font-semibold">أنت بتحاول توصل لمين؟</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-7">
                        بنات/سيدات (منوفية + المحافظات القريبة) بيدوروا على سواريه/زفاف/هوم وير/لانجري،
                        وعايزين حد يفهمهم ويختصر عليهم وقت الاختيار.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-7">
              <div className="font-display text-2xl">نظام الهوية الرقمية (مكتوب بطريقة بسيطة)</div>
              <p className="mt-2 text-sm text-muted-foreground leading-7">
                الهدف إن أي حد يشوف Lanovia (فيسبوك/إنستجرام/واتساب/موقع) يحس إنها نفس التجربة: نفس الألوان، نفس الكلام، نفس مستوى الفخامة.
              </p>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="tone">
                  <AccordionTrigger>1) نبرة الكلام (Copy Tone)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li><b>قريبة وبسيطة:</b> مصطلحات مفهومة، من غير تعقيد.</li>
                      <li><b>واثقة:</b> وضوح في الخامة والتفاصيل والسياسات.</li>
                      <li><b>فخمة من غير مبالغة:</b> وصف رايق + صور قوية.</li>
                    </ul>
                    <div className="mt-4 rounded-2xl border border-border bg-secondary/35 p-4 text-sm leading-7">
                      <b>مثال جملة جاهزة:</b> "ده فستان سواريه ساتان بقصة A… بيظبط القوام ومريح في الحركة. لو حابة نرشح لك اللون المناسب لبشرتك ابعتي صورة." 
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="visual">
                  <AccordionTrigger>2) الهوية البصرية (ألوان/خطوط/استخدام اللوجو)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li><b>الألوان:</b> Ivory دافئ + Rose-gold كلون أساسي + Emerald لمسات.</li>
                      <li><b>الخطوط:</b> Cairo للنص العربي، وCormorant للعناوين الإنجليزية/الإحساس الفاخر.</li>
                      <li><b>اللوجو:</b> يفضّل على خلفية فاتحة (Ivory) أو داكنة جدًا (Charcoal) عشان يبان فاخر.</li>
                      <li><b>الخامات/الخلفيات:</b> قماش ساتان/شيفون + Patterns خفيفة (مش زحمة).</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="content">
                  <AccordionTrigger>3) خطة المحتوى (Content Pillars)</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {["عرض المنتج (صور + فيديو)", "تعليم (مقاس/تنسيق/نصائح)", "ثقة (آراء/قبل وبعد تعديل)", "عروض موسمية (الأفراح/العيد)"]
                        .map((x) => (
                          <div key={x} className="rounded-2xl border border-border bg-background/70 p-4 text-sm">{x}</div>
                        ))}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-7">
                      كل بوست لازم يجاوب سؤال واحد على الأقل: "ده هيفيدني إزاي؟" ويدّي CTA واضح: (اسألي/احجزي/تعالي جرّبي).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="site">
                  <AccordionTrigger>4) دور الموقع (ليه موقع مش سوشيال بس؟)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li><b>مرجع ثابت:</b> لينك واحد نبعته لأي عميل بدل شات طويل.</li>
                      <li><b>متجر مرتب:</b> تصنيفات واضحة بدل ألبومات مبعثرة.</li>
                      <li><b>قابل للتوسع:</b> لاحقًا نضيف دفع أونلاين وشحن ومخزون.</li>
                      <li><b>يثبت العلامة:</b> الموقع بيعمل إحساس "براند كبير" حتى لو الفرع واحد.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kpi">
                  <AccordionTrigger>5) مؤشرات نجاح بسيطة (KPIs)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li>عدد رسائل الواتساب اللي جاية من زرار الموقع.</li>
                      <li>أكثر الأقسام مشاهدة (سواريه/زفاف…)</li>
                      <li>معدل التحويل: زائر → رسالة → حجز.</li>
                      <li>الأسئلة اللي قلت (لأن الإجابات مكتوبة في الموقع).</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-10 rounded-3xl border border-border bg-card p-7">
                <div className="font-display text-xl">الرسالة اللي عايزين العميل يفهمها في 10 ثواني</div>
                <p className="mt-2 text-sm text-muted-foreground leading-7">
                  "Lanovia بتقدم سواريه وزفاف وهوم وير ولانجري… بأناقة فخمة وبمقاس مظبوط. تقدري تختاري من هنا، وتبدأي بسهولة على واتساب." 
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
