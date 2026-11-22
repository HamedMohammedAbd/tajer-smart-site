# موقع تاجر سمارت (Tajer Smart)

صفحة تعريفية لتطبيق تاجر سمارت مع تحميل نسخة الأندرويد. واجهة أمامية فقط (React + Vite + Tailwind)، بنفس ألوان التطبيق وخط Cairo وشعاره. زر التحميل يختار تلقائياً نسخة 64-bit أو 32-bit حسب جوال الزائر (`src/lib/apk.ts`).

## التشغيل محلياً

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # النسخة النهائية في dist/
npm run preview    # معاينة النسخة النهائية
```

في التشغيل المحلي تُحمَّل ملفات APK من `public/downloads/` (غير مرفوعة على git). انسخها من مشروع التطبيق:

```bash
cp ../dashboard_admin_counter/mobile_app/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk public/downloads/tajer-smart-arm64.apk
cp ../dashboard_admin_counter/mobile_app/build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk public/downloads/tajer-smart-armv7.apk
```

## الرفع (بالترتيب)

### 1. GitHub

أنشئ مستودعاً **عاماً (Public)** باسم `tajer-smart-site` على حساب `HamedMohammedAbd`، بدون README، ثم:

```bash
git remote add origin https://github.com/HamedMohammedAbd/tajer-smart-site.git
git push -u origin main
```

لو اخترت اسماً أو حساباً آخر، عدّل `releasesRepo` في `src/config.ts`.

### 2. ملفات التطبيق (GitHub Releases)

الموقع المرفوع يحمّل التطبيق من آخر Release في المستودع، فلا تُستهلك باقة Vercel مع كل تحميل.

1. في صفحة المستودع: **Releases → Draft a new release**.
2. Tag: `v1.0.0`.
3. ارفع الملفين **بهذه الأسماء بالضبط**:
   - `tajer-smart-arm64.apk`
   - `tajer-smart-armv7.apk`
4. **Publish release**.

المستودع يجب أن يكون عاماً، وإلا لن يتمكن الزوار من التحميل.

### 3. Vercel

1. **Add New → Project** واختر المستودع `tajer-smart-site`.
2. الإعدادات تُكتشف تلقائياً: Framework `Vite`، Build `npm run build`، Output `dist`.
3. **Deploy**.

كل `git push` بعدها ينشر الموقع تلقائياً.

## تحديث التطبيق لاحقاً

1. أنشئ Release جديداً (مثلاً `v1.0.1`) وارفع الملفين بنفس الأسماء. الروابط تشير دائماً إلى آخر Release.
2. عدّل `version` وأحجام الملفات في `src/config.ts`، ثم `git push`.

## الإعدادات والمحتوى

- `src/config.ts`: رقم الإصدار، المستودع، رابط Google Play والبريد (يظهران عند تعبئتهما فقط).
- `src/data.ts`: نصوص المميزات والأسئلة (مأخوذة من أقسام التطبيق الحقيقية).
- `src/App.tsx`: أقسام الصفحة، و`src/components/PhoneMock.tsx` محاكاة شاشة التطبيق.
- `src/index.css`: الألوان والخط (نفس ألوان `app_theme.dart` في التطبيق).
- `vercel.json`: ترويسات الأمان وتخزين الخطوط والصور.
