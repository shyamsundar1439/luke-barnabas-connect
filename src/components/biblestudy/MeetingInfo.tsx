
import React from 'react';
import { Calendar, Clock, MapPin, Share } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    joinZoom: "Join Zoom Meeting",
    viewLocation: "View Location",
    copyLink: "Copy Link",
    linkCopied: "Link copied!",
    todayMeeting: "Today's Meeting",
    starting: "Starting",
    location: "Location"
  },
  te: {
    joinZoom: "జూమ్ మీటింగ్‌లో చేరండి",
    viewLocation: "స్థానాన్ని వీక్షించండి",
    copyLink: "లింక్ కాపీ చేయండి",
    linkCopied: "లింక్ కాపీ చేయబడింది!",
    todayMeeting: "నేటి మీటింగ్",
    starting: "ప్రారంభం",
    location: "స్థానం"
  },
  hi: {
    joinZoom: "ज़ूम मीटिंग में शामिल हों",
    viewLocation: "स्थान देखें",
    copyLink: "लिंक कॉपी करें",
    linkCopied: "लिंक कॉपी किया गया!",
    todayMeeting: "आज की मीटिंग",
    starting: "शुरू होने का समय",
    location: "स्थान"
  }
};

interface MeetingData {
  title: {
    en: string;
    te: string;
    hi: string;
  };
  date: string;
  time: string;
  zoomLink: string;
  locationName: {
    en: string;
    te: string;
    hi: string;
  };
  locationUrl: string;
  latitude: number;
  longitude: number;
}

interface MeetingInfoProps {
  meeting: MeetingData;
}

const MeetingInfo = ({ meeting }: MeetingInfoProps) => {
  const { language } = useLanguage();
  const [linkCopied, setLinkCopied] = React.useState(false);
  
  const t = translations[language] || translations.en;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(meeting.zoomLink)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <div className="content-card">
      <h3 className="section-title">{t.todayMeeting}</h3>
      
      <h4 className="text-lg font-medium mb-3 text-lb-blue-dark">
        {meeting.title[language]}
      </h4>
      
      <div className="flex items-center mb-3">
        <Calendar className="w-5 h-5 mr-2 text-lb-gold" />
        <span>{meeting.date}</span>
      </div>
      
      <div className="flex items-center mb-3">
        <Clock className="w-5 h-5 mr-2 text-lb-gold" />
        <span>
          <strong>{t.starting}:</strong> {meeting.time}
        </span>
      </div>
      
      <div className="flex items-start mb-4">
        <MapPin className="w-5 h-5 mr-2 text-lb-gold flex-shrink-0 mt-1" />
        <div>
          <strong>{t.location}:</strong> 
          <p>{meeting.locationName[language]}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <a 
          href={meeting.zoomLink}
          target="_blank"
          rel="noopener noreferrer" 
          className="btn-primary flex items-center justify-center"
        >
          <img 
            src="https://cdn.cdnlogo.com/logos/z/60/zoom.svg" 
            alt="Zoom" 
            className="w-4 h-4 mr-2"
          />
          {t.joinZoom}
        </a>
        
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${meeting.latitude},${meeting.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center"
        >
          <MapPin className="w-4 h-4 mr-2" />
          {t.viewLocation}
        </a>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleCopyLink}
          className="text-sm flex items-center text-lb-blue hover:text-lb-blue-dark"
        >
          <Share className="w-4 h-4 mr-1" />
          {linkCopied ? t.linkCopied : t.copyLink}
        </button>
      </div>
    </div>
  );
};

export default MeetingInfo;
