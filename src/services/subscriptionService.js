import { supabase } from '../lib/supabase';

export const subscriptionService = {
  // Get all active meal plans for the customer to choose from
  getAvailablePlans: async () => {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('is_active', true);
    return { data, error };
  },

  // Subscribe a customer to a meal plan
  subscribe: async (customerId, planId, startDate) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30); // Default 30-day subscription

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        customer_id: customerId,
        plan_id: planId,
        status: 'active',
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        remaining_meals: 30, // Mock count based on plan
        created_at: new Date().toISOString()
      });
    return { data, error };
  },

  // Get current subscription for a customer
  getCurrentSubscription: async (customerId) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, meal_plans(*)')
      .eq('customer_id', customerId)
      .match({ status: 'active' });
    return { data, error };
  },

  // Renew an existing subscription
  renewSubscription: async (subscriptionId, newEndDate) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        end_date: newEndDate.toISOString().split('T')[0],
        status: 'active'
      })
      .eq('id', subscriptionId);
    return { data, error };
  },

  // Cancel a subscription
  cancelSubscription: async (subscriptionId) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', subscriptionId);
    return { data, error };
  }
};
