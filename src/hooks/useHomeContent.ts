
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/lib/supabase"; // Update to use the correct supabase client

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

  const { data: homeContent, isLoading, refetch } = useQuery({
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
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes (replacing cacheTime which is deprecated)
  });

  const { mutate: updateHomeContent, isPending: isUpdating } = useMutation({
    mutationFn: async (content: HomeContent) => {
      console.log('Updating home content with:', content);
      const { error } = await supabase
        .from('home_content')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', 1); // Make sure we're updating the correct record

      if (error) {
        console.error('Error updating home content:', error);
        throw error;
      }
      
      return content;
    },
    onSuccess: (data) => {
      console.log('Home content updated successfully:', data);
      // Force invalidate the cache to ensure fresh data is loaded
      queryClient.invalidateQueries({ queryKey: ['homeContent'] });
      // Also refetch to immediately update the UI
      refetch();
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  return {
    homeContent,
    isLoading,
    isUpdating,
    updateHomeContent,
    refetchHomeContent: refetch
  };
};
