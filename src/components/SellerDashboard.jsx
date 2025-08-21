import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit3, FiTrash2, FiEye, FiDollarSign, FiDownload, FiUsers, FiTrendingUp, FiPackage, FiSettings, FiBarChart3, FiCalendar } = FiIcons;

function SellerDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Logo Pack',
      price: 49,
      sales: 156,
      revenue: 7644,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Social Media Templates',
      price: 29,
      sales: 89,
      revenue: 2581,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Brand Identity Kit',
      price: 79,
      sales: 67,
      revenue: 5293,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const stats = {
    totalRevenue: 15518,
    totalSales: 312,
    activeProducts: 2,
    pendingProducts: 1,
    monthlyGrowth: 23.5
  };

  const recentSales = [
    { id: 1, product: 'Premium Logo Pack', buyer: 'John D.', amount: 49, date: '2 hours ago' },
    { id: 2, product: 'Social Media Templates', buyer: 'Sarah M.', amount: 29, date: '5 hours ago' },
    { id: 3, product: 'Premium Logo Pack', buyer: 'Mike R.', amount: 49, date: '1 day ago' },
    { id: 4, product: 'Social Media Templates', buyer: 'Emma L.', amount: 29, date: '1 day ago' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: FiBarChart3 },
    { id: 'products', name: 'Products', icon: FiPackage },
    { id: 'sales', name: 'Sales', icon: FiDollarSign },
    { id: 'analytics', name: 'Analytics', icon: FiTrendingUp },
    { id: 'settings', name: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Seller'}! 👋
          </h1>
          <p className="text-gray-600">Manage your products and track your sales performance</p>
        </div>

        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalSales}</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <SafeIcon icon={FiPackage} className="w-8 h-8 text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.activeProducts}</div>
              <div className="text-sm text-gray-600">Active Products</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <SafeIcon icon={FiCalendar} className="w-8 h-8 text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pendingProducts}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
            >
              <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-cyan-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{Math.round(stats.totalRevenue / stats.totalSales)}</div>
              <div className="text-sm text-gray-600">Avg. Sale Value</div>
            </motion.div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Sales */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Sales</h3>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-semibold text-gray-900">{sale.product}</div>
                          <div className="text-sm text-gray-600">Sold to {sale.buyer}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">${sale.amount}</div>
                          <div className="text-sm text-gray-500">{sale.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">My Products</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
                  >
                    <SafeIcon icon={FiPlus} className="w-5 h-5" />
                    <span>Add Product</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{product.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600 mb-4">${product.price}</div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{product.sales}</div>
                            <div className="text-xs text-gray-600">Sales</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">${product.revenue}</div>
                            <div className="text-xs text-gray-600">Revenue</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                          >
                            <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center justify-center space-x-1"
                          >
                            <SafeIcon icon={FiEye} className="w-4 h-4" />
                            <span>View</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'sales' || activeTab === 'analytics' || activeTab === 'settings') && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 text-center">
                <SafeIcon icon={FiSettings} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  {activeTab === 'sales' && 'Detailed sales analytics and reporting tools'}
                  {activeTab === 'analytics' && 'Advanced analytics and performance metrics'}
                  {activeTab === 'settings' && 'Account settings and preferences'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;