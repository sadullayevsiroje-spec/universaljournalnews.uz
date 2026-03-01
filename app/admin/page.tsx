'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    pendingReviews: 0,
    totalViews: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    // Load stats from articles.json
    fetch('/data/articles.json')
      .then(res => res.json())
      .then(articles => {
        setStats({
          totalArticles: articles.length,
          publishedArticles: articles.length,
          pendingReviews: 0,
          totalViews: articles.length * 250,
        });
      });
  }, []);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {session?.user?.name}</span>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              View Site
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-blue-600">{stats.totalArticles}</div>
            <div className="text-gray-600 mt-2">Total Articles</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{stats.publishedArticles}</div>
            <div className="text-gray-600 mt-2">Published</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-orange-600">{stats.pendingReviews}</div>
            <div className="text-gray-600 mt-2">Pending Reviews</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">{stats.totalViews}</div>
            <div className="text-gray-600 mt-2">Total Views</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/articles" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Articles</h3>
            <p className="text-gray-600">Add, edit, or delete articles</p>
          </Link>
          <Link href="/admin/users" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-gray-600">Authors, editors, and reviewers</p>
          </Link>
          <Link href="/admin/settings" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600">Journal configuration</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
