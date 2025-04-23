
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, PlusCircle, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';

// Mock bible study data
const initialMeetings = [
  {
    id: "1",
    title: {
      en: "Book of John Study",
      te: "జాన్ పుస్తకం అధ్యయనం",
      hi: "जॉन की पुस्तक का अध्ययन"
    },
    date: "April 23, 2025",
    time: "7:00 PM - 8:30 PM",
    zoomLink: "https://zoom.us/j/123456789",
    locationName: {
      en: "Community Church, Main Hall",
      te: "కమ్యూనిటీ చర్చి, మెయిన్ హాల్",
      hi: "कम्युनिटी चर्च, मुख्य हॉल"
    },
    latitude: 17.385,
    longitude: 78.4867
  },
  {
    id: "2",
    title: {
      en: "Psalms Bible Study",
      te: "కీర్తనలు బైబిల్ స్టడీ",
      hi: "भजन बाइबिल अध्ययन"
    },
    date: "April 24, 2025",
    time: "7:00 PM - 8:30 PM",
    zoomLink: "https://zoom.us/j/987654321",
    locationName: {
      en: "Online Meeting",
      te: "ఆన్లైన్ మీటింగ్",
      hi: "ऑनलाइन मीटिंग"
    },
    latitude: 17.385,
    longitude: 78.4867
  }
];

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
  const [meetings, setMeetings] = useState<BibleStudyMeeting[]>(initialMeetings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<BibleStudyMeeting | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

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
      setMeetings(meetings.filter(meeting => meeting.id !== id));
      toast({
        title: "Meeting deleted",
        description: "The Bible study meeting has been deleted successfully"
      });
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
      setMeetings(meetings.map(meeting => meeting.id === currentMeeting.id ? currentMeeting : meeting));
      toast({
        title: "Meeting updated",
        description: "The Bible study meeting has been updated successfully"
      });
    } else {
      setMeetings([...meetings, currentMeeting]);
      toast({
        title: "Meeting added",
        description: "The Bible study meeting has been added successfully"
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleFormChange = (field: string, value: string | number, lang?: string) => {
    if (!currentMeeting) return;
    
    if (lang) {
      setCurrentMeeting({
        ...currentMeeting,
        [field]: {
          ...currentMeeting[field as keyof typeof currentMeeting],
          [lang]: value
        }
      });
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
      
      <div className="space-y-4">
        {meetings.map(meeting => (
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
            <Button onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BibleStudyEditor;
