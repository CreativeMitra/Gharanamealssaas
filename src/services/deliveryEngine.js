import { supabase } from '../lib/supabase';

export const deliveryEngine = {
  // Automatically generates the daily delivery list for a given date
  generateDeliveriesForDate: async (date) => {
    // 1. Fetch all active subscriptions
    const { data: activeSubscriptions, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*, users(*)')
      .match({ status: 'active' });

    if (subscriptionError) return { error: subscriptionError };

    // 2. Generate delivery records for each active subscription
    const deliveries = activeSubscriptions.map((sub) => ({
      subscription_id: sub.id,
      customer_id: sub.customer_id,
      delivery_date: date.toISOString().split('T')[0],
      meal_type: sub.users.preferred_meal,
      status: 'pending',
      created_at: new Date().toISOString()
    }));

    // 3. Batch insert into the deliveries table
    const { data, error } = await supabase
      .from('deliveries')
      .insert(deliveries);

    return { data, error };
  },

  // Get all generated deliveries for a specific day
  getDailyDeliveries: async (date) => {
    const { data, error } = await supabase
      .from('deliveries')
      .select('*, users(*), subscriptions(*)')
      .eq('delivery_date', date.toISOString().split('T')[0]);
    return { data, error };
  },

  // Mark a delivery as assigned to a delivery boy
  assignRider: async (deliveryId, riderId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        delivery_boy_id: riderId,
        status: 'pending' // Keeps pending until rider starts delivery
      })
      .eq('id', deliveryId);
    return { data, error };
  }
};
