import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiDownload, FiStar } = FiIcons;

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-200 to-purple-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-200 to-cyan-200 rounded-full opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-100 to-purple-100 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                <SafeIcon icon={FiStar} className="w-4 h-4" />
                <span>Premium Digital Products</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Digital
                </span>
                <span className="block text-gray-700">Streetwear</span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                  Revolution
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Download premium digital assets, graphics, and design templates for your streetwear brand. 
                Instant access, commercial license included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/store')}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
              >
                <SafeIcon icon={FiDownload} className="w-5 h-5" />
                <span>Browse Digital Store</span>
              </motion.button>

              {/* Dynamic CTA based on auth state */}
              <SignedOut>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-purple-300 bg-white/50 backdrop-blur-sm text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Join Free</span>
                    <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/store')}
                  className="border-2 border-purple-300 bg-white/50 backdrop-blur-sm text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2"
                >
                  <span>My Downloads</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </motion.button>
              </SignedIn>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-gray-600">Digital Assets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Digital Streetwear Design"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 z-20 border border-cyan-200"
            >
              <div className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Instant Download
              </div>
              <div className="text-xs text-gray-600">High Resolution</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-8 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-4 z-20"
            >
              <div className="text-sm font-semibold">Commercial License</div>
              <div className="text-xs opacity-80">Unlimited Usage</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -right-6 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-2xl shadow-lg p-3 z-20"
            >
              <div className="text-xs font-semibold">New Release</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;