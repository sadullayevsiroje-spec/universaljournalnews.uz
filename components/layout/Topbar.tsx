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
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            UJN
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{titles[lang].name}</h1>
            <p className="text-xs text-gray-600">{titles[lang].subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => changeLang('en')}
              className={`font-medium ${lang === 'en' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => changeLang('uz')}
              className={`font-medium ${lang === 'uz' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              UZ
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => changeLang('ru')}
              className={`font-medium ${lang === 'ru' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              RU
            </button>
          </div>
          <span className="text-gray-300">|</span>
          <button className="text-sm text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            {lang === 'en' ? 'Login' : lang === 'uz' ? 'Kirish' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}
