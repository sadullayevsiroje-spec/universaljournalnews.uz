'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Author {
  id: string;
  fullName: string;
  affiliation: string | null;
  articlesCount: number;
}

export default function AuthorsManagement() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await fetch('/api/articles');
      const articles = await response.json();
      
      // Extract unique authors with article counts
      const authorMap = new Map<string, Author>();
      
      articles.forEach((article: any) => {
        if (article.authors && Array.isArray(article.authors)) {
          article.authors.forEach((authorName: string) => {
            if (authorMap.has(authorName)) {
              const author = authorMap.get(authorName)!;
              author.articlesCount++;
            } else {
              authorMap.set(authorName, {
                id: authorName,
                fullName: authorName,
                affiliation: null,
                articlesCount: 1
              });
            }
          });
        }
      });
      
      setAuthors(Array.from(authorMap.values()).sort((a, b) => 
        b.articlesCount - a.articlesCount
      ));
    } catch (error) {
      console.error('Error loading authors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <Link href="/admin" className="text-gray-600 hover:text-gray-900 px-4 py-2">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">About Authors</h3>
              <p className="text-sm text-blue-800">
                Authors are automatically created when you add articles. This page shows all authors who have published articles in the journal.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles Published</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{author.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {author.articlesCount} {author.articlesCount === 1 ? 'article' : 'articles'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {authors.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No authors found. Authors will appear here when you add articles.
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{authors.length}</div>
              <div className="text-sm text-gray-600">Total Authors</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {authors.reduce((sum, a) => sum + a.articlesCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-purple-600">
                {authors.length > 0 ? (authors.reduce((sum, a) => sum + a.articlesCount, 0) / authors.length).toFixed(1) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg Articles per Author</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
