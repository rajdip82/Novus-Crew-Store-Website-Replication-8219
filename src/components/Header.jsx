import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import CurrencySelector from './CurrencySelector';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiShoppingCart, FiSearch, FiTrendingUp } = FiIcons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Digital Store', path: '/store' },
    { name: 'NC Seller', path: '/nc-seller', badge: 'NEW' },
    { name: 'About', path: '/' },
    { name: 'Contact', path: '/' }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-lg' 
          : 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Enhanced visibility */}
          <motion.div
            className="flex-shrink-0 cursor-pointer z-50 relative"
            onClick={() => navigateTo('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1
              className="text-2xl lg:text-3xl font-black transition-all duration-300"
              style={{
                fontFamily: '"Inter", "SF Pro Display", -apple-system, system-ui, sans-serif',
                fontWeight: '900',
                letterSpacing: '-0.02em',
                color: scrolled ? '#1f2937' : '#ffffff',
                textShadow: scrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.5)',
                WebkitTextStroke: scrolled ? 'none' : '0.5px rgba(255,255,255,0.8)',
                position: 'relative',
                zIndex: 100,
              }}
            >
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 text-transparent"
                  style={{
                    background: scrolled ? 'linear-gradient(135deg, #0891b2, #7c3aed, #ec4899)' : 'rgba(255,255,255,0.95)',
                    WebkitBackgroundClip: scrolled ? 'text' : 'none',
                    backgroundClip: scrolled ? 'text' : 'none',
                    borderRadius: '4px',
                    padding: scrolled ? '0' : '2px 4px',
                  }}
                >
                  NOVUS
                </span>
                <span
                  className="relative z-10"
                  style={{
                    background: scrolled ? 'linear-gradient(135deg, #0891b2, #7c3aed, #ec4899)' : 'transparent',
                    WebkitBackgroundClip: scrolled ? 'text' : 'none',
                    backgroundClip: scrolled ? 'text' : 'none',
                    WebkitTextFillColor: scrolled ? 'transparent' : '#ffffff',
                    color: scrolled ? 'transparent' : '#ffffff',
                  }}
                >
                  NOVUS
                </span>
                <motion.span
                  className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                    scrolled 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : 'bg-gradient-to-r from-cyan-300 to-purple-300'
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              {' '}
              <span
                className="inline-block"
                style={{
                  background: scrolled ? 'linear-gradient(135deg, #7c3aed, #ec4899, #0891b2)' : 'transparent',
                  WebkitBackgroundClip: scrolled ? 'text' : 'none',
                  backgroundClip: scrolled ? 'text' : 'none',
                  WebkitTextFillColor: scrolled ? 'transparent' : '#ffffff',
                  color: scrolled ? 'transparent' : '#ffffff',
                }}
              >
                CREW
              </span>
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => navigateTo(item.path)}
                className={`relative font-medium transition-colors group ${
                  scrolled 
                    ? 'text-gray-700 hover:text-purple-600' 
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="flex items-center space-x-1">
                  {item.name === 'NC Seller' && (
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                  )}
                  <span>{item.name}</span>
                </span>
                {item.badge && (
                  <motion.span
                    className="absolute -top-2 -right-8 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full text-[10px] font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {item.badge}
                  </motion.span>
                )}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full ${
                    scrolled 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : 'bg-gradient-to-r from-white to-white/80'
                  }`}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <motion.button
              className={`p-2 transition-colors rounded-full ${
                scrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <SafeIcon icon={FiSearch} className="w-5 h-5" />
            </motion.button>

            {/* Cart Button */}
            <motion.button
              className={`p-2 transition-colors relative rounded-full ${
                scrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
              <motion.span
                className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                0
              </motion.span>
            </motion.button>

            {/* Currency Selector */}
            <CurrencySelector />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 font-medium transition-all rounded-xl ${
                      scrolled 
                        ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50' 
                        : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    Sign In
                  </motion.button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9 rounded-full ring-2 ring-purple-200 hover:ring-purple-300 transition-all"
                      }
                    }}
                    showName={false}
                  />
                </motion.div>
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-colors rounded-full ${
                scrolled 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-white/90 hover:text-white bg-white/10 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 mt-2 rounded-b-2xl overflow-hidden shadow-xl"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => navigateTo(item.path)}
                    className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium px-6 py-3 hover:bg-purple-50 transition-all rounded-xl mx-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <span className="flex items-center space-x-2">
                      {item.name === 'NC Seller' && (
                        <SafeIcon icon={FiTrendingUp} className="w-4 h-4" />
                      )}
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </motion.button>
                ))}

                {/* Mobile Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mx-4">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiSearch} className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative bg-gray-100 hover:bg-gray-200 rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        0
                      </span>
                    </motion.button>
                  </div>
                  <CurrencySelector />
                </div>

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200 mx-4">
                  <SignedOut>
                    <div className="flex flex-col space-y-2">
                      <SignInButton mode="modal">
                        <button className="w-full text-left py-3 text-gray-700 hover:text-purple-600 font-medium transition-colors">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="w-full py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
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
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;