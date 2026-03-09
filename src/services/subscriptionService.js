import { supabase } from '../lib/supabase';

export const subscriptionService = {
  getAvailablePlans: async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching plans:', error);
      return { data: [], error };
    }
  },

  subscribe: async (customerId, planId, startDate) => {
    try {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);

      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          customer_id: customerId,
          plan_id: planId,
          status: 'active',
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          remaining_meals: 30,
          created_at: new Date().toISOString()
        });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error subscribing:', error);
      return { data: null, error };
    }
  },

  getCurrentSubscription: async (customerId) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, meal_plans(*)')
        .eq('customer_id', customerId)
        .eq('status', 'active');
      if (error) throw error;
      return { data: data[0] || null, error: null };
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return { data: null, error };
    }
  },

  cancelSubscription: async (subscriptionId) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('id', subscriptionId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return { data: null, error };
    }
  }
};
