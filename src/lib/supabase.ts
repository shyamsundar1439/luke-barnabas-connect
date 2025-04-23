
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are present
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Create a fallback Supabase client for development that doesn't throw errors
// but will log warnings and return empty responses
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => ({
            then: () => Promise.resolve({ data: [], error: null }),
            data: [],
            error: null
          }),
          eq: () => ({
            select: () => ({
              then: () => Promise.resolve({ data: [], error: null }),
              data: [],
              error: null
            })
          }),
          delete: () => ({
            eq: () => ({
              then: () => Promise.resolve({ data: null, error: null }),
              data: null, 
              error: null
            })
          }),
          insert: () => ({
            select: () => ({
              then: () => Promise.resolve({ data: [], error: null }),
              data: [],
              error: null
            })
          }),
          update: () => ({
            eq: () => ({
              select: () => ({
                then: () => Promise.resolve({ data: [], error: null }),
                data: [],
                error: null
              })
            })
          })
        }),
        storage: {
          from: () => ({
            upload: () => ({
              then: () => Promise.resolve({ data: null, error: null })
            }),
            getPublicUrl: () => ({ data: { publicUrl: '' } })
          })
        },
        auth: {
          signUp: () => Promise.resolve({ data: null, error: null }),
          signIn: () => Promise.resolve({ data: null, error: null }),
          signOut: () => Promise.resolve({ error: null })
        }
      })
    };
