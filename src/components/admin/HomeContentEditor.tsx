import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import { useHomeContent, type HomeContent } from '@/hooks/useHomeContent';

const HomeContentEditor = () => {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isUpcomingEventOpen, setIsUpcomingEventOpen] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { homeContent, isLoading, updateHomeContent } = useHomeContent();

  useEffect(() => {
    if (homeContent) {
      setContent(homeContent);
    }
  }, [homeContent]);

  const handleChange = (section: string, field: string, value: string | boolean, lang?: string) => {
    if (!content) return;

    if (lang) {
      const sectionValue = content[section as keyof typeof content];
      
      if (typeof sectionValue === 'object' && sectionValue !== null) {
        setContent({
          ...content,
          [section]: {
            ...sectionValue,
            [lang]: value
          }
        });
      }
    } else if (section === 'upcomingEvent' && field !== 'title' && field !== 'description') {
      setContent({
        ...content,
        upcomingEvent: {
          ...content.upcomingEvent,
          [field]: value
        }
      });
    } else if (section === 'upcomingEvent' && (field === 'title' || field === 'description') && lang) {
      const fieldValue = content.upcomingEvent[field as keyof typeof content.upcomingEvent];
      
      if (typeof fieldValue === 'object' && fieldValue !== null) {
        setContent({
          ...content,
          upcomingEvent: {
            ...content.upcomingEvent,
            [field]: {
              ...fieldValue,
              [lang]: value
            }
          }
        });
      }
    } else {
      setContent({
        ...content,
        [field]: value
      });
    }
  };

  const handleSave = async () => {
    if (!content) return;
    
    try {
      await updateHomeContent(content);
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !content) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Home Page Content</h2>
        <Button onClick={handleSave} className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium text-lg">Welcome Section</h3>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Welcome Message</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="w-10 text-center">EN</span>
                <Input 
                  value={content?.welcome?.en} 
                  onChange={(e) => handleChange('welcome', 'welcome', e.target.value, 'en')}
                  placeholder="English welcome message"
                />
              </div>
              <div className="flex items-center">
                <span className="w-10 text-center">TE</span>
                <Input 
                  value={content?.welcome?.te} 
                  onChange={(e) => handleChange('welcome', 'welcome', e.target.value, 'te')}
                  placeholder="Telugu welcome message"
                />
              </div>
              <div className="flex items-center">
                <span className="w-10 text-center">HI</span>
                <Input 
                  value={content?.welcome?.hi} 
                  onChange={(e) => handleChange('welcome', 'welcome', e.target.value, 'hi')}
                  placeholder="Hindi welcome message"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium text-lg">Livestream Section</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Watch Live Text</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-10 text-center">EN</span>
                  <Input 
                    value={content?.watchLive?.en} 
                    onChange={(e) => handleChange('watchLive', 'watchLive', e.target.value, 'en')}
                    placeholder="English text"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">TE</span>
                  <Input 
                    value={content?.watchLive?.te} 
                    onChange={(e) => handleChange('watchLive', 'watchLive', e.target.value, 'te')}
                    placeholder="Telugu text"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">HI</span>
                  <Input 
                    value={content?.watchLive?.hi} 
                    onChange={(e) => handleChange('watchLive', 'watchLive', e.target.value, 'hi')}
                    placeholder="Hindi text"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Live Broadcast Text</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-10 text-center">EN</span>
                  <Input 
                    value={content?.liveBroadcast?.en} 
                    onChange={(e) => handleChange('liveBroadcast', 'liveBroadcast', e.target.value, 'en')}
                    placeholder="English text"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">TE</span>
                  <Input 
                    value={content?.liveBroadcast?.te} 
                    onChange={(e) => handleChange('liveBroadcast', 'liveBroadcast', e.target.value, 'te')}
                    placeholder="Telugu text"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">HI</span>
                  <Input 
                    value={content?.liveBroadcast?.hi} 
                    onChange={(e) => handleChange('liveBroadcast', 'liveBroadcast', e.target.value, 'hi')}
                    placeholder="Hindi text"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isLive"
                checked={content?.isLive}
                onCheckedChange={(checked) => handleChange('', 'isLive', checked)}
              />
              <label htmlFor="isLive" className="text-sm font-medium">
                Is Currently Live?
              </label>
            </div>
            
            <div>
              <label className="text-sm font-medium">YouTube Channel ID</label>
              <Input 
                value={content?.youtubeChannelId} 
                onChange={(e) => handleChange('', 'youtubeChannelId', e.target.value)}
                placeholder="YouTube Channel ID"
              />
            </div>
          </div>
        </div>
        
        <Collapsible
          open={isUpcomingEventOpen}
          onOpenChange={setIsUpcomingEventOpen}
          className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Upcoming Event</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                {isUpcomingEventOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Event Title</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-10 text-center">EN</span>
                  <Input 
                    value={content?.upcomingEvent?.title?.en} 
                    onChange={(e) => handleChange('upcomingEvent', 'title', e.target.value, 'en')}
                    placeholder="English title"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">TE</span>
                  <Input 
                    value={content?.upcomingEvent?.title?.te} 
                    onChange={(e) => handleChange('upcomingEvent', 'title', e.target.value, 'te')}
                    placeholder="Telugu title"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">HI</span>
                  <Input 
                    value={content?.upcomingEvent?.title?.hi} 
                    onChange={(e) => handleChange('upcomingEvent', 'title', e.target.value, 'hi')}
                    placeholder="Hindi title"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input 
                  value={content?.upcomingEvent?.date} 
                  onChange={(e) => handleChange('upcomingEvent', 'date', e.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <Input 
                  value={content?.upcomingEvent?.time} 
                  onChange={(e) => handleChange('upcomingEvent', 'time', e.target.value)}
                  placeholder="e.g. 7:00 PM"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Event Description</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-10 text-center">EN</span>
                  <Textarea 
                    value={content?.upcomingEvent?.description?.en} 
                    onChange={(e) => handleChange('upcomingEvent', 'description', e.target.value, 'en')}
                    placeholder="English description"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">TE</span>
                  <Textarea 
                    value={content?.upcomingEvent?.description?.te} 
                    onChange={(e) => handleChange('upcomingEvent', 'description', e.target.value, 'te')}
                    placeholder="Telugu description"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-10 text-center">HI</span>
                  <Textarea 
                    value={content?.upcomingEvent?.description?.hi} 
                    onChange={(e) => handleChange('upcomingEvent', 'description', e.target.value, 'hi')}
                    placeholder="Hindi description"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default HomeContentEditor;
