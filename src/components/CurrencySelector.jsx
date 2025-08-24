import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../hooks/useCurrency';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiChevronDown, FiCheck } = FiIcons;

function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(curr =>
    curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCurrencySelect = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white/20 transition-all"
      >
        <SafeIcon icon={FiGlobe} className="w-4 h-4" />
        <span className="text-sm font-medium">{currency.code}</span>
        <SafeIcon 
          icon={FiChevronDown} 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  autoFocus
                />
              </div>

              {/* Currency List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((curr) => (
                    <motion.button
                      key={curr.code}
                      whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                      onClick={() => handleCurrencySelect(curr)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{curr.symbol}</span>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {curr.code}
                          </div>
                          <div className="text-sm text-gray-600">
                            {curr.name}
                          </div>
                        </div>
                      </div>
                      {currency.code === curr.code && (
                        <SafeIcon icon={FiCheck} className="w-5 h-5 text-purple-600" />
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No currencies found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-500 text-center">
                  Prices are converted from USD at current exchange rates
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CurrencySelector;