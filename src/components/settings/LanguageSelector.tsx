
import React from 'react';
import { useLanguage, LanguageCode } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    selectLanguage: "Select Language",
    english: "English",
    telugu: "Telugu",
    hindi: "Hindi",
    languagePreference: "Language Preference"
  },
  te: {
    selectLanguage: "భాషను ఎంచుకోండి",
    english: "ఇంగ్లీష్",
    telugu: "తెలుగు",
    hindi: "హిందీ",
    languagePreference: "భాషా ప్రాధాన్యత"
  },
  hi: {
    selectLanguage: "भाषा चुनें",
    english: "अंग्रेज़ी",
    telugu: "तेलुगु",
    hindi: "हिंदी",
    languagePreference: "भाषा प्राथमिकता"
  }
};

const languages = [
  { code: 'te', name: { en: 'Telugu', te: 'తెలుగు', hi: 'तेलुगु' }, flag: '🇮🇳' },
  { code: 'hi', name: { en: 'Hindi', te: 'హిందీ', hi: 'हिंदी' }, flag: '🇮🇳' },
  { code: 'en', name: { en: 'English', te: 'ఇంగ్లీష్', hi: 'अंग्रेज़ी' }, flag: '🇬🇧' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  const t = translations[language] || translations.en;
  
  return (
    <div className="content-card">
      <h3 className="section-title">{t.languagePreference}</h3>
      
      <div className="space-y-2">
        {languages.map((lang) => (
          <div 
            key={lang.code}
            onClick={() => setLanguage(lang.code as LanguageCode)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              language === lang.code 
                ? 'bg-lb-blue-light border-2 border-lb-blue' 
                : 'bg-lb-offwhite hover:bg-lb-blue-light/50'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 text-lg">
              {lang.flag}
            </div>
            <div className="flex-1">
              <div className="font-medium">
                {lang.name[language]}
              </div>
              {language !== lang.code && (
                <div className="text-xs text-lb-neutral">
                  {lang.name[lang.code as LanguageCode]}
                </div>
              )}
            </div>
            {language === lang.code && (
              <div className="w-6 h-6 rounded-full bg-lb-blue flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
