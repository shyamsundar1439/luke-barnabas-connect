import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Sermon } from '@/pages/Sermons';

const SermonEditor = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  
  const { data: sermons, isLoading, error } = useQuery({
    queryKey: ['sermons'],
    queryFn: async (): Promise<Sermon[]> => {
      const response = await supabase
        .from('sermons')
        .select('*')
        .order('date', { ascending: false });
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    }
  });

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching sermons",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const addSermonMutation = useMutation({
    mutationFn: async (sermon: Sermon): Promise<Sermon[]> => {
      const response = await supabase
        .from('sermons')
        .insert(sermon)
        .select();
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sermons'] });
      toast({
        title: "Sermon added",
        description: "The sermon has been added successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error adding sermon",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const updateSermonMutation = useMutation({
    mutationFn: async (sermon: Sermon): Promise<Sermon[]> => {
      const response = await supabase
        .from('sermons')
        .update(sermon)
        .eq('id', sermon.id)
        .select();
        
      if (response.error) {
        throw response.error;
      }
      
      return response.data || [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sermons'] });
      toast({
        title: "Sermon updated",
        description: "The sermon has been updated successfully",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error updating sermon",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const deleteSermonMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const response = await supabase
        .from('sermons')
        .delete()
        .eq('id', id);
        
      if (response.error) {
        throw response.error;
      }
      
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sermons'] });
      toast({
        title: "Sermon deleted",
        description: "The sermon has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting sermon",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setCurrentSermon({
      id: Math.random().toString(36).substring(2, 9),
      title: { en: "", te: "", hi: "" },
      summary: { en: "", te: "", hi: "" },
      videoId: "",
      thumbnailUrl: "",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });
  };

  const handleAddNew = () => {
    setIsEditMode(false);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (sermon: Sermon) => {
    setIsEditMode(true);
    setCurrentSermon({...sermon});
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sermon?")) {
      deleteSermonMutation.mutate(id);
    }
  };

  const handleSave = () => {
    if (!currentSermon) return;
    
    if (!currentSermon.title.en || !currentSermon.videoId) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode) {
      updateSermonMutation.mutate(currentSermon);
    } else {
      addSermonMutation.mutate(currentSermon);
    }
  };

  const handleFormChange = (field: string, value: string, lang?: string) => {
    if (!currentSermon) return;
    
    if (lang) {
      const fieldValue = currentSermon[field as keyof typeof currentSermon];
      
      if (typeof fieldValue === 'object' && fieldValue !== null) {
        setCurrentSermon({
          ...currentSermon,
          [field]: {
            ...fieldValue,
            [lang]: value
          }
        });
      }
    } else {
      setCurrentSermon({
        ...currentSermon,
        [field]: value
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Sermons</h2>
        <Button onClick={handleAddNew} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Sermon
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading sermons...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {sermons && sermons.map((sermon: Sermon) => (
            <div 
              key={sermon.id} 
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{sermon.title[language]}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {sermon.date} | Video ID: {sermon.videoId}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleEdit(sermon)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(sermon.id)}
                  disabled={deleteSermonMutation.isPending}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {sermons && sermons.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No sermons found. Add your first sermon using the button above.
            </div>
          )}
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Sermon" : "Add New Sermon"}
            </DialogTitle>
          </DialogHeader>
          
          {currentSermon && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Title</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-10 text-center">EN</span>
                    <Input 
                      value={currentSermon.title.en} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'en')}
                      placeholder="English title"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">TE</span>
                    <Input 
                      value={currentSermon.title.te} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'te')}
                      placeholder="Telugu title"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">HI</span>
                    <Input 
                      value={currentSermon.title.hi} 
                      onChange={(e) => handleFormChange('title', e.target.value, 'hi')}
                      placeholder="Hindi title"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-10 text-center">EN</span>
                    <Textarea 
                      value={currentSermon.summary.en} 
                      onChange={(e) => handleFormChange('summary', e.target.value, 'en')}
                      placeholder="English summary"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">TE</span>
                    <Textarea 
                      value={currentSermon.summary.te} 
                      onChange={(e) => handleFormChange('summary', e.target.value, 'te')}
                      placeholder="Telugu summary"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="w-10 text-center">HI</span>
                    <Textarea 
                      value={currentSermon.summary.hi} 
                      onChange={(e) => handleFormChange('summary', e.target.value, 'hi')}
                      placeholder="Hindi summary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">YouTube Video ID</label>
                  <Input 
                    value={currentSermon.videoId} 
                    onChange={(e) => handleFormChange('videoId', e.target.value)}
                    placeholder="e.g. dQw4w9WgXcQ"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input 
                    value={currentSermon.date} 
                    onChange={(e) => handleFormChange('date', e.target.value)}
                    placeholder="e.g. April 23, 2025"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Thumbnail URL</label>
                <Input 
                  value={currentSermon.thumbnailUrl} 
                  onChange={(e) => handleFormChange('thumbnailUrl', e.target.value)}
                  placeholder="Image URL"
                />
                {currentSermon.thumbnailUrl && (
                  <div className="mt-2">
                    <img 
                      src={currentSermon.thumbnailUrl} 
                      alt="Thumbnail preview" 
                      className="h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={addSermonMutation.isPending || updateSermonMutation.isPending}
            >
              {(addSermonMutation.isPending || updateSermonMutation.isPending) && (
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

export default SermonEditor;
