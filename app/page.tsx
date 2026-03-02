// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { journalInfo } from "@/data/journal";
import { getCurrentIssue } from "@/lib/issues";

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'uz' | 'ru'>('en');
  const currentIssue = getCurrentIssue();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'uz' | 'ru';
    if (savedLang) setLang(savedLang);

    const handleLangChange = (e: any) => {
      setLang(e.detail);
    };

    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = {
    en: {
      currentIssue: "Current Issue",
      volume: "Volume",
      issue: "Issue",
      published: "Published",
      welcomeMessage: "Welcome to the inaugural issue of Universal Journal News. This issue features cutting-edge research across multiple disciplines including medicine, health sciences, and related fields.",
      articlesPublished: "Articles Published",
      viewFullIssue: "View Full Issue",
      browseArchive: "Browse Archive",
      aboutJournal: "About the Journal",
      readMore: "Read More",
      monthlyPublication: "Monthly",
      publication: "Publication",
      openAccess: "Open Access",
      freeToRead: "Free to Read",
      indexedIn: "Indexed In",
      journalInfo: "Journal Info",
      issn: "ISSN",
      frequency: "Frequency",
      publisher: "Publisher",
      language: "Language",
      quickLinks: "Quick Links",
      submitArticle: "Submit Article",
      journalPolicies: "Journal Policies",
      ethicsStatement: "Ethics Statement",
      editorialBoard: "Editorial Board",
    },
    uz: {
      currentIssue: "Joriy son",
      volume: "Jild",
      issue: "Son",
      published: "Nashr etildi",
      welcomeMessage: "Universal Journal News jurnalining birinchi soniga xush kelibsiz. Ushbu sonda tibbiyot, sog'liqni saqlash va tegishli sohalardagi ilg'or tadqiqotlar mavjud.",
      articlesPublished: "Maqolalar nashr etildi",
      viewFullIssue: "To'liq sonni ko'rish",
      browseArchive: "Arxivni ko'rish",
      aboutJournal: "Jurnal haqida",
      readMore: "Batafsil",
      monthlyPublication: "Oylik",
      publication: "Nashr",
      openAccess: "Ochiq kirish",
      freeToRead: "Bepul o'qish",
      indexedIn: "Indekslangan",
      journalInfo: "Jurnal ma'lumotlari",
      issn: "ISSN",
      frequency: "Chiqish davri",
      publisher: "Nashriyot",
      language: "Til",
      quickLinks: "Tezkor havolalar",
      submitArticle: "Maqola yuborish",
      journalPolicies: "Jurnal siyosati",
      ethicsStatement: "Etika bayonoti",
      editorialBoard: "Tahririyat hay'ati",
    },
    ru: {
      currentIssue: "Текущий выпуск",
      volume: "Том",
      issue: "Выпуск",
      published: "Опубликовано",
      welcomeMessage: "Добро пожаловать в первый выпуск Universal Journal News. В этом выпуске представлены передовые исследования в различных дисциплинах, включая медицину, науки о здоровье и смежные области.",
      articlesPublished: "Опубликовано статей",
      viewFullIssue: "Посмотреть полный выпуск",
      browseArchive: "Просмотреть архив",
      aboutJournal: "О журнале",
      readMore: "Подробнее",
      monthlyPublication: "Ежемесячно",
      publication: "Публикация",
      openAccess: "Открытый доступ",
      freeToRead: "Бесплатное чтение",
      indexedIn: "Индексируется в",
      journalInfo: "Информация о журнале",
      issn: "ISSN",
      frequency: "Периодичность",
      publisher: "Издатель",
      language: "Язык",
      quickLinks: "Быстрые ссылки",
      submitArticle: "Отправить статью",
      journalPolicies: "Политика журнала",
      ethicsStatement: "Заявление об этике",
      editorialBoard: "Редколлегия",
    },
  };

  const text = t[lang];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Current Issue Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl p-8 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {text.currentIssue}
                </div>
                <h2 className="text-3xl font-bold mb-3">{currentIssue.label}</h2>
                {currentIssue.published && (
                  <p className="text-blue-100 mb-6">
                    {text.published}: {new Date(currentIssue.published).toLocaleDateString(
                      lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </p>
                )}
                
                <p className="text-lg text-blue-50 mb-6 max-w-2xl leading-relaxed">
                  {text.welcomeMessage}
                </p>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-3xl font-bold">{currentIssue.articles.length}</div>
                    <div className="text-sm text-blue-100">{text.articlesPublished}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-3xl font-bold">Open</div>
                    <div className="text-sm text-blue-100">Access</div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="/issues" 
                    className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {text.viewFullIssue}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a 
                    href="/archive" 
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/30"
                  >
                    {text.browseArchive}
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
                <a href="/issues" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              <div className="space-y-6">
                {currentIssue.articles.slice(0, 5).map((article: any) => (
                  <article key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Research Article
                          </span>
                          <span className="text-xs text-gray-500">Open Access</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <a href={`/articles/${article.slug}`}>{article.title}</a>
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {Array.isArray(article.authors) ? article.authors.join(', ') : article.authors}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {article.publishedDate}
                          </span>
                          <span>•</span>
                          <span>Pages: {article.pages}</span>
                          <span>•</span>
                          <span>DOI: {article.doi}</span>
                        </div>
                        
                        <div className="flex gap-3 mt-4">
                          <a 
                            href={`/articles/${article.slug}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Abstract
                          </a>
                          <a 
                            href={`/pdf/${article.slug}`}
                            className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{text.aboutJournal}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {journalInfo.description}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{text.monthlyPublication}</div>
                  <div className="text-sm text-gray-600">{text.publication}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">{text.openAccess}</div>
                  <div className="text-sm text-gray-600">{text.freeToRead}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">Indexed</div>
                  <div className="text-sm text-gray-600">Multiple DBs</div>
                </div>
              </div>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {text.readMore}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Indexing */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Indexed In</h3>
              <div className="space-y-3">
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1">
                  <div className="text-2xl font-bold text-red-600 mb-1">Google</div>
                  <div className="text-xs text-gray-600">Scholar</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1">
                  <div className="text-xl font-bold text-orange-600 mb-1">Crossref</div>
                  <div className="text-xs text-gray-600">DOI Registration</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1">
                  <div className="text-xl font-bold text-green-600 mb-1">DOAJ</div>
                  <div className="text-xs text-gray-600">Open Access Directory</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1">
                  <div className="text-xl font-bold text-purple-600 mb-1">Index</div>
                  <div className="text-xs text-gray-600">Copernicus</div>
                </div>
              </div>
            </div>

            {/* Journal Info */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4 text-lg">Journal Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <dt className="font-semibold">ISSN</dt>
                  <dd className="text-blue-100">{journalInfo.issn}</dd>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <dt className="font-semibold">Frequency</dt>
                  <dd className="text-blue-100">{journalInfo.frequency}</dd>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <dt className="font-semibold">Publisher</dt>
                  <dd className="text-blue-100">{journalInfo.publisher}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="font-semibold">Language</dt>
                  <dd className="text-blue-100">EN, UZ, RU</dd>
                </div>
              </dl>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/author-guidelines" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all group">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Submit Article</span>
                  </a>
                </li>
                <li>
                  <a href="/policies" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all group">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">Journal Policies</span>
                  </a>
                </li>
                <li>
                  <a href="/publication-ethics" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all group">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">Ethics Statement</span>
                  </a>
                </li>
                <li>
                  <a href="/editorial-board" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all group">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Editorial Board</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
