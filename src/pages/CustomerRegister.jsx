import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, MapPin, Coffee, CheckCircle } from 'lucide-react';

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    preferredMeal: 'veg'
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    login({ ...formData, id: '2', role: 'customer' });
    navigate('/customer/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 my-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h2>
        <p className="text-gray-500 mb-8 text-center">Join MealMate for healthy home-cooked meals</p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pt-3 pl-3 flex items-start pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="address"
                required
                rows={3}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your detailed address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Meal Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.preferredMeal === 'veg' ? 'bg-green-50 border-green-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="preferredMeal"
                  value="veg"
                  className="hidden"
                  onChange={handleInputChange}
                  checked={formData.preferredMeal === 'veg'}
                />
                <Coffee className={`w-5 h-5 mr-2 ${formData.preferredMeal === 'veg' ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${formData.preferredMeal === 'veg' ? 'text-green-700' : 'text-gray-600'}`}>Veg</span>
              </label>
              <label className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.preferredMeal === 'non-veg' ? 'bg-red-50 border-red-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="preferredMeal"
                  value="non-veg"
                  className="hidden"
                  onChange={handleInputChange}
                  checked={formData.preferredMeal === 'non-veg'}
                />
                <CheckCircle className={`w-5 h-5 mr-2 ${formData.preferredMeal === 'non-veg' ? 'text-red-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${formData.preferredMeal === 'non-veg' ? 'text-red-700' : 'text-gray-600'}`}>Non-Veg</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/customer/login" className="text-blue-600 font-semibold hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
