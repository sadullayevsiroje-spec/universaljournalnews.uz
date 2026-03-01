'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Issue {
  id: string;
  year: number;
  volume: number;
  number: number;
  title: string;
  publishedAt: string;
  articlesCount: number;
}

export default function IssuesManagement() {
  const [issues] = useState<Issue[]>([
    { 
      id: '1', 
      year: 2026, 
      volume: 1, 
      number: 1, 
      title: 'Volume 1, Issue 1',
      publishedAt: '2026-01-15',
      articlesCount: 5
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Issues</h1>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Create New Issue
            </button>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 px-4 py-2">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.volume}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.number}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.publishedAt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.articlesCount}</td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
