'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Settings() {
  const [settings, setSettings] = useState({
    journalName: 'Universal Journal News',
    issn: '',
    email: 'info@universaljournalnews.uz',
    phone: '+998 XX XXX XX XX',
    address: 'Urgench, Uzbekistan',
    submissionEmail: 'submit@universaljournalnews.uz',
    reviewDays: 14,
    publicationFee: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings saved! In production, this would update the database.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Journal Settings</h1>
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">General Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Journal Name</label>
                <input
                  type="text"
                  value={settings.journalName}
                  onChange={(e) => setSettings({...settings, journalName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">ISSN</label>
                <input
                  type="text"
                  value={settings.issn}
                  onChange={(e) => setSettings({...settings, issn: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submission Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Submission Email</label>
                <input
                  type="email"
                  value={settings.submissionEmail}
                  onChange={(e) => setSettings({...settings, submissionEmail: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Review Period (days)</label>
                <input
                  type="number"
                  value={settings.reviewDays}
                  onChange={(e) => setSettings({...settings, reviewDays: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Publication Fee (USD)</label>
                <input
                  type="number"
                  value={settings.publicationFee}
                  onChange={(e) => setSettings({...settings, publicationFee: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
