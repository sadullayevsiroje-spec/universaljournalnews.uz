// app/page.tsx
import Link from "next/link";
import { journalInfo } from "@/data/journal";
import { getCurrentIssue } from "@/lib/issues";

export default function HomePage() {
  const currentIssue = getCurrentIssue();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Current Issue */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b">Current Issue</h2>
              
              <div className="flex gap-6">
                {/* Cover Image */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg flex items-center justify-center text-white p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">UJN</div>
                      <div className="text-sm mb-2">Volume 1, Issue 1</div>
                      <div className="text-xs">2026</div>
                    </div>
                  </div>
                </div>

                {/* Issue Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">{currentIssue.label}</h3>
                  {currentIssue.published && (
                    <p className="text-sm text-gray-600 mb-4">Published: {currentIssue.published}</p>
                  )}
                  
                  <div className="prose max-w-none text-sm text-gray-700">
                    <p className="mb-3">
                      Welcome to the inaugural issue of Universal Journal News. This issue features 
                      cutting-edge research across multiple disciplines including medicine, health 
                      sciences, and related fields.
                    </p>
                    <p className="mb-4 font-semibold text-gray-900">
                      {currentIssue.articles.length} Articles Published
                    </p>
                    <div className="flex gap-3">
                      <Link 
                        href="/issues" 
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                      >
                        View Full Issue
                      </Link>
                      <Link 
                        href="/archive" 
                        className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-50"
                      >
                        Browse Archive
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b">About the Journal</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {journalInfo.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded p-3">
                  <div className="text-2xl font-bold text-blue-600">{journalInfo.frequency}</div>
                  <div className="text-sm text-gray-600">Publication</div>
                </div>
                <div className="border rounded p-3">
                  <div className="text-2xl font-bold text-blue-600">Open Access</div>
                  <div className="text-sm text-gray-600">Free to Read</div>
                </div>
              </div>
              <Link
                href="/about"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Read More →
              </Link>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Indexing */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Indexed In</h3>
              <div className="space-y-4">
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-2xl font-bold text-blue-600 mb-1">Google</div>
                  <div className="text-xs text-gray-600">Scholar</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-orange-600 mb-1">Crossref</div>
                  <div className="text-xs text-gray-600">DOI Registration</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-green-600 mb-1">DOAJ</div>
                  <div className="text-xs text-gray-600">Directory of Open Access</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-purple-600 mb-1">Index</div>
                  <div className="text-xs text-gray-600">Copernicus</div>
                </div>
              </div>
            </div>

            {/* Journal Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-3">Journal Info</h3>
              <dl className="space-y-2 text-sm">
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

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/author-guidelines" className="text-blue-600 hover:underline">
                    → Submit Article
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="text-blue-600 hover:underline">
                    → Journal Policies
                  </Link>
                </li>
                <li>
                  <Link href="/publication-ethics" className="text-blue-600 hover:underline">
                    → Ethics Statement
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-board" className="text-blue-600 hover:underline">
                    → Editorial Board
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
