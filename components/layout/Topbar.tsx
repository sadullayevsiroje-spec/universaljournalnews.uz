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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
              <span className="text-2xl font-black text-blue-900">UJN</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{titles[lang].name}</h1>
              <p className="text-sm text-blue-200 mt-1">{titles[lang].subtitle}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-blue-300">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                  ISSN: 3030-5713
                </span>
                <span>•</span>
                <span>Open Access</span>
                <span>•</span>
                <span>Peer Reviewed</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <button 
                onClick={() => changeLang('en')}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                  lang === 'en' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-blue-100 hover:bg-white/20'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => changeLang('uz')}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
                  lang === 'uz' 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'text-blue-100 hover:bg-white/20'
                }`}
              >
                UZ
              </button>
              <button 
                onClick={() => changeLang('ru')}
                className={`px-3 py-1 rounded font-medium text-sm transition-all ${
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
            
            <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors shadow-lg">
              {lang === 'en' ? 'Login' : lang === 'uz' ? 'Kirish' : 'Войти'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
