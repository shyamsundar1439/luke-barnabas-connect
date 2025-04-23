
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import LanguageSelector from '@/components/settings/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import NotificationSection from '@/components/settings/NotificationSection';
import AboutSection from '@/components/settings/AboutSection';
import { translations } from '@/components/settings/translations';

const Settings = () => {
  const { language } = useLanguage();
  const [notificationSettings, setNotificationSettings] = React.useState({
    liveStream: true,
    sermons: true,
    bibleStudy: true
  });
  
  const t = translations[language] || translations.en;
  
  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Luke Barnabas App',
        text: 'Check out the Luke Barnabas ministry app!',
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert(language === 'en' ? 'Link copied to clipboard!' : 
             language === 'te' ? 'లింక్ క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!' : 
             'लिंक क्लिपबोर्ड पर कॉपी किया गया!');
    }
  };

  return (
    <AppLayout language={language}>
      <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.settings}</h1>
      
      <LanguageSelector />
      
      <NotificationSection 
        notificationSettings={notificationSettings}
        toggleNotification={toggleNotification}
      />
      
      <AboutSection handleShareApp={handleShareApp} />
    </AppLayout>
  );
};

export default Settings;
