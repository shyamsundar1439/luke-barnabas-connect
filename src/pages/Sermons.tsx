
import React, { useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SermonCard from '@/components/sermons/SermonCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Define Sermon interface
export interface Sermon {
  id: string;
  title: {
    en: string;
    te: string;
    hi: string;
  };
  summary: {
    en: string;
    te: string;
    hi: string;
  };
  videoId?: string;  // camelCase for TypeScript
  videoid?: string;  // lowercase from database
  thumbnailUrl?: string;  // camelCase for TypeScript
  thumbnailurl?: string;  // lowercase from database
  date: string;
}

// Language translations
const translations = {
  en: {
    recentSermons: "Recent Sermons",
    searchSermons: "Search sermons",
    filterBy: "Filter by",
    noResults: "No sermons found",
    loading: "Loading sermons...",
    error: "Error loading sermons"
  },
  te: {
    recentSermons: "ఇటీవలి ప్రసంగాలు",
    searchSermons: "ప్రసంగాలను శోధించండి",
    filterBy: "ఫిల్టర్ చేయండి",
    noResults: "ప్రసంగాలు కనుగొనబడలేదు",
    loading: "ప్రసంగాలు లోడ్ అవుతున్నాయి...",
    error: "ప్రసంగాలను లోడ్ చేయడంలో లోపం"
  },
  hi: {
    recentSermons: "हालिया उपदेश",
    searchSermons: "उपदेश खोजें",
    filterBy: "फ़िल्टर करें",
    noResults: "कोई उपदेश नहीं मिला",
    loading: "उपदेश लोड हो रहे हैं...",
    error: "उपदेश लोड करने में त्रुटि"
  }
};

const fetchSermons = async (): Promise<Sermon[]> => {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false });
    
  if (error) {
    throw error;
  }
  
  return data || [];
};

const Sermons = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { toast } = useToast();
  
  const t = translations[language] || translations.en;
  
  const { data: sermons, isLoading, error } = useQuery({
    queryKey: ['sermons'],
    queryFn: fetchSermons,
    meta: {
      errorMessage: t.error
    }
  });
  
  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      console.error('Error fetching sermons:', error);
      toast({
        title: t.error,
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, t.error, toast]);
  
  // Filter sermons based on search query
  const filteredSermons = React.useMemo(() => {
    if (!sermons) return [];
    
    if (!searchQuery) return sermons;
    
    return sermons.filter(sermon => {
      const searchIn = sermon.title[language]?.toLowerCase() || '';
      return searchIn.includes(searchQuery.toLowerCase());
    });
  }, [sermons, searchQuery, language]);

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
        {isLoading ? (
          <div className="text-center py-8 text-lb-neutral">
            {t.loading}
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            {t.error}
          </div>
        ) : filteredSermons.length === 0 ? (
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
