import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaStar } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import "./ProductDetailPage.css";

const fallbackProducts = {
  "1": {
    id: "1",
    name: "iPhone 16 Pro Max",
    price: 80799,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/2361531/1.jpg",
    description: "A premium phone with a bright display, fast performance, and a dependable camera system.",
    category: "Phones",
    rating: 4.8,
  },
  "2": {
    id: "2",
    name: "Top Fry Cooking Oil - 3L",
    price: 799,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/8371021/1.jpg",
    description: "Everyday cooking oil for family meals and pantry restocking.",
    category: "Home",
    rating: 4.5,
  },
  "3": {
    id: "3",
    name: "Sofa Set - 5 Seater",
    price: 45000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    description: "A modern seating set with soft fabric, generous cushions, and a clean profile.",
    category: "Furniture",
    rating: 4.7,
  },
  "4": {
    id: "4",
    name: "Men's Sneakers - Black",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Lightweight everyday sneakers with a versatile black finish.",
    category: "Fashion",
    rating: 4.4,
  },
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(fallbackProducts[productId] || null);
  const [loading, setLoading] = useState(!fallbackProducts[productId]);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        if (!ignore) setProduct(data);
      } catch (err) {
        if (!ignore) setProduct(fallbackProducts[productId] || null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [productId]);

  if (loading) return <div className="detail-state">Loading product...</div>;

  if (!product) {
    return (
      <div className="detail-state">
        <p>Product not found.</p>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  const price = Number(product.price || 0).toLocaleString();

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="detail-panel">
        <div className="detail-media">
          {product.video ? (
            <video src={product.video} controls />
          ) : (
            <img src={product.image} alt={product.name} />
          )}
        </div>

        <div className="detail-copy">
          <span className="section-eyebrow">{product.category || "OpenCart"}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <FaStar /> {product.rating || "4.6"} rating
          </div>
          <p>{product.description}</p>
          <strong className="detail-price">KSh {price}</strong>

          <div className="detail-actions">
            <button
              onClick={() => {
                addToCart(product);
                setCartMessage(`${product.name} was added to your cart.`);
              }}
              className="add-cart-button"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button onClick={() => navigate("/checkout")} className="buy-button">
              Buy Now
            </button>
          </div>
          {cartMessage && <span className="detail-cart-message">{cartMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
