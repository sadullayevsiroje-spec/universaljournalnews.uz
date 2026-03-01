'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Author {
  id: string;
  name: string;
  affiliation: string;
  email: string;
  articlesCount: number;
}

export default function AuthorsManagement() {
  const [authors] = useState<Author[]>([
    { 
      id: '1', 
      name: 'Dr. John Smith', 
      affiliation: 'Urgench State Medical Institute',
      email: 'john.smith@example.com',
      articlesCount: 3
    },
    { 
      id: '2', 
      name: 'Dr. Jane Doe', 
      affiliation: 'Tashkent Medical Academy',
      email: 'jane.doe@example.com',
      articlesCount: 2
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Authors</h1>
          <div className="flex gap-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Add New Author
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Affiliation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{author.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{author.affiliation}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{author.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{author.articlesCount}</td>
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
