import { supabase } from '../lib/supabase';

export const pauseService = {
  // Pause a subscription with specific dates
  pauseSubscription: async (subscriptionId, startDate, resumeDate) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        status: 'paused',
        pause_start_date: startDate.toISOString().split('T')[0],
        pause_resume_date: resumeDate.toISOString().split('T')[0]
      })
      .eq('id', subscriptionId);
    return { data, error };
  },

  // Resume a paused subscription
  resumeSubscription: async (subscriptionId) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        pause_start_date: null,
        pause_resume_date: null
      })
      .eq('id', subscriptionId);
    return { data, error };
  },

  // Logic for generating deliveries to exclude paused subscriptions
  generateActiveDeliveries: async (date) => {
    const dateStr = date.toISOString().split('T')[0];

    // 1. Fetch all active or paused subscriptions
    const { data: subs, error } = await supabase
      .from('subscriptions')
      .select('*, users(*)')
      .match({ status: 'active' }); // Only active can be delivered

    if (error) return { error };

    // 2. Filter out those that should be paused on this specific date
    // (In a real system, we'd use complex SQL queries or server-side functions)
    const activeSubs = subs.filter(sub => {
      if (sub.status === 'paused') {
        const start = new Date(sub.pause_start_date);
        const resume = new Date(sub.pause_resume_date);
        const current = new Date(dateStr);
        return current < start || current >= resume;
      }
      return true;
    });

    return { data: activeSubs };
  }
};
