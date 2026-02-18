import articles from "@/data/articles.json";
import { notFound } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const authors = Array.isArray(article.authors) 
    ? article.authors 
    : article.authors ? [article.authors] : [];

  const publicationDate = article.publishedAt || article.published || "";
  const pdfUrl = article.pdfSlug 
    ? `https://universaljournalnews.uz/pdf/${article.pdfSlug}.pdf` 
    : "";
  const abstractUrl = `https://universaljournalnews.uz/articles/${params.slug}`;

  return {
    title: `${article.title} | Universal Journal News`,
    description: article.abstract || article.title,
    keywords: article.keywords?.join(", "),
    other: {
      // Google Scholar meta tags
      citation_title: article.title,
      citation_journal_title: "Universal Journal News",
      citation_issn: "3030-7551", // Sizning ISSN raqamingiz
      citation_volume: article.issue?.volume?.toString() || "1",
      citation_issue: article.issue?.number?.toString() || "1",
      citation_publication_date: publicationDate,
      citation_pdf_url: pdfUrl,
      citation_abstract_html_url: abstractUrl,
      citation_language: "en",
      ...(authors.length > 0 && {
        citation_author: authors,
      }),
      ...(article.pages && {
        citation_firstpage: "1",
        citation_lastpage: article.pages.toString(),
      }),
    },
  };
}

/* 🔴 MUHIM QISM – DEFAULT REACT COMPONENT */
export default function ArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const authors = Array.isArray(article.authors) 
    ? article.authors 
    : article.authors ? [article.authors] : [];

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <article>
        <h1 className="text-3xl font-bold mb-4">
          {article.title}
        </h1>

        {authors.length > 0 && (
          <div className="text-gray-600 mb-2">
            <strong>Authors:</strong> {authors.join(", ")}
          </div>
        )}

        {article.affiliation && (
          <div className="text-gray-600 mb-2">
            <strong>Affiliation:</strong> {article.affiliation}
          </div>
        )}

        {article.publishedAt && (
          <div className="text-gray-600 mb-2">
            <strong>Published:</strong> {article.publishedAt}
          </div>
        )}

        {article.pages && (
          <div className="text-gray-600 mb-4">
            <strong>Pages:</strong> {article.pages}
          </div>
        )}

        {article.abstract && (
          <section className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Abstract</h2>
            <p className="text-gray-700 leading-relaxed">
              {article.abstract}
            </p>
          </section>
        )}

        {article.keywords && article.keywords.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        )}

        {article.pdfSlug && (
          <a
            href={`/pdf/${article.pdfSlug}.pdf`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Download PDF
          </a>
        )}
      </article>
    </main>
  );
}
