import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSun, FiMoon } = FiIcons;

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-xl transition-all duration-300 overflow-hidden
        ${isDark 
          ? 'bg-gray-800/90 hover:bg-gray-700/90 border border-gray-600/50' 
          : 'bg-white/90 hover:bg-gray-50 border border-gray-200/50 shadow-sm'
        }
        backdrop-blur-sm
      `}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient effect */}
      <motion.div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20' 
            : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
        }`}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon container */}
      <div className="relative z-10">
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
          className="flex items-center justify-center w-5 h-5"
        >
          {isDark ? (
            <SafeIcon 
              icon={FiMoon} 
              className="w-5 h-5 text-indigo-300" 
            />
          ) : (
            <SafeIcon 
              icon={FiSun} 
              className="w-5 h-5 text-amber-600" 
            />
          )}
        </motion.div>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          isDark 
            ? 'bg-indigo-400/30' 
            : 'bg-yellow-400/30'
        }`}
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: [0, 1.5], 
          opacity: [0, 1, 0] 
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}

export default ThemeToggle;