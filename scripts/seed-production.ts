import { PrismaClient } from '@prisma/client';
import articlesData from '../data/articles.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding production database...');

  // 1. Seed Editorial Board
  console.log('📋 Seeding Editorial Board...');
  const editorialBoardData = [
    {
      name: "Sadullayev Siroj Ernazarovich",
      position: "Editor-in-Chief",
      affiliation: "Urgench State Medical Institute",
      email: "sadullayev.siroje@gmail.com",
      photo: "/editorial-board/sadullayev.jpg",
      bio: "Professor of Infectious Diseases",
      order: 1
    },
    {
      name: "Yusupov Shavkat Raximbayevich",
      position: "Associate Editor",
      affiliation: "Urgench State Medical Institute",
      email: "yusupov@ujn.uz",
      photo: "/editorial-board/yusupov-shavkat.jpg",
      bio: "Associate Professor",
      order: 2
    },
    {
      name: "Yusupov Akmal Shavkatovich",
      position: "Editorial Board Member",
      affiliation: "Urgench State Medical Institute",
      email: "yusupov.akmal@ujn.uz",
      photo: "/editorial-board/yusupov-akmal.jpg",
      bio: "Assistant Professor",
      order: 3
    }
  ];

  for (const member of editorialBoardData) {
    await prisma.editorialBoard.upsert({
      where: { id: member.name },
      update: member,
      create: member as any
    }).catch(() => {
      // If upsert fails, just create
      return prisma.editorialBoard.create({ data: member as any });
    });
  }
  console.log('✅ Editorial Board seeded!');

  // 2. Seed Issue
  console.log('📚 Seeding Issue...');
  const issue = await prisma.issue.upsert({
    where: { id: 'issue-2026-1-1' },
    update: {
      year: 2026,
      volume: 1,
      number: 1,
      title: 'Volume 1, Issue 1',
      publishedAt: new Date('2026-02-28')
    },
    create: {
      id: 'issue-2026-1-1',
      year: 2026,
      volume: 1,
      number: 1,
      title: 'Volume 1, Issue 1',
      publishedAt: new Date('2026-02-28')
    }
  });
  console.log('✅ Issue seeded!');

  // 3. Seed Articles
  console.log('📄 Seeding Articles...');
  for (const article of articlesData) {
    // Create authors
    const authorRecords = [];
    for (const authorName of article.authors) {
      const author = await prisma.author.create({
        data: {
          fullName: authorName,
          affiliation: article.affiliation || null
        }
      }).catch(async () => {
        // If author exists, find it
        return await prisma.author.findFirst({
          where: { fullName: authorName }
        });
      });
      if (author) authorRecords.push(author);
    }

    // Create article
    const createdArticle = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        abstract: article.abstract || null,
        keywords: article.keywords?.join(', ') || null,
        pdfUrl: (article as any).pdfSlug ? `/pdf/${(article as any).pdfSlug}` : null,
        publishedAt: new Date(article.publishedAt),
        issueId: issue.id
      },
      create: {
        slug: article.slug,
        title: article.title,
        abstract: article.abstract || null,
        keywords: article.keywords?.join(', ') || null,
        pdfUrl: (article as any).pdfSlug ? `/pdf/${(article as any).pdfSlug}` : null,
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
      }).catch(() => {
        // Ignore if already exists
      });
    }
  }
  console.log(`✅ Seeded ${articlesData.length} articles!`);

  console.log('🎉 Production database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
