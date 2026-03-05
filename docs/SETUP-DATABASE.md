# Editorial Board Database Setup

## Muammo
Vercel production'da fayl tizimiga yozish mumkin emas. Shuning uchun Editorial Board CRUD (Create, Read, Update, Delete) ishlamaydi.

## Yechim: Vercel Postgres

### 1. Vercel Dashboard'da Database yaratish

1. https://vercel.com/dashboard ga kiring
2. `universaljournal` loyihasini oching
3. Yuqorida **Storage** tabiga o'ting
4. **Create Database** tugmasini bosing
5. **Postgres** ni tanlang
6. Database nomi: `ujn-database` (yoki istalgan nom)
7. Region: **Washington, D.C., USA** (yoki yaqin region)
8. **Create** tugmasini bosing

### 2. Environment Variables

Vercel avtomatik ravishda quyidagi environment variables'ni qo'shadi:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

Bu o'zgaruvchilar avtomatik loyihaga bog'lanadi.

### 3. Database Migration

Database yaratilgandan keyin, migration qilish kerak:

Terminal'da (local):
```bash
# Vercel CLI orqali production environment variables'ni olish
vercel env pull .env.production

# Prisma migration
npx prisma migrate deploy
```

Yoki Vercel dashboard'da:
1. **Settings** → **Environment Variables**
2. `DATABASE_URL` ni `POSTGRES_PRISMA_URL` ga o'zgartiring
3. Loyihani qayta deploy qiling

### 4. Seed Data

Database'ga boshlang'ich ma'lumotlarni yuklash:

```bash
npx tsx prisma/seed-editorial.ts
```

### 5. Deploy

```bash
git add -A
git commit -m "Setup Postgres database"
git push origin main
```

Vercel avtomatik deploy qiladi va Editorial Board CRUD ishlaydi!

## Tekshirish

1. https://universaljournalnews.uz/admin/editorial-board ga kiring
2. **Add New Member** tugmasini bosing
3. Ma'lumotlarni kiriting va **Create** bosing
4. A'zo qo'shilishi va saqlanishi kerak

## Xulosa

✅ Database yaratildi
✅ Environment variables sozlandi
✅ Migration bajarildi
✅ Seed data yuklandi
✅ Editorial Board CRUD ishlaydi!
