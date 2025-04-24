
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export type HomeContent = {
  welcome: {
    en: string;
    te: string;
    hi: string;
  };
  watchLive: {
    en: string;
    te: string;
    hi: string;
  };
  liveBroadcast: {
    en: string;
    te: string;
    hi: string;
  };
  isLive: boolean;
  youtubeChannelId: string;
  upcomingEvent: {
    title: {
      en: string;
      te: string;
      hi: string;
    };
    date: string;
    time: string;
    description: {
      en: string;
      te: string;
      hi: string;
    };
  };
};

export const useHomeContent = () => {
  const queryClient = useQueryClient();

  const { data: homeContent, isLoading } = useQuery({
    queryKey: ['homeContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('home_content')
        .select('content')
        .single();

      if (error) {
        console.error('Error fetching home content:', error);
        throw error;
      }

      return data.content as HomeContent;
    }
  });

  const { mutate: updateHomeContent } = useMutation({
    mutationFn: async (content: HomeContent) => {
      const { error } = await supabase
        .from('home_content')
        .update({ content, updated_at: new Date().toISOString() })
        .not('id', 'is', null);

      if (error) {
        console.error('Error updating home content:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeContent'] });
    }
  });

  return {
    homeContent,
    isLoading,
    updateHomeContent
  };
};
