import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-mark"><FaShoppingBag /></span>
          <div>
            <h3>OpenCart</h3>
            <p>Curated tech, fashion, furniture, and daily essentials delivered with a cleaner shopping experience.</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <Link to="/products">All products</Link>
            <Link to="/categories/phones">Phones</Link>
            <Link to="/categories/electronics">Electronics</Link>
            <Link to="/categories/fashion">Fashion</Link>
          </div>
          <div>
            <h4>Account</h4>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/vendor-dashboard">Sell on OpenCart</Link>
          </div>
          <div>
            <h4>Service</h4>
            <span><FaTruck /> Fast delivery</span>
            <span><FaShieldAlt /> Secure checkout</span>
            <span><FaHeadset /> Support ready</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 OpenCart. All rights reserved.</span>
        <span>Nairobi-ready marketplace experience</span>
      </div>
    </footer>
  );
}
