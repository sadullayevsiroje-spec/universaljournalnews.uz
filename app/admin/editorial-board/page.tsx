'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BoardMember {
  id: string;
  name: string;
  position: string;
  affiliation: string;
  email: string;
  photo?: string;
}

export default function EditorialBoardManagement() {
  const [members] = useState<BoardMember[]>([
    { 
      id: '1', 
      name: 'Prof. Sadullayev Akmal', 
      position: 'Editor-in-Chief',
      affiliation: 'Urgench State Medical Institute',
      email: 'sadullayev@ujn.uz',
      photo: '/editorial-board/sadullayev.jpg'
    },
    { 
      id: '2', 
      name: 'Dr. Yusupov Shavkat', 
      position: 'Associate Editor',
      affiliation: 'Tashkent Medical Academy',
      email: 'yusupov@ujn.uz',
      photo: '/editorial-board/yusupov-shavkat.jpg'
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Editorial Board Management</h1>
          <div className="flex gap-4">
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              Add New Member
            </button>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 px-4 py-2">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full border-4 border-white object-cover" />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center text-4xl font-bold text-orange-600">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm mb-2">{member.affiliation}</p>
                <p className="text-gray-500 text-sm mb-4">{member.email}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                    Edit
                  </button>
                  <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
