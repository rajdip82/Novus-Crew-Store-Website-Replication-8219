import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTruck, FiShield, FiRefreshCw, FiAward } = FiIcons;

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $100 worldwide'
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure payment with SSL encryption'
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy for all purchases'
  },
  {
    icon: FiAward,
    title: 'Premium Quality',
    description: 'Only the finest materials and craftsmanship'
  }
];

function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              About Novus Crew
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2020, Novus Crew represents the evolution of streetwear culture. 
              We believe that fashion should be an expression of individuality, comfort, and quality.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our carefully curated collection features premium materials, innovative designs, 
              and attention to detail that sets us apart in the urban fashion landscape.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <span className="text-gray-700 font-medium">Premium quality materials</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <span className="text-gray-700 font-medium">Sustainable manufacturing</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <span className="text-gray-700 font-medium">Innovative urban designs</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Fashion Store"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Fashion Design"
                className="rounded-lg shadow-lg mt-8"
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={feature.icon} className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;