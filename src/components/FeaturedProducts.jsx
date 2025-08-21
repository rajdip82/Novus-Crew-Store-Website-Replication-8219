import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiDownload, FiEye, FiFile } = FiIcons;

const products = [
  {
    id: 1,
    name: 'Urban Logo Pack',
    price: 29,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Logos',
    isNew: true,
    formats: ['AI', 'PSD', 'PNG'],
    downloads: 1240,
    type: 'digital'
  },
  {
    id: 2,
    name: 'Streetwear Graphics Bundle',
    price: 49,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Graphics',
    isNew: false,
    formats: ['AI', 'EPS', 'PNG', 'JPG'],
    downloads: 890,
    type: 'digital'
  },
  {
    id: 3,
    name: 'Social Media Templates',
    price: 19,
    originalPrice: 30,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Templates',
    isNew: true,
    formats: ['PSD', 'PNG'],
    downloads: 2100,
    type: 'digital'
  },
  {
    id: 4,
    name: 'Typography Collection',
    price: 35,
    originalPrice: 50,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Fonts',
    isNew: false,
    formats: ['TTF', 'OTF'],
    downloads: 650,
    type: 'digital'
  },
  {
    id: 5,
    name: 'Brand Identity Kit',
    price: 79,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Branding',
    isNew: true,
    formats: ['AI', 'PSD', 'PDF'],
    downloads: 420,
    type: 'digital'
  },
  {
    id: 6,
    name: 'Pattern Library',
    price: 25,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Patterns',
    isNew: false,
    formats: ['AI', 'PNG', 'SVG'],
    downloads: 980,
    type: 'digital'
  }
];

function ProductCard({ product, index }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
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
              SALE
            </span>
          )}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            DIGITAL
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeIcon icon={FiEye} className="w-4 h-4 text-gray-700" />
          </motion.button>
        </div>

        {/* Quick Download Button */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
            <span>Instant Download</span>
          </motion.button>
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
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
          {product.name}
        </h3>

        {/* File Formats */}
        <div className="flex items-center space-x-2 mb-4">
          <SafeIcon icon={FiFile} className="w-4 h-4 text-gray-400" />
          <div className="flex space-x-1">
            {product.formats.map((format) => (
              <span
                key={format}
                className="text-xs bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProducts() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Digital Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional-grade digital assets for your streetwear brand. 
            Instant download, commercial license included.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            Browse All Digital Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProducts;