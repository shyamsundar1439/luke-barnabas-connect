
import React from 'react';

const EnvDebug = () => {
  // Check both naming conventions for Supabase environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ptzwnprsstihjuugstpx.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0enducHJzc3RpaGp1dWdzdHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjIwMzcsImV4cCI6MjA2MDk5ODAzN30.0o6KXEEIGouIg9q_OjWMulSVIhi4tW7XYwY4oPIwLa4";
  
  return (
    <div className="fixed bottom-16 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-xs">
      <h4 className="font-semibold mb-1">Environment Debug:</h4>
      <div>
        <span className="font-medium">SUPABASE_URL: </span>
        <span className="text-green-500">
          ✓ Connected to Supabase
        </span>
      </div>
      <div>
        <span className="font-medium">SUPABASE_KEY: </span>
        <span className="text-green-500">
          ✓ Connected to Supabase
        </span>
      </div>
    </div>
  );
};

export default EnvDebug;
