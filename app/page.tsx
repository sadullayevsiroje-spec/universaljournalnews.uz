// app/page.tsx
import Link from "next/link";
import { journalInfo } from "@/data/journal";
import { getCurrentIssue } from "@/lib/issues";

export default function HomePage() {
  const currentIssue = getCurrentIssue();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to Universal Journal News</h1>
            <p className="text-xl text-blue-100 mb-6">
              {journalInfo.description}
            </p>
            <div className="flex gap-4">
              <Link
                href="/author-guidelines"
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Submit Article
              </Link>
              <Link
                href="/issues"
                className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition border border-blue-600"
              >
                Browse Issues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Issue */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-2xl font-bold">Current Issue</h2>
                <p className="text-blue-100 text-sm">{currentIssue.label}</p>
                {currentIssue.published && (
                  <p className="text-blue-200 text-sm">Published: {currentIssue.published}</p>
                )}
              </div>

              {currentIssue.articles.length === 0 ? (
                <div className="p-6 text-gray-600">
                  No articles found for the current issue yet.
                </div>
              ) : (
                <div className="divide-y">
                  {currentIssue.articles.map((a) => (
                    <div key={a.articleHref} className="p-6 hover:bg-gray-50 transition">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <Link href={a.articleHref} className="hover:text-blue-600">
                          {a.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">{a.authors}</p>

                      <div className="flex flex-wrap items-center gap-3">
                        {a.pages && (
                          <span className="text-sm text-gray-500">Pages: {a.pages}</span>
                        )}

                        {a.pdfHref && (
                          <Link
                            href={a.pdfHref}
                            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-50 px-6 py-4 border-t">
                <Link
                  href="/issues"
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  View All Issues →
                </Link>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Journal</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {journalInfo.description}
              </p>
              <Link
                href="/about"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Read More →
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/author-guidelines" className="text-blue-600 hover:text-blue-800">
                    → Author Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="text-blue-600 hover:text-blue-800">
                    → Journal Policies
                  </Link>
                </li>
                <li>
                  <Link href="/publication-ethics" className="text-blue-600 hover:text-blue-800">
                    → Publication Ethics
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-board" className="text-blue-600 hover:text-blue-800">
                    → Editorial Board
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                    → Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Journal Info */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Journal Information</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-gray-700">ISSN</dt>
                  <dd className="text-gray-600">{journalInfo.issn}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Frequency</dt>
                  <dd className="text-gray-600">{journalInfo.frequency}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Publisher</dt>
                  <dd className="text-gray-600">{journalInfo.publisher}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Language</dt>
                  <dd className="text-gray-600">English</dd>
                </div>
              </dl>
            </div>

            {/* Indexing */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Indexing</h3>
              <p className="text-sm text-gray-600 mb-3">
                This journal is indexed in:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Google Scholar</li>
                <li>• Open Access Journals</li>
                <li>• Academic Search Engines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
