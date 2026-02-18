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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3 columns */}
          <div className="lg:col-span-3">
            {/* Current Issue */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b">{text.currentIssue}</h2>
              
              <div className="flex gap-6">
                {/* Cover Image */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg flex items-center justify-center text-white p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">UJN</div>
                      <div className="text-sm mb-2">{text.volume} 1, {text.issue} 1</div>
                      <div className="text-xs">2026</div>
                    </div>
                  </div>
                </div>

                {/* Issue Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-700 mb-2">{currentIssue.label}</h3>
                  {currentIssue.published && (
                    <p className="text-sm text-gray-600 mb-4">{text.published}: {currentIssue.published}</p>
                  )}
                  
                  <div className="prose max-w-none text-sm text-gray-700">
                    <p className="mb-3">
                      {text.welcomeMessage}
                    </p>
                    <p className="mb-4 font-semibold text-gray-900">
                      {currentIssue.articles.length} {text.articlesPublished}
                    </p>
                    <div className="flex gap-3">
                      <Link 
                        href="/issues" 
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
                      >
                        {text.viewFullIssue}
                      </Link>
                      <Link 
                        href="/archive" 
                        className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-50"
                      >
                        {text.browseArchive}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b">{text.aboutJournal}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {journalInfo.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded p-3">
                  <div className="text-2xl font-bold text-blue-600">{text.monthlyPublication}</div>
                  <div className="text-sm text-gray-600">{text.publication}</div>
                </div>
                <div className="border rounded p-3">
                  <div className="text-2xl font-bold text-blue-600">{text.openAccess}</div>
                  <div className="text-sm text-gray-600">{text.freeToRead}</div>
                </div>
              </div>
              <Link
                href="/about"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                {text.readMore} →
              </Link>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Indexing */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-4 text-center">Indexed In</h3>
              <div className="space-y-4">
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-2xl font-bold text-blue-600 mb-1">Google</div>
                  <div className="text-xs text-gray-600">Scholar</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-orange-600 mb-1">Crossref</div>
                  <div className="text-xs text-gray-600">DOI Registration</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-green-600 mb-1">DOAJ</div>
                  <div className="text-xs text-gray-600">Directory of Open Access</div>
                </div>
                <div className="text-center p-3 border rounded hover:shadow-md transition">
                  <div className="text-lg font-bold text-purple-600 mb-1">Index</div>
                  <div className="text-xs text-gray-600">Copernicus</div>
                </div>
              </div>
            </div>

            {/* Journal Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-3">Journal Info</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="font-semibold text-gray-700">ISSN</dt>
                  <dd className="text-gray-600">{journalInfo.issn}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Frequency</dt>
                  <dd className="text-gray-600">{journalInfo.frequency}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Publisher</dt>
                  <dd className="text-gray-600">{journalInfo.publisher}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-700">Language</dt>
                  <dd className="text-gray-600">English, Uzbek, Russian</dd>
                </div>
              </dl>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/author-guidelines" className="text-blue-600 hover:underline">
                    → Submit Article
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="text-blue-600 hover:underline">
                    → Journal Policies
                  </Link>
                </li>
                <li>
                  <Link href="/publication-ethics" className="text-blue-600 hover:underline">
                    → Ethics Statement
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-board" className="text-blue-600 hover:underline">
                    → Editorial Board
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
