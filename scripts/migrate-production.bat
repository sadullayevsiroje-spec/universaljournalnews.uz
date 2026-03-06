@echo off
echo Running Prisma migration on production database...
npx prisma migrate deploy

echo Seeding editorial board data...
npx tsx prisma/seed-editorial.ts

echo Done!
pause
