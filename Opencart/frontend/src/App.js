// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VendorPage from './pages/VendorPage';
import ProductsPage from './pages/ProductPage';


import Header from './components/Header';
import Footer from './components/Footer';
import SupportWidget from './components/SupportWidget';
import { StoreProvider } from './context/StoreContext';
import './App.css';

const App = () => {
  const savedRole = localStorage.getItem('opencartUserRole');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(savedRole));
  const [userRole, setUserRole] = useState(savedRole || 'customer');

  const handleAuthSuccess = (role = 'customer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('opencartUserRole', role);
  };

  return (
    <StoreProvider>
      <Router>
        <div className="app-shell">
          {isAuthenticated && <Header />}

          <main className={isAuthenticated ? "app-main" : "auth-main"}>
            <Routes>
              {/* Auth Page */}
              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <Navigate to={userRole === 'admin' ? "/admin-dashboard" : "/home"} replace />
                  ) : (
                    <AuthPage onAuthSuccess={handleAuthSuccess} />
                  )
                } 
              />
              <Route
                path="/admin-access"
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <Navigate to="/admin-dashboard" replace />
                  ) : (
                    <AuthPage onAuthSuccess={handleAuthSuccess} />
                  )
                }
              />

              {/* Home Page */}
              <Route path="/home" element={<HomePage />} />

              {/* Category Pages */}
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/categories/:categoryId" element={<CategoryPage />} />

              {/* Product Page */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Cart Page */}
              <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/" replace />} />

              {/* Checkout Page */}
              <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/" replace />} />

              {/* Vendor Routes */}
              <Route 
                path="/vendors/:vendorId" 
                element={
                  isAuthenticated ? (
                    <VendorPage />
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/vendor-dashboard" 
                element={
                  isAuthenticated && userRole === 'vendor' ? (
                    <VendorDashboard />
                  ) : (
                    <Navigate to={isAuthenticated ? "/home" : "/admin-access"} replace />
                  )
                } 
              />

              {/* Admin Dashboard */}
              <Route 
                path="/admin-dashboard" 
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to={isAuthenticated ? "/home" : "/"} replace />
                  )
                } 
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
            </Routes>
          </main>

          {isAuthenticated && <Footer />}
          {isAuthenticated && <SupportWidget />}
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
