
import React from 'react';

const EnvDebug = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return (
    <div className="fixed bottom-16 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-xs">
      <h4 className="font-semibold mb-1">Environment Debug:</h4>
      <div>
        <span className="font-medium">SUPABASE_URL: </span>
        <span className={supabaseUrl ? "text-green-500" : "text-red-500"}>
          {supabaseUrl ? "✓ Set" : "✗ Missing"}
        </span>
      </div>
      <div>
        <span className="font-medium">SUPABASE_KEY: </span>
        <span className={supabaseKey ? "text-green-500" : "text-red-500"}>
          {supabaseKey ? "✓ Set" : "✗ Missing"}
        </span>
      </div>
    </div>
  );
};

export default EnvDebug;
