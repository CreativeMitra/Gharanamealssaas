import { supabase } from '../lib/supabase';

export const invoiceService = {
  // Logic to automatically generate monthly invoices for all customers
  generateMonthlyInvoices: async (billingPeriodStart, billingPeriodEnd) => {
    // 1. Fetch all subscriptions with their plan and deliveries for the period
    const { data: subs, error } = await supabase
      .from('subscriptions')
      .select('*, meal_plans(*), deliveries(*)');

    if (error) return { error };

    // 2. Calculate amount based on plan price and deliveries (excluding failed ones)
    // (In a real system, this would happen via a more complex server-side function)
    const invoices = subs.map(sub => {
      const deliveredCount = sub.deliveries.filter(d =>
        d.status === 'delivered' &&
        new Date(d.delivery_date) >= billingPeriodStart &&
        new Date(d.delivery_date) <= billingPeriodEnd
      ).length;

      const amount = (sub.meal_plans.price / 30) * deliveredCount; // Simple pro-rated calc

      return {
        customer_id: sub.customer_id,
        subscription_id: sub.id,
        amount,
        status: 'unpaid',
        billing_period_start: billingPeriodStart.toISOString().split('T')[0],
        billing_period_end: billingPeriodEnd.toISOString().split('T')[0],
        due_date: new Date(billingPeriodEnd).setDate(new Date(billingPeriodEnd).getDate() + 7), // 7 days after period end
        created_at: new Date().toISOString()
      };
    });

    // 3. Batch insert invoices
    const { data, error: insertError } = await supabase
      .from('invoices')
      .insert(invoices);

    return { data, error: insertError };
  },

  // Mark an invoice as paid
  markAsPaid: async (invoiceId) => {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status: 'paid' })
      .eq('id', invoiceId);
    return { data, error };
  },

  // Get invoices for a customer
  getCustomerInvoices: async (customerId) => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('customer_id', customerId);
    return { data, error };
  }
};
