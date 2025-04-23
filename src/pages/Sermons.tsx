
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SermonCard from '@/components/sermons/SermonCard';
import { useLanguage } from '@/contexts/LanguageContext';

// Language translations
const translations = {
  en: {
    recentSermons: "Recent Sermons",
    searchSermons: "Search sermons",
    filterBy: "Filter by",
    noResults: "No sermons found"
  },
  te: {
    recentSermons: "ఇటీవలి ప్రసంగాలు",
    searchSermons: "ప్రసంగాలను శోధించండి",
    filterBy: "ఫిల్టర్ చేయండి",
    noResults: "ప్రసంగాలు కనుగొనబడలేదు"
  },
  hi: {
    recentSermons: "हालिया उपदेश",
    searchSermons: "उपदेश खोजें",
    filterBy: "फ़िल्टर करें",
    noResults: "कोई उपदेश नहीं मिला"
  }
};

// Mock sermon data - in a real app, this would come from an API
const mockSermons = [
  {
    id: "1",
    title: {
      en: "The Power of Faith in Difficult Times",
      te: "కష్ట సమయాల్లో విశ్వాసం యొక్క శక్తి",
      hi: "कठिन समय में विश्वास की शक्ति"
    },
    summary: {
      en: "In this sermon, we explore how faith can sustain us through life's most challenging moments. Drawing from scripture and real-life examples, we learn how to hold onto our trust in God when everything seems uncertain.",
      te: "ఈ ప్రసంగంలో, జీవితంలోని అత్యంత సవాలుతో కూడిన క్షణాల ద్వారా విశ్వాసం మనలను ఎలా నిలుపుతుందో మేము అన్వేషిస్తాము. లేఖనం మరియు నిజ జీవిత ఉదాహరణల నుండి తీసుకుంటూ, అన్నీ అనిశ్చితంగా అనిపించినప్పుడు దేవుని పట్ల మన విశ్వాసాన్ని ఎలా కొనసాగించాలో నేర్చుకుంటాము.",
      hi: "इस उपदेश में, हम यह खोजते हैं कि कैसे विश्वास हमें जीवन के सबसे चुनौतीपूर्ण क्षणों से बचा सकता है। धर्मग्रंथ और वास्तविक जीवन के उदाहरणों से सीखते हुए, हम सीखते हैं कि जब सब कुछ अनिश्चित लगता है तो भगवान पर अपना विश्वास कैसे बनाए रखें।"
    },
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://source.unsplash.com/photo-1470813740244-df37b8c1edcb",
    date: "April 17, 2023"
  },
  {
    id: "2",
    title: {
      en: "Finding Peace in God's Presence",
      te: "దేవుని సాన్నిధ్యంలో శాంతిని కనుగొనడం",
      hi: "भगवान की उपस्थिति में शांति पाना"
    },
    summary: {
      en: "This sermon discusses how to find true peace by spending time in God's presence through prayer, meditation on His Word, and worship. We explore practical ways to cultivate a sense of peace even in the midst of life's storms.",
      te: "ఈ ప్రసంగం ప్రార్థన, ఆయన వాక్యంపై ధ్యానం మరియు ఆరాధన ద్వారా దేవుని సాన్నిధ్యంలో సమయాన్ని గడపడం ద్వారా నిజమైన శాంతిని ఎలా కనుగొనాలో చర్చిస్తుంది. జీవితంలోని తుఫానుల మధ్యలో కూడా శాంతి భావనను పెంపొందించడానికి మేము ఆచరణాత్మక మార్గాలను అన్వేషిస్తాము.",
      hi: "यह उपदेश चर्चा करता है कि कैसे प्रार्थना, उसके वचन पर मनन और आराधना के माध्यम से भगवान की उपस्थिति में समय बिताकर सच्ची शांति पाई जा सकती है। हम जीवन के तूफानों के बीच भी शांति की भावना को विकसित करने के व्यावहारिक तरीकों की खोज करते हैं।"
    },
    videoId: "ZZ5LpwO-An4",
    thumbnailUrl: "https://source.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    date: "April 10, 2023"
  },
  {
    id: "3",
    title: {
      en: "The Promises of God",
      te: "దేవుని వాగ్దానాలు",
      hi: "ईश्वर के वादे"
    },
    summary: {
      en: "In this powerful sermon, we examine the enduring promises of God and how they apply to our lives today. Learn how to claim these promises and live with confidence knowing that God is faithful to fulfill His word.",
      te: "ఈ శక్తివంతమైన ప్రసంగంలో, మేము దేవుని శాశ్వతమైన వాగ్దానాలను మరియు అవి నేడు మన జీవితాలకు ఎలా వర్తిస్తాయో పరిశీలిస్తాము. ఈ వాగ్దానాలను ఎలా క్లెయిమ్ చేయాలో మరియు దేవుడు తన వాక్యాన్ని నెరవేర్చడంలో నమ్మకమైన వాడని తెలుసుకుని విశ్వాసంతో ఎలా జీవించాలో నేర్చుకోండి.",
      hi: "इस शक्तिशाली उपदेश में, हम परमेश्वर के अटल वादों और आज हमारे जीवन पर उनके लागू होने की जांच करते हैं। सीखें कि इन वादों का दावा कैसे करें और आत्मविश्वास के साथ कैसे जीएं यह जानते हुए कि परमेश्वर अपने वचन को पूरा करने में विश्वासयोग्य है।"
    },
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://source.unsplash.com/photo-1466442929976-97f336a657be",
    date: "April 3, 2023"
  },
];

const Sermons = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const t = translations[language] || translations.en;
  
  // Filter sermons based on search query
  const filteredSermons = mockSermons.filter(sermon => {
    if (!searchQuery) return true;
    const searchIn = sermon.title[language].toLowerCase();
    return searchIn.includes(searchQuery.toLowerCase());
  });

  return (
    <AppLayout language={language}>
      <h1 className="text-2xl font-semibold text-lb-blue-dark mb-4">{t.recentSermons}</h1>
      
      {/* Search bar */}
      <div className="mb-4">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3 text-lb-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t.searchSermons}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-lb-blue-light focus:outline-none focus:ring-2 focus:ring-lb-blue"
          />
        </div>
      </div>
      
      {/* Sermon list */}
      <div className="space-y-4">
        {filteredSermons.length === 0 ? (
          <div className="text-center py-8 text-lb-neutral">
            {t.noResults}
          </div>
        ) : (
          filteredSermons.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default Sermons;
