import { supabase } from '../lib/supabase';

export const deliveryBoyService = {
  // Get all assigned deliveries for a delivery boy on a specific date
  getAssignedDeliveries: async (riderId, date) => {
    const { data, error } = await supabase
      .from('deliveries')
      .select('*, users(*)')
      .match({
        delivery_boy_id: riderId,
        delivery_date: date.toISOString().split('T')[0]
      });
    return { data, error };
  },

  // Mark a delivery as delivered
  markDelivered: async (deliveryId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        status: 'delivered',
        delivered_at: new Date().toISOString()
      })
      .eq('id', deliveryId);
    return { data, error };
  },

  // Mark a delivery as failed
  markFailed: async (deliveryId, reason) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        status: 'failed',
        failed_reason: reason
      })
      .eq('id', deliveryId);
    return { data, error };
  },

  // Start delivery (out for delivery status)
  startDelivery: async (deliveryId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        status: 'out_for_delivery'
      })
      .eq('id', deliveryId);
    return { data, error };
  }
};
