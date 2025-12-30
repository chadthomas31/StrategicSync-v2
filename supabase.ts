
import { createClient } from '@supabase/supabase-js';

// These would be set in Vercel Environment Variables
// We provide valid-looking placeholders to prevent the "supabaseUrl is required" crash during local development or preview.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utility to check if the Supabase integration is fully configured in the environment.
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder-project.supabase.co'
  );
};
