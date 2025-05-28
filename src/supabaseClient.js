import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sobubhmoeehurigfcxsf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvYnViaG1vZWVodXJpZ2ZjeHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMzkwNDQsImV4cCI6MjA2MzkxNTA0NH0.02vz0xOR4Qa26pqT7dXYFTFzvTjDt00W_Lmt2SGosmk'
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});