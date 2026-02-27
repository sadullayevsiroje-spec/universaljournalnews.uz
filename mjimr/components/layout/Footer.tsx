import { journal } from '@/data/journal'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">{journal.shortName}</h3>
            <p className="text-sm text-gray-300">{journal.description}</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-blue-400">About Journal</a></li>
              <li><a href="/editorial-board" className="hover:text-blue-400">Editorial Board</a></li>
              <li><a href="/author-guidelines" className="hover:text-blue-400">Author Guidelines</a></li>
              <li><a href="/policies" className="hover:text-blue-400">Policies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-sm text-gray-300">Email: {journal.email}</p>
            <p className="text-sm text-gray-300 mt-2">ISSN: {journal.issn}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {journal.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
