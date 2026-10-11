// Zaini Fashion — Site Content (Arabic-first)
// هوية: بناتي شيك (Blush Pink + Ivory + Charcoal)

export const brand = {
  nameEn: "Zaini Fashion",
  nameAr: "زيني فاشن",
  taglineAr: "أناقة بناتية… اختيارات تكمّل حضورك",
  cityAr: "حمص – سوريا",
  addressAr: "Abdallah street, Homs, Syria",
  phoneE164: "+963988731632",
  phoneDisplay: "+963 988 731 632",
  email: "zaini-fashion.79@hotmail.com",
  mapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=Abdallah%20street%2C%20Homs%2C%20Syria",
  hoursAr: "(حدّثي المواعيد لو مختلفة)",
};

export const nav = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "الصور", href: "/gallery" },
  { label: "عن المتجر", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export const heroCopy = {
  kicker: "ستايل بناتي… بلمسة فخامة",
  title: "Zaini Fashion | زيني فاشن",
  subtitle:
    "فستانك، طقمك، وجاكيتك… قطعة واحدة بتكمل حضورك. خامات راقية، قصّات مظبوطة، وألوان تليق بذوق البنات.",
  ctaPrimary: "تصفّحي المنتجات",
  ctaSecondary: "واتساب/اتصال",
};

export const pillars = [
  {
    title: "ألوان بتفتح النفس",
    desc: "باليت بناتي هادي… يديكي لوك شيك من غير مبالغة.",
  },
  {
    title: "قصّات مظبوطة",
    desc: "تفاصيل تعمِل شكل الجسم صح… وتديكي ثقة.",
  },
  {
    title: "تنسيق سريع",
    desc: "لو محتاجة اقتراحات—قوليلنا المناسبة واحنا ننسّق.",
  },
  {
    title: "تواصل مباشر",
    desc: "اتصال أو واتساب لتأكيد المقاس/اللون والمتاح.",
  },
];

export const categories = [
  { key: "dresses", name: "فساتين", blurb: "من اليومي للمناسبات… بأناقة ناعمة." },
  { key: "sets", name: "أطقم", blurb: "لوك كامل… جاهز من أول اختيار." },
  { key: "outerwear", name: "جاكيتات", blurb: "طبقة شيك… ترفع الإطلالة فورًا." },
  { key: "abayas", name: "عبايات", blurb: "تفاصيل راقية… وقار وأناقة." },
];

export type Product = {
  id: string;
  name: string;
  price?: number;
  currency: "SYP" | "USD" | "EGP";
  categoryKey: (typeof categories)[number]["key"];
  badge?: string;
  description: string;
  bullets: string[];
};

export const products: Product[] = [
  {
    id: "p-01",
    name: "فستان سادة بلمسة فخامة",
    currency: "SYP",
    categoryKey: "dresses",
    badge: "تريند",
    description: "فستان شيك بخامة ناعمة… يليق بالخروج والمناسبات الخفيفة.",
    bullets: ["ألوان متعددة", "قصّة مريحة", "تفاصيل مرتبة"],
  },
  {
    id: "p-02",
    name: "طقم رسمي أنيق",
    currency: "SYP",
    categoryKey: "sets",
    badge: "الأكثر طلبًا",
    description: "طقم يديكي لوك كامل في دقيقة… مناسب للشغل والطلعات.",
    bullets: ["خامة ثابتة", "ستايل راقي", "مقاسات متنوعة"],
  },
  {
    id: "p-03",
    name: "جاكيت ستايل كلاسيك",
    currency: "SYP",
    categoryKey: "outerwear",
    description: "جاكيت يزوّد فخامة… ويتلبس على أكتر من لوك.",
    bullets: ["تفاصيل شيك", "يناسب البنات", "ألوان حسب المتاح"],
  },
  {
    id: "p-04",
    name: "عباية بتفاصيل مطرزة",
    currency: "SYP",
    categoryKey: "abayas",
    badge: "تفاصيل مميزة",
    description: "عباية بأناقة هادية… التطريز ناعم من غير مبالغة.",
    bullets: ["قماش محترم", "تفاصيل مطرزة", "مناسبة للزيارات"],
  },
];
