import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Brief() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/15 text-primary border-primary/25">DIGITAL IDENTITY</Badge>
            <Badge variant="outline">FOG Fashion Wear</Badge>
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl">البريف الكامل (للعميل)</h1>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-7">
            الصفحة دي بتشرح للعميل “إنت مين” و“ليه يثق” و“إزاي يطلب” — وبتحط الهوية الرقمية في شكل نظام: تصميم + كلام +
            رحلة شراء.
          </p>

          <Separator className="my-10" />

          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-5">
              <CardContent className="p-7">
                <div className="font-display text-2xl text-primary">جوهر البراند</div>
                <ul className="mt-4 space-y-3 text-sm leading-7">
                  <li>
                    <b>الوعد:</b> ستايل رجالي عملي + جودة محترمة + سعر واضح.
                  </li>
                  <li>
                    <b>الأسلوب:</b> Grunge luxe — أسود/رمادي مع Accent برتقالي واحد.
                  </li>
                  <li>
                    <b>نبرة الكلام:</b> مختصرة، مباشرة، فيها “عرض/ميزة/CTA”.
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5">
                  <div className="text-sm font-semibold">الجملة اللي العميل لازم يفهمها بسرعة</div>
                  <p className="mt-2 text-sm text-muted-foreground leading-7">
                    “اختار القسم… وشوف المتاح… واطلب فورًا. لو محتار في المقاس، اسألنا في دقيقة.”
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-7">
              <div className="font-display text-2xl">نظام الهوية الرقمية</div>
              <p className="mt-2 text-sm text-muted-foreground leading-7">
                الهدف إن أي حد يشوفك (فيسبوك/إنستجرام/موقع) يحس بنفس الإحساس: نفس الستايل ونفس الوضوح.
              </p>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="tone">
                  <AccordionTrigger>1) نبرة الكلام</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li>
                        <b>Short:</b> جمل قصيرة.
                      </li>
                      <li>
                        <b>Direct:</b> ميزات + سعر/عرض + CTA.
                      </li>
                      <li>
                        <b>Confident:</b> من غير مبالغة.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="visual">
                  <AccordionTrigger>2) الألوان والخطوط</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li>
                        <b>Base:</b> أسود/فحمي.
                      </li>
                      <li>
                        <b>Accent:</b> برتقالي واحد للزرار والعروض.
                      </li>
                      <li>
                        <b>Fonts:</b> Tajawal للنص العربي + Oswald للعناوين.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="content">
                  <AccordionTrigger>3) خطة محتوى بسيطة</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {[
                        "عرض منتج (صورة + تفاصيل)",
                        "Top sellers",
                        "خصومات وعروض",
                        "إرشادات مقاس",
                      ].map((x) => (
                        <div key={x} className="rounded-2xl border border-border bg-card p-4 text-sm">
                          {x}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="site">
                  <AccordionTrigger>4) ليه ويب سايت؟</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li>
                        <b>لينك واحد:</b> بدل شات طويل.
                      </li>
                      <li>
                        <b>أقسام واضحة:</b> العميل يختار أسرع.
                      </li>
                      <li>
                        <b>تحويل أسرع:</b> زر “اطلب” مباشر.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kpi">
                  <AccordionTrigger>5) KPIs</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm leading-7">
                      <li>عدد المكالمات/الرسائل من زرار الموقع.</li>
                      <li>أكثر الأقسام زيارة.</li>
                      <li>معدل التحويل: زيارة → طلب.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}
