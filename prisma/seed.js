const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const issue = await prisma.issue.create({
    data: {
      year: 2025,
      volume: 1,
      issue: 1,
      publishDate: new Date()
    }
  });

  await prisma.article.create({
    data: {
      title: "Demo Article for Universaljournal",
      slug: "demo-article",
      abstract: "This is a demo abstract.",
      keywords: "demo; universaljournal; science",
      authorsJson: [
        { fullName: "John Doe", affiliation: "University A" },
        { fullName: "Jane Smith", affiliation: "University B" }
      ],
      references: "Doe J. (2024). Demo reference.",
      pdfUrl: "https://example.com/demo.pdf",
      issueId: issue.id
    }
  });

  console.log("Seed completed.");
}

main().finally(() => prisma.$disconnect());
