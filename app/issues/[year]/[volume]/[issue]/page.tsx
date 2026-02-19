"use client";

import { useEffect, useState } from "react";
import { getIssueArticles } from "@/lib/issues";
import { translations } from "@/lib/translations";

export default function IssuePage({ params }: { params: { year: string; volume: string; issue: string } }) {
  const { year, volume, issue } = params;
  const [lang, setLang] = useState<"en" | "uz" | "ru">("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as "en" | "uz" | "ru" | null;
    if (savedLang) setLang(savedLang);
  }, []);

  const articles = getIssueArticles(Number(year), Number(volume), Number(issue));
  const t = translations[lang];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {t.issue} {issue} - {t.volume} {volume} - {year}
      </h1>
      
      {articles.length > 0 && articles[0].published && (
        <p className="text-gray-600 mb-8">
          {t.published}: {new Date(articles[0].published).toLocaleDateString(
            lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
      )}

      {articles.length === 0 ? (
        <p className="text-gray-500 mt-8">{t.noArticles || "No articles in this issue"}</p>
      ) : (
        <div className="space-y-6">
          {articles.map((article, idx) => (
            <div key={idx} className="border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-3">{article.authors}</p>
              {article.pages && (
                <p className="text-sm text-gray-500 mb-3">
                  {t.pages || "Pages"}: {article.pages}
                </p>
              )}
              <div className="flex gap-3">
                <a
                  href={article.articleHref}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {t.readArticle || "Read Article"}
                </a>
                {article.pdfHref && (
                  <a
                    href={article.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                  >
                    {t.downloadPdf || "Download PDF"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}



