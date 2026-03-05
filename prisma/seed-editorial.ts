import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.editorialBoard.deleteMany();

  // Add initial members
  await prisma.editorialBoard.createMany({
    data: [
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
    ]
  });

  console.log('Editorial board seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
