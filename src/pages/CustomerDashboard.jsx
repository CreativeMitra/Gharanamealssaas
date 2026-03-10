import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { subscriptionService } from '../services/subscriptionService';
import { pauseService } from '../services/pauseService';
import { invoiceService } from '../services/invoiceService';
import {
  Calendar, Clock, Truck, CreditCard, History, Settings,
  PauseCircle, PlayCircle, LogOut, ChevronRight, Package
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user?.id) {
        const { data: sub } = await subscriptionService.getCurrentSubscription(user.id);
        const { data: invs } = await invoiceService.getCustomerInvoices(user.id);
        if (sub) setSubscription(sub);
        if (invs) setInvoices(invs);
      }
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  const handlePause = async (start, end) => {
    if (subscription) {
      const { error } = await pauseService.pauseSubscription(subscription.id, start, end);
      if (!error) {
        setSubscription({ ...subscription, status: 'paused', pause_start: start.toISOString(), pause_end: end.toISOString() });
      }
    }
  };

  const handleResume = async () => {
    if (subscription) {
      const { error } = await pauseService.resumeSubscription(subscription.id);
      if (!error) {
        setSubscription({ ...subscription, status: 'active', pause_start: null, pause_end: null });
      }
    }
  };

  const stats = [
    { label: 'Active Plan', value: subscription?.meal_plans?.plan_name || 'No Active Plan', icon: <Package className="w-5 h-5" /> },
    { label: 'Delivery Status', value: 'Out for delivery', icon: <Truck className="w-5 h-5 text-blue-600" /> },
    { label: 'Payment Status', value: invoices.some(i => i.status === 'unpaid') ? 'Unpaid' : 'Paid', icon: <CreditCard className="w-5 h-5 text-green-600" /> },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <ChevronRight className="w-5 h-5" /> },
    { id: 'subscription', label: 'My Subscription', icon: <Package className="w-5 h-5" /> },
    { id: 'pause', label: 'Pause Delivery', icon: subscription?.status === 'paused' ? <PlayCircle className="w-5 h-5 text-green-600" /> : <PauseCircle className="w-5 h-5 text-orange-600" /> },
    { id: 'history', label: 'Delivery History', icon: <History className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing & Invoices', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'settings', label: 'Profile Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Syncing with Supabase...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">{stat.label}</span>
                    <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-4">Today's Menu</h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                 <p className="font-semibold text-blue-900 text-lg">Paneer Butter Masala + 3 Roti + Rice</p>
              </div>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Current Subscription</h3>
            {subscription ? (
              <div className="p-6 border-2 border-blue-100 rounded-xl bg-blue-50/30">
                  <h4 className="text-2xl font-bold text-blue-900">{subscription.meal_plans?.plan_name}</h4>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                      <p className="font-bold text-lg">₹{subscription.meal_plans?.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Remaining Days</p>
                      <p className="font-bold text-lg text-orange-600">{subscription.remaining_days}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => subscriptionService.cancelSubscription(subscription.id)}
                    className="mt-6 px-6 py-2 text-red-600 font-semibold hover:underline"
                  >
                    Cancel Subscription
                  </button>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 border-2 border-dashed rounded-xl">No active subscription</div>
            )}
          </div>
        );
      case 'pause':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <h3 className="text-xl font-bold mb-2">Pause Delivery</h3>
            <div className="space-y-6 mt-6">
               <button
                onClick={() => subscription?.status === 'paused' ? handleResume() : handlePause(new Date(), new Date())}
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${subscription?.status === 'paused' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}
              >
                {subscription?.status === 'paused' ? 'Resume Deliveries' : 'Confirm Pause'}
              </button>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Invoices</h3>
            <div className="divide-y divide-gray-100">
                {invoices.length > 0 ? invoices.map((inv) => (
                  <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-900">Invoice #{inv.id.substring(0, 4)}</p>
                      <p className="text-sm text-gray-500">{new Date(inv.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">₹{inv.amount}</p>
                        <p className={`text-xs font-semibold uppercase ${inv.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>{inv.status}</p>
                    </div>
                  </div>
                )) : <p className="p-8 text-center text-gray-400">No invoices yet</p>}
            </div>
          </div>
        );
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6"><h1 className="text-2xl font-bold text-blue-600">MealMate</h1></div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <div className="mr-3">{item.icon}</div>{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t"><button onClick={logout} className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"><LogOut className="w-5 h-5 mr-3" />Logout</button></div>
      </div>
      <main className="flex-1 p-8"><div className="max-w-5xl mx-auto"><h2 className="text-2xl font-bold text-gray-900 mb-8">Hello, {user?.name || 'Customer'}! 👋</h2>{renderContent()}</div></main>
    </div>
  );
};

export default CustomerDashboard;
