import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import LiveStreamEmbed from '@/components/youtube/LiveStreamEmbed';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHomeContent } from '@/hooks/useHomeContent';

const Home = () => {
  const { language } = useLanguage();
  const [linkCopied, setLinkCopied] = useState(false);
  const { homeContent, isLoading } = useHomeContent();
  
  const handleLiveStatusChange = (status: boolean) => {
    console.log('Live status changed:', status);
  };
  
  const handleShareStream = () => {
    const streamUrl = `https://www.youtube.com/channel/${homeContent?.youtubeChannelId || ''}`;
    
    navigator.clipboard.writeText(streamUrl)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  if (isLoading || !homeContent) {
    return <div>Loading...</div>;
  }
  
  const t = {
    welcomeToLB: homeContent.welcome[language],
    watchLive: homeContent.watchLive[language],
    liveBroadcast: homeContent.liveBroadcast[language],
    upcomingEvent: "Upcoming Event",
    today: "Today",
    tomorrow: "Tomorrow",
    linkCopied: "Link copied!",
    shareLink: "Share Link",
  };
  
  return (
    <AppLayout language={language} isLive={homeContent.isLive}>
      <div className="mb-6 fade-in">
        <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.welcomeToLB}</h1>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-lb-blue">
                {homeContent.isLive ? t.liveBroadcast : t.watchLive}
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
              isLive={homeContent.isLive}
              onLiveStatusChange={handleLiveStatusChange}
            />
          </div>
          
          <div className="content-card">
            <h2 className="text-lg font-medium text-lb-blue mb-2">{t.upcomingEvent}</h2>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-lb-blue-light rounded-lg flex flex-col items-center justify-center mr-3 text-lb-blue-dark">
                <span className="text-xs font-medium">{t.today}</span>
                <span className="text-lg font-bold">23</span>
              </div>
              
              <div>
                <h3 className="font-medium">{homeContent.upcomingEvent.title[language]}</h3>
                <p className="text-sm text-lb-neutral">{homeContent.upcomingEvent.time}</p>
                <p className="text-sm mt-1">{homeContent.upcomingEvent.description[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
