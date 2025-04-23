
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import MeetingInfo from '@/components/biblestudy/MeetingInfo';
import { useLanguage } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    bibleStudyMeetings: "Bible Study Meetings",
    upcomingMeetings: "Upcoming Meetings",
    pastMeetings: "Past Meetings",
    viewAll: "View All"
  },
  te: {
    bibleStudyMeetings: "బైబిల్ స్టడీ మీటింగ్స్",
    upcomingMeetings: "రాబోయే మీటింగులు",
    pastMeetings: "గత మీటింగులు",
    viewAll: "అన్నింటినీ చూడండి"
  },
  hi: {
    bibleStudyMeetings: "बाइबिल अध्ययन बैठकें",
    upcomingMeetings: "आगामी बैठकें",
    pastMeetings: "पिछली बैठकें",
    viewAll: "सभी देखें"
  }
};

// Mock meeting data - in a real app, this would come from an API
const todaysMeeting = {
  title: {
    en: "Book of John Study",
    te: "జాన్ పుస్తకం అధ్యయనం",
    hi: "जॉन की पुस्तक का अध्ययन"
  },
  date: "April 23, 2023",
  time: "7:00 PM - 8:30 PM",
  zoomLink: "https://zoom.us/j/123456789",
  locationName: {
    en: "Community Church, Main Hall",
    te: "కమ్యూనిటీ చర్చి, మెయిన్ హాల్",
    hi: "कम्युनिटी चर्च, मुख्य हॉल"
  },
  locationUrl: "https://goo.gl/maps/123",
  latitude: 17.385,
  longitude: 78.4867
};

const upcomingMeetings = [
  {
    id: "1",
    title: {
      en: "Psalms Bible Study",
      te: "కీర్తనలు బైబిల్ స్టడీ",
      hi: "भजन बाइबिल अध्ययन"
    },
    date: "April 24, 2023",
    time: "7:00 PM - 8:30 PM"
  },
  {
    id: "2",
    title: {
      en: "Book of Romans",
      te: "రోమన్లు పుస్తకం",
      hi: "रोमन्स की पुस्तक"
    },
    date: "April 25, 2023",
    time: "7:00 PM - 8:30 PM"
  }
];

const BibleStudy = () => {
  const { language } = useLanguage();
  
  const t = translations[language] || translations.en;

  return (
    <AppLayout language={language}>
      <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.bibleStudyMeetings}</h1>
      
      {/* Today's meeting */}
      <MeetingInfo meeting={todaysMeeting} />
      
      {/* Upcoming meetings */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-lb-blue">{t.upcomingMeetings}</h2>
          <button className="text-sm text-lb-blue hover:text-lb-blue-dark hover:underline">
            {t.viewAll}
          </button>
        </div>
        
        <div className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <div key={meeting.id} className="content-card">
              <h3 className="font-medium">{meeting.title[language]}</h3>
              <div className="flex justify-between text-sm mt-1">
                <span>{meeting.date}</span>
                <span className="text-lb-neutral">{meeting.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Google Maps embed */}
      <div className="mt-6">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="Google Maps"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAPlexpfq4z5gIesvo-U_-0AZVhmBlIxfE&q=${todaysMeeting.latitude},${todaysMeeting.longitude}&zoom=15`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </AppLayout>
  );
};

export default BibleStudy;
