
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import LiveStreamEmbed from '@/components/youtube/LiveStreamEmbed';
import { useLanguage } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    welcomeToLB: "Welcome to Luke Barnabas Ministry",
    watchLive: "Watch Live Sermons",
    shareStream: "Share Stream",
    liveBroadcast: "Live Broadcast",
    upcomingEvent: "Upcoming Event",
    today: "Today",
    tomorrow: "Tomorrow",
    linkCopied: "Link copied!",
    shareLink: "Share Link",
  },
  te: {
    welcomeToLB: "లూక్ బర్నబాస్ మినిస్ట్రీకి స్వాగతం",
    watchLive: "ప్రత్యక్ష ప్రసంగాలను చూడండి",
    shareStream: "స్ట్రీమ్‌ను షేర్ చేయండి",
    liveBroadcast: "ప్రత్యక్ష ప్రసారం",
    upcomingEvent: "రాబోయే ఈవెంట్",
    today: "ఈ రోజు",
    tomorrow: "రేపు",
    linkCopied: "లింక్ కాపీ చేయబడింది!",
    shareLink: "లింక్ షేర్ చేయండి",
  },
  hi: {
    welcomeToLB: "ल्यूक बारनबास मिनिस्ट्री में आपका स्वागत है",
    watchLive: "लाइव उपदेश देखें",
    shareStream: "स्ट्रीम शेयर करें",
    liveBroadcast: "लाइव प्रसारण",
    upcomingEvent: "आगामी कार्यक्रम",
    today: "आज",
    tomorrow: "कल",
    linkCopied: "लिंक कॉपी किया गया!",
    shareLink: "लिंक शेयर करें",
  }
};

const Home = () => {
  const { language } = useLanguage();
  const [isLive, setIsLive] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const t = translations[language] || translations.en;
  
  // Example upcoming event - in a real app, this would come from an API
  const upcomingEvent = {
    title: {
      en: "Evening Prayer Meeting",
      te: "సాయంత్రం ప్రార్థన సమావేశం",
      hi: "शाम की प्रार्थना सभा"
    },
    date: "2023-04-23", // Today's date for example
    time: "7:00 PM",
    description: {
      en: "Join us for our daily prayer meeting and Bible study session.",
      te: "మా రోజువారీ ప్రార్థన సమావేశం మరియు బైబిల్ స్టడీ సెషన్‌లో చేరండి.",
      hi: "हमारी दैनिक प्रार्थना सभा और बाइबिल अध्ययन सत्र में शामिल हों।"
    }
  };
  
  const handleLiveStatusChange = (status: boolean) => {
    setIsLive(status);
  };
  
  const handleShareStream = () => {
    // In a real app, this would be the actual stream URL
    const streamUrl = "https://www.youtube.com/channel/UCX-KrCKFRj5FSP-hq9RQXHA";
    
    navigator.clipboard.writeText(streamUrl)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <AppLayout language={language} isLive={isLive}>
      <div className="mb-6 fade-in">
        <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.welcomeToLB}</h1>
        
        <div className="space-y-6">
          {/* Livestream section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-lb-blue">
                {isLive ? t.liveBroadcast : t.watchLive}
              </h2>
              <button 
                onClick={handleShareStream}
                className="text-sm flex items-center text-lb-blue hover:text-lb-blue-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                {linkCopied ? t.linkCopied : t.shareLink}
              </button>
            </div>
            
            <LiveStreamEmbed
              isLive={false} // In a real app, this would be dynamically determined
              onLiveStatusChange={handleLiveStatusChange}
            />
          </div>
          
          {/* Upcoming event section */}
          <div className="content-card">
            <h2 className="text-lg font-medium text-lb-blue mb-2">{t.upcomingEvent}</h2>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-lb-blue-light rounded-lg flex flex-col items-center justify-center mr-3 text-lb-blue-dark">
                <span className="text-xs font-medium">{t.today}</span>
                <span className="text-lg font-bold">23</span>
              </div>
              
              <div>
                <h3 className="font-medium">{upcomingEvent.title[language]}</h3>
                <p className="text-sm text-lb-neutral">{upcomingEvent.time}</p>
                <p className="text-sm mt-1">{upcomingEvent.description[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
