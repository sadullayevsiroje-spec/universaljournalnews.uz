'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [lang, setLang] = useState<'en' | 'uz' | 'ru'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'uz' | 'ru';
    if (savedLang) setLang(savedLang);

    const handleLangChange = (e: any) => {
      setLang(e.detail);
    };

    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const navItems = {
    en: {
      home: "Home",
      about: "About",
      archives: "Archives",
      forAuthors: "For Authors",
      editorialBoard: "Editorial Board",
      policies: "Policies",
      contact: "Contact",
    },
    uz: {
      home: "Bosh sahifa",
      about: "Jurnal haqida",
      archives: "Arxiv",
      forAuthors: "Mualliflar uchun",
      editorialBoard: "Tahririyat hay'ati",
      policies: "Siyosat",
      contact: "Aloqa",
    },
    ru: {
      home: "Главная",
      about: "О журнале",
      archives: "Архив",
      forAuthors: "Для авторов",
      editorialBoard: "Редколлегия",
      policies: "Политика",
      contact: "Контакты",
    },
  };

  const nav = navItems[lang];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <a 
              href="/" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.home}
            </a>
            <a 
              href="/about" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.about}
            </a>
            <a 
              href="/issues" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.archives}
            </a>
            <a 
              href="/author-guidelines" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.forAuthors}
            </a>
            <a 
              href="/editorial-board" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.editorialBoard}
            </a>
            <a 
              href="/policies" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.policies}
            </a>
            <a 
              href="/contact" 
              className="px-4 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              {nav.contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          <a 
            href="/author-guidelines" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {lang === 'en' ? 'Submit Article' : lang === 'uz' ? 'Maqola yuborish' : 'Отправить статью'}
          </a>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <a 
              href="/" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.home}
            </a>
            <a 
              href="/about" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.about}
            </a>
            <a 
              href="/issues" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.archives}
            </a>
            <a 
              href="/author-guidelines" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.forAuthors}
            </a>
            <a 
              href="/editorial-board" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.editorialBoard}
            </a>
            <a 
              href="/policies" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.policies}
            </a>
            <a 
              href="/contact" 
              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {nav.contact}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
