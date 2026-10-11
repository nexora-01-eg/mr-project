// Elegance Womenswear — Content & Data (Starter)
// مبادئ: فخامة هادئة، أقمشة راقية، تجربة شراء سهلة (اتصال/زيارة)

export const brand = {
  nameAr: "Elegance",
  nameAr2: "اليجانس",
  categoryAr: "للملابس الحريمي",
  taglineAr: "أناقة تليق بذوقك… تفاصيل ترفع الإطلالة",
  locationAr:
    "H274+JXX، الجلاء القبلي، قسم شبين الكوم، مركز شبين الكوم، محافظة المنوفية",
  phoneE164: "+20482223886",
  phoneDisplay: "048 2223886",
  hoursAr: "مفتوح · يغلق عند الساعة ١١ م",
  rating: 4.3,
  reviewsCount: 7,
  // رابط خرائط قابل للتحديث لاحقًا لو عندك لينك Google مباشر
  mapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=H274%2BJXX%2C%20%D8%A7%D9%84%D8%AC%D9%84%D8%A7%D8%A1%20%D8%A7%D9%84%D9%82%D8%A8%D9%84%D9%8A%D8%8C%20%D9%82%D8%B3%D9%85%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85%2C%20%D9%85%D8%B1%D9%83%D8%B2%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%83%D9%88%D9%85%2C%20%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D9%81%D9%8A%D8%A9",
};

export const nav = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "مجموعة الصور", href: "/gallery" },
  { label: "عن المتجر", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export const heroCopy = {
  kicker: "ستايل يومي… بلمسة فخامة",
  title: "Elegance — اليجانس للملابس الحريمي",
  subtitle:
    "اختيارات منتقاة من أطقم، جاكيتات، فساتين وعبايات… قصّات مريحة وخامات تليق بالمظهر الراقي.",
  ctaPrimary: "تصفّحي المنتجات",
  ctaSecondary: "اتصلي الآن",
};

export const pillars = [
  {
    title: "خامات تحسّها من أول لمسة",
    desc: "جودة خامات وتقفيل يبان… علشان القطعة تعيش وتفضل شكلها ثابت.",
  },
  {
    title: "قصّات بتظبط الإطلالة",
    desc: "ستايلات متوازنة تناسب الشغل والخروج والمناسبات.",
  },
  {
    title: "تنسيق سريع داخل المحل",
    desc: "قوليلنا المناسب—وهنساعدك تكملي لوك كامل في دقائق.",
  },
  {
    title: "موقع سهل في شبين الكوم",
    desc: "تعالي جرّبي بنفسك… وخدي قرارك على راحة.",
  },
];

export const categories = [
  {
    key: "sets",
    name: "أطقم",
    blurb: "اللوك الكامل في خطوة واحدة… أنيق وسهل.",
  },
  {
    key: "outerwear",
    name: "جاكيتات وكارديجان",
    blurb: "طبقة فخامة… تظبط أي إطلالة.",
  },
  {
    key: "dresses",
    name: "فساتين",
    blurb: "بسيطة وشيك… للمشاوير والمناسبات.",
  },
  {
    key: "abayas",
    name: "عبايات",
    blurb: "وقار وأناقة… بتفاصيل مدروسة.",
  },
];

export type Product = {
  id: string;
  name: string;
  price?: number; // optional
  currency: "EGP";
  categoryKey: (typeof categories)[number]["key"];
  badge?: string;
  description: string;
  bullets: string[];
};

// منتجات بداية (نماذج) — هنبدّلها بمنتجاتك الحقيقية بسهولة
export const products: Product[] = [
  {
    id: "p-01",
    name: "طقم كاجوال أنيق",
    currency: "EGP",
    categoryKey: "sets",
    badge: "الأكثر طلبًا",
    description: "طقم عملي بخامة مريحة… مناسب للنهار ولساعات الشغل.",
    bullets: ["خامة مريحة", "قصّة مستقيمة", "ألوان متعددة حسب المتاح"],
  },
  {
    id: "p-02",
    name: "جاكيت ستايل كلاسيك",
    currency: "EGP",
    categoryKey: "outerwear",
    badge: "لوك رسمي",
    description: "جاكيت يرفع اللوك فورًا—ينفع مع بنطلون أو فستان.",
    bullets: ["تفاصيل شيك", "تقفيل محترم", "مقاسات متنوعة"],
  },
  {
    id: "p-03",
    name: "فستان سادة بلمسة فخامة",
    currency: "EGP",
    categoryKey: "dresses",
    description: "فستان بسيط وراقي—يناسب المناسبات الخفيفة والخروج.",
    bullets: ["ستايل هادي", "ينفع مع إكسسوارات", "ألوان حسب المتاح"],
  },
  {
    id: "p-04",
    name: "عباية بتطريز راقي",
    currency: "EGP",
    categoryKey: "abayas",
    badge: "تفاصيل مميزة",
    description: "عباية بتفاصيل تطريز ناعمة… شيك بدون مبالغة.",
    bullets: ["تفاصيل مطرزة", "قماش ثابت", "مناسبة للزيارات"],
  },
];
