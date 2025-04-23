
import React from 'react';
import { Share } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from './translations';

interface AboutSectionProps {
  handleShareApp: () => void;
}

const AboutSection = ({ handleShareApp }: AboutSectionProps) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  return (
    <div className="content-card mt-6">
      <h2 className="section-title">{t.about}</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>{t.version}</span>
          <span className="text-lb-neutral">1.0.0</span>
        </div>
        
        <button 
          onClick={handleShareApp}
          className="flex items-center text-lb-blue hover:text-lb-blue-dark"
        >
          <Share className="w-4 h-4 mr-2" />
          {t.shareApp}
        </button>
        
        <a 
          href="mailto:support@lukebarnabas.com" 
          className="block text-lb-blue hover:text-lb-blue-dark"
        >
          {t.feedback}
        </a>
      </div>
    </div>
  );
};

export default AboutSection;
