import { AtSign, Phone, MapPin } from "lucide-react";
import logoMono from "@/assets/logo-monogram.png";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoMono} alt="LN" className="h-12 w-12 rounded-xl" />
              <div>
                <div className="font-display text-xl">Lanovia | لانوفيا</div>
                <div className="text-sm text-muted-foreground">EXPECT MORE ELEGANCE</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-7">
              سواريه • فساتين زفاف • هوم وير • لانجري
              <br />
              هدفنا: أناقة محسوبة وتفاصيل تليق بالمناسبة.
            </p>
          </div>

          <div>
            <div className="font-display text-lg">التواصل السريع</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-primary" href="tel:+201012127793">
                  <Phone className="h-4 w-4" />
                  01012127793
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:text-primary"
                  href="https://www.instagram.com/lanovia_wear"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AtSign className="h-4 w-4" />
                  lanovia_wear
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:text-primary"
                  href="https://www.google.com/maps?q=H275%2BJ22%2C%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85%2C%20%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin className="h-4 w-4" />
                  شارع الجلاء البحري – ميدان أنور السادات – شبين الكوم
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-display text-lg">ملاحظة مهمة</div>
            <p className="mt-4 text-sm text-muted-foreground leading-7">
              هذا الموقع نموذج هوية رقمية + متجر بسيط (بدون دفع أونلاين). بيع المنتجات يتم عن طريق
              التواصل واتساب/مكالمة أو زيارة الفرع. عند جاهزيتك، نقدر نطور المتجر لاحقًا لإضافة دفع
              أونلاين، شحن، وإدارة مخزون.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Lanovia. All rights reserved.</div>
          <div>Design & Digital Identity: Lanovia</div>
        </div>
      </div>
    </footer>
  );
}
