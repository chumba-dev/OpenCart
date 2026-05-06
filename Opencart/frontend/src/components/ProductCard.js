import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useStore } from '../context/StoreContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const price = Number(product.discountPrice || product.price || 0).toLocaleString();
  const oldPrice = product.discountPrice ? Number(product.price).toLocaleString() : null;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <span className="product-image-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span className="product-image-fallback">{product.category || 'OpenCart'}</span>
        )}
      </span>
      <span className="product-body">
        <span className="product-category">{product.category || 'Featured'}</span>
        <strong>{product.name}</strong>
        {product.description && <span className="product-description">{product.description}</span>}
        <span className="product-meta-row">
          <span className="product-price">
            KSh {price}
            {oldPrice && <small>KSh {oldPrice}</small>}
          </span>
          <span className="product-rating"><FaStar /> {product.rating || '4.6'}</span>
        </span>
        <span className="product-actions">
          <span className="product-action">View item</span>
          <button type="button" onClick={handleAddToCart}>
            <FaShoppingCart /> Add
          </button>
        </span>
      </span>
    </Link>
  );
}
