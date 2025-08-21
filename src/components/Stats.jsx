import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    number: '50K+',
    label: 'Happy Customers',
    description: 'Worldwide community'
  },
  {
    number: '500+',
    label: 'Digital Products',
    description: 'Premium designs'
  },
  {
    number: '99%',
    label: 'Satisfaction Rate',
    description: 'Customer approved'
  },
  {
    number: '24/7',
    label: 'Support',
    description: 'Always available'
  }
];

function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Novus Crew for their digital streetwear needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1 text-white">
                {stat.label}
              </div>
              <div className="text-sm text-gray-300">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;