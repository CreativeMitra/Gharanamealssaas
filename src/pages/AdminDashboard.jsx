import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users, Package, Truck, CreditCard, Plus, Edit, Trash2,
  Search, Filter, CheckCircle, XCircle, LogOut, LayoutDashboard,
  MoreVertical, UserPlus, Download, Shield
} from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Customers', value: '1,248', icon: <Users className="w-5 h-5 text-blue-600" />, trend: '+12%' },
    { label: 'Active Subscriptions', value: '856', icon: <Package className="w-5 h-5 text-purple-600" />, trend: '+5%' },
    { label: "Today's Deliveries", value: '412', icon: <Truck className="w-5 h-5 text-green-600" />, trend: '98%' },
    { label: 'Monthly Revenue', value: '₹12,45,000', icon: <CreditCard className="w-5 h-5 text-orange-600" />, trend: '+18%' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'mealplans', label: 'Meal Plans', icon: <Package className="w-5 h-5" /> },
    { id: 'deliveries', label: 'Deliveries', icon: <Truck className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Recent Signups</h3>
                  <button className="text-purple-600 text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Rahul Sharma', plan: 'Monthly Lunch', date: '2h ago' },
                    { name: 'Amit Verma', plan: 'Monthly Combo', date: '4h ago' },
                    { name: 'Priya Das', plan: 'Weekly Dinner', date: '5h ago' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.plan}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{user.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Delivery Performance</h3>
                  <div className="text-xs text-gray-400">Past 7 days</div>
                </div>
                <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-100 rounded-xl">
                   <p className="text-gray-400 text-sm italic">Analytics Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-purple-700">
                  <UserPlus className="w-4 h-4" /> Add Customer
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Expiry</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'John Doe', email: 'john@example.com', plan: 'Monthly Lunch', status: 'Active', expiry: '15 Apr 2024' },
                    { name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Monthly Dinner', status: 'Paused', expiry: '20 Apr 2024' },
                    { name: 'Michael Chen', email: 'mike@example.com', plan: 'Weekly Combo', status: 'Active', expiry: '22 Mar 2024' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-3 text-xs">
                            {row.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-gray-900">{row.name}</p>
                            <p className="text-xs text-gray-500">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.expiry}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:text-purple-600"><Edit className="w-4 h-4" /></button>
                          <button className="p-1 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'mealplans':
        return (
          <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Meal Plans</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-purple-700 transition-all">
                  <Plus className="w-5 h-5" /> Create New Plan
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Monthly Lunch', price: '₹2,500', meals: 30, type: 'Veg', active: 450 },
                  { name: 'Monthly Dinner', price: '₹2,500', meals: 30, type: 'Veg', active: 312 },
                  { name: 'Monthly Combo', price: '₹4,500', meals: 60, type: 'Veg/Non-Veg', active: 94 },
                ].map((plan, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <button><MoreVertical className="w-5 h-5 text-gray-400" /></button>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h4>
                    <p className="text-2xl font-black text-purple-600 mb-4">{plan.price}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Meals</span>
                        <span className="font-semibold">{plan.meals}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Meal Type</span>
                        <span className="font-semibold">{plan.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Active Users</span>
                        <span className="font-semibold text-green-600">{plan.active}</span>
                      </div>
                    </div>
                    <button className="w-full py-2 border-2 border-purple-100 text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors">
                      Edit Plan
                    </button>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'deliveries':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold">Today's Deliveries</h3>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Export PDF</button>
                   <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">Optimize Routes</button>
                </div>
             </div>
             <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Meal</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Delivery Boy</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { customer: 'Rahul Sharma', address: 'Sec 18, NOIDA', meal: 'Lunch (Veg)', rider: 'Unassigned', status: 'Pending' },
                    { customer: 'Amit Verma', address: 'Sec 21, NOIDA', meal: 'Lunch (Veg)', rider: 'Vikram', status: 'Out for Delivery' },
                    { customer: 'Sneha Kapur', address: 'Sec 62, NOIDA', meal: 'Lunch (Non-Veg)', rider: 'Arjun', status: 'Delivered' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-bold text-sm">{row.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{row.address}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.meal}</td>
                      <td className="px-6 py-4 text-sm">
                        {row.rider === 'Unassigned' ? (
                          <button className="text-purple-600 font-bold hover:underline">Assign Rider</button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">{row.rider[0]}</span>
                            {row.rider}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          row.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          row.status === 'Pending' ? 'bg-gray-100 text-gray-600' :
                          'bg-blue-100 text-blue-700'
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">Billing Management</h3>
            </div>
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold mb-2">Generate Monthly Invoices</h4>
              <p className="text-gray-500 max-w-md mx-auto mb-6">System will calculate plan price minus paused days for all active subscriptions.</p>
              <button className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all">
                Run Invoice Generator
              </button>
            </div>
            <div className="border-t border-gray-100 overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: 'INV-1024', customer: 'Rahul Sharma', amount: '₹2,350', status: 'Unpaid' },
                      { id: 'INV-1023', customer: 'John Doe', amount: '₹2,500', status: 'Paid' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 text-sm font-medium">{row.id}</td>
                        <td className="px-6 py-4 text-sm">{row.customer}</td>
                        <td className="px-6 py-4 text-sm font-bold">{row.amount}</td>
                        <td className="px-6 py-4 text-sm">
                           <span className={row.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}>{row.status}</span>
                        </td>
                        <td className="px-6 py-4">
                           <button className="p-2 text-gray-400 hover:text-purple-600"><Download className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      default:
        return <div>Section under construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            ADMIN
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="mr-3">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
           <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
           <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-gray-900">Super Admin</p>
                 <p className="text-xs text-gray-500">Last login: 5 mins ago</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                 SA
              </div>
           </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
