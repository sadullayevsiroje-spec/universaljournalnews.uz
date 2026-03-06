"use client";

import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";

export default function IssuePage({ params }: { params: { year: string; volume: string; issue: string } }) {
  const { year, volume, issue } = params;
  const [lang, setLang] = useState<"en" | "uz" | "ru">("en");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "en" | "uz" | "ru" | null;
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    // Fetch articles from API
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((a: any) =>
          a.issue?.year === Number(year) &&
          a.issue?.volume === Number(volume) &&
          a.issue?.number === Number(issue)
        );

        // Sort by pages
        filtered.sort((a: any, b: any) => {
          const pagesA = a.pages ? String(a.pages).split('-')[0] : '0';
          const pagesB = b.pages ? String(b.pages).split('-')[0] : '0';
          return parseInt(pagesA) - parseInt(pagesB);
        });

        const mapped = filtered.map((a: any) => ({
          title: a.title,
          authors: Array.isArray(a.authors) ? a.authors.join(", ") : a.authors,
          pages: a.pages ? String(a.pages) : undefined,
          articleHref: `/articles/${a.slug}`,
          pdfHref: a.pdfUrl || undefined,
          published: a.publishedAt || null,
        }));

        setArticles(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading articles:', err);
        setLoading(false);
      });
  }, [year, volume, issue]);

  const t = translations[lang];

  if (loading) {
    return (
      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
            <li><a href="/archive" className="hover:text-blue-600">Archive</a></li>
            <li><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></li>
            <li className="text-gray-900 font-medium">{year} / Vol. {volume} / Issue {issue}</li>
          </ol>
        </nav>

        {/* Issue Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {t.volume} {volume}, {t.issue} {issue} ({year})
              </h1>
              {articles.length > 0 && articles[0].published && (
                <p className="text-blue-100 mt-2">
                  {t.published}: {new Date(articles[0].published).toLocaleDateString(
                    lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">{articles.length}</div>
              <div className="text-sm text-blue-100">{t.articlesPublished || "Articles"}</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">Open</div>
              <div className="text-sm text-blue-100">Access</div>
            </div>
          </div>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">{t.noArticles || "No articles in this issue"}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article, idx) => (
              <article key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 group">
                <div className="flex gap-6">
                  {/* Article Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Research Article
                      </span>
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        Open Access
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {article.authors}
                    </p>
                    
                    {article.pages && (
                      <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {t.pages || "Pages"}: {article.pages}
                      </p>
                    )}
                    
                    <div className="flex gap-4 mt-6">
                      <a
                        href={article.articleHref}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t.readArticle || "Read Article"}
                      </a>
                      {article.pdfHref && (
                        <a
                          href={article.pdfHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {t.downloadPdf || "Download PDF"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}



