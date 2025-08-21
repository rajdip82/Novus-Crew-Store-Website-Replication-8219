import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiShoppingCart, FiSearch, FiTrendingUp } = FiIcons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('/')}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              NOVUS CREW
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => navigateTo('/')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </button>
            <button onClick={() => navigateTo('/store')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Digital Store
            </button>
            <button onClick={() => navigateTo('/nc-seller')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative">
              <span className="flex items-center space-x-1">
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                <span>NC Seller</span>
              </span>
              <span className="absolute -top-1 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px] font-semibold">
                NEW
              </span>
            </button>
            <button onClick={() => navigateTo('/')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              About
            </button>
            <button onClick={() => navigateTo('/')} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <SafeIcon icon={FiSearch} className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
              <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>

            {/* Clerk Authentication */}
            <div className="flex items-center space-x-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  >
                    Sign In
                  </motion.button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center space-x-3">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full ring-2 ring-purple-200 hover:ring-purple-300 transition-all"
                      }
                    }}
                    showName={false}
                  />
                </div>
              </SignedIn>
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
              <button onClick={() => navigateTo('/')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">
                Home
              </button>
              <button onClick={() => navigateTo('/store')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">
                Digital Store
              </button>
              <button onClick={() => navigateTo('/nc-seller')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">
                <span className="flex items-center space-x-2">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                  <span>NC Seller</span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</span>
                </span>
              </button>
              <button onClick={() => navigateTo('/')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">
                About
              </button>
              <button onClick={() => navigateTo('/')} className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium">
                Contact
              </button>
              
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <SafeIcon icon={FiSearch} className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
                  <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                </button>
              </div>

              {/* Mobile Clerk Authentication */}
              <div className="pt-4 border-t border-gray-100">
                <SignedOut>
                  <div className="flex flex-col space-y-2">
                    <SignInButton mode="modal">
                      <button className="w-full text-left py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full py-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                
                <SignedIn>
                  <div className="flex items-center space-x-3 py-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 rounded-full ring-2 ring-purple-200"
                        }
                      }}
                      showName={true}
                    />
                  </div>
                </SignedIn>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default Header;