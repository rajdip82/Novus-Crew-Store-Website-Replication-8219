import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiEye, FiUser, FiMail, FiCalendar, FiTag, FiDollarSign, FiPackage, FiUsers, FiTrendingUp, FiFilter } = FiIcons;

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('applications');
  const [filterStatus, setFilterStatus] = useState('all');

  const [applications, setApplications] = useState([
    {
      id: 1,
      businessName: 'Creative Studio Pro',
      applicantName: 'Sarah Johnson',
      email: 'sarah@creativestudio.com',
      businessType: 'small-business',
      categories: ['Design Templates', 'Digital Art', 'Branding'],
      experience: 'experienced',
      expectedRevenue: '2000-5000',
      status: 'pending',
      appliedDate: '2024-01-15',
      description: 'We create premium design templates and digital assets for modern businesses. Our focus is on clean, professional designs that help brands stand out.',
      website: 'https://creativestudio.com'
    },
    {
      id: 2,
      businessName: 'Tech Tools Inc',
      applicantName: 'Michael Chen',
      email: 'mike@techtools.com',
      businessType: 'company',
      categories: ['Software & Apps', 'Web Tools', 'AI Tools'],
      experience: 'expert',
      expectedRevenue: '5000+',
      status: 'approved',
      appliedDate: '2024-01-12',
      description: 'Leading provider of productivity software and AI-powered tools for businesses and creators.',
      website: 'https://techtools.com'
    },
    {
      id: 3,
      businessName: 'Music Maker',
      applicantName: 'David Rodriguez',
      email: 'david@musicmaker.com',
      businessType: 'individual',
      categories: ['Music & Audio'],
      experience: 'intermediate',
      expectedRevenue: '500-2000',
      status: 'rejected',
      appliedDate: '2024-01-10',
      description: 'Professional music producer creating beats, loops, and audio samples for content creators.',
      website: ''
    }
  ]);

  const approveApplication = (id) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'approved' } : app
      )
    );
  };

  const rejectApplication = (id) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: 'rejected' } : app
      )
    );
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    approvedSellers: applications.filter(app => app.status === 'approved').length,
    rejectedApplications: applications.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage seller applications and marketplace operations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
          >
            <SafeIcon icon={FiPackage} className="w-8 h-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
          >
            <SafeIcon icon={FiCalendar} className="w-8 h-8 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
          >
            <SafeIcon icon={FiUsers} className="w-8 h-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.approvedSellers}</div>
            <div className="text-sm text-gray-600">Active Sellers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
          >
            <SafeIcon icon={FiX} className="w-8 h-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.rejectedApplications}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SafeIcon icon={FiFilter} className="w-5 h-5 mr-2" />
              Seller Applications
            </h3>
            
            <div className="flex space-x-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{application.businessName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <SafeIcon icon={FiUser} className="w-4 h-4" />
                        <span>{application.applicantName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <SafeIcon icon={FiMail} className="w-4 h-4" />
                        <span>{application.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{application.appliedDate}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{application.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Business Type</div>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm capitalize">
                          {application.businessType.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Experience</div>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm capitalize">
                          {application.experience}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Product Categories</div>
                      <div className="flex flex-wrap gap-2">
                        {application.categories.map((category) => (
                          <span
                            key={category}
                            className="bg-gradient-to-r from-cyan-100 to-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm border border-purple-200"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                        <span>Expected: ${application.expectedRevenue}/month</span>
                      </div>
                      {application.website && (
                        <a
                          href={application.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                        >
                          <SafeIcon icon={FiEye} className="w-4 h-4" />
                          <span>View Website</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {application.status === 'pending' && (
                    <div className="flex space-x-3 ml-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => approveApplication(application.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiCheck} className="w-5 h-5" />
                        <span>Approve</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => rejectApplication(application.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiX} className="w-5 h-5" />
                        <span>Reject</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600">
                {filterStatus === 'all' 
                  ? 'No seller applications have been submitted yet.'
                  : `No ${filterStatus} applications found.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;