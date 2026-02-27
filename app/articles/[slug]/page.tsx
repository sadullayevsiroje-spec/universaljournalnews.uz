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
    alternates: {
      canonical: abstractUrl,
    },
    openGraph: {
      title: article.title,
      description: article.abstract || article.title,
      url: abstractUrl,
      type: 'article',
      publishedTime: publicationDate,
    },
    other: {
      // Google Scholar meta tags
      citation_title: article.title,
      citation_journal_title: "Universal Journal News",
      citation_issn: "3030-5713",
      citation_volume: article.issue?.volume?.toString() || "1",
      citation_issue: article.issue?.number?.toString() || "1",
      citation_publication_date: publicationDate,
      citation_pdf_url: pdfUrl,
      citation_abstract_html_url: abstractUrl,
      citation_language: "en",
      citation_publisher: "Universal Journal News",
      ...(article.doi && {
        citation_doi: article.doi,
      }),
      ...(authors.length > 0 && {
        citation_author: authors,
      }),
      ...(article.pages && {
        citation_firstpage: "1",
        citation_lastpage: article.pages.toString(),
      }),
      ...(article.keywords && article.keywords.length > 0 && {
        citation_keywords: article.keywords.join("; "),
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
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header with Blue Background */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 leading-tight">
          {article.title}
        </h1>
        
        <div className="space-y-2 text-blue-100">
          {authors.length > 0 && (
            <div className="flex items-start">
              <span className="font-semibold mr-2">Authors:</span>
              <span>{authors.join(", ")}</span>
            </div>
          )}

          {article.affiliation && (
            <div className="flex items-start">
              <span className="font-semibold mr-2">Affiliation:</span>
              <span>{article.affiliation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Article Metadata */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {article.publishedAt && (
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">Published:</span>
              <span className="text-gray-600">{article.publishedAt}</span>
            </div>
          )}

          {article.doi && (
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">DOI:</span>
              <a 
                href={`https://doi.org/${article.doi}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.doi}
              </a>
            </div>
          )}

          {article.pages && (
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">Pages:</span>
              <span className="text-gray-600">{article.pages}</span>
            </div>
          )}

          {article.issue && (
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-2">Issue:</span>
              <span className="text-gray-600">
                Vol. {article.issue.volume}, No. {article.issue.number} ({article.issue.year})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Abstract Section */}
      {article.abstract && (
        <section className="mb-8 bg-white rounded-lg p-6 border-l-4 border-blue-600 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Abstract</h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {article.abstract}
          </p>
        </section>
      )}

      {/* Keywords Section */}
      {article.keywords && article.keywords.length > 0 && (
        <section className="mb-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((keyword, index) => (
              <span
                key={`${keyword}-${index}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Download Button */}
      {article.pdfSlug && (
        <div className="flex justify-center">
          <a
            href={`/pdf/${article.pdfSlug}.pdf`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
        </div>
      )}
    </main>
  );
}
