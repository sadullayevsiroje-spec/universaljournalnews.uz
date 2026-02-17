type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const article = {
    title: "FACTORS AFFECTING THE DEVELOPMENT OF INTESTINAL MICROFLORA IN",
    authors: [
      "Sadullayev Siroj Ernazarovich",
      "A. Author",
    ],
    journal: "Universal Journal News",
    issn: "1234-5678",
    volume: "1",
    issue: "1",
    publicationDate: "2026-01-15",
    pdfUrl: "https://universaljournalnews.uz/pdf/article-1.pdf",
    abstractUrl: `https://universaljournalnews.uz/articles/${params.slug}`,
  };

  return {
    title: `${article.title} | ${article.journal}`,
    other: {
      citation_title: article.title,
      citation_journal_title: article.journal,
      citation_issn: article.issn,
      citation_volume: article.volume,
      citation_issue: article.issue,
      citation_publication_date: article.publicationDate,
      citation_pdf_url: article.pdfUrl,
      citation_abstract_html_url: article.abstractUrl,
      citation_author: article.authors,
    },
  };
}

/* 🔴 MUHIM QISM – DEFAULT REACT COMPONENT */
export default function ArticlePage({ params }: PageProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold">
        FACTORS AFFECTING THE DEVELOPMENT OF INTESTINAL MICROFLORA IN
      </h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Abstract</h2>
        <p className="text-gray-700">
          This article analyzes the formation of the gut microbiome in children,
          its impact on the body, and the main influencing factors. The role of
          birth mode, feeding type, and environmental conditions in the
          development of intestinal microbiota is also discussed.
        </p>
      </section>

      <a
        href="/pdf/article-1.pdf"
        className="inline-block text-blue-600 underline"
      >
        Download PDF
      </a>
    </main>
  );
}
