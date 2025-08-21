import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiDownload, FiEye, FiFile, FiClock, FiUsers, FiStar, FiLock } = FiIcons;

function ProductCard({ product, index }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Software': FiDownload,
      'AI Tools': FiStar,
      'Gaming': FiUsers,
      'eBooks': FiFile,
      'Music': FiStar,
      'Video': FiStar,
      'Photography': FiEye,
      'Templates': FiFile,
      'Branding': FiStar,
      'NFT': FiStar,
      'Web Tools': FiStar,
      'Audio': FiStar,
      'Business': FiFile
    };
    return iconMap[category] || FiFile;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.originalPrice > product.price && (
            <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.type.toUpperCase()}
          </span>
        </div>

        {/* Category Icon */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md">
          <SafeIcon icon={getCategoryIcon(product.category)} className="w-4 h-4 text-gray-700" />
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <SignedIn>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Get Now</span>
              </motion.button>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SafeIcon icon={FiLock} className="w-4 h-4" />
                  <span>Sign Up</span>
                </motion.button>
              </SignUpButton>
            </SignedOut>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-md hover:bg-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">{product.category}</span>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <SafeIcon icon={FiDownload} className="w-3 h-3" />
            <span>{product.downloads}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Special Info */}
        {product.duration && (
          <div className="flex items-center space-x-1 mb-2 text-xs text-purple-600">
            <SafeIcon icon={FiClock} className="w-3 h-3" />
            <span>{product.duration}</span>
          </div>
        )}

        {/* File Formats */}
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiFile} className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {product.formats.slice(0, 3).map((format) => (
              <span
                key={format}
                className="text-xs bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200"
              >
                {format}
              </span>
            ))}
            {product.formats.length > 3 && (
              <span className="text-xs text-gray-500">+{product.formats.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {product.type === 'subscription' && (
            <span className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-2 py-1 rounded-full border border-green-200">
              Subscription
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;