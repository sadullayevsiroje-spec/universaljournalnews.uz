import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Fixing PDF URLs...');

  const articles = await prisma.article.findMany();
  
  for (const article of articles) {
    if (article.pdfUrl) {
      // If pdfUrl is like "/pdf/Article-1", change to "/pdf/Article-1.pdf"
      if (!article.pdfUrl.endsWith('.pdf')) {
        const newPdfUrl = `${article.pdfUrl}.pdf`;
        await prisma.article.update({
          where: { id: article.id },
          data: { pdfUrl: newPdfUrl }
        });
        console.log(`✅ Updated ${article.slug}: ${article.pdfUrl} -> ${newPdfUrl}`);
      } else {
        console.log(`✓ ${article.slug}: Already correct`);
      }
    } else {
      console.log(`⚠️  ${article.slug}: No PDF URL`);
    }
  }

  console.log('🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
