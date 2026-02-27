import Link from 'next/link'
import { journal } from '@/data/journal'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            {journal.shortName}
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/issues" className="hover:text-blue-600">Current</Link>
            <Link href="/archive" className="hover:text-blue-600">Archives</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/editorial-board" className="hover:text-blue-600">Editorial Board</Link>
            <Link href="/author-guidelines" className="hover:text-blue-600">For Authors</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
