import { supabase } from '../lib/supabase';

export const invoiceService = {
  // Logic to generate invoices, deducting paused days
  generateMonthlyInvoices: async (billingMonth) => {
    try {
      // 1. Fetch active subscriptions, plans, and pause information
      const { data: subs, error } = await supabase
        .from('subscriptions')
        .select('*, meal_plans(*), deliveries(*)');

      if (error) throw error;

      // 2. Map to invoice records with pro-rated billing calculation
      const invoices = subs.map(sub => {
        // Calculate paused days in this billing period (simulation)
        let pausedDays = 0;
        if (sub.pause_start && sub.pause_end) {
          const start = new Date(sub.pause_start);
          const end = new Date(sub.pause_end);
          const diffTime = Math.abs(end - start);
          pausedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        // Pro-rated calculation: plan price - price of paused meals
        const dailyPrice = sub.meal_plans.price / 30;
        const deduction = dailyPrice * pausedDays;
        const amount = (sub.meal_plans.price - deduction).toFixed(2);

        return {
          customer_id: sub.customer_id,
          amount,
          status: 'unpaid',
          created_at: new Date().toISOString()
        };
      });

      // 3. Batch insert into the invoices table
      const { data, error: insertError } = await supabase
        .from('invoices')
        .insert(invoices);

      if (insertError) throw insertError;
      return { data, error: null };
    } catch (error) {
      console.error('Error generating invoices:', error);
      return { data: null, error };
    }
  },

  markAsPaid: async (invoiceId) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update({ status: 'paid' })
        .eq('id', invoiceId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking as paid:', error);
      return { data: null, error };
    }
  },

  getCustomerInvoices: async (customerId) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', customerId);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching customer invoices:', error);
      return { data: [], error };
    }
  }
};
