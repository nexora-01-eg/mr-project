import logoRound from "@/assets/logo-round.jpeg";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoRound} alt="FOG" className="h-12 w-12 rounded-full" />
              <div>
                <div className="font-display text-xl">FOG Fashion Wear</div>
                <div className="text-sm text-muted-foreground">ملابس رجالي — جودة وسعر</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-7">
              ستايل رجالي عملي… من غير مبالغة. ركّزنا على عرض الأقسام بشكل واضح عشان العميل يوصل للمنتج بسرعة.
            </p>
          </div>

          <div>
            <div className="font-display text-lg">CONTACT</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>📍 16 سمير عبد الرؤوف — مدينة نصر — القاهرة</li>
              <li>☎ 02 46301304</li>
              <li>📱 +20 07536834 15</li>
              <li>IG: fog_fashion_wear</li>
            </ul>
          </div>

          <div>
            <div className="font-display text-lg">NOTE</div>
            <p className="mt-4 text-sm text-muted-foreground leading-7">
              ده نموذج هوية رقمية + ويب سايت عرض منتجات. نقدر في مرحلة تانية نضيف دفع أونلاين، شحن، ومخزون.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} FOG.</div>
          <div>Digital identity demo site.</div>
        </div>
      </div>
    </footer>
  );
}
