import { prisma } from '@/lib/prisma';

interface BoardMember {
  id: string;
  name: string;
  position: string;
  affiliation: string;
  email?: string;
  photo?: string;
  bio?: string;
  order: number;
}

async function getEditorialBoard() {
  try {
    const members = await prisma.editorialBoard.findMany({
      orderBy: {
        order: 'asc'
      }
    });
    return members;
  } catch (error) {
    console.error('Error fetching editorial board:', error);
    return [];
  }
}

export default async function EditorialBoardPage() {
  const members = await getEditorialBoard();
  
  // Group members by position
  const editorInChief = members.find(m => m.position.toLowerCase().includes('editor-in-chief'));
  const managingEditor = members.find(m => m.position.toLowerCase().includes('managing editor'));
  const boardMembers = members.filter(m => 
    !m.position.toLowerCase().includes('editor-in-chief') && 
    !m.position.toLowerCase().includes('managing editor') &&
    !m.position.toLowerCase().includes('advisory')
  );
  const advisoryBoard = members.filter(m => m.position.toLowerCase().includes('advisory'));

  function PersonCard({
    name,
    position,
    affiliation,
    photo,
    bio,
  }: {
    name: string;
    position?: string;
    affiliation?: string;
    photo?: string;
    bio?: string;
  }) {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 group">
        <div className="flex gap-5 items-start">
          {photo && (
            <div 
              className="flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shadow-md group-hover:scale-105 transition-transform"
              style={{ 
                width: '120px', 
                height: '120px', 
                minWidth: '120px', 
                minHeight: '120px',
                maxWidth: '120px',
                maxHeight: '120px'
              }}
            >
              <img
                src={photo}
                alt={name}
                style={{ 
                  objectFit: 'cover', 
                  objectPosition: 'center top',
                  width: '100%', 
                  height: '100%',
                  display: 'block'
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>

            {position && (
              <p className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {position}
              </p>
            )}

            {affiliation && (
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {affiliation}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Editorial Board</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Universal Journal News (UJN) tahririyati tarkibi: bosh muharrir,
            mas'ul kotib va tahrir hay'ati a'zolari.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full mt-4"></div>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Editor-in-Chief</h2>
          </div>
          {editorInChief && <PersonCard {...editorInChief} />}
        </section>

        {managingEditor && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Managing Editor (Mas'ul kotib)</h2>
            </div>
            <PersonCard {...managingEditor} />
          </section>
        )}

        {boardMembers.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Editorial Board Members</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {boardMembers.map((m) => (
                <PersonCard key={m.id} {...m} />
              ))}
            </div>
          </section>
        )}

        {advisoryBoard.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">International Advisory Board</h2>
            </div>
            <div className="space-y-6">
              {advisoryBoard.map((m) => (
                <PersonCard key={m.id} {...m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
