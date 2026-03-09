import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (Mock implementation for now)
const supabaseUrl = 'https://mock.supabase.co'
const supabaseKey = 'mock-key'

export const supabase = {
  from: (table) => ({
    select: () => ({
      eq: () => ({ data: [], error: null }),
      match: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
    }),
    insert: (data) => ({ data, error: null }),
    update: (data) => ({
      eq: () => ({ data, error: null }),
    }),
    delete: () => ({
      eq: () => ({ data: null, error: null }),
    }),
  }),
  auth: {
    signIn: (credentials) => ({ data: { user: { id: '1' } }, error: null }),
    signUp: (credentials) => ({ data: { user: { id: '2' } }, error: null }),
    signOut: () => ({ error: null }),
  }
}
