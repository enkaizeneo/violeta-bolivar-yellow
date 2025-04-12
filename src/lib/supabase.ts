
import { createClient } from '@supabase/supabase-js';

// Provide default values to prevent initialization errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://neoexpertosis.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
