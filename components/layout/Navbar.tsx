'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [lang, setLang] = useState<'en' | 'uz' | 'ru'>('en');

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
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <a href="/" className="px-4 py-3 hover:bg-blue-800 transition font-medium">{nav.home}</a>
          <a href="/about" className="px-4 py-3 hover:bg-blue-800 transition">{nav.about}</a>
          <a href="/issues" className="px-4 py-3 hover:bg-blue-800 transition">{nav.archives}</a>
          <a href="/author-guidelines" className="px-4 py-3 hover:bg-blue-800 transition">{nav.forAuthors}</a>
          <a href="/editorial-board" className="px-4 py-3 hover:bg-blue-800 transition">{nav.editorialBoard}</a>
          <a href="/policies" className="px-4 py-3 hover:bg-blue-800 transition">{nav.policies}</a>
          <a href="/contact" className="px-4 py-3 hover:bg-blue-800 transition">{nav.contact}</a>
        </div>
      </div>
    </nav>
  );
}
