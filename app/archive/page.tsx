import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        authors: {
          include: {
            author: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        issue: true
      },
      orderBy: {
        publishedAt: 'desc'
      }
    });
    
    return articles.map(article => ({
      slug: article.slug,
      title: article.title,
      authors: article.authors.map(a => a.author.fullName).join(', '),
      publishedAt: article.publishedAt?.toISOString().split('T')[0] || '',
      issue: article.issue
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArchivePage() {
  const articles = await getArticles();
  
  // Group articles by year
  const articlesByYear = articles.reduce((acc: any, article: any) => {
    const year = new Date(article.publishedAt).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {});

  const years = Object.keys(articlesByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Archive</h1>
          <p className="text-gray-600 text-lg">Browse all published articles by year</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="text-4xl font-bold mb-2">{articles.length}</div>
            <div className="text-blue-100">Total Articles</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <div className="text-4xl font-bold mb-2">{years.length}</div>
            <div className="text-green-100">Years Published</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="text-4xl font-bold mb-2">Open</div>
            <div className="text-purple-100">Access Journal</div>
          </div>
        </div>

        {/* Articles by Year */}
        <div className="space-y-8">
          {years.map((year) => (
            <div key={year} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {year}
                <span className="ml-auto text-sm font-normal text-gray-500">
                  {articlesByYear[year].length} articles
                </span>
              </h2>
              
              <div className="space-y-4">
                {articlesByYear[year].map((article: any) => (
                  <div key={article.slug} className="group">
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="block p-4 rounded-lg hover:bg-blue-50 transition-all border border-transparent hover:border-blue-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                            {article.authors && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  {article.authors}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No articles published yet</p>
          </div>
        )}
      </div>
    </main>
  );
}
