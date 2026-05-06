// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AuthPage.css';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }
      
      if (!isLogin && !formData.name) {
        throw new Error('Name is required for registration');
      }

      if (!isLogin && !formData.phone) {
        throw new Error('Phone number is required for order tracking');
      }

      // Simulate API call (replace with real authentication)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine user role (in a real app, this would come from the backend)
      const normalizedEmail = formData.email.toLowerCase();
      const role = normalizedEmail.includes('@vendor') ? 'vendor' :
                  normalizedEmail.includes('@admin') ? 'admin' : 'customer';
      
      // Notify parent component of successful auth
      onAuthSuccess(role);
      
      navigate(role === 'admin' ? '/admin-dashboard' : '/home');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // This would be replaced with actual social login implementation
    console.log(`Logging in with ${provider}`);
    // For demo purposes, we'll simulate a successful social login as a customer
    onAuthSuccess('customer');
    navigate('/home');
  };

  return (
    <div className="auth-container">
      <div className={`container ${isLogin ? '' : 'active'}`}>
        {/* Sign Up Form */}
        <motion.div 
          className="form-container sign-up"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLogin ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo-container">
            <img src="/logo192.png" alt="OpenCart" className="logo" />
          </div>
          <h1 className="opencart-title">OpenCart</h1>

          <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <div className="social-icons">
              <button type="button" className="icon" onClick={() => handleSocialLogin('google')}>
                <FaGoogle />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('facebook')}>
                <FaFacebookF />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('github')}>
                <FaGithub />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('linkedin')}>
                <FaLinkedinIn />
              </button>
            </div>
            <span>or use your email for registration</span>
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number for Order Updates"
              value={formData.phone}
              onChange={handleChange}
              required={!isLogin}
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            {error && <div className="error-message">{error}</div>}
            <button 
              type="submit" 
              className="signup-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
        </motion.div>

        {/* Sign In Form */}
        <motion.div 
          className="form-container sign-in"
          initial={{ x: 0 }}
          animate={{ x: isLogin ? 0 : '100%' }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo-container">
            <img src="/logo192.png" alt="OpenCart" className="logo" />
          </div>
          <h1 className="opencart-title">OpenCart</h1>

          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="social-icons">
              <button type="button" className="icon" onClick={() => handleSocialLogin('google')}>
                <FaGoogle />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('facebook')}>
                <FaFacebookF />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('github')}>
                <FaGithub />
              </button>
              <button type="button" className="icon" onClick={() => handleSocialLogin('linkedin')}>
                <FaLinkedinIn />
              </button>
            </div>
            <span>or use your email password</span>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="forgot-password">Forgot Your Password?</button>
            {error && <div className="error-message">{error}</div>}
            <button 
              type="submit" 
              className="signin-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </motion.div>

        {/* Toggle Container */}
        <div className="toggle-container">
          <motion.div 
            className="toggle"
            animate={{ x: isLogin ? 0 : '50%' }}
            transition={{ duration: 0.6 }}
          >
            <div className="toggle-panel toggle-left">
              <h2>Welcome Back!</h2>
              <p>Enter your personal details to use all of site features</p>
              <button 
                className="hidden" 
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Hello, Friend!</h2>
              <p>Register with your personal details to use all of site features</p>
              <button 
                className="hidden" 
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
