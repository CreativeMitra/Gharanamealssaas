import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/adminService';
import { deliveryEngine } from '../services/deliveryEngine';
import { invoiceService } from '../services/invoiceService';
import {
  Users, Package, Truck, CreditCard, Plus, Edit, Trash2,
  Search, Filter, CheckCircle, XCircle, LogOut, LayoutDashboard,
  MoreVertical, UserPlus, Download, Shield, RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [customers, setCustomers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: custs } = await adminService.getAvailableRiders(); // Just for mock
      const { data: dels } = await deliveryEngine.getDailyDeliveries(new Date());
      const { data: rs } = await adminService.getAvailableRiders();

      if (custs) setCustomers(custs);
      if (dels) setDeliveries(dels);
      if (rs) setRiders(rs);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleGenerateDeliveries = async () => {
    setLoading(true);
    await deliveryEngine.generateDeliveriesForDate(new Date());
    const { data } = await deliveryEngine.getDailyDeliveries(new Date());
    if (data) setDeliveries(data);
    setLoading(false);
  };

  const handleGenerateInvoices = async () => {
    setLoading(true);
    const start = new Date();
    start.setDate(1);
    const end = new Date();
    await invoiceService.generateMonthlyInvoices(start, end);
    setLoading(false);
    alert('Invoices generated successfully!');
  };

  const stats = [
    { label: 'Total Customers', value: '1,248', icon: <Users className="w-5 h-5 text-blue-600" />, trend: '+12%' },
    { label: 'Active Subscriptions', value: '856', icon: <Package className="w-5 h-5 text-purple-600" />, trend: '+5%' },
    { label: "Today's Deliveries", value: deliveries.length.toString(), icon: <Truck className="w-5 h-5 text-green-600" />, trend: '98%' },
    { label: 'Monthly Revenue', value: '₹12,45,000', icon: <CreditCard className="w-5 h-5 text-orange-600" />, trend: '+18%' },
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'mealplans', label: 'Meal Plans', icon: <Package className="w-5 h-5" /> },
    { id: 'deliveries', label: 'Deliveries', icon: <Truck className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-purple-600">Syncing with Central Database...</div>;

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
                 <h3 className="text-lg font-bold mb-4 text-center">System Actions</h3>
                 <div className="grid grid-cols-2 gap-4 h-48 content-center">
                    <button
                      onClick={handleGenerateDeliveries}
                      className="p-4 bg-green-50 border-2 border-green-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-green-100 transition-colors"
                    >
                      <RefreshCw className="w-8 h-8 text-green-600" />
                      <span className="font-bold text-green-800 text-sm">Generate Deliveries</span>
                    </button>
                    <button
                      onClick={handleGenerateInvoices}
                      className="p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-100 transition-colors"
                    >
                      <CreditCard className="w-8 h-8 text-blue-600" />
                      <span className="font-bold text-blue-800 text-sm">Generate Invoices</span>
                    </button>
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
                <h3 className="text-xl font-bold">Today's Deliveries ({deliveries.length})</h3>
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
                  {deliveries.length > 0 ? deliveries.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-bold text-sm">{row.users?.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{row.users?.address}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.meal_type.toUpperCase()}</td>
                      <td className="px-6 py-4 text-sm">
                        {row.delivery_boy_id ? (
                           <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">R</span>
                            Assigned
                          </div>
                        ) : (
                          <select
                            onChange={(e) => adminService.assignRider(row.id, e.target.value)}
                            className="text-xs border rounded p-1 text-purple-600 font-bold"
                          >
                            <option>Assign Rider</option>
                            {riders.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          row.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          row.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No deliveries generated for today.</td>
                    </tr>
                  )}
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
              <button
                onClick={handleGenerateInvoices}
                className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all"
              >
                Run Invoice Generator
              </button>
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
