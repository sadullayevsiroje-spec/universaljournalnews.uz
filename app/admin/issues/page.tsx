'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Issue {
  id?: string;
  year: number;
  volume: number;
  issue: number;
  title: string;
  publishedAt: string;
  articles: { slug: string }[];
}

export default function IssuesManagement() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    volume: 1,
    issue: 1,
    title: '',
    publishedAt: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const response = await fetch('/api/issues');
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;

    try {
      const response = await fetch('/api/issues', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('Issue deleted successfully!');
        loadIssues();
      } else {
        alert('Failed to delete issue');
      }
    } catch (error) {
      console.error('Error deleting issue:', error);
      alert('Error deleting issue');
    }
  };

  const handleEdit = (issue: Issue) => {
    setEditingIssue(issue);
    setFormData({
      year: issue.year,
      volume: issue.volume,
      issue: issue.issue,
      title: issue.title,
      publishedAt: issue.publishedAt,
    });
    setShowCreateModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingIssue) {
        // Update existing issue
        const response = await fetch('/api/issues', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingIssue.id,
            year: formData.year,
            volume: formData.volume,
            issue: formData.issue,
            title: formData.title,
            publishedAt: formData.publishedAt,
          }),
        });

        if (response.ok) {
          alert('Issue updated successfully!');
          setShowCreateModal(false);
          setEditingIssue(null);
          loadIssues();
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to update issue');
        }
      } else {
        // Create new issue
        const response = await fetch('/api/issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            year: formData.year,
            volume: formData.volume,
            issue: formData.issue,
            title: formData.title,
            publishedAt: formData.publishedAt,
          }),
        });

        if (response.ok) {
          alert('Issue created successfully!');
          setShowCreateModal(false);
          loadIssues();
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to create issue');
        }
      }
    } catch (error) {
      console.error('Error saving issue:', error);
      alert('Error saving issue');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Manage Issues</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setEditingIssue(null);
                setFormData({
                  year: new Date().getFullYear(),
                  volume: 1,
                  issue: 1,
                  title: '',
                  publishedAt: new Date().toISOString().split('T')[0],
                });
                setShowCreateModal(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
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
                <tr key={issue.id || `${issue.year}-${issue.volume}-${issue.issue}`}>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.volume}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.issue}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{issue.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.publishedAt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{issue.articles?.length || 0}</td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(issue)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(issue.id!)}
                      className="text-red-600 hover:text-red-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {issues.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No issues found. Create your first issue!
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">
              {editingIssue ? 'Edit Issue' : 'Create New Issue'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volume
                  </label>
                  <input
                    type="number"
                    value={formData.volume}
                    onChange={(e) => setFormData({...formData, volume: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue
                  </label>
                  <input
                    type="number"
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., January 2026"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Published Date
                </label>
                <input
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({...formData, publishedAt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {editingIssue ? 'Update Issue' : 'Create Issue'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingIssue(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
