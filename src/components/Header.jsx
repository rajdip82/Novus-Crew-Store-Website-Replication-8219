import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiShoppingCart, FiSearch, FiTrendingUp, FiShield } = FiIcons;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  // 🔐 PRODUCTION ADMIN ACCESS
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'admin@novuscrew.com' || 
                  user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg' 
          : 'bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer z-10"
            onClick={() => navigateTo('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1
              className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent' 
                  : 'text-white drop-shadow-lg'
              }`}
            >
              NOVUS CREW
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
                
                {/* Animated underline */}
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

            {/* Admin Panel Link - Only visible for admin users */}
            <SignedIn>
              {isAdmin && (
                <motion.button
                  onClick={() => navigateTo('/admin')}
                  className={`relative font-medium transition-colors group ${
                    scrolled 
                      ? 'text-gray-700 hover:text-red-600' 
                      : 'text-white/90 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Admin Panel"
                >
                  <span className="flex items-center space-x-1">
                    <SafeIcon icon={FiShield} className="w-4 h-4" />
                    <span>Admin</span>
                  </span>
                  
                  <motion.span
                    className="absolute -top-2 -right-6 bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full text-[10px] font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ADMIN
                  </motion.span>
                  
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              )}
            </SignedIn>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
          <div className="lg:hidden">
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
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 mt-2 rounded-b-2xl overflow-hidden shadow-lg"
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

                {/* Mobile Admin Panel Link */}
                <SignedIn>
                  {isAdmin && (
                    <motion.button
                      onClick={() => navigateTo('/admin')}
                      className="block w-full text-left text-gray-700 hover:text-red-600 font-medium px-6 py-3 hover:bg-red-50 transition-all rounded-xl mx-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <span className="flex items-center space-x-2">
                        <SafeIcon icon={FiShield} className="w-4 h-4" />
                        <span>Admin Panel</span>
                        <span className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                          ADMIN
                        </span>
                      </span>
                    </motion.button>
                  )}
                </SignedIn>
                
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 mx-4">
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