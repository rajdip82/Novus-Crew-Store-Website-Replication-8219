import React from 'react';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiDownload } = FiIcons;

function ProtectedContent({ children, title = "Premium Content", description = "Sign up to access this premium content" }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      
      <SignedOut>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiLock} className="w-8 h-8 text-purple-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          
          <SignUpButton mode="modal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiDownload} className="w-5 h-5" />
              <span>Sign Up for Free Access</span>
            </motion.button>
          </SignUpButton>
          
          <p className="text-sm text-gray-500 mt-4">
            Free account • Instant access • No credit card required
          </p>
        </motion.div>
      </SignedOut>
    </>
  );
}

export default ProtectedContent;