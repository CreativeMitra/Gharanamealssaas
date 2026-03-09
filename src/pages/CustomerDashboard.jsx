import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Calendar, Clock, Truck, CreditCard, History, Settings,
  PauseCircle, PlayCircle, LogOut, ChevronRight, Package
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaused, setIsPaused] = useState(false);

  const stats = [
    { label: 'Active Plan', value: 'Monthly Lunch', icon: <Package className="w-5 h-5" /> },
    { label: 'Next Delivery', value: '15 Mar, 12:30 PM', icon: <Clock className="w-5 h-5" /> },
    { label: 'Delivery Status', value: 'Out for delivery', icon: <Truck className="w-5 h-5 text-blue-600" /> },
    { label: 'Payment Status', value: 'Paid', icon: <CreditCard className="w-5 h-5 text-green-600" /> },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <ChevronRight className="w-5 h-5" /> },
    { id: 'subscription', label: 'My Subscription', icon: <Package className="w-5 h-5" /> },
    { id: 'pause', label: 'Pause Delivery', icon: isPaused ? <PlayCircle className="w-5 h-5 text-green-600" /> : <PauseCircle className="w-5 h-5 text-orange-600" /> },
    { id: 'history', label: 'Delivery History', icon: <History className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing & Invoices', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'settings', label: 'Profile Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex-1">
                  <div className="font-semibold text-blue-900 text-lg">Paneer Butter Masala + 3 Roti + Rice</div>
                  <p className="text-blue-700 text-sm">Estimated arrival: 1:00 PM - 1:30 PM</p>
                </div>
                <div className="text-blue-600 font-bold">Lunch</div>
              </div>
            </div>
          </div>
        );
      case 'subscription':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Current Subscription</h3>
            <div className="space-y-6">
              <div className="p-6 border-2 border-blue-100 rounded-xl bg-blue-50/30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-blue-900">Monthly Lunch Plan</h4>
                    <p className="text-gray-600">Pure Veg Home-cooked Meals</p>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Active</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-blue-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="font-bold text-lg">₹2,500</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Started</p>
                    <p className="font-bold text-lg">01 Mar 2024</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Remaining</p>
                    <p className="font-bold text-lg text-orange-600">16 Days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Meals</p>
                    <p className="font-bold text-lg">30 Meals</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">Renew Plan</button>
                  <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Upgrade</button>
                  <button className="px-6 py-2 text-red-600 font-semibold hover:underline">Cancel Subscription</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pause':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <h3 className="text-xl font-bold mb-2">Pause Delivery</h3>
            <p className="text-gray-500 mb-6">Planning a vacation? Pause your meals and we'll extend your plan.</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pause From</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resume On</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}
              >
                {isPaused ? 'Resume Deliveries' : 'Confirm Pause'}
              </button>
              {isPaused && (
                <div className="p-4 bg-orange-50 border border-orange-100 text-orange-800 rounded-lg flex items-center">
                  <PauseCircle className="w-5 h-5 mr-2" />
                  Your deliveries are currently paused until 20 Mar 2024.
                </div>
              )}
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">Delivery History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Meal</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { date: '14 Mar 2024', meal: 'Lunch (Veg)', status: 'Pending' },
                    { date: '13 Mar 2024', meal: 'Lunch (Veg)', status: 'Delivered' },
                    { date: '12 Mar 2024', meal: 'Lunch (Veg)', status: 'Delivered' },
                    { date: '11 Mar 2024', meal: 'Lunch (Veg)', status: 'Missed' },
                    { date: '10 Mar 2024', meal: 'Lunch (Veg)', status: 'Delivered' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.meal}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          row.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          row.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Billing & Invoices</h3>
                <button className="text-blue-600 font-semibold hover:underline">Payment History</button>
              </div>
              <div className="flex items-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm">Next Bill Due</p>
                  <p className="text-3xl font-bold">₹2,500</p>
                  <p className="text-gray-400 text-xs mt-1">For period 01 Apr - 30 Apr 2024</p>
                </div>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h4 className="font-bold">Recent Invoices</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { id: 'INV-001', date: '01 Mar 2024', amount: '₹2,500', status: 'Paid' },
                  { id: 'INV-000', date: '01 Feb 2024', amount: '₹2,500', status: 'Paid' },
                ].map((inv) => (
                  <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg mr-4">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{inv.id}</p>
                        <p className="text-sm text-gray-500">{inv.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-bold">{inv.amount}</p>
                        <p className="text-xs text-green-600 font-semibold uppercase">{inv.status}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Package className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">MealMate</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="mr-3">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center p-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.phone || 'No phone'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 md:hidden">
           <div className="flex justify-between items-center">
             <h1 className="text-xl font-bold text-blue-600">MealMate</h1>
             <button onClick={logout} className="p-2 text-red-600"><LogOut className="w-6 h-6" /></button>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Hello, {user?.name || 'Customer'}! 👋</h2>
              <p className="text-gray-500">Welcome back to your dashboard.</p>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
