
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Sermon } from '@/pages/Sermons';

interface SermonCardProps {
  sermon: Sermon;
}

const SermonCard = ({ sermon }: SermonCardProps) => {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  // Function to extract video ID from various YouTube URL formats
  const extractVideoId = (videoUrl: string) => {
    // Direct video ID
    if (videoUrl.length === 11) return videoUrl;
    
    // YouTube URL formats
    const urlPatterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([\w-]{11})/,
      /(?:https?:\/\/)?youtu\.be\/([\w-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([\w-]{11})/
    ];

    for (const pattern of urlPatterns) {
      const match = videoUrl.match(pattern);
      if (match && match[1]) return match[1];
    }

    return videoUrl;
  };

  const videoId = extractVideoId(sermon.videoId);
  const thumbnailUrl = sermon.thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="content-card slide-up">
      <div className="flex mb-2">
        <div className="relative w-32 h-18 mr-3 rounded-md overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={sermon.title[language]} 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-20 transition-opacity"
            onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Play className="w-4 h-4 text-lb-blue-dark ml-0.5" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lb-blue-dark dark:text-white sermon-title">{sermon.title[language]}</h3>
          <p className="text-xs text-lb-neutral dark:text-gray-300">{sermon.date}</p>
          <div className="flex mt-1">
            {Object.keys(sermon.summary).map((lang) => (
              <span 
                key={lang} 
                className={`language-badge ${lang === language ? 'language-active' : ''}`}
              >
                {lang.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`mt-2 text-sm dark:text-gray-200 sermon-summary ${expanded ? '' : 'line-clamp-3'}`}>
        {sermon.summary[language]}
      </div>
      
      <button 
        className="text-xs text-lb-blue mt-1 font-medium hover:underline focus:outline-none dark:text-lb-blue-light dark:hover:text-white"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 
          (language === 'en' ? 'Read less' : language === 'te' ? 'తక్కువ చదవండి' : 'कम पढ़ें') : 
          (language === 'en' ? 'Read more' : language === 'te' ? 'మరింత చదవండి' : 'अधिक पढ़ें')}
      </button>
    </div>
  );
};

export default SermonCard;
