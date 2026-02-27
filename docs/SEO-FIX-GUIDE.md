# SEO Muammolarini Tuzatish - Google Scholar

## Amalga oshirilgan o'zgarishlar

### 1. Canonical URL qo'shildi ✅
- Har bir maqola sahifasiga canonical URL qo'shildi
- Layout.tsx ga metadataBase qo'shildi
- OpenGraph meta tags qo'shildi

### 2. Sitemap.xml yaxshilandi ✅
- Barcha sahifalar qo'shildi (about, archive, issues, etc.)
- Issue sahifalari qo'shildi
- Maqolalar uchun priority 0.95 ga ko'tarildi
- To'g'ri lastModified dates qo'shildi

### 3. Robots.txt yaxshilandi ✅
- Googlebot-Scholar uchun maxsus qoidalar
- API va _next papkalari disallow qilindi
- Crawl delay 0 ga o'rnatildi

### 4. 404 sahifasi yaratildi ✅
- Zamonaviy dizayn
- Home va Archive ga havolalar
- Foydalanuvchi uchun tushunarli xabar

## Google Search Console'da tekshirish

### 1. URL Inspection Tool
```
1. Google Search Console ga kiring
2. URL Inspection toolni oching
3. Maqola URL'ini kiriting: https://universaljournalnews.uz/articles/[slug]
4. "Test Live URL" tugmasini bosing
5. Natijalarni tekshiring
```

### 2. Sitemap yuborish
```
1. Google Search Console > Sitemaps
2. Yangi sitemap qo'shing: https://universaljournalnews.uz/sitemap.xml
3. Submit tugmasini bosing
4. Status: Success bo'lishi kerak
```

### 3. Coverage Report tekshirish
```
1. Google Search Console > Coverage
2. "Valid" sahifalar sonini tekshiring
3. "Error" va "Excluded" sahifalarni ko'rib chiqing
4. Har bir xatolikni tuzating
```

## Keyingi qadamlar

### 1. Barcha maqolalarda tekshirish
- [ ] Har bir maqolada PDF mavjudligini tekshiring
- [ ] DOI raqamlari to'g'riligini tekshiring
- [ ] Authors ma'lumotlari to'liqligini tekshiring
- [ ] Abstract mavjudligini tekshiring

### 2. Google Scholar uchun
- [ ] Har bir maqolada citation meta tags borligini tekshiring
- [ ] PDF fayllar to'g'ri URL'da joylashganligini tekshiring
- [ ] ISSN raqami to'g'riligini tekshiring (3030-5713)

### 3. Monitoring
- [ ] Har hafta Google Search Console'ni tekshiring
- [ ] Indexed sahifalar sonini kuzating
- [ ] Click-through rate (CTR) ni tahlil qiling
- [ ] Yangi xatoliklarni tezda tuzating

## Foydali havolalar

- Google Search Console: https://search.google.com/search-console
- Google Scholar Inclusion: https://scholar.google.com/intl/en/scholar/inclusion.html
- Sitemap: https://universaljournalnews.uz/sitemap.xml
- Robots.txt: https://universaljournalnews.uz/robots.txt

## Xatoliklarni tuzatish

### Agar "Canonical tag" xatosi bo'lsa:
1. Maqola sahifasini oching
2. View Page Source qiling
3. `<link rel="canonical"` qatorini qidiring
4. URL to'g'riligini tekshiring

### Agar "404 Not Found" xatosi bo'lsa:
1. URL to'g'riligini tekshiring
2. Sitemap.xml da URL mavjudligini tekshiring
3. PDF fayl mavjudligini tekshiring
4. Server loglarini tekshiring

## Kutilayotgan natijalar

- ✅ Barcha maqolalar Google Scholar'da ko'rinadi
- ✅ Canonical xatolari yo'qoladi
- ✅ 404 xatolari kamayadi
- ✅ Indexing tezlashadi
- ✅ Search ranking yaxshilanadi

## Qo'shimcha maslahatlar

1. **PDF fayllar**: Har bir maqola uchun PDF fayl bo'lishi shart
2. **Meta tags**: Google Scholar meta tags to'liq bo'lishi kerak
3. **HTTPS**: Sayt HTTPS da ishlashi kerak
4. **Mobile-friendly**: Sayt mobile'da yaxshi ko'rinishi kerak
5. **Loading speed**: Sahifa tez yuklanishi kerak

## Yordam kerak bo'lsa

Agar muammolar davom etsa:
1. Google Search Console'da "Request Indexing" qiling
2. 2-3 kun kuting
3. Yana tekshiring
4. Agar hal bo'lmasa, Google Support'ga murojaat qiling
