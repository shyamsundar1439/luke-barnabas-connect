
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';

// Mock sermon data - in a real app, this would come from an API/database
const initialSermons = [
  {
    id: "1",
    title: {
      en: "The Power of Faith",
      te: "విశ్వాసం యొక్క శక్తి",
      hi: "विश्वास की शक्ति"
    },
    summary: {
      en: "Exploring how faith can move mountains in our daily lives.",
      te: "మన నిత్య జీవితంలో విశ్వాసం ఎలా పర్వతాలను కదిలించగలదో అన్వేషించడం.",
      hi: "खोजना कि कैसे विश्वास हमारे दैनिक जीवन में पहाड़ों को हिला सकता है।"
    },
    videoId: "12345",
    thumbnailUrl: "https://source.unsplash.com/random/640x360/?church",
    date: "April 22, 2025"
  },
  {
    id: "2",
    title: {
      en: "Walking in Love",
      te: "ప్రేమలో నడుస్తున్నది",
      hi: "प्रेम में चलना"
    },
    summary: {
      en: "Understanding the depth of God's love and how to share it with others.",
      te: "దేవుని ప్రేమ యొక్క లోతును మరియు దానిని ఇతరులతో ఎలా పంచుకోవాలో అర్థం చేసుకోవడం.",
      hi: "ईश्वर के प्रेम की गहराई को समझना और उसे दूसरों के साथ कैसे साझा करना है।"
    },
    videoId: "67890",
    thumbnailUrl: "https://source.unsplash.com/random/640x360/?bible",
    date: "April 15, 2025"
  }
];

interface Sermon {
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
  videoId: string;
  thumbnailUrl: string;
  date: string;
}

const SermonEditor = () => {
  const [sermons, setSermons] = useState<Sermon[]>(initialSermons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

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
      setSermons(sermons.filter(sermon => sermon.id !== id));
      toast({
        title: "Sermon deleted",
        description: "The sermon has been deleted successfully",
      });
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
      setSermons(sermons.map(sermon => sermon.id === currentSermon.id ? currentSermon : sermon));
      toast({
        title: "Sermon updated",
        description: "The sermon has been updated successfully",
      });
    } else {
      setSermons([...sermons, currentSermon]);
      toast({
        title: "Sermon added",
        description: "The sermon has been added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleFormChange = (field: string, value: string, lang?: string) => {
    if (!currentSermon) return;
    
    if (lang) {
      // Fix: Ensure we're dealing with objects when spreading
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
      
      <div className="space-y-4">
        {sermons.map(sermon => (
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
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
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
            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SermonEditor;
