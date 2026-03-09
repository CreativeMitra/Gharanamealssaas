import { supabase } from '../lib/supabase';

export const adminService = {
  // Get all active delivery boys
  getAvailableRiders: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'delivery');
    return { data, error };
  },

  // Assign a rider to a specific delivery
  assignRider: async (deliveryId, riderId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        delivery_boy_id: riderId,
        status: 'pending' // Keeps pending until rider starts delivery
      })
      .eq('id', deliveryId);
    return { data, error };
  },

  // Batch assign riders based on area or availability
  batchAssignRiders: async (deliveryIds, riderId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .update({
        delivery_boy_id: riderId,
        status: 'pending'
      })
      .eq('id', deliveryIds); // In real system, we'd use 'in' operator
    return { data, error };
  },

  // View performance metrics for a specific rider
  getRiderPerformance: async (riderId) => {
    const { data, error } = await supabase
      .from('deliveries')
      .select('*')
      .eq('delivery_boy_id', riderId)
      .eq('status', 'delivered');
    return { data, error };
  }
};
