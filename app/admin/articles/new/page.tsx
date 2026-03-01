'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    fullContent: '',
    keywords: '',
    pages: '',
    doi: '',
    publishedDate: '',
    issue: '',
    authors: '',
    pdfFile: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    alert('Article created! In production, this would save to database.');
    router.push('/admin/articles');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Add New Article</h1>
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

            {/* Full Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.fullContent}
                onChange={(e) => setFormData({...formData, fullContent: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                rows={12}
                required
              />
            </div>

            {/* Keywords and Pages */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pages (e.g., 3-8, 15-20)
                </label>
                <input
                  type="text"
                  value={formData.pages}
                  onChange={(e) => setFormData({...formData, pages: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3-8"
                />
                <p className="text-xs text-gray-500 mt-1">Enter page range (e.g., 3-8, 15-20)</p>
              </div>
            </div>

            {/* DOI and Published Date */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DOI
                </label>
                <input
                  type="text"
                  value={formData.doi}
                  onChange={(e) => setFormData({...formData, doi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10.1234/mjimr.2026.01.001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Issue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.issue}
                onChange={(e) => setFormData({...formData, issue: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select an issue</option>
                <option value="2026-1-1">2026, Volume 1, Issue 1</option>
                <option value="2026-1-2">2026, Volume 1, Issue 2</option>
              </select>
            </div>

            {/* Authors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authors <span className="text-red-500">*</span>
              </label>
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) => setFormData({...formData, authors: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter author names separated by commas"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  No authors available. <span className="text-blue-600 cursor-pointer hover:underline">Add authors first</span>
                </p>
              </div>
              <p className="text-xs text-red-500 mt-1">Please select at least one author</p>
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, pdfFile: e.target.files?.[0] || null})}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="text-gray-600">
                    <span className="text-blue-600 hover:underline">Выберите файл</span> / Файл не выбран
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload PDF version of the article (recommended for Google Scholar indexing)
                  </p>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition text-sm font-medium"
              >
                Create Article
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
