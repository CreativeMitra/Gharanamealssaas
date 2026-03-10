import { supabase } from '../lib/supabase';

export const subscriptionService = {
  getAvailablePlans: async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*');
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching plans:', error);
      return { data: [], error };
    }
  },

  subscribe: async (customerId, planId, mealsCount) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          customer_id: customerId,
          plan_id: planId,
          start_date: new Date().toISOString().split('T')[0],
          remaining_days: mealsCount,
          status: 'active'
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
