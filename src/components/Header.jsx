import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import AuthModal from './AuthModal';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } = FiIcons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                NOVUS CREW
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Digital Store</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                <SafeIcon icon={FiSearch} className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => openAuthModal('signin')}
                className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <SafeIcon icon={FiUser} className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
                <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </button>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('signin')}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Sign In
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-4">
                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Home</a>
                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Digital Store</a>
                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">About</a>
                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Contact</a>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                    <SafeIcon icon={FiSearch} className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
                    <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                  </button>
                </div>

                <div className="flex flex-col space-y-2 pt-4">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="w-full text-left py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="w-full py-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}

export default Header;