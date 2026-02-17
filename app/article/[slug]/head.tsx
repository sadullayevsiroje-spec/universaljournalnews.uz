import { prisma } from "../../../lib/prisma";

export default async function Head({ params }) {
  const a = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { issue: true }
  });
  if (!a) return null;

  return (
    <>
      <meta name="citation_title" content={a.title} />
      <meta name="citation_journal_title" content={process.env.JOURNAL_TITLE || "Universaljournal"} />
      <meta name="citation_pdf_url" content={a.pdfUrl} />
    </>
  );
}
