import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignUpButton, useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import CheckoutModal from './CheckoutModal';
import * as FiIcons from 'react-icons/fi';
import { digitalProducts } from '../data/products';

const { FiArrowLeft, FiHeart, FiShoppingCart, FiDownload, FiStar, FiCheck, FiClock, FiUsers, FiLock, FiShare2, FiEye, FiThumbsUp } = FiIcons;

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = digitalProducts.find(p => p.id === parseInt(id)) || digitalProducts[0];

  // Mock additional product images
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ];

  const handlePurchase = () => {
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = (purchasedProduct) => {
    console.log('Purchase successful:', purchasedProduct);
    // Handle successful purchase
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const relatedProducts = digitalProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 hover:shadow-md"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="aspect-square bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        selectedImageIndex === index 
                          ? 'bg-white shadow-lg' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-purple-500 shadow-lg' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
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
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-gray-100">
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent">
                    {Math.floor(product.downloads * 0.85)}
                  </div>
                  <div className="text-sm text-gray-600">Reviews</div>
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
                <div className="flex items-center justify-between">
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

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-xl border transition-all ${
                        isWishlisted 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <SafeIcon icon={FiHeart} className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="p-3 rounded-xl border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      <SafeIcon icon={FiShare2} className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon
                        key={i}
                        icon={FiStar}
                        className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.9 • {Math.floor(product.downloads * 0.85)} reviews)</span>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Duration for subscriptions */}
                {product.duration && (
                  <div className="flex items-center space-x-2 text-purple-600 bg-purple-50 px-4 py-2 rounded-xl border border-purple-200">
                    <SafeIcon icon={FiClock} className="w-5 h-5" />
                    <span className="font-medium">Duration: {product.duration}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
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
                      onClick={handlePurchase}
                      className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
                    >
                      <SafeIcon icon={FiShoppingCart} className="w-5 h-5" />
                      <span>Buy Now - ${product.price}</span>
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
                        <span>Sign Up to Purchase</span>
                      </motion.button>
                    </SignUpButton>
                  </SignedOut>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full border-2 border-purple-300 bg-white/50 backdrop-blur-sm text-purple-700 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-50 transition-all"
                  >
                    <SafeIcon icon={FiEye} className="w-5 h-5" />
                    <span>Preview</span>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="w-6 h-6 text-green-500" />
                    <span>What's Included</span>
                  </h3>
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
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-6 h-6 text-purple-600" />
                  <span>Available Formats</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.formats.map((format) => (
                    <span
                      key={format}
                      className="bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-4 py-2 rounded-xl font-medium border border-purple-200 hover:shadow-md transition-shadow"
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
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                  Related Products
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100"
                  >
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">${relatedProduct.price}</span>
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-500">4.9</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        product={product}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
}

export default ProductPage;