
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import LanguageSelector from '@/components/settings/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, Share } from 'lucide-react';

// Language translations
const translations = {
  en: {
    settings: "Settings",
    notifications: "Notifications",
    liveStream: "Live Stream Alerts",
    sermonUpdates: "New Sermon Updates",
    bibleStudy: "Bible Study Reminders",
    about: "About",
    version: "App Version",
    shareApp: "Share App",
    feedback: "Send Feedback"
  },
  te: {
    settings: "సెట్టింగ్స్",
    notifications: "నోటిఫికేషన్లు",
    liveStream: "లైవ్ స్ట్రీమ్ అలర్ట్లు",
    sermonUpdates: "కొత్త ప్రసంగం అప్‌డేట్‌లు",
    bibleStudy: "బైబిల్ స్టడీ రిమైండర్‌లు",
    about: "గురించి",
    version: "యాప్ వెర్షన్",
    shareApp: "యాప్‌ను షేర్ చేయండి",
    feedback: "అభిప్రాయాన్ని పంపండి"
  },
  hi: {
    settings: "सेटिंग्स",
    notifications: "नोटिफिकेशन्स",
    liveStream: "लाइव स्ट्रीम अलर्ट",
    sermonUpdates: "नए उपदेश अपडेट",
    bibleStudy: "बाइबिल अध्ययन रिमाइंडर",
    about: "ऐप के बारे में",
    version: "ऐप वर्शन",
    shareApp: "ऐप शेयर करें",
    feedback: "प्रतिक्रिया भेजें"
  }
};

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
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin);
      alert(language === 'en' ? 'Link copied to clipboard!' : 
             language === 'te' ? 'లింక్ క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!' : 
             'लिंक क्लिपबोर्ड पर कॉपी किया गया!');
    }
  };

  return (
    <AppLayout language={language}>
      <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.settings}</h1>
      
      {/* Language selector */}
      <LanguageSelector />
      
      {/* Notification settings */}
      <div className="content-card mt-6">
        <h2 className="section-title">{t.notifications}</h2>
        
        <div className="space-y-4">
          {/* Live Stream Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-lb-blue-light flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 text-lb-blue-dark" />
              </div>
              <span>{t.liveStream}</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={notificationSettings.liveStream}
                onChange={() => toggleNotification('liveStream')}
                className="sr-only" 
                id="livestream-toggle"
              />
              <label 
                htmlFor="livestream-toggle"
                className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                  notificationSettings.liveStream ? 'bg-lb-blue' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`block w-4 h-4 mt-1 ml-1 rounded-full transition-transform duration-300 ease-in-out bg-white transform ${
                    notificationSettings.liveStream ? 'translate-x-6' : ''
                  }`} 
                />
              </label>
            </div>
          </div>
          
          {/* Sermon Update Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-lb-blue-light flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 text-lb-blue-dark" />
              </div>
              <span>{t.sermonUpdates}</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={notificationSettings.sermons}
                onChange={() => toggleNotification('sermons')}
                className="sr-only" 
                id="sermons-toggle"
              />
              <label 
                htmlFor="sermons-toggle"
                className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                  notificationSettings.sermons ? 'bg-lb-blue' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`block w-4 h-4 mt-1 ml-1 rounded-full transition-transform duration-300 ease-in-out bg-white transform ${
                    notificationSettings.sermons ? 'translate-x-6' : ''
                  }`} 
                />
              </label>
            </div>
          </div>
          
          {/* Bible Study Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-lb-blue-light flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 text-lb-blue-dark" />
              </div>
              <span>{t.bibleStudy}</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={notificationSettings.bibleStudy}
                onChange={() => toggleNotification('bibleStudy')}
                className="sr-only" 
                id="biblestudy-toggle"
              />
              <label 
                htmlFor="biblestudy-toggle"
                className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                  notificationSettings.bibleStudy ? 'bg-lb-blue' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`block w-4 h-4 mt-1 ml-1 rounded-full transition-transform duration-300 ease-in-out bg-white transform ${
                    notificationSettings.bibleStudy ? 'translate-x-6' : ''
                  }`} 
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* About section */}
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
    </AppLayout>
  );
};

export default Settings;
