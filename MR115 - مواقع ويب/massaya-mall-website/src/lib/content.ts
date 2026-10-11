// تصميم الموقع (ثابت): Luxe Retail / Egyptian Glam
// مبادئ: تباين عالي (أسود/عاجي + ذهبي), طبقات وخامات (حبيبات/نقش), خطوط عربية فخمة مقروءة
// توقيع بصري: شريط ذهبي لامع، زوايا مشطوفة، خلفية نقش خفيف + توهج

export const brand = {
  nameAr: "مسايا مول",
  nameEn: "Massaya Mall",
  taglineAr: "لأن عروستنا تستحق الأفضل",
  locationAr: "شبين الكوم – مصر",
  phoneE164: "+201005444596",
  phoneDisplay: "+20 10 05444596",
  instagramHandle: "massayamakeup",
};

export const nav = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "العروض", href: "/offers" },
  { label: "عن مسايا", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export const heroCopy = {
  kicker: "تجربة شراء راقية لكل تفاصيل العروس",
  title: "مسايا مول… عنوان الأناقة في شبين الكوم",
  subtitle:
    "اختيارات منتقاة بعناية من المفروشات، الميك أب والإكسسوارات، واللانجيري والبيتي. جودة تُرى، وذوق يُحس.",
  ctaPrimary: "تصفّح المنتجات",
  ctaSecondary: "اطلب عبر واتساب",
};

export const valueProps = [
  {
    title: "اختيارات مُنتقاة",
    desc: "منتجات بعين خبيرة—كل قطعة لها سبب في مجموعتنا.",
  },
  {
    title: "جاهزية للطلب السريع",
    desc: "اسأل، اختر، واطلب… بخطوات واضحة وتجربة مريحة.",
  },
  {
    title: "استلام من الفرع",
    desc: "متاح In‑store pickup لتستلم مشترياتك في الوقت الأنسب لك.",
  },
  {
    title: "ذوق عروسة… بلمسة فخامة",
    desc: "تفاصيل صغيرة تصنع فرقًا كبيرًا في إطلالتك وبيتك.",
  },
];

export const categories = [
  {
    key: "home",
    name: "مفروشات",
    blurb: "مفروشات ترفع ستايل البيت… خامات ودرجات ألوان مريحة ومُتقنة.",
  },
  {
    key: "beauty",
    name: "ميك أب & إكسسوار",
    blurb: "لمسات نهائية تكمّل الإطلالة—من اليومي للسهرة بستايل ناعم وراقي.",
  },
  {
    key: "lingerie",
    name: "لانجيري & بيتي",
    blurb: "راحة وأناقة… تفاصيل تُلبس وتتحس.",
  },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  currency: "EGP";
  categoryKey: (typeof categories)[number]["key"];
  badge?: string;
  description: string;
  features: string[];
  imageAlt: string;
};

// ملاحظة: هذه منتجات نموذجية كبداية. يمكنك تزويدي بأسماء/أسعار فعلية لتحديثها بسرعة.
export const products: Product[] = [
  {
    id: "p-bridal-bundle",
    name: "باكدج عروسة – مفروشات فاخرة",
    price: 14950,
    currency: "EGP",
    categoryKey: "home",
    badge: "عرض محدود",
    description:
      "باكدج مختار بعناية لعروس تحب الفخامة—توازن بين اللمسة الراقية والاستخدام العملي.",
    features: ["خامات عالية الجودة", "ألوان متناسقة", "يناسب جهاز العروسة"],
    imageAlt: "باكدج مفروشات فاخرة للعروس",
  },
  {
    id: "p-makeup-kit",
    name: "مجموعة ميك أب – لمسة ناعمة",
    price: 0,
    currency: "EGP",
    categoryKey: "beauty",
    badge: "حسب المتاح",
    description:
      "اختيارات مرنة حسب ذوقك—اسألي عن المتوفر لنجهّز لكِ مجموعة تناسب إطلالتك.",
    features: ["اختيارات متعددة", "مناسبة للعروس", "تجهيز حسب الطلب"],
    imageAlt: "مجموعة ميك أب وإكسسوارات",
  },
  {
    id: "p-lingerie-set",
    name: "طقم لانجيري – راحة وأناقة",
    price: 0,
    currency: "EGP",
    categoryKey: "lingerie",
    badge: "موديلات متنوعة",
    description:
      "تفاصيل أنثوية بخامات مريحة—اسألي عن المقاسات والألوان المتاحة.",
    features: ["خامة مريحة", "مقاسات متعددة", "ألوان راقية"],
    imageAlt: "طقم لانجيري فاخر",
  },
];

export const offersCopy = {
  title: "عروض مسايا",
  subtitle:
    "خصومات وباكدجات موسمية… علشان تجهّزي بثقة وذوق، وبسعر يفرّح.",
  note: "تابعينا باستمرار—العروض بتتحدّث أول بأول.",
};

export const aboutCopy = {
  title: "عن مسايا مول",
  body: [
    "في مسايا مول بنؤمن إن الفخامة مش رفاهية—دي طريقة اختيار. علشان كده بنجمع لكِ منتجات مختارة بعناية، بتوازن بين الجودة والذوق والسعر.",
    "من جهاز العروسة لتفاصيل البيت والإطلالة… هدفنا إن كل خطوة تبقى أسهل وأشيك.",
  ],
  highlights: [
    "منتجات مُنتقاة في أكثر من فئة",
    "استلام من الفرع (In‑store pickup)",
    "دعم سريع عبر واتساب/الهاتف",
  ],
};

export const contactCopy = {
  title: "تواصل معنا",
  subtitle:
    "اسأل عن المتاح، الأسعار، أو تفاصيل أي منتج… وردّنا بيكون سريع.",
  ctas: {
    whatsapp: "مراسلة واتساب",
    call: "اتصال مباشر",
    instagram: "إنستجرام",
  },
};
