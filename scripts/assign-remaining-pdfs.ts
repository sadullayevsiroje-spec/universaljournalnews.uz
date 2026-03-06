import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📎 Assigning remaining PDFs...');

  // Get all articles without PDF
  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { pdfUrl: null },
        { pdfUrl: '' }
      ]
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  console.log(`Found ${articles.length} articles without PDF`);

  // Assign Article-6.pdf to Article-10.pdf
  const pdfNumbers = [6, 7, 8, 9, 10];
  
  for (let i = 0; i < Math.min(articles.length, pdfNumbers.length); i++) {
    const article = articles[i];
    const pdfNum = pdfNumbers[i];
    const pdfUrl = `/pdf/Article-${pdfNum}.pdf`;
    
    await prisma.article.update({
      where: { id: article.id },
      data: { pdfUrl }
    });
    
    console.log(`✅ ${article.slug} -> ${pdfUrl}`);
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
