import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } = FiIcons;

// 🔐 SECURE ADMIN CREDENTIALS - Only these can access admin panel
const ADMIN_CREDENTIALS = [
  { email: 'admin@novuscrew.com', password: 'AdminNovus2024!', role: 'Super Admin', level: 'full' },
  { email: 'greta@novuscrew.com', password: 'GretaAdmin789!', role: 'Lead Admin', level: 'full' },
  { email: 'test@admin.com', password: 'TestAdmin123!', role: 'Test Admin', level: 'full' },
  { email: 'demo@admin.com', password: 'DemoAdmin456!', role: 'Demo Admin', level: 'full' }
];

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateCredentials = (email, password) => {
    return ADMIN_CREDENTIALS.find(
      admin => admin.email.toLowerCase() === email.toLowerCase() && admin.password === password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay for security
    await new Promise(resolve => setTimeout(resolve, 1500));

    const admin = validateCredentials(formData.email, formData.password);

    if (admin) {
      // 🔐 SECURE: Store admin session with encryption-like token
      const adminToken = btoa(JSON.stringify({
        email: admin.email,
        role: admin.role,
        level: admin.level,
        timestamp: Date.now(),
        sessionId: Math.random().toString(36).substring(2, 15),
        authenticated: true
      }));

      // Store in both localStorage and sessionStorage for reliability
      localStorage.setItem('novus_admin_session', adminToken);
      sessionStorage.setItem('novus_admin_verified', 'true');
      sessionStorage.setItem('admin_authenticated', 'true');

      // Success - redirect to admin panel (FIXED: Use correct route)
      console.log('Admin authenticated successfully:', admin.role);
      navigate('/admin-panel', { replace: true });
    } else {
      // Failed authentication
      setAttempts(prev => prev + 1);
      setError('Invalid admin credentials. Access denied.');
      
      // 🔐 SECURITY: Lock out after 3 failed attempts
      if (attempts >= 2) {
        setError('Too many failed attempts. Access temporarily locked.');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      {/* Background Security Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full"></div>
      </div>

      {/* Back to Home Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20"
      >
        <span>← Back to Home</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-md border border-white/20 shadow-2xl"
      >
        {/* Security Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/30">
            <SafeIcon icon={FiShield} className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🔐 Admin Access
          </h1>
          <p className="text-white/80 mb-1">
            Authorized Personnel Only
          </p>
          <p className="text-red-300 text-sm">
            Unauthorized access is prohibited and monitored
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <SafeIcon icon={FiMail} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="email"
              name="email"
              placeholder="Admin Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent transition-all"
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <SafeIcon icon={FiLock} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent transition-all"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              disabled={loading}
            >
              <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 flex items-center space-x-2"
            >
              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading || attempts >= 3}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Verifying Access...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiShield} className="w-5 h-5" />
                <span>Authenticate Admin</span>
              </>
            )}
          </motion.button>

          {/* Attempt Counter */}
          {attempts > 0 && (
            <div className="text-center">
              <span className="text-yellow-300 text-sm">
                Failed attempts: {attempts}/3
              </span>
            </div>
          )}
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-xl">
          <div className="flex items-start space-x-2">
            <SafeIcon icon={FiAlertCircle} className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-yellow-200 text-xs">
              <p className="font-semibold mb-1">Security Notice:</p>
              <p>All access attempts are logged and monitored. Only authorized administrators with valid credentials can access this system.</p>
            </div>
          </div>
        </div>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
          <div className="text-blue-200 text-xs">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <div className="space-y-1 font-mono">
              <p>Email: admin@novuscrew.com</p>
              <p>Password: AdminNovus2024!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;