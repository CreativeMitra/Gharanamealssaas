import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Truck, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Customer',
      icon: <User className="w-12 h-12 text-blue-600" />,
      description: 'Order healthy meals and manage your subscription.',
      path: '/customer/login',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Delivery Boy',
      icon: <Truck className="w-12 h-12 text-green-600" />,
      description: 'View assigned deliveries and update delivery status.',
      path: '/delivery/login',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Admin',
      icon: <ShieldCheck className="w-12 h-12 text-purple-600" />,
      description: 'Manage customers, meal plans, and daily operations.',
      path: '/admin/login',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MealMate</h1>
        <p className="text-xl text-gray-600">Choose your role to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role) => (
          <button
            key={role.title}
            onClick={() => navigate(role.path)}
            className={`flex flex-col items-center p-8 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${role.color}`}
          >
            <div className="mb-4">
              {role.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{role.title}</h2>
            <p className="text-gray-600 text-center">{role.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
