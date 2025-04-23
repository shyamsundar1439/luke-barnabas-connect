
import { createClient } from '@supabase/supabase-js';

// Use hardcoded values from the Supabase integration if environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ptzwnprsstihjuugstpx.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0enducHJzc3RpaGp1dWdzdHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MjIwMzcsImV4cCI6MjA2MDk5ODAzN30.0o6KXEEIGouIg9q_OjWMulSVIhi4tW7XYwY4oPIwLa4";

// Create the Supabase client with the available credentials
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
