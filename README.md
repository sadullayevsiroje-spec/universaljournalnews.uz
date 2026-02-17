# Universaljournal – Full Ready MVP

This is a READY academic journal platform (OJS-free).

## Features
- Google Scholar compatible (citation_* meta tags)
- Admin panel (multi-editor)
- Issues & Articles CRUD
- Static pages editor
- Google login + credentials
- Sitemap + robots
- Seed demo data

## Run
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
