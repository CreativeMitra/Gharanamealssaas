import { supabase } from '../lib/supabase';

export const deliveryEngine = {
  // Logic to automatically generate daily delivery records for today
  generateDeliveriesForDate: async (date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];

      // 1. Fetch active, unpaused subscriptions
      const { data: activeSubscriptions, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*, customers(*)')
        .eq('status', 'active');

      if (subscriptionError) throw subscriptionError;

      // 2. Fetch available delivery staff
      const { data: deliveryStaff, error: staffError } = await supabase
        .from('delivery_staff')
        .select('*')
        .eq('status', 'active');

      if (staffError) throw staffError;

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

      // 4. Generate delivery records with automatic rider assignment (round-robin)
      const deliveries = activeSubs.map((sub, index) => {
        const riderIndex = index % deliveryStaff.length;
        const assignedRider = deliveryStaff[riderIndex];

        return {
          customer_id: sub.customer_id,
          delivery_date: dateStr,
          meal_type: 'veg', // Default or fetch from profile
          status: 'pending',
          delivery_boy_id: assignedRider ? assignedRider.id : null
        };
      });

      if (deliveries.length === 0) return { data: [], error: 'No deliveries to generate' };

      // 5. Batch insert deliveries
      const { data, error: insertError } = await supabase
        .from('deliveries')
        .insert(deliveries);

      if (insertError) throw insertError;
      return { data, error: null };
    } catch (error) {
      console.error('Error generating deliveries:', error);
      return { data: null, error };
    }
  },

  getDailyDeliveries: async (date) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select('*, customers(*), delivery_staff(*)')
        .eq('delivery_date', date.toISOString().split('T')[0]);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching daily deliveries:', error);
      return { data: [], error };
    }
  }
};
