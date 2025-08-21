import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTruck, FiShield, FiRefreshCw, FiAward, FiUsers, FiGlobe, FiTrendingUp, FiHeart, FiStar, FiCheck } = FiIcons;

const features = [
  {
    icon: FiTruck,
    title: 'Instant Download',
    description: 'Get your digital products immediately after purchase - no waiting required'
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure payment with SSL encryption and fraud protection'
  },
  {
    icon: FiRefreshCw,
    title: 'Lifetime Updates',
    description: 'Free updates and new versions for all purchased digital products'
  },
  {
    icon: FiAward,
    title: 'Premium Quality',
    description: 'Curated collection of high-quality digital assets from verified creators'
  }
];

const achievements = [
  {
    icon: FiUsers,
    number: '50K+',
    title: 'Happy Customers',
    description: 'Creators worldwide trust our platform'
  },
  {
    icon: FiGlobe,
    number: '180+',
    title: 'Countries Served',
    description: 'Global reach with local support'
  },
  {
    icon: FiTrendingUp,
    number: '2M+',
    title: 'Downloads',
    description: 'Digital products delivered successfully'
  },
  {
    icon: FiHeart,
    number: '99%',
    title: 'Satisfaction Rate',
    description: 'Customer approved quality'
  }
];

const team = [
  {
    name: 'Alex Rodriguez',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Visionary leader with 10+ years in digital marketplace innovation'
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Award-winning designer specializing in streetwear and digital art'
  },
  {
    name: 'Marcus Johnson',
    role: 'Tech Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Full-stack developer passionate about creator economy platforms'
  }
];

const values = [
  {
    title: 'Creator First',
    description: 'We prioritize creator success with fair revenue sharing and comprehensive support.',
    icon: FiUsers
  },
  {
    title: 'Quality Standards',
    description: 'Every product undergoes rigorous quality checks to ensure premium standards.',
    icon: FiAward
  },
  {
    title: 'Innovation Focus',
    description: 'Constantly evolving our platform with cutting-edge features and technologies.',
    icon: FiTrendingUp
  },
  {
    title: 'Community Driven',
    description: 'Building a supportive ecosystem where creators and customers thrive together.',
    icon: FiHeart
  }
];

function About() {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <SafeIcon icon={FiStar} className="w-4 h-4" />
            <span>Trusted by Creators Worldwide</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Novus Crew
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Founded in 2020, Novus Crew represents the evolution of digital streetwear culture. 
            We believe that creativity should be accessible, profitable, and inspiring for everyone.
          </p>
        </motion.div>

        {/* Main Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              Empowering the Creator Economy
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Our carefully curated marketplace connects talented digital artists with businesses and 
              individuals seeking premium design assets. From streetwear graphics to AI tools, 
              we provide a platform where creativity meets commerce.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With over 50,000 satisfied customers and 500+ active creators, we've built more than 
              just a marketplace - we've created a thriving community that celebrates digital innovation 
              and artistic excellence.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  70%
                </div>
                <div className="text-sm text-gray-600">Revenue to Creators</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  24/7
                </div>
                <div className="text-sm text-gray-600">Customer Support</div>
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
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Digital Design Studio"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Creative Process"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Digital Art Creation"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Design Templates"
                  className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-2xl shadow-lg p-4 z-10"
            >
              <div className="text-sm font-semibold">Active Creators</div>
              <div className="text-2xl font-bold">500+</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-4 z-10"
            >
              <div className="text-sm font-semibold">Monthly Downloads</div>
              <div className="text-2xl font-bold">50K+</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and community growth
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={achievement.icon} className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {achievement.number}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveValue(index)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeValue === index
                    ? 'bg-gradient-to-br from-cyan-50 to-purple-50 border-purple-200 shadow-lg'
                    : 'bg-white/80 backdrop-blur-md border-gray-100 hover:shadow-md'
                }`}
              >
                <SafeIcon 
                  icon={value.icon} 
                  className={`w-8 h-8 mb-4 ${
                    activeValue === index ? 'text-purple-600' : 'text-gray-600'
                  }`} 
                />
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Novus Crew's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover ring-4 ring-purple-100"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="bg-gradient-to-r from-cyan-100 to-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={feature.icon} className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;