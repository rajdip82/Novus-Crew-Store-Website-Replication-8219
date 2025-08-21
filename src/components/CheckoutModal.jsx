import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiCreditCard, FiLock, FiCheck, FiGift, FiPercent, FiShield, FiDownload } = FiIcons;

function CheckoutModal({ isOpen, onClose, product, onSuccess }) {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    email: user?.primaryEmailAddress?.emailAddress || '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'novus20') {
      setDiscount(0.2); // 20% discount
    } else if (promoCode.toLowerCase() === 'first10') {
      setDiscount(0.1); // 10% discount
    } else {
      alert('Invalid promo code');
      return;
    }
    alert('Promo code applied successfully!');
  };

  const calculateTotal = () => {
    const subtotal = product.price;
    const discountAmount = subtotal * discount;
    const tax = (subtotal - discountAmount) * 0.08; // 8% tax
    return {
      subtotal,
      discount: discountAmount,
      tax,
      total: subtotal - discountAmount + tax
    };
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
      
      // Call success callback after showing success
      setTimeout(() => {
        onSuccess && onSuccess(product);
        onClose();
        setStep(1); // Reset for next time
      }, 3000);
    }, 2000);
  };

  const pricing = calculateTotal();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-50 via-purple-50 to-pink-50 p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 && 'Secure Checkout'}
                {step === 2 && 'Processing Payment'}
                {step === 3 && 'Purchase Complete!'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center space-x-2">
              <div className={`w-1/3 h-2 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-200'}`} />
              <div className={`w-1/3 h-2 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'}`} />
              <div className={`w-1/3 h-2 rounded-full ${step >= 3 ? 'bg-gradient-to-r from-pink-500 to-cyan-500' : 'bg-gray-200'}`} />
            </div>
          </div>

          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {/* Step 1: Checkout Form */}
            {step === 1 && (
              <div className="p-6 space-y-6">
                {/* Product Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <SafeIcon icon={FiGift} className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Promo Code</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2 text-green-600 text-sm flex items-center space-x-1">
                      <SafeIcon icon={FiPercent} className="w-4 h-4" />
                      <span>{discount * 100}% discount applied!</span>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
                    <span>Payment Method</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                        paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-gray-700" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded"></div>
                      <span className="font-medium">PayPal</span>
                    </button>
                  </div>
                </div>

                {/* Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${pricing.subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount * 100}%)</span>
                        <span>-${pricing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">${pricing.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-600">${pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-green-700">
                    <SafeIcon icon={FiShield} className="w-5 h-5" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>

                {/* Complete Purchase Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiLock} className="w-5 h-5" />
                  <span>Complete Purchase - ${pricing.total.toFixed(2)}</span>
                </motion.button>
              </div>
            )}

            {/* Step 2: Processing */}
            {step === 2 && (
              <div className="p-12 text-center">
                <div className="bg-gradient-to-r from-cyan-100 to-purple-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Payment</h3>
                <p className="text-gray-600">Please wait while we securely process your payment...</p>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="p-12 text-center">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Purchase Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. You can now download your digital product.
                </p>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">Ready for download</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
                    >
                      <SafeIcon icon={FiDownload} className="w-5 h-5" />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CheckoutModal;