'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  authors: string[];
  publishedAt: string;
  pages: number;
}

export default function ArticlesManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadArticles = () => {
    fetch('/api/articles')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading articles:', error);
        setArticles([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeleting(slug);
    
    try {
      const response = await fetch('/api/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        alert('Article deleted successfully!');
        loadArticles();
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Articles</h1>
          <div className="flex gap-4">
            <Link href="/admin/articles/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add New Article
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 px-4 py-2">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No articles found</p>
            <Link href="/admin/articles/new" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
              Add your first article
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Authors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pages</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.slug}>
                    <td className="px-6 py-4 text-sm text-gray-900">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {Array.isArray(article.authors) ? article.authors.join(', ') : article.authors}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.publishedAt}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.pages}</td>
                    <td className="px-6 py-4 text-sm text-right space-x-2">
                      <Link href={`/admin/articles/${article.slug}`} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.slug, article.title)}
                        disabled={deleting === article.slug}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        {deleting === article.slug ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
