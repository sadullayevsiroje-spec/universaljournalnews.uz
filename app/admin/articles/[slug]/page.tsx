'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    authors: '',
    affiliation: '',
    abstract: '',
    keywords: '',
    pages: '',
    publishedAt: '',
    doi: '',
    year: 2026,
    volume: 1,
    issue: 1,
  });

  useEffect(() => {
    // Load article data
    fetch('/api/articles')
      .then(res => res.json())
      .then(articles => {
        const article = articles.find((a: any) => a.slug === slug);
        if (article) {
          setFormData({
            slug: article.slug,
            title: article.title,
            authors: Array.isArray(article.authors) ? article.authors.join(', ') : article.authors,
            affiliation: article.affiliation || '',
            abstract: article.abstract || '',
            keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : article.keywords || '',
            pages: article.pages || '',
            publishedAt: article.publishedAt || '',
            doi: article.doi || '',
            year: article.issue?.year || 2026,
            volume: article.issue?.volume || 1,
            issue: article.issue?.number || 1,
          });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading article:', error);
        setLoading(false);
      });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const updatedArticle = {
      slug: formData.slug,
      title: formData.title,
      authors: formData.authors.split(',').map(a => a.trim()),
      affiliation: formData.affiliation,
      abstract: formData.abstract,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      pdfSlug: formData.slug,
      publishedAt: formData.publishedAt,
      published: formData.publishedAt,
      pages: formData.pages,
      doi: formData.doi,
      issue: {
        year: formData.year,
        volume: formData.volume,
        number: formData.issue,
      }
    };

    try {
      const response = await fetch('/api/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArticle),
      });

      if (response.ok) {
        alert('Article updated successfully!');
        router.push('/admin/articles');
      } else {
        alert('Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Error updating article');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Edit Article</h1>
          <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to Articles
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Authors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authors (comma-separated) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.authors}
                onChange={(e) => setFormData({...formData, authors: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Author 1, Author 2, Author 3"
                required
              />
            </div>

            {/* Affiliation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affiliation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.affiliation}
                onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Abstract <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.abstract}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={6}
                required
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            {/* Pages and Published Date */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pages (e.g., 3-8, 15-20) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pages}
                  onChange={(e) => setFormData({...formData, pages: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3-8"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter page range (e.g., 3-8, 15-20)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({...formData, publishedAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* DOI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DOI
              </label>
              <input
                type="text"
                value={formData.doi}
                onChange={(e) => setFormData({...formData, doi: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10.xxxxx/ujn.2026.01.001"
              />
            </div>

            {/* Year, Volume, Issue */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.volume}
                  onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.issue}
                  onChange={(e) => setFormData({...formData, issue: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href="/admin/articles"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
