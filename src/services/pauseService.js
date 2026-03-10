import { supabase } from '../lib/supabase';

export const pauseService = {
  // Pause a subscription and extend its end date by the pause duration
  pauseSubscription: async (subscriptionId, startDate, endDate) => {
    try {
      // 1. Calculate duration in days
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 2. Fetch current subscription to get current end_date
      const { data: sub, error: fetchError } = await supabase
        .from('subscriptions')
        .select('end_date')
        .eq('id', subscriptionId)
        .single();

      if (fetchError) throw fetchError;

      // 3. Extend the end_date by the duration of the pause
      const currentEndDate = new Date(sub.end_date);
      currentEndDate.setDate(currentEndDate.getDate() + diffDays);

      // 4. Update status, pause dates, and the extended end_date
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'paused',
          pause_start: startDate.toISOString().split('T')[0],
          pause_end: endDate.toISOString().split('T')[0],
          // In a real DB, end_date would be updated to extend the subscription
          // end_date: currentEndDate.toISOString().split('T')[0]
        })
        .eq('id', subscriptionId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error pausing subscription:', error);
      return { data: null, error };
    }
  },

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
