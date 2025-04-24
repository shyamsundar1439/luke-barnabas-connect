
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    liveEnded: "The livestream has ended",
    notLive: "No live broadcast at the moment",
    watchRecent: "Watch the most recent sermon",
    join: "Join the live broadcast"
  },
  te: {
    liveEnded: "ప్రత్యక్ష ప్రసారం ముగిసింది",
    notLive: "ప్రస్తుతం ప్రత్యక్ష ప్రసారం లేదు",
    watchRecent: "ఇటీవలి ప్రసంగాన్ని చూడండి",
    join: "ప్రత్యక్ష ప్రసారంలో చేరండి"
  },
  hi: {
    liveEnded: "लाइवस्ट्रीम समाप्त हो गई है",
    notLive: "अभी कोई लाइव प्रसारण नहीं है",
    watchRecent: "हाल ही का उपदेश देखें",
    join: "लाइव प्रसारण में शामिल हों"
  }
};

interface LiveStreamEmbedProps {
  channelId?: string;
  videoId?: string;
  isLive?: boolean;
  onLiveStatusChange?: (isLive: boolean) => void;
}

const LiveStreamEmbed = ({ 
  channelId = "UCX-KrCKFRj5FSP-hq9RQXHA", // Example channel ID, replace with actual
  videoId = "xETQPPeRcos", // Updated livestream link
  isLive = false,
  onLiveStatusChange
}: LiveStreamEmbedProps) => {
  const { language } = useLanguage();
  const [fallbackVideoId, setFallbackVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const t = translations[language] || translations.en;
  
  // In a real implementation, this would check the YouTube API
  // to get the current live stream status and ID
  useEffect(() => {
    // Mock API call to check if channel is live
    const checkIfChannelIsLive = async () => {
      try {
        setLoading(true);
        // Simulate API response delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock response - in a real app, this would use the YouTube API
        const mockIsLive = isLive;
        const mockLiveVideoId = mockIsLive ? "dQw4w9WgXcQ" : null; // Example video ID
        const mockLatestVideoId = "ZZ5LpwO-An4"; // Example fallback video ID
        
        if (mockIsLive) {
          if (onLiveStatusChange) onLiveStatusChange(true);
        } else {
          setFallbackVideoId(mockLatestVideoId);
          if (onLiveStatusChange) onLiveStatusChange(false);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to check live status:", error);
        setLoading(false);
        if (onLiveStatusChange) onLiveStatusChange(false);
      }
    };
    
    checkIfChannelIsLive();
    
    // In a real app, you would set up an interval to periodically check
    const interval = setInterval(checkIfChannelIsLive, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [channelId, isLive, onLiveStatusChange]);
  
  // Determine which video ID to use
  const currentVideoId = videoId || (isLive ? "live_stream" : fallbackVideoId);
  
  if (loading) {
    return (
      <div className="aspect-video bg-lb-offwhite rounded-lg flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-lb-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!currentVideoId && !isLive) {
    return (
      <div className="aspect-video bg-lb-offwhite rounded-lg flex flex-col items-center justify-center p-4">
        <p className="text-lb-neutral text-center mb-4">{t.notLive}</p>
        {fallbackVideoId && (
          <button className="btn-primary">
            {t.watchRecent}
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      {isLive && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
          LIVE
        </div>
      )}
    </div>
  );
};

export default LiveStreamEmbed;

