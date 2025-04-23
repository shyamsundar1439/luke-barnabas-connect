
import React from 'react';
import { Bell } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from './translations';

type NotificationSetting = 'liveStream' | 'sermons' | 'bibleStudy';

interface NotificationSectionProps {
  notificationSettings: {
    liveStream: boolean;
    sermons: boolean;
    bibleStudy: boolean;
  };
  toggleNotification: (key: NotificationSetting) => void;
}

const NotificationSection = ({ notificationSettings, toggleNotification }: NotificationSectionProps) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const notificationItems = [
    { key: 'liveStream' as const, label: t.liveStream },
    { key: 'sermons' as const, label: t.sermonUpdates },
    { key: 'bibleStudy' as const, label: t.bibleStudy }
  ];

  return (
    <div className="content-card mt-6">
      <h2 className="section-title">{t.notifications}</h2>
      
      <div className="space-y-4">
        {notificationItems.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-lb-blue-light flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 text-lb-blue-dark" />
              </div>
              <span>{label}</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={notificationSettings[key]}
                onChange={() => toggleNotification(key)}
                className="sr-only" 
                id={`${key}-toggle`}
              />
              <label 
                htmlFor={`${key}-toggle`}
                className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                  notificationSettings[key] ? 'bg-lb-blue' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`block w-4 h-4 mt-1 ml-1 rounded-full transition-transform duration-300 ease-in-out bg-white transform ${
                    notificationSettings[key] ? 'translate-x-6' : ''
                  }`} 
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSection;
