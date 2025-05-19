import { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://wdxhdahkospapbqjgrgf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeGhkYWhrb3NwYXBicWpncmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTI4MzAsImV4cCI6MjA2MzA2ODgzMH0.Bzh3vj6Um_HX4vV4MM3BK-xpcIetieF3usZYk61F890'

export const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY)