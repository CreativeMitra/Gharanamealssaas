import { supabase } from '../lib/supabase';

export const adminService = {
  // Get all delivery staff
  getAvailableRiders: async () => {
    try {
      const { data, error } = await supabase
        .from('delivery_staff')
        .select('*');
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching riders:', error);
      return { data: [], error };
    }
  },

  // Get all customers
  getCustomers: async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching customers:', error);
      return { data: [], error };
    }
  },

  // Assign a rider to a specific delivery
  assignRider: async (deliveryId, riderId) => {
    try {
      const { data, error } = await supabase
        .from('deliveries')
        .update({
          delivery_boy_id: riderId
        })
        .eq('id', deliveryId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error assigning rider:', error);
      return { data: null, error };
    }
  }
};
