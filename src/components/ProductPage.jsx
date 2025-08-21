import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignUpButton, useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { digitalProducts } from '../data/products';

const { FiArrowLeft, FiHeart, FiShoppingCart, FiDownload, FiStar, FiCheck, FiClock, FiUsers, FiLock } = FiIcons;

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1);
  
  const product = digitalProducts.find(p => p.id === parseInt(id)) || digitalProducts[0];

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log('Purchase:', { product: product.id, quantity, user: user?.id });
  };

  const handleDownload = () => {
    // Handle download logic here
    console.log('Download:', { product: product.id, user: user?.id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  {product.downloads}
                </div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-gray-100">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  4.9★
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold border border-purple-200">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    NEW
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Duration for subscriptions */}
              {product.duration && (
                <div className="flex items-center space-x-2 text-purple-600">
                  <SafeIcon icon={FiClock} className="w-5 h-5" />
                  <span className="font-medium">Duration: {product.duration}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <div className="text-center">
                      <span className="text-xl text-gray-500 line-through block">${product.originalPrice}</span>
                      <span className="text-sm text-green-600 font-semibold">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </div>
                  )}
                </div>
                
                {product.type === 'subscription' && (
                  <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200">
                    Subscription
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <SignedIn>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
                  >
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    <span>Download Now</span>
                  </motion.button>
                </SignedIn>

                <SignedOut>
                  <SignUpButton mode="modal">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
                    >
                      <SafeIcon icon={FiLock} className="w-5 h-5" />
                      <span>Sign Up to Download</span>
                    </motion.button>
                  </SignUpButton>
                </SignedOut>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border-2 border-purple-300 bg-white/50 backdrop-blur-sm text-purple-700 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-50 transition-all"
                >
                  <SafeIcon icon={FiHeart} className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </motion.button>
              </div>

              <SignedOut>
                <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-purple-700 text-center">
                    🎉 <strong>Free Account Required</strong> - Sign up to access all downloads instantly!
                  </p>
                </div>
              </SignedOut>
            </div>

            {/* Features */}
            {product.features && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* File Formats */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Formats</h3>
              <div className="flex flex-wrap gap-2">
                {product.formats.map((format) => (
                  <span
                    key={format}
                    className="bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-4 py-2 rounded-xl font-medium border border-purple-200"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            {(product.platforms || product.games || product.genres) && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {product.platforms && 'Supported Platforms'}
                  {product.games && 'Game Styles'}
                  {product.genres && 'Music Genres'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(product.platforms || product.games || product.genres || []).map((item) => (
                    <span
                      key={item}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;