# منصة إدارة التوصيل (Delivery Ops SaaS)

نظام SaaS متعدد المستأجرين (Multi‑Tenant) لإدارة مكاتب التوصيل: طلبات → إسناد ذكي → توصيل → تحليلات.

> **مهم:** المشروع يعمل تلقائياً في **وضع Demo** ببيانات تجريبية إذا لم يتم إعداد Firebase بعد.

---

## 1) المتطلبات

- Node.js 20+
- pnpm
- حساب Firebase

---

## 2) تشغيل المشروع محلياً

```bash
cd /home/user/workspace/website/delivery-saas-platform
pnpm install
pnpm dev
```

ثم افتح الرابط الذي سيظهر في الطرفية.

---

## 3) إعداد Firebase (Auth + Firestore + Storage)

### 3.1 إنشاء مشروع Firebase

1. افتح Firebase Console وأنشئ Project جديد.
2. فعّل **Authentication → Email/Password**.
3. أنشئ **Firestore Database** (Production mode).
4. (اختياري) فعّل **Storage** إذا ستستخدم رفع ملفات/مرفقات.

### 3.2 إنشاء Web App والحصول على Config

- من Project Settings → Your apps → Web app
- انسخ قيم config (apiKey/authDomain/projectId/appId...)

### 3.3 إعداد متغيرات البيئة (.env)

1. انسخ الملف:

```bash
cp .env.example .env
```

2. ضع قيم Firebase داخل `.env`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

3. أعد تشغيل dev server.

---

## 4) بنية Multi‑Tenant + RBAC (مختصر)

### Collections (flat)

- `users/{uid}`
- `offices/{officeId}`
- `orders/{orderId}`
- `drivers/{driverId}`
- `calls/{callId}`
- `transactions/{txId}`

**قاعدة ذهبية:** كل document داخل (orders/drivers/calls/transactions) لازم يحتوي `officeId`.

### أدوار النظام (RBAC)

- `super_admin`
- `office_owner`
- `manager`
- `dispatcher`
- `driver`

يتم تحديد الدور في `users/{uid}.role`.

---

## 5) قواعد Firestore Security Rules

الملف موجود هنا:

- `firebase/firestore.rules`

لتطبيق القواعد:

1. ثبّت Firebase CLI:

```bash
npm i -g firebase-tools
firebase login
```

2. داخل مشروعنا:

```bash
firebase init firestore
# اختر نفس المشروع
firebase deploy --only firestore:rules
```

---

## 6) Cloud Functions (الإسناد الذكي)

يوجد مثال مبسط لدالة Cloud Function هنا:

- `firebase/functions/src/index.ts`

وتحتوي على callable function: `suggestDriverForOrder`.

للتجربة:

```bash
cd firebase/functions
pnpm install   # أو npm install
pnpm build
firebase emulators:start --only functions
```

> في الإنتاج: يُنصح بإضافة حساب المسافات (Maps/Geohash)، سجلات تدقيق (Audit Logs)، وحدود استخدام.

---

## 7) بيانات تجريبية (Seed)

ملف مثال:

- `firebase/seed/sample-data.json`

هذا الملف **ليس seed script جاهز** (لأن الـ uid و docIds تتغير)، لكنه قالب لتعبئة البيانات بسرعة.

---

## 8) ملاحظات UI/UX

- التصميم: **Dark luxury** (noir + gold) مناسب لأدوات العمليات.
- RTL/LTR: تبديل اللغة يغيّر `dir` و `lang` في `<html>` تلقائياً.
- واجهة Admin داخلية B2B: كثافة بيانات + أزرار واضحة + empty states / toasts.

---

## 9) أين أعدّل/أضيف الميزات؟

- الصفحات: `src/pages/app/*`
- مكونات التخطيط: `src/components/layout/*`
- i18n: `src/contexts/I18nContext.tsx`
- مصادقة: `src/contexts/AuthContext.tsx`
- الثيم: `src/index.css`

---

## 10) Deliverable Checklist (حسب الطلب)

- ✅ هيكل مشروع كامل + صفحات: Login/Register/Dashboard/Orders/Drivers/Calls/Analytics/Settings
- ✅ مكونات قابلة لإعادة الاستخدام (Sidebar/Topbar/PageHeader/StatusBadge)
- ✅ RTL/LTR + Toggle
- ✅ Demo mode + Sample seed
- ✅ Firestore rules + Cloud Functions مثال

