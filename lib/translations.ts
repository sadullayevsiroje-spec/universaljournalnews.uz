export const translations = {
  en: {
    // Header
    journalName: "Universal Journal News",
    journalSubtitle: "International Multidisciplinary Research Journal",
    login: "Login",
    search: "Search",
    
    // Navigation
    home: "Home",
    about: "About",
    archives: "Archives",
    forAuthors: "For Authors",
    editorialBoard: "Editorial Board",
    policies: "Policies",
    contact: "Contact",
    
    // Home Page
    currentIssue: "Current Issue",
    viewFullIssue: "View Full Issue",
    browseArchive: "Browse Archive",
    articlesPublished: "Articles Published",
    aboutJournal: "About the Journal",
    readMore: "Read More",
    monthlyPublication: "Monthly",
    publication: "Publication",
    openAccess: "Open Access",
    freeToRead: "Free to Read",
    
    // Sidebar
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
    
    // Issue
    volume: "Volume",
    issue: "Issue",
    published: "Published",
    welcomeMessage: "Welcome to the inaugural issue of Universal Journal News. This issue features cutting-edge research across multiple disciplines including medicine, health sciences, and related fields.",
  },
  
  uz: {
    // Header
    journalName: "Universal Journal News",
    journalSubtitle: "Xalqaro Ko'p Tarmoqli Tadqiqot Jurnali",
    login: "Kirish",
    search: "Qidiruv",
    
    // Navigation
    home: "Bosh sahifa",
    about: "Jurnal haqida",
    archives: "Arxiv",
    forAuthors: "Mualliflar uchun",
    editorialBoard: "Tahririyat hay'ati",
    policies: "Siyosat",
    contact: "Aloqa",
    
    // Home Page
    currentIssue: "Joriy son",
    viewFullIssue: "To'liq sonni ko'rish",
    browseArchive: "Arxivni ko'rish",
    articlesPublished: "Maqolalar nashr etildi",
    aboutJournal: "Jurnal haqida",
    readMore: "Batafsil",
    monthlyPublication: "Oylik",
    publication: "Nashr",
    openAccess: "Ochiq kirish",
    freeToRead: "Bepul o'qish",
    
    // Sidebar
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
    
    // Issue
    volume: "Jild",
    issue: "Son",
    published: "Nashr etildi",
    welcomeMessage: "Universal Journal News jurnalining birinchi soniga xush kelibsiz. Ushbu sonda tibbiyot, sog'liqni saqlash va tegishli sohalardagi ilg'or tadqiqotlar mavjud.",
  },
  
  ru: {
    // Header
    journalName: "Universal Journal News",
    journalSubtitle: "Международный Мультидисциплинарный Исследовательский Журнал",
    login: "Войти",
    search: "Поиск",
    
    // Navigation
    home: "Главная",
    about: "О журнале",
    archives: "Архив",
    forAuthors: "Для авторов",
    editorialBoard: "Редакционная коллегия",
    policies: "Политика",
    contact: "Контакты",
    
    // Home Page
    currentIssue: "Текущий выпуск",
    viewFullIssue: "Посмотреть полный выпуск",
    browseArchive: "Просмотреть архив",
    articlesPublished: "Опубликовано статей",
    aboutJournal: "О журнале",
    readMore: "Подробнее",
    monthlyPublication: "Ежемесячно",
    publication: "Публикация",
    openAccess: "Открытый доступ",
    freeToRead: "Бесплатное чтение",
    
    // Sidebar
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
    
    // Issue
    volume: "Том",
    issue: "Выпуск",
    published: "Опубликовано",
    welcomeMessage: "Добро пожаловать в первый выпуск Universal Journal News. В этом выпуске представлены передовые исследования в различных дисциплинах, включая медицину, науки о здоровье и смежные области.",
  },
};

export type Language = 'en' | 'uz' | 'ru';

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
