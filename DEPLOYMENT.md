# دليل النشر (Deployment Guide)

## 1. نشر الواجهة الخلفية (Backend) على Render أو Railway

### الخيار أ: Render.com
1. ارفع الكود على GitHub.
2. أنشئ **Web Service** جديد في Render.
3. اربط المستودع (Repository) الخاص بك.
4. الإعدادات:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. **Environment Variables** (المتغيرات البيئية):
   - أضف `MONGO_URI`, `BOT_TOKEN`, `GROUP_ID`.
6. اضغط Deploy.
7. انسخ رابط الموقع الجديد (مثلاً `https://my-bot-backend.onrender.com`).

### الخيار ب: Railway.app
1. أنشئ مشروع جديد من GitHub.
2. حدد مجلد `backend` كمجلد رئيسي.
3. أضف المتغيرات في تبويب "Variables".

## 2. نشر الواجهة الأمامية (Frontend) على Vercel

1. ارفع الكود على GitHub.
2. اذهب إلى Vercel Dashboard -> Add New Project.
3. استورد المستودع الخاص بك.
4. **إعدادات المشروع**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. **Environment Variables**:
   - ستحتاج لتعديل رابط الـ API في الكود ليشير إلى رابط الباك إند الذي نشرته في الخطوة الأولى.
   - **ملاحظة**: في الوضع المحلي كنا نستخدم Proxy. للنشر، يفضل إنشاء ملف `.env.production` داخل مجلد `frontend` ووضع:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
     وتعديل كود `axios` لاستخدام هذا الرابط.

## 3. الإعداد النهائي
1. افتح تطبيقك المنشور.
2. اذهب إلى صفحة **الإعدادات (Settings)**.
3. حدث حقل `Webhook URL` ليصبح رابط الباك إند الخاص بك + `/webhook`.
   - مثال: `https://my-bot-backend.onrender.com/webhook`
4. اضغط حفظ.
