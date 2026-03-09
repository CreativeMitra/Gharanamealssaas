import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (Mock implementation for now)
const supabaseUrl = 'https://mock.supabase.co'
const supabaseKey = 'mock-key'

const mockQuery = {
  data: [],
  error: null,
  select: function() { return this; },
  eq: function() { return this; },
  match: function() { return this; },
  order: function() { return this; },
  insert: function(data) { this.data = data; return this; },
  update: function(data) { this.data = data; return this; },
  delete: function() { return this; },
  then: function(cb) {
    cb({ data: this.data, error: this.error });
    return Promise.resolve({ data: this.data, error: this.error });
  }
};

export const supabase = {
  from: (table) => {
    // Return a fresh mockQuery object for each call to 'from'
    return { ...mockQuery, data: [] };
  },
  auth: {
    signIn: (credentials) => Promise.resolve({ data: { user: { id: '1' } }, error: null }),
    signUp: (credentials) => Promise.resolve({ data: { user: { id: '2' } }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  }
}
