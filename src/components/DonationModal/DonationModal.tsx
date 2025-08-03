import React, { useState } from 'react';
import { Campaign } from '../../types';

interface DonationModalProps {
  campaign: Campaign;
  onClose: () => void;
  onDonate: (amount: number) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ campaign, onClose, onDonate }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];
  const paymentMethods = [
    { id: 'stellar', name: 'Stellar (XLM)', icon: '💎' },
    { id: 'crypto', name: 'Other Crypto', icon: '₿' },
    { id: 'card', name: 'Credit Card', icon: '💳' }
  ];
  const transactionFee = Number(amount) * 0.015; // 1.5% transaction fee

  const validateAmount = (value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (numValue > 10000) {
      setError('Maximum donation amount is $10,000');
      return false;
    }
    setError('');
    return true;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    validateAmount(e.target.value);
  };

const handleDonate = async () => {
    try {
        setIsProcessing(true);
        await onDonate(Number(amount));
        setShowThankYou(true);
        setTimeout(onClose, 3000);
    } catch (err) {
        setError('Failed to process donation. Please try again.');
    } finally {
        setIsProcessing(false);
    }
};

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons text-green-600 text-2xl">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your donation of ${amount} has been processed successfully.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive impact updates via email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Support {campaign.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between">
            {['Amount', 'Payment', 'Confirm'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index ? 'bg-green-500 text-white' :
                  step === index + 1 ? 'bg-primary-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 ${step === index + 1 ? 'text-primary-600' : 'text-gray-500'}`}>
                  {label}
                </span>
                {index < 2 && (
                  <div className={`w-24 h-0.5 mx-2 ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {predefinedAmounts.map(preset => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset.toString())}
                    className={`p-3 border rounded-lg font-medium ${
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="1"
                    max="10000"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {amount && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Campaign Progress</span>
                    <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Your donation will help reach the goal of ${campaign.goal.toLocaleString()}
                  </p>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!amount || Number(amount) <= 0}
                className="btn-primary w-full"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {paymentMethods.map(method => (
                <label
                  key={method.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer ${
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
                  <span className="font-medium">{method.name}</span>
                </label>
              ))}

              <div className="flex space-x-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!paymentMethod}
                  className="btn-primary flex-1"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="font-medium">${Number(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Fee (1.5%):</span>
                  <span className="font-medium">${transactionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-primary-600">
                    ${(Number(amount) + transactionFee).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </span>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="material-icons text-primary-600 mr-2">info</span>
                  <p className="text-sm text-primary-700">
                    Your donation will be processed securely and you'll receive a confirmation email.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep(2)} 
                  className="btn-secondary flex-1"
                  disabled={isProcessing}
                >
                  Back
                </button>
                <button 
                  onClick={handleDonate} 
                  disabled={isProcessing}
                  className="btn-primary flex-1 relative"
                >
                  {isProcessing ? (
                    <>
                      <span className="opacity-0">Complete Donation</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    </>
                  ) : (
                    'Complete Donation'
                  )}
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
