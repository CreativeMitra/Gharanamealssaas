import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Truck, Phone, MapPin, Navigation, CheckCircle, XCircle,
  LogOut, Clock, Filter, ChevronRight, Package, Smartphone
} from 'lucide-react';

const DeliveryDashboard = () => {
  const { user, logout } = useAuth();
  const [activeDeliveries, setActiveDeliveries] = useState([
    { id: 1, customer: 'Rahul Sharma', address: 'B-142, Sector 18, NOIDA', meal: 'Lunch (Veg)', status: 'Pending', phone: '9876543210' },
    { id: 2, customer: 'Amit Verma', address: 'Flat 402, Sector 21, NOIDA', meal: 'Lunch (Veg)', status: 'Pending', phone: '9876543211' },
    { id: 3, customer: 'Sneha Kapur', address: 'C-55, Sector 62, NOIDA', meal: 'Lunch (Non-Veg)', status: 'Pending', phone: '9876543212' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setActiveDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const pendingCount = activeDeliveries.filter(d => d.status === 'Pending').length;
  const completedCount = activeDeliveries.filter(d => d.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-black">RIDER DASHBOARD</h1>
             <p className="text-green-100 text-sm font-medium">Welcome, {user?.name || 'Partner'}</p>
          </div>
          <button onClick={logout} className="p-2 bg-green-500 rounded-xl hover:bg-green-400 transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 gap-4">
           <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl border border-orange-100">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-orange-700 font-bold uppercase">Pending</p>
                <p className="text-xl font-black text-orange-900">{pendingCount}</p>
              </div>
           </div>
           <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-bold uppercase">Delivered</p>
                <p className="text-xl font-black text-green-900">{completedCount}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Delivery List */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-4 pb-24">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Today's Assigned Meals</h2>

        {activeDeliveries.map((delivery) => (
          <div key={delivery.id} className={`bg-white rounded-2xl border-2 transition-all shadow-sm ${delivery.status === 'Delivered' ? 'border-green-100 opacity-75' : 'border-white'}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className={`p-3 rounded-xl ${delivery.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Package className="w-6 h-6" />
                   </div>
                   <div>
                      <h3 className="font-black text-gray-900">{delivery.customer}</h3>
                      <p className="text-sm font-bold text-gray-500">{delivery.meal}</p>
                   </div>
                </div>
                {delivery.status === 'Delivered' && (
                  <span className="flex items-center text-green-600 font-black text-sm gap-1">
                    <CheckCircle className="w-4 h-4" /> COMPLETED
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                 <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                 <p className="text-sm font-semibold text-gray-700">{delivery.address}</p>
              </div>

              {delivery.status === 'Pending' ? (
                <div className="grid grid-cols-2 gap-3">
                   <a
                     href={`tel:${delivery.phone}`}
                     className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-blue-600 text-blue-600 font-black rounded-xl hover:bg-blue-50 transition-colors"
                   >
                     <Phone className="w-5 h-5" /> CALL
                   </a>
                   <button
                     onClick={() => handleStatusChange(delivery.id, 'Delivered')}
                     className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
                   >
                     <CheckCircle className="w-5 h-5" /> DELIVERED
                   </button>
                   <button
                     onClick={() => handleStatusChange(delivery.id, 'Failed')}
                     className="col-span-2 py-2 text-red-600 font-bold hover:underline text-sm"
                   >
                     Mark as Failed / Unable to Deliver
                   </button>
                </div>
              ) : (
                <div className="flex justify-center">
                   <button
                     onClick={() => handleStatusChange(delivery.id, 'Pending')}
                     className="text-xs text-gray-400 font-bold hover:underline"
                   >
                     Undo Status
                   </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {activeDeliveries.length === 0 && (
          <div className="text-center py-12">
             <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
             <p className="text-gray-500 font-bold">No deliveries assigned yet</p>
          </div>
        )}
      </main>

      {/* Quick Navigation Footer (Mobile Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-8 flex justify-between items-center md:hidden">
          <button className="flex flex-col items-center gap-1 text-green-600">
             <Truck className="w-6 h-6" />
             <span className="text-[10px] font-black uppercase">Tasks</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
             <Navigation className="w-6 h-6" />
             <span className="text-[10px] font-black uppercase">Route</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
             <Smartphone className="w-6 h-6" />
             <span className="text-[10px] font-black uppercase">Profile</span>
          </button>
      </nav>
    </div>
  );
};

export default DeliveryDashboard;
