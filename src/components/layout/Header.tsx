
import React from 'react';

// Language translations
const translations = {
  en: {
    appName: "Luke Barnabas",
    liveNow: "LIVE NOW",
  },
  te: {
    appName: "లూక్ బర్నబాస్",
    liveNow: "ప్రత్యక్ష ప్రసారం",
  },
  hi: {
    appName: "ल्यूक बारनबास",
    liveNow: "अभी लाइव",
  }
};

type LanguageCode = "en" | "te" | "hi";

interface HeaderProps {
  language: LanguageCode;
  isLive?: boolean;
}

const Header = ({ language = "te", isLive = false }: HeaderProps) => {
  const t = translations[language] || translations.en;

  return (
    <div className="bg-lb-blue-light py-3 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* App logo */}
          <div className="w-10 h-10 rounded-full bg-lb-gold flex items-center justify-center mr-2 text-white font-bold">
            LB
          </div>
          <h1 className="text-lg font-semibold text-lb-blue-dark">{t.appName}</h1>
        </div>
        
        {/* Live indicator */}
        {isLive && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
            <span className="text-xs font-medium text-red-500">{t.liveNow}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
