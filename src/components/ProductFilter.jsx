import React from 'react';
import { motion } from 'framer-motion';

function ProductFilter({ categories, activeCategory, onCategoryChange, searchTerm, onSearchChange }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Search */}
        <div className="w-full lg:w-1/3">
          <input
            type="text"
            placeholder="Search digital products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;