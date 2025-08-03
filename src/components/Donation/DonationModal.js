import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const DonationModal = ({ campaign, onClose }) => {
  const { addDonation } = useApp();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];
  const paymentMethods = [
    { id: 'stellar', name: 'Stellar (XLM)', icon: '💎' },
    { id: 'crypto', name: 'Other Crypto', icon: '₿' },
    { id: 'card', name: 'Credit Card', icon: '💳' }
  ];

  const handleDonation = () => {
    addDonation(campaign.id, parseInt(amount));
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const steps = [
    { number: 1, title: 'Amount' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Confirm' }
  ];

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-green-600 text-2xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your donation of ${amount} to {campaign.title} has been processed successfully.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Transaction ID: TX-{Date.now()}</p>
          </div>
          <p className="text-sm text-gray-500">You'll receive impact updates via email.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Support {campaign.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Progress Tracker */}
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepItem.number 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepItem.number ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    step > stepItem.number ? 'bg-primary-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Choose Donation Amount</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map(preset => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`p-3 border rounded-lg font-medium transition-colors ${
                      amount === preset.toString()
                        ? 'border-primary-500 bg-primary-50 text-primary-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!amount || amount <= 0}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Select Payment Method</h3>
              
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl mr-3">{method.icon}</span>
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!paymentMethod}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Donation</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign:</span>
                  <span className="font-medium text-gray-900">{campaign.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold text-primary-600">${amount}</span>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="material-icons text-primary-600 mr-2">info</span>
                  <div className="text-sm text-primary-700">
                    <p className="font-medium mb-1">Impact Tracking</p>
                    <p>You'll receive regular updates on how your donation is making a difference.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleDonation}
                  className="btn-primary flex-1"
                >
                  Complete Donation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
