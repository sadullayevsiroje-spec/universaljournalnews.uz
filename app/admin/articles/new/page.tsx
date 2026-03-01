'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    affiliation: '',
    abstract: '',
    keywords: '',
    pages: 1,
    year: 2026,
    volume: 1,
    issue: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = `Article-${Date.now()}`;
    const article = {
      slug,
      title: formData.title,
      authors: formData.authors.split(',').map(a => a.trim()),
      affiliation: formData.affiliation,
      abstract: formData.abstract,
      keywords: formData.keywords.split(',').map(k => k.trim()),
      pdfSlug: slug,
      publishedAt: new Date().toISOString().split('T')[0],
      published: new Date().toISOString().split('T')[0],
      pages: formData.pages,
      doi: `10.xxxxx/ujn.${formData.year}.${formData.volume}.${slug}`,
      issue: {
        year: formData.year,
        volume: formData.volume,
        number: formData.issue,
      }
    };

    alert('Article created! In production, this would save to database.');
    router.push('/admin/articles');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Add New Article</h1>
          <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900">
            Back to Articles
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Authors (comma-separated)</label>
            <input
              type="text"
              value={formData.authors}
              onChange={(e) => setFormData({...formData, authors: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe, Jane Smith"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Affiliation</label>
            <input
              type="text"
              value={formData.affiliation}
              onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Abstract</label>
            <textarea
              value={formData.abstract}
              onChange={(e) => setFormData({...formData, abstract: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Keywords (comma-separated)</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({...formData, keywords: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="keyword1, keyword2, keyword3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pages</label>
              <input
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Volume</label>
              <input
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Issue</label>
              <input
                type="number"
                value={formData.issue}
                onChange={(e) => setFormData({...formData, issue: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Article
            </button>
            <Link
              href="/admin/articles"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
