# إعداد الربط مع تليجرام (Webhook Setup)

لكي يعمل البوت، يجب أن تخبر تليجرام أين يرسل الرسائل.

## الطريقة 1: من داخل التطبيق (موصى به)
1. انشر الباك إند (Backend).
2. افتح تطبيقك (الواجهة الأمامية).
3. اذهب لصفحة **الإعدادات**.
4. أدخل رابط الباك إند في خانة "Webhook URL" (مثال: `https://your-backend.onrender.com/webhook`).
5. اضغط حفظ.

## الطريقة 2: يدوياً (عبر المتصفح)
افتح متصفحك وادخل الرابط التالي (مع استبدال البيانات):

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_BACKEND_URL>/webhook
```

### مثال:
```
https://api.telegram.org/bot123456:ABC-DEF/setWebhook?url=https://my-app.onrender.com/webhook
```

## التأكد من الربط
للتأكد أن الربط يعمل، افتح الرابط:
```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
```
يجب أن يظهر لك الرابط الذي وضعته.

## ملاحظات هامة
- الويب هوك **يتطلب HTTPS**.
- روابط `localhost` لا تعمل. يجب استخدام `ngrok` إذا كنت تجرب على جهازك.
