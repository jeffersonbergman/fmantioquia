import { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://wdxhdahkospapbqjgrgf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeGhkYWhrb3NwYXBicWpncmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTI4MzAsImV4cCI6MjA2MzA2ODgzMH0.Bzh3vj6Um_HX4vV4MM3BK-xpcIetieF3usZYk61F890'

const SUPABASE_URL_2 = 'https://gxlsblocsxonjvsjgjwb.supabase.co';
const SUPABASE_ANON_KEY_2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bHNibG9jc3hvbmp2c2pnandiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDg1OTgsImV4cCI6MjA2NDE4NDU5OH0.cMaPn2z3hM2Wpm4KNPk28XIRKSg8J2okj6WmHfinw5U';
export const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export const supabase2 = new SupabaseClient(SUPABASE_URL_2, SUPABASE_ANON_KEY_2);