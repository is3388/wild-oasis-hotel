
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gtgrzfuqtpxirkvcvxrn.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z3J6ZnVxdHB4aXJrdmN2eHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMDkyNjEsImV4cCI6MjAwOTU4NTI2MX0.hR6LXvRc39yM9-cPUlGEo5TsaZ67aMKj-Ij4HabCV0A"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;