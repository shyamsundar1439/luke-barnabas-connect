
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();

  const checkSupabaseConnection = async () => {
    try {
      const { error } = await supabase.from('_tests').select('*').limit(1);
      if (error) {
        console.error('Supabase connection check:', error);
        toast({
          title: "Connected to Supabase",
          description: "Connected to Supabase, but no tables yet. Create some tables to start using the database!",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully connected to Supabase!",
        });
      }
    } catch (err) {
      console.error('Error checking Supabase:', err);
      toast({
        title: "Error",
        description: "Error checking Supabase connection. Check console for details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Start building your amazing project here!</p>
        
        <div className="space-y-4">
          <Button 
            onClick={checkSupabaseConnection}
            className="w-full"
          >
            Test Supabase Connection
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/sermons')}
            className="w-full"
          >
            Explore Sermons
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/bible-study')}
            className="w-full"
          >
            Bible Study
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/settings')}
            className="w-full"
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
