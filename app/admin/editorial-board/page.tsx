'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BoardMember {
  id: string;
  name: string;
  position: string;
  affiliation: string;
  email: string;
  photo?: string;
  bio?: string;
  order: number;
}

export default function EditorialBoardManagement() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    affiliation: '',
    email: '',
    photo: '',
    bio: ''
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/editorial-board');
      const data = await res.json();
      setMembers(data.sort((a: BoardMember, b: BoardMember) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingMember) {
        // Update
        await fetch('/api/editorial-board', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingMember.id })
        });
      } else {
        // Create
        await fetch('/api/editorial-board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      
      setShowModal(false);
      setEditingMember(null);
      setFormData({ name: '', position: '', affiliation: '', email: '', photo: '', bio: '' });
      fetchMembers();
    } catch (error) {
      console.error('Failed to save member:', error);
    }
  };

  const handleEdit = (member: BoardMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      affiliation: member.affiliation,
      email: member.email,
      photo: member.photo || '',
      bio: member.bio || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    
    try {
      await fetch(`/api/editorial-board?id=${id}`, { method: 'DELETE' });
      fetchMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Editorial Board Management</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setEditingMember(null);
                setFormData({ name: '', position: '', affiliation: '', email: '', photo: '', bio: '' });
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
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
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-32 h-32 rounded-full border-4 border-white object-cover" />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm mb-2">{member.affiliation}</p>
                <p className="text-gray-500 text-sm mb-4">{member.email}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Affiliation *</label>
                  <input
                    type="text"
                    required
                    value={formData.affiliation}
                    onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({...formData, photo: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    placeholder="/editorial-board/photo.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {editingMember ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingMember(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
