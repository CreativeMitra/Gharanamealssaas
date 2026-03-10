import { supabase } from '../lib/supabase';

export const deliveryEngine = {
  // Automatically generates the daily delivery list for a given date
  generateDeliveriesForDate: async (date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];

      // 1. Check if deliveries already exist for this date to prevent duplicates
      const { data: existing, error: checkError } = await supabase
        .from('deliveries')
        .select('id')
        .eq('delivery_date', dateStr)
        .limit(1);

      if (checkError) throw checkError;
      if (existing && existing.length > 0) return { data: existing, error: 'Deliveries already generated for today' };

      // 2. Fetch all active subscriptions
      const { data: activeSubscriptions, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*, customers(*)')
        .eq('status', 'active');

      if (subscriptionError) throw subscriptionError;

      // 3. Filter out paused subscriptions for this date
      const activeSubs = activeSubscriptions.filter(sub => {
        if (sub.pause_start && sub.pause_end) {
          const start = new Date(sub.pause_start);
          const end = new Date(sub.pause_end);
          const current = new Date(dateStr);
          return current < start || current > end;
        }
        return true;
      });

      // 4. Generate delivery records
      const deliveries = activeSubs.map((sub) => ({
        customer_id: sub.customer_id,
        delivery_date: dateStr,
        meal_type: 'veg', // Default or fetch from profile
        status: 'pending'
      }));

      if (deliveries.length === 0) return { data: [], error: 'No active subscriptions to generate deliveries for' };

      // 5. Batch insert into the deliveries table
      const { data, error } = await supabase
        .from('deliveries')
        .insert(deliveries);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error generating deliveries:', error);
      return { data: null, error };
    }
  },

  // Get all generated deliveries for a specific day
  getDailyDeliveries: async (date) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select('*, customers(*)')
        .eq('delivery_date', date.toISOString().split('T')[0]);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching daily deliveries:', error);
      return { data: [], error };
    }
  }
};
