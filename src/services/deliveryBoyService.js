import { supabase } from '../lib/supabase';

export const deliveryBoyService = {
  // Get all assigned deliveries for a delivery boy on a specific date
  getAssignedDeliveries: async (riderId, date) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .select('*, customers(*)')
        .eq('delivery_boy_id', riderId)
        .eq('delivery_date', date.toISOString().split('T')[0]);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching rider deliveries:', error);
      return { data: [], error };
    }
  },

  // Mark a delivery as delivered
  markDelivered: async (deliveryId) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          status: 'delivered'
        })
        .eq('id', deliveryId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking delivered:', error);
      return { data: null, error };
    }
  },

  // Mark a delivery as failed
  markFailed: async (deliveryId) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          status: 'failed'
        })
        .eq('id', deliveryId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking failed:', error);
      return { data: null, error };
    }
  }
};
