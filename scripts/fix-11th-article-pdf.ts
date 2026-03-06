import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Finding 11th article...');

  // Get all articles ordered by creation date
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`Total articles: ${articles.length}`);

  // Find the latest article (11th one)
  if (articles.length >= 11) {
    const article11 = articles[0]; // Most recent
    console.log(`\n11th article: ${article11.title}`);
    console.log(`Slug: ${article11.slug}`);
    console.log(`Current PDF URL: ${article11.pdfUrl || 'None'}`);

    // If no PDF, we need to either:
    // 1. Ask user to upload PDF via admin panel
    // 2. Create a placeholder PDF
    // 3. Use an existing PDF for testing

    if (!article11.pdfUrl) {
      console.log('\n⚠️  No PDF URL found for 11th article.');
      console.log('Please upload a PDF file via admin panel:');
      console.log(`1. Go to: https://universaljournalnews.uz/admin/articles/${article11.slug}`);
      console.log('2. Click "Edit"');
      console.log('3. Upload PDF file');
      console.log('\nOr, if you want to use a test PDF, I can assign Article-1.pdf temporarily.');
    } else {
      console.log('✅ PDF URL already set!');
    }
  } else {
    console.log(`\n⚠️  Only ${articles.length} articles found. 11th article doesn't exist yet.`);
  }

  console.log('\n🎉 Done!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
