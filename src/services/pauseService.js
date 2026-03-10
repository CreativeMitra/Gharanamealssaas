import { supabase } from '../lib/supabase';

export const pauseService = {
  // Pause a subscription with specific dates
  pauseSubscription: async (subscriptionId, startDate, endDate) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'paused',
          pause_start: startDate.toISOString().split('T')[0],
          pause_end: endDate.toISOString().split('T')[0]
        })
        .eq('id', subscriptionId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error pausing subscription:', error);
      return { data: null, error };
    }
  },

  // Resume a paused subscription
  resumeSubscription: async (subscriptionId) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          pause_start: null,
          pause_end: null
        })
        .eq('id', subscriptionId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error resuming subscription:', error);
      return { data: null, error };
    }
  }
};
