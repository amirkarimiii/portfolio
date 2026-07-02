<div dir="rtl">

# ADR-0001 --- مهاجرت از Editor.js به Tiptap


-   **وضعیت:** پذیرفته‌شده
-   **تاریخ:** 2026-07-02

## زمینه

در پروژه‌ای مبتنی بر Next.js 16، React 19 و Editor.js 2.31.6 نیاز به یک
Rich Text Editor وجود داشت.

در زمان توسعه رفتارهای غیرمنتظره‌ای مشاهده شد:

-   اجرای دوباره `useEffect` در React StrictMode
-   ایجاد چند Instance
-   تداخل Cleanup با Instance جدید
-   ناپدید شدن Editor بعد از `destroy()`
-   وابستگی به Dynamic Import و غیرفعال کردن SSR

## بررسی

آزمایش‌های مختلف انجام شد:

-   حذف `editor.destroy()`
-   بررسی `holder.innerHTML`
-   استفاده از holder به صورت Element و ID
-   بررسی `isReady`
-   بررسی رفتار Cleanup

نتیجه نشان داد اولین Instance بعد از Ready شدن، DOM مشترک را Destroy
می‌کند و روی Instance دوم نیز اثر می‌گذارد.

## تصمیم

تصمیم گرفته شد به جای Editor.js از Tiptap استفاده شود.

دلایل:

-   سازگاری بهتر با React
-   رفتار قابل پیش‌بینی‌تر در StrictMode
-   مدیریت بهتر Lifecycle
-   تجربه بهتر در Multi-instance
-   یکپارچگی مناسب‌تر با اکوسیستم Next.js

## پیامدها

مزایا:

-   کاهش ریسک باگ‌های Lifecycle
-   نگهداری آسان‌تر
-   توسعه ساده‌تر

معایب:

-   هزینه مهاجرت
-   بازنویسی بخشی از Editor

## درس‌های آموخته‌شده

-   همیشه کتابخانه‌های DOM محور را در React با StrictMode آزمایش کن.
-   قبل از انتخاب Editor، رفتار SSR و Hydration را بررسی کن.
-   Dynamic Import مشکل SSR را حل می‌کند اما جایگزین سازگاری صحیح
    Lifecycle نیست.

</div>
