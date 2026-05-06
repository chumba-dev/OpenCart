// src/routes/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import VendorDashboard from '../pages/VendorDashboard';
import AdminPanel from '../pages/AdminPanel';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/vendor" element={<VendorDashboard />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
