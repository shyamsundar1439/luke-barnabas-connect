
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SermonEditor from '@/components/admin/SermonEditor';
import BibleStudyEditor from '@/components/admin/BibleStudyEditor';
import HomeContentEditor from '@/components/admin/HomeContentEditor';
import { useToast } from '@/components/ui/use-toast';
import { LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      navigate('/admin');
      toast({
        title: "Access denied",
        description: "Please login to access the admin panel",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="sermons" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="sermons">Sermons</TabsTrigger>
            <TabsTrigger value="bibleStudy">Bible Study</TabsTrigger>
            <TabsTrigger value="homeContent">Home Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sermons" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <SermonEditor />
          </TabsContent>
          
          <TabsContent value="bibleStudy" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <BibleStudyEditor />
          </TabsContent>
          
          <TabsContent value="homeContent" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <HomeContentEditor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
