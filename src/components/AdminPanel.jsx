import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiCheck, FiX, FiEye, FiUser, FiMail, FiCalendar, FiTag, FiDollarSign, 
  FiPackage, FiUsers, FiTrendingUp, FiFilter, FiEdit3, FiTrash2, FiPlus,
  FiBarChart3, FiSettings, FiShield, FiGlobe, FiCreditCard, FiDownload,
  FiFileText, FiImage, FiUpload, FiSave, FiRefreshCw, FiAlertCircle
} = FiIcons;

function AdminPanel() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with real API calls
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
      description: 'We create premium design templates and digital assets for modern businesses.',
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
      description: 'Leading provider of productivity software and AI-powered tools.',
      website: 'https://techtools.com'
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Logo Pack',
      seller: 'Creative Studio Pro',
      price: 49,
      sales: 156,
      revenue: 7644,
      status: 'active',
      category: 'Design Templates',
      createdDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'AI Tool Suite',
      seller: 'Tech Tools Inc',
      price: 199,
      sales: 89,
      revenue: 17711,
      status: 'active',
      category: 'Software',
      createdDate: '2024-01-08'
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      joinDate: '2024-01-01',
      purchases: 5,
      totalSpent: 245,
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@creativestudio.com',
      role: 'seller',
      joinDate: '2023-12-15',
      purchases: 2,
      totalSpent: 89,
      status: 'active'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      product: 'Premium Logo Pack',
      amount: 49,
      status: 'completed',
      date: '2024-01-15',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      product: 'AI Tool Suite',
      amount: 199,
      status: 'pending',
      date: '2024-01-14',
      paymentMethod: 'PayPal'
    }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Novus Crew',
    siteDescription: 'Premium Digital Streetwear Store',
    maintenanceMode: false,
    allowRegistrations: true,
    commissionRate: 30,
    currency: 'USD',
    paymentMethods: ['stripe', 'paypal'],
    emailNotifications: true
  });

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

  const updateProductStatus = (id, status) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, status } : product
      )
    );
  };

  const updateUserStatus = (id, status) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, status } : user
      )
    );
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const saveSiteSettings = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const filteredApplications = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': case 'active': case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': case 'inactive': case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const dashboardStats = {
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalUsers: users.length,
    totalOrders: orders.length,
    pendingApplications: applications.filter(app => app.status === 'pending').length,
    activeProducts: products.filter(p => p.status === 'active').length,
    completedOrders: orders.filter(o => o.status === 'completed').length
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FiBarChart3 },
    { id: 'applications', name: 'Applications', icon: FiFileText },
    { id: 'products', name: 'Products', icon: FiPackage },
    { id: 'users', name: 'Users', icon: FiUsers },
    { id: 'orders', name: 'Orders', icon: FiCreditCard },
    { id: 'settings', name: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <SafeIcon icon={FiShield} className="inline w-8 h-8 mr-3 text-purple-600" />
            Admin Panel
          </h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Manage your marketplace operations.</p>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-gray-100 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">${dashboardStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiCreditCard} className="w-8 h-8 text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardStats.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiFileText} className="w-8 h-8 text-orange-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardStats.pendingApplications}</div>
                <div className="text-sm text-gray-600">Pending Applications</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiPackage} className="w-8 h-8 text-cyan-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardStats.activeProducts}</div>
                <div className="text-sm text-gray-600">Active Products</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100"
              >
                <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{dashboardStats.completedOrders}</div>
                <div className="text-sm text-gray-600">Completed Orders</div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-600">{order.customer}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${order.amount}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Products</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.sales} sales</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">${product.revenue}</div>
                        <div className="text-sm text-gray-500">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <SafeIcon icon={FiFilter} className="w-5 h-5 mr-2" />
                  Seller Applications ({filteredApplications.length})
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
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{application.businessName}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                        <p className="text-gray-700 mb-4">{application.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
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
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">All Products ({products.length})</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Product</span>
              </motion.button>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Seller</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sales</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.category}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{product.seller}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">${product.price}</td>
                        <td className="px-6 py-4 text-gray-700">{product.sales}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">${product.revenue}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <SafeIcon icon={FiEye} className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateProductStatus(product.id, product.status === 'active' ? 'inactive' : 'active')}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              <SafeIcon icon={product.status === 'active' ? FiX : FiCheck} className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">All Users ({users.length})</h3>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purchases</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Spent</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === 'seller' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{user.joinDate}</td>
                        <td className="px-6 py-4 text-gray-700">{user.purchases}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">${user.totalSpent}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <SafeIcon icon={FiEye} className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              <SafeIcon icon={user.status === 'active' ? FiX : FiCheck} className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">All Orders ({orders.length})</h3>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                        <td className="px-6 py-4 text-gray-700">{order.product}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">${order.amount}</td>
                        <td className="px-6 py-4 text-gray-700">{order.paymentMethod}</td>
                        <td className="px-6 py-4 text-gray-700">{order.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <SafeIcon icon={FiEye} className="w-4 h-4" />
                            </button>
                            {order.status === 'pending' && (
                              <button 
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                className="text-green-600 hover:text-green-800"
                              >
                                <SafeIcon icon={FiCheck} className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Site Settings</h3>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={siteSettings.currency}
                      onChange={(e) => setSiteSettings({...siteSettings, currency: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                    <input
                      type="number"
                      value={siteSettings.commissionRate}
                      onChange={(e) => setSiteSettings({...siteSettings, commissionRate: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                    <button
                      onClick={() => setSiteSettings({...siteSettings, maintenanceMode: !siteSettings.maintenanceMode})}
                      className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                        siteSettings.maintenanceMode ? 'bg-red-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        siteSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Allow Registrations</span>
                    <button
                      onClick={() => setSiteSettings({...siteSettings, allowRegistrations: !siteSettings.allowRegistrations})}
                      className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                        siteSettings.allowRegistrations ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        siteSettings.allowRegistrations ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                    <button
                      onClick={() => setSiteSettings({...siteSettings, emailNotifications: !siteSettings.emailNotifications})}
                      className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                        siteSettings.emailNotifications ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        siteSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      } mt-1`} />
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveSiteSettings}
                  disabled={loading}
                  className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  {loading ? (
                    <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin" />
                  ) : (
                    <SafeIcon icon={FiSave} className="w-5 h-5" />
                  )}
                  <span>{loading ? 'Saving...' : 'Save Settings'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;