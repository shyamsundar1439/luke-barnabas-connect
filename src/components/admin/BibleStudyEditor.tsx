import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, PlusCircle, Edit, Trash, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface BibleStudyMeeting {
  id: string;
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
  latitude: number;
  longitude: number;
}

const BibleStudyEditor = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<BibleStudyMeeting | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  
  const { data: meetings, isLoading } = useQuery({
    queryKey: ['bible-studies'],
    queryFn: async (): Promise<BibleStudyMeeting[]> => {
      const response = await supabase
        .from('bible_studies')
        .select('*')
        .order('date', { ascending: true });
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    }
  });

  const addMeetingMutation = useMutation({
    mutationFn: async (meeting: BibleStudyMeeting): Promise<BibleStudyMeeting[]> => {
      const response = await supabase
        .from('bible_studies')
        .insert(meeting)
        .select();
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bible-studies'] });
      toast({
        title: "Meeting added",
        description: "The Bible study meeting has been added successfully"
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error adding meeting",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const updateMeetingMutation = useMutation({
    mutationFn: async (meeting: BibleStudyMeeting): Promise<BibleStudyMeeting[]> => {
      const response = await supabase
        .from('bible_studies')
        .update(meeting)
        .eq('id', meeting.id)
        .select();
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bible-studies'] });
      toast({
        title: "Meeting updated",
        description: "The Bible study meeting has been updated successfully"
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error updating meeting",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const deleteMeetingMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await supabase
        .from('bible_studies')
        .delete()
        .eq('id', id);
        
      if (response.error) {
        throw response.error;
      }
      
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bible-studies'] });
      toast({
        title: "Meeting deleted",
        description: "The Bible study meeting has been deleted successfully"
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting meeting",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setCurrentMeeting({
      id: Math.random().toString(36).substring(2, 9),
      title: { en: "", te: "", hi: "" },
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: "",
      zoomLink: "https://zoom.us/j/",
      locationName: { en: "", te: "", hi: "" },
      latitude: 17.385,
      longitude: 78.4867
    });
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (meeting: BibleStudyMeeting) => {
    setIsEditMode(true);
    setCurrentMeeting({...meeting});
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this meeting?")) {
      deleteMeetingMutation.mutate(id);
    }
  };

  const handleSave = () => {
    if (!currentMeeting) return;
    
    if (!currentMeeting.title.en || !currentMeeting.date || !currentMeeting.time) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode) {
      updateMeetingMutation.mutate(currentMeeting);
    } else {
      addMeetingMutation.mutate(currentMeeting);
    }
  };

  const handleFormChange = (field: string, value: string | number, lang?: string) => {
    if (!currentMeeting) return;
    
    if (lang) {
      const fieldValue = currentMeeting[field as keyof typeof currentMeeting];
      
      if (typeof fieldValue === 'object' && fieldValue !== null) {
        setCurrentMeeting({
          ...currentMeeting,
          [field]: {
            ...fieldValue,
            [lang]: value
          }
        });
      }
    } else {
      setCurrentMeeting({
        ...currentMeeting,
        [field]: value
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Bible Study Meetings</h2>
        <Button onClick={handleAddNew} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Meeting
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading meetings...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings && meetings.map((meeting: BibleStudyMeeting) => (
            <div 
              key={meeting.id} 
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{meeting.title[language]}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{meeting.date} | {meeting.time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Location: {meeting.locationName[language]}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(meeting)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(meeting.id)}
                  disabled={deleteMeetingMutation.isPending}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {meetings && meetings.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No Bible study meetings found. Add your first meeting using the button above.
            </div>
          )}
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Bible Study Meeting" : "Add New Bible Study Meeting"}
            </DialogTitle>
          </DialogHeader>
          
          {currentMeeting && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Title</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-10 text-center">EN</span>
                    <Input 
                      value={currentMeeting.title.en} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'en')}
                      placeholder="English title"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">TE</span>
                    <Input 
                      value={currentMeeting.title.te} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'te')}
                      placeholder="Telugu title"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">HI</span>
                    <Input 
                      value={currentMeeting.title.hi} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'hi')}
                      placeholder="Hindi title"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    value={currentMeeting.date} 
                    onChange={(e) => handleFormChange('date', e.target.value)}
                    placeholder="e.g. April 23, 2025"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input 
                    value={currentMeeting.time} 
                    onChange={(e) => handleFormChange('time', e.target.value)}
                    placeholder="e.g. 7:00 PM - 8:30 PM"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Zoom Link</label>
                <Input 
                  value={currentMeeting.zoomLink} 
                  onChange={(e) => handleFormChange('zoomLink', e.target.value)}
                  placeholder="e.g. https://zoom.us/j/123456789"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Location Name</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-10 text-center">EN</span>
                    <Input 
                      value={currentMeeting.locationName.en} 
                      onChange={(e) => handleFormChange('locationName', e.target.value, 'en')}
                      placeholder="English location name"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">TE</span>
                    <Input 
                      value={currentMeeting.locationName.te} 
                      onChange={(e) => handleFormChange('locationName', e.target.value, 'te')}
                      placeholder="Telugu location name"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">HI</span>
                    <Input 
                      value={currentMeeting.locationName.hi} 
                      onChange={(e) => handleFormChange('locationName', e.target.value, 'hi')}
                      placeholder="Hindi location name"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Latitude</label>
                  <Input 
                    type="number" 
                    value={currentMeeting.latitude} 
                    onChange={(e) => handleFormChange('latitude', parseFloat(e.target.value))}
                    step="0.000001"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Longitude</label>
                  <Input 
                    type="number" 
                    value={currentMeeting.longitude} 
                    onChange={(e) => handleFormChange('longitude', parseFloat(e.target.value))}
                    step="0.000001"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={addMeetingMutation.isPending || updateMeetingMutation.isPending}
            >
              {(addMeetingMutation.isPending || updateMeetingMutation.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BibleStudyEditor;
