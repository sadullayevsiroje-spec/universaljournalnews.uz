'use client';

import { useState, useEffect } from 'react';

export default function Topbar() {
  const [lang, setLang] = useState<'en' | 'uz' | 'ru'>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'uz' | 'ru';
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (newLang: 'en' | 'uz' | 'ru') => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  const titles = {
    en: { name: "Universal Journal News", subtitle: "International Multidisciplinary Research Journal" },
    uz: { name: "Universal Journal News", subtitle: "Xalqaro Ko'p Tarmoqli Tadqiqot Jurnali" },
    ru: { name: "Universal Journal News", subtitle: "Международный Мультидисциплинарный Исследовательский Журнал" },
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            {/* Logo Image */}
            <div className="flex-shrink-0">
              <img 
                src="/ujn-logo.png" 
                alt="Universal Journal News" 
                className="h-16 md:h-20 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text logo if image not found
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              {/* Fallback text logo */}
              <div className="hidden w-12 h-12 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
                <span className="text-xl md:text-2xl font-black text-blue-900">UJN</span>
              </div>
            </div>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg md:text-2xl font-bold tracking-tight">{titles[lang].name}</h1>
              <p className="text-xs md:text-sm text-blue-200 mt-1">{titles[lang].subtitle}</p>
              <div className="flex items-center gap-2 md:gap-3 mt-2 text-xs text-blue-300">
                <span>Open Access</span>
                <span>•</span>
                <span>Peer Reviewed</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-2 md:px-3 py-2 backdrop-blur-sm">
              <button 
                onClick={() => changeLang('en')}
                className={`px-2 md:px-3 py-1 rounded font-medium text-xs md:text-sm transition-all ${
                  lang === 'en' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-blue-100 hover:bg-white/20'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLang('uz')}
                className={`px-2 md:px-3 py-1 rounded font-medium text-xs md:text-sm transition-all ${
                  lang === 'uz' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-blue-100 hover:bg-white/20'
                }`}
              >
                UZ
              </button>
              <button 
                onClick={() => changeLang('ru')}
                className={`px-2 md:px-3 py-1 rounded font-medium text-xs md:text-sm transition-all ${
                  lang === 'ru' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-blue-100 hover:bg-white/20'
                }`}
              >
                RU
              </button>
            </div>
            
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <a 
              href="/admin/login"
              className="bg-white text-blue-900 px-3 md:px-5 py-2 rounded-lg font-semibold text-xs md:text-sm hover:bg-blue-50 transition-colors shadow-lg"
            >
              {lang === 'en' ? 'Login' : lang === 'uz' ? 'Kirish' : 'Войти'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
