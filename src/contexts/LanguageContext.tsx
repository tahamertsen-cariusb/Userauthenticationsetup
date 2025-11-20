import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Auth
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    name: 'İsim',
    logout: 'Çıkış Yap',
    
    // Navigation
    products: 'Ürünler',
    languages: 'Dil Ayarları',
    analytics: 'Analitik',
    settings: 'Ayarlar',
    
    // Products Dashboard
    productsDashboard: 'Ürün Paneli',
    allProducts: 'Tüm Ürünler',
    search: 'Ara...',
    optimize: 'Optimize Et',
    rewrite: 'Yeniden Yaz',
    pushToShopify: 'Shopify\'a Gönder',
    exportCSV: 'CSV Olarak Dışa Aktar',
    price: 'Fiyat',
    stock: 'Stok',
    seoScore: 'SEO Skoru',
    lastUpdated: 'Son Güncelleme',
    category: 'Kategori',
    status: 'Durum',
    inStock: 'Stokta',
    outOfStock: 'Stok Yok',
    lowStock: 'Düşük Stok',
    
    // Product Detail
    productDetails: 'Ürün Detayları',
    currentDescription: 'Mevcut Açıklama',
    aiSuggestion: 'AI Önerisi',
    regenerate: 'Yeniden Üret',
    save: 'Kaydet',
    approve: 'Onayla',
    aiLog: 'AI Log',
    prompt: 'Prompt',
    model: 'Model',
    tokens: 'Token Kullanımı',
    date: 'Tarih',
    
    // Language Settings
    languageSettings: 'Dil Ayarları',
    targetLanguages: 'Hedef Diller',
    keywords: 'Anahtar Kelimeler',
    autoTranslate: 'Otomatik Çeviri',
    manualEdit: 'Manuel Düzenleme',
    
    // Analytics
    analyticsLogs: 'Analitik & Loglar',
    optimizedProducts: 'Optimize Edilen Ürünler',
    avgSeoScore: 'Ortalama SEO Puanı',
    avgWords: 'Ortalama Kelime',
    dailyProduction: 'Günlük Üretim',
    modelUsage: 'Model Bazlı Kullanım',
    recentLogs: 'Son Loglar',
    
    // Settings
    apiKeys: 'API Anahtarları',
    shopifyApiKey: 'Shopify API Anahtarı',
    openaiApiKey: 'OpenAI API Anahtarı',
    notifications: 'Bildirimler',
    slackWebhook: 'Slack Webhook',
    emailNotifications: 'E-posta Bildirimleri',
    thresholds: 'Eşik Değerleri',
    minStock: 'Minimum Stok',
    minSeoScore: 'Minimum SEO Puanı',
    theme: 'Tema',
    language: 'Dil',
    darkMode: 'Koyu Mod',
    lightMode: 'Açık Mod',
  },
  en: {
    // Auth
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    logout: 'Logout',
    
    // Navigation
    products: 'Products',
    languages: 'Languages',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Products Dashboard
    productsDashboard: 'Products Dashboard',
    allProducts: 'All Products',
    search: 'Search...',
    optimize: 'Optimize',
    rewrite: 'Rewrite',
    pushToShopify: 'Push to Shopify',
    exportCSV: 'Export CSV',
    price: 'Price',
    stock: 'Stock',
    seoScore: 'SEO Score',
    lastUpdated: 'Last Updated',
    category: 'Category',
    status: 'Status',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    lowStock: 'Low Stock',
    
    // Product Detail
    productDetails: 'Product Details',
    currentDescription: 'Current Description',
    aiSuggestion: 'AI Suggestion',
    regenerate: 'Regenerate',
    save: 'Save',
    approve: 'Approve',
    aiLog: 'AI Log',
    prompt: 'Prompt',
    model: 'Model',
    tokens: 'Token Usage',
    date: 'Date',
    
    // Language Settings
    languageSettings: 'Language Settings',
    targetLanguages: 'Target Languages',
    keywords: 'Keywords',
    autoTranslate: 'Auto Translate',
    manualEdit: 'Manual Edit',
    
    // Analytics
    analyticsLogs: 'Analytics & Logs',
    optimizedProducts: 'Optimized Products',
    avgSeoScore: 'Avg SEO Score',
    avgWords: 'Avg Words',
    dailyProduction: 'Daily Production',
    modelUsage: 'Model Usage',
    recentLogs: 'Recent Logs',
    
    // Settings
    apiKeys: 'API Keys',
    shopifyApiKey: 'Shopify API Key',
    openaiApiKey: 'OpenAI API Key',
    notifications: 'Notifications',
    slackWebhook: 'Slack Webhook',
    emailNotifications: 'Email Notifications',
    thresholds: 'Thresholds',
    minStock: 'Min Stock',
    minSeoScore: 'Min SEO Score',
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'tr';
  });

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.tr] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
