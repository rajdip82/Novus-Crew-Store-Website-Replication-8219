import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignUpButton, useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiDollarSign, FiUsers, FiShoppingBag, FiCheck, FiUpload, FiUser, FiMail, FiPhone, FiGlobe, FiFileText, FiImage, FiTag, FiStar, FiAward, FiTarget, FiLock } = FiIcons;

function NCSellerPage() {
  const { user } = useUser();
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    businessName: '',
    businessType: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    experience: '',
    productCategories: [],
    sampleProducts: [],
    expectedMonthlyRevenue: '',
    marketingStrategy: ''
  });

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setApplicationData(prev => ({
      ...prev,
      productCategories: prev.productCategories.includes(category)
        ? prev.productCategories.filter(c => c !== category)
        : [...prev.productCategories, category]
    }));
  };

  const handleSubmitApplication = () => {
    console.log('Seller Application Submitted:', applicationData);
    // Handle application submission
  };

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Earn Up to 70% Revenue',
      description: 'Keep most of your earnings with our seller-friendly commission structure'
    },
    {
      icon: FiUsers,
      title: '50K+ Active Buyers',
      description: 'Reach our engaged community of digital product enthusiasts'
    },
    {
      icon: FiShoppingBag,
      title: 'Easy Product Management',
      description: 'Simple dashboard to upload, manage, and track your digital products'
    },
    {
      icon: FiTrendingUp,
      title: 'Marketing Support',
      description: 'Get featured in our newsletters, social media, and promotional campaigns'
    }
  ];

  const categories = [
    'Software & Apps',
    'Design Templates',
    'Digital Art',
    'Music & Audio',
    'Video Content',
    'eBooks & Guides',
    'Photography',
    'Gaming Assets',
    'Web Tools',
    'AI Tools',
    'NFT Collections',
    'Business Templates'
  ];

  const requirements = [
    'Original, high-quality digital products',
    'Commercial license or full ownership rights',
    'Professional product descriptions and images',
    'Responsive customer support',
    'Minimum 3 months business experience',
    'Valid business registration (if applicable)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <SafeIcon icon={FiStar} className="w-4 h-4" />
              <span>Now Accepting New Sellers</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Become an
              </span>
              <span className="block text-gray-700">NC Seller</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Join our exclusive marketplace and start selling your digital products to thousands of customers worldwide. 
              Earn up to 70% revenue share with full marketing support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedIn>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setApplicationStep(1)}
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
                >
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
                  <span>Apply to Sell</span>
                </motion.button>
              </SignedIn>

              <SignedOut>
                <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl transition-all"
                  >
                    <SafeIcon icon={FiLock} className="w-5 h-5" />
                    <span>Sign Up to Apply</span>
                  </motion.button>
                </SignUpButton>
              </SignedOut>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-300 bg-white/50 backdrop-blur-sm text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-gray-600">Active Sellers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                $2M+
              </div>
              <div className="text-gray-600">Paid to Sellers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent mb-2">
                70%
              </div>
              <div className="text-gray-600">Revenue Share</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Why Sell With Us?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the most creator-friendly digital marketplace with the best tools and highest payouts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <SafeIcon icon={benefit.icon} className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <SignedIn>
        <section className="py-20 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-lg"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Seller Application</h2>
                <p className="text-gray-600">Tell us about your business and products</p>
              </div>

              {applicationStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <SafeIcon icon={FiUser} className="w-6 h-6 mr-2 text-purple-600" />
                    Business Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={applicationData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                        placeholder="Your business or brand name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                      <select
                        value={applicationData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                      >
                        <option value="">Select business type</option>
                        <option value="individual">Individual Creator</option>
                        <option value="small-business">Small Business</option>
                        <option value="company">Company</option>
                        <option value="agency">Agency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                        placeholder="business@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={applicationData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                    <input
                      type="url"
                      value={applicationData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                    <textarea
                      value={applicationData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your business, products, and what makes you unique..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setApplicationStep(2)}
                      className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Next Step
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {applicationStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <SafeIcon icon={FiTag} className="w-6 h-6 mr-2 text-purple-600" />
                    Product Categories
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">What types of products do you sell?</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <motion.button
                          key={category}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategoryToggle(category)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                            applicationData.productCategories.includes(category)
                              ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white border-transparent'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={applicationData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                    >
                      <option value="">Select your experience</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="experienced">Experienced (3-5 years)</option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Monthly Revenue</label>
                    <select
                      value={applicationData.expectedMonthlyRevenue}
                      onChange={(e) => handleInputChange('expectedMonthlyRevenue', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all"
                    >
                      <option value="">Select expected revenue</option>
                      <option value="0-500">$0 - $500</option>
                      <option value="500-2000">$500 - $2,000</option>
                      <option value="2000-5000">$2,000 - $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Strategy</label>
                    <textarea
                      value={applicationData.marketingStrategy}
                      onChange={(e) => handleInputChange('marketingStrategy', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all resize-none"
                      placeholder="How do you plan to promote your products? What marketing channels will you use?"
                    />
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setApplicationStep(1)}
                      className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      Previous
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmitApplication}
                      className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                      <span>Submit Application</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </SignedIn>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Seller Requirements
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                To maintain our marketplace quality, all sellers must meet these requirements:
              </p>

              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200"
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiAward} className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality First</h3>
                <p className="text-gray-600 mb-6">
                  Our review process ensures only the highest quality products reach our customers. 
                  Applications are typically reviewed within 2-3 business days.
                </p>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
                  <div className="text-sm text-gray-600">Average approval time</div>
                  <div className="text-2xl font-bold text-purple-600">2-3 days</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Selling?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of successful sellers and start earning from your digital products today.
            </p>

            <SignedIn>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setApplicationStep(1)}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiTrendingUp} className="w-5 h-5" />
                <span>Apply Now</span>
              </motion.button>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center space-x-2"
                >
                  <SafeIcon icon={FiLock} className="w-5 h-5" />
                  <span>Sign Up to Apply</span>
                </motion.button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default NCSellerPage;