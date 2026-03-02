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
    affiliation: '',
    pdfFile: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Upload PDF if exists
      let pdfSlug = '';
      if (formData.pdfFile) {
        const pdfFormData = new FormData();
        pdfFormData.append('file', formData.pdfFile);
        
        const uploadRes = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: pdfFormData,
        });
        
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          pdfSlug = uploadData.filename.replace('.pdf', '');
        }
      }

      // 2. Create slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // 3. Parse issue (format: "2026-1-1")
      const [year, volume, issueNum] = formData.issue.split('-').map(Number);

      // 4. Create article object
      const newArticle = {
        slug: slug,
        title: formData.title,
        authors: formData.authors.split(',').map(a => a.trim()),
        affiliation: formData.affiliation,
        abstract: formData.abstract,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
        pdfSlug: pdfSlug || slug,
        publishedAt: formData.publishedDate,
        published: formData.publishedDate,
        pages: formData.pages,
        doi: formData.doi || undefined,
        issue: {
          year: year,
          volume: volume,
          number: issueNum,
        }
      };

      // 5. Save article to database
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle),
      });

      if (response.ok) {
        alert('Article created successfully!');
        router.push('/admin/articles');
      } else {
        alert('Failed to create article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error creating article');
    } finally {
      setLoading(false);
    }
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
                placeholder="University or Institution name"
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
              <p className="text-xs text-gray-500 mt-1">Enter author names separated by commas</p>
            </div>

            {/* PDF File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-400 transition">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, pdfFile: e.target.files?.[0] || null})}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {formData.pdfFile ? (
                    <div className="text-green-600">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium">{formData.pdfFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-xs text-blue-600 mt-2 hover:underline">Click to change file</p>
                    </div>
                  ) : (
                    <div className="text-gray-600">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p><span className="text-blue-600 hover:underline">Choose file</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload PDF version of the article (recommended for Google Scholar indexing)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Article'}
              </button>
              <Link
                href="/admin/articles"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm font-medium inline-block"
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
