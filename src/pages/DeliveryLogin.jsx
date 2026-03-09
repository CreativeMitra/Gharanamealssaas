import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, CheckCircle2, Truck } from 'lucide-react';

const DeliveryLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      login({ id: 'rider-1', name: 'Vikram Rider', role: 'delivery', phone });
      navigate('/delivery/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-green-100">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-100 rounded-2xl">
            <Truck className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Delivery Partner</h2>
        <p className="text-gray-500 mb-8 text-center">Login to see your daily assignments</p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
            >
              Request OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Enter 4-digit OTP</label>
              <input
                type="text"
                maxLength={4}
                required
                className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-center tracking-widest text-2xl font-bold"
                placeholder="0000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
            >
              Start Working
            </button>
            <button onClick={() => setStep(1)} className="w-full text-green-700 text-sm font-medium">Change Phone</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DeliveryLogin;
