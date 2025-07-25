import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://moxmbookiwxososufglw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1veG1ib29raXd4b3Nvc3VmZ2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODgzMzksImV4cCI6MjA2ODk2NDMzOX0.7yJfiqd-dBX0dbO3shykL4vDfve93jn3te18GYdiE7s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
