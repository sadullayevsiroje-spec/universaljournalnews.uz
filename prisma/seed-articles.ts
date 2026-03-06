import { PrismaClient } from '@prisma/client';
import articlesData from '../data/articles.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding articles...');

  // Clear existing data
  await prisma.articleAuthor.deleteMany();
  await prisma.article.deleteMany();
  await prisma.author.deleteMany();
  await prisma.issue.deleteMany();

  // Create issue
  const issue = await prisma.issue.create({
    data: {
      year: 2026,
      volume: 1,
      number: 1,
      title: 'Volume 1, Issue 1',
      publishedAt: new Date('2026-02-28')
    }
  });

  // Create articles
  for (const article of articlesData) {
    // Create authors
    const authorRecords = [];
    for (const authorName of article.authors) {
      const author = await prisma.author.create({
        data: {
          fullName: authorName,
          affiliation: article.affiliation || null
        }
      });
      authorRecords.push(author);
    }

    // Create article
    const createdArticle = await prisma.article.create({
      data: {
        slug: article.slug,
        title: article.title,
        abstract: article.abstract || null,
        keywords: article.keywords?.join(', ') || null,
        pdfUrl: article.pdfUrl || null,
        publishedAt: new Date(article.publishedAt),
        issueId: issue.id
      }
    });

    // Link authors to article
    for (let i = 0; i < authorRecords.length; i++) {
      await prisma.articleAuthor.create({
        data: {
          articleId: createdArticle.id,
          authorId: authorRecords[i].id,
          order: i + 1
        }
      });
    }
  }

  console.log(`Seeded ${articlesData.length} articles successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
