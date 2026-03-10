import { supabase } from '../lib/supabase';

export const invoiceService = {
  // Logic to generate invoices
  generateMonthlyInvoices: async (billingMonth) => {
    try {
      // 1. Fetch active subscriptions and their plans
      const { data: subs, error } = await supabase
        .from('subscriptions')
        .select('*, meal_plans(*)');

      if (error) throw error;

      // 2. Map to invoice records
      const invoices = subs.map(sub => ({
        customer_id: sub.customer_id,
        amount: sub.meal_plans.price, // Should ideally subtract paused days
        status: 'unpaid',
        created_at: new Date().toISOString()
      }));

      // 3. Insert into invoices table
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

  // Mark an invoice as paid
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

  // Get invoices for a customer
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
