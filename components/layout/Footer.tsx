'use client';

import { useState, useEffect } from 'react';
import { journalInfo } from '@/data/journal';

export default function Footer() {
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

  const footerText = {
    en: {
      about: "About",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
      aboutText: "An international peer-reviewed open access journal publishing high-quality research in medical and health sciences.",
      home: "Home",
      archives: "Archives",
      forAuthors: "For Authors",
      editorialBoard: "Editorial Board",
      policies: "Policies",
      ethics: "Publication Ethics",
      copyright: "All rights reserved.",
      issn: "ISSN",
      openAccess: "Open Access Journal"
    },
    uz: {
      about: "Jurnal haqida",
      quickLinks: "Tezkor havolalar",
      contact: "Aloqa",
      followUs: "Ijtimoiy tarmoqlar",
      aboutText: "Tibbiyot va sog'liqni saqlash fanlarida yuqori sifatli tadqiqotlarni nashr etuvchi xalqaro ko'rib chiqilgan ochiq kirish jurnali.",
      home: "Bosh sahifa",
      archives: "Arxiv",
      forAuthors: "Mualliflar uchun",
      editorialBoard: "Tahririyat hay'ati",
      policies: "Siyosat",
      ethics: "Nashr etika",
      copyright: "Barcha huquqlar himoyalangan.",
      issn: "ISSN",
      openAccess: "Ochiq kirish jurnali"
    },
    ru: {
      about: "О журнале",
      quickLinks: "Быстрые ссылки",
      contact: "Контакты",
      followUs: "Социальные сети",
      aboutText: "Международный рецензируемый журнал открытого доступа, публикующий высококачественные исследования в области медицины и здравоохранения.",
      home: "Главная",
      archives: "Архив",
      forAuthors: "Для авторов",
      editorialBoard: "Редколлегия",
      policies: "Политика",
      ethics: "Этика публикаций",
      copyright: "Все права защищены.",
      issn: "ISSN",
      openAccess: "Журнал открытого доступа"
    }
  };

  const text = footerText[lang];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/ujn-logo.png" 
                alt="UJN Logo" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-12 h-12 bg-white rounded-lg items-center justify-center shadow-lg hidden">
                <span className="text-xl font-black text-blue-900">UJN</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Universal Journal News</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {text.aboutText}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold">
                {text.openAccess}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {text.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.home}
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.about}
                </a>
              </li>
              <li>
                <a href="/archive" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.archives}
                </a>
              </li>
              <li>
                <a href="/author-guidelines" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.forAuthors}
                </a>
              </li>
              <li>
                <a href="/editorial-board" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.editorialBoard}
                </a>
              </li>
              <li>
                <a href="/policies" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.policies}
                </a>
              </li>
              <li>
                <a href="/publication-ethics" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {text.ethics}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {text.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${journalInfo.email}`} className="text-gray-400 hover:text-white transition-colors break-all">
                  {journalInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a href={journalInfo.url} className="text-gray-400 hover:text-white transition-colors">
                  {journalInfo.url}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-400">
                  {text.issn}: {journalInfo.issn}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media & Indexing */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Indexed In
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-sm font-bold text-red-400">Google</div>
                <div className="text-xs text-gray-400">Scholar</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-sm font-bold text-orange-400">Crossref</div>
                <div className="text-xs text-gray-400">DOI</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-sm font-bold text-green-400">DOAJ</div>
                <div className="text-xs text-gray-400">Directory</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer">
                <div className="text-sm font-bold text-purple-400">Index</div>
                <div className="text-xs text-gray-400">Copernicus</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} {journalInfo.name}. {text.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
