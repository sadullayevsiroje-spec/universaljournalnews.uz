# Vercel Postgres Setup Guide

## Problem
Editorial Board ma'lumotlari JSON faylda saqlanganda, Vercel production'da o'zgarishlar saqlanmaydi (read-only file system).

## Solution
Vercel Postgres database ishlatish.

## Setup Steps

### 1. Vercel Dashboard'da Database yaratish

1. https://vercel.com/dashboard ga kiring
2. **universaljournal** loyihasini oching
3. Yuqorida **Storage** tabiga o'ting
4. **Create Database** tugmasini bosing
5. **Postgres** ni tanlang
6. Database nomini kiriting (masalan: `ujn-database`)
7. Region: **Washington, D.C., USA (iad1)** (yoki yaqin region)
8. **Create** tugmasini bosing

### 2. Database'ni loyihaga ulash

1. Database yaratilgandan keyin, **Connect Project** tugmasini bosing
2. **universaljournal** loyihasini tanlang
3. **Connect** tugmasini bosing

Bu avtomatik ravishda environment variables qo'shadi:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### 3. Local .env faylini yangilash

Vercel dashboard'da **Settings** → **Environment Variables** ga o'ting va `POSTGRES_PRISMA_URL` ni nusxalang.

Local `.env` faylingizga qo'shing:
```
DATABASE_URL="your-postgres-url-here"
```

### 4. Prisma schema'ni yangilash

`prisma/schema.prisma` faylida:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 5. Migration va Seed

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed editorial board data
npx tsx prisma/seed-editorial.ts
```

### 6. Deploy

```bash
git add -A
git commit -m "Configure Vercel Postgres"
git push origin main
```

Yoki:
```bash
vercel --prod
```

## Verification

1. https://universaljournalnews.uz/admin/editorial-board ga kiring
2. Yangi a'zo qo'shing
3. Sahifani yangilang - a'zo saqlanishi kerak
4. Edit va Delete funksiyalarini test qiling

## Troubleshooting

### Error: "Can't reach database server"
- Vercel dashboard'da database ulangan ekanligini tekshiring
- Environment variables to'g'ri o'rnatilganligini tekshiring

### Error: "Table does not exist"
- `npx prisma db push` ni qaytadan ishga tushiring

### Ma'lumotlar yo'qolgan
- `npx tsx prisma/seed-editorial.ts` ni ishga tushiring

## Cost
- Vercel Postgres Free tier: 256 MB storage, 60 hours compute time/month
- Bu loyiha uchun yetarli

## Alternative: Neon Database (Free)

Agar Vercel Postgres to'lov talab qilsa:

1. https://neon.tech ga kiring
2. Yangi database yarating (Free tier)
3. Connection string'ni oling
4. Vercel'da `DATABASE_URL` environment variable qo'shing
5. Deploy qiling
