import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📎 Assigning PDFs to articles...');

  // Map of article slugs to PDF filenames
  const pdfMap: Record<string, string> = {
    'Article-1': 'Article-1.pdf',
    'Article-2': 'Article-2.pdf',
    'Article-3': 'Article-3.pdf',
    'Article-4': 'Article-4.pdf',
    'Article-5': 'Article-5.pdf',
    'Article-6': 'Article-6.pdf',
    'Article-7': 'Article-7.pdf',
    'Article-8': 'Article-8.pdf',
    'Article-9': 'Article-9.pdf',
    'Article-10': 'Article-10.pdf',
  };

  const articles = await prisma.article.findMany();
  
  for (const article of articles) {
    // Try to find PDF by slug
    const pdfFilename = pdfMap[article.slug] || pdfMap[`Article-${article.id}`];
    
    if (pdfFilename) {
      const pdfUrl = `/pdf/${pdfFilename}`;
      await prisma.article.update({
        where: { id: article.id },
        data: { pdfUrl }
      });
      console.log(`✅ ${article.slug} -> ${pdfUrl}`);
    } else {
      console.log(`⚠️  ${article.slug}: No PDF found`);
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
