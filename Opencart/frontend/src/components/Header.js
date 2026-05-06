import { Link } from 'react-router-dom';
import { FaBell, FaShoppingBag, FaSearch, FaShoppingCart, FaStore } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';
import './Header.css';

export default function Header() {
  const { cartCount, unreadNotifications } = useStore();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/home" className="brand-link" aria-label="OpenCart home">
          <span className="brand-mark"><FaShoppingBag /></span>
          <span>
            <strong>OpenCart</strong>
            <small>Marketplace</small>
          </span>
        </Link>

        <div className="header-search">
          <FaSearch />
          <input type="search" placeholder="Search products" aria-label="Search products" />
        </div>

        <nav className="header-nav" aria-label="Primary navigation">
          <Link to="/home">Home</Link>
          <Link to="/categories/phones">Categories</Link>
          <Link to="/products">Products</Link>
          <Link to="/vendor-dashboard"><FaStore /> Sell</Link>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart /> Cart
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </Link>
          <span className="notification-pill" title="Unread notifications">
            <FaBell />
            {unreadNotifications > 0 && <span>{unreadNotifications}</span>}
          </span>
      </nav>
      </div>
    </header>
  );
}
