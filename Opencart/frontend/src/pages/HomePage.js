import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset, FaShieldAlt, FaStar, FaTruck, FaUndo } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

const categories = [
  {
    title: "Phones & Tablets",
    slug: "phones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Furniture",
    slug: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Home & Kitchen",
    slug: "home",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Beauty & Personal Care",
    slug: "beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Sports & Fitness",
    slug: "sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Stationery",
    slug: "stationery",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
];

const featuredProducts = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    price: 80799,
    discountPrice: 75999,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/91/2034531/1.jpg",
    description: "Apple's most advanced smartphone with A18 chip.",
    rating: 4.8,
    reviews: 124,
    category: "Phones",
  },
  {
    id: "2",
    name: "Top Fry Cooking Oil - 3L",
    price: 799,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/12/2034531/1.jpg",
    description: "Healthy cooking oil for everyday family meals.",
    rating: 4.5,
    reviews: 89,
    category: "Home",
  },
  {
    id: "3",
    name: "Wireless Noise-Canceling Headphones",
    price: 12999,
    discountPrice: 9999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Premium wireless sound with long battery life.",
    rating: 4.7,
    reviews: 215,
    category: "Electronics",
  },
  {
    id: "4",
    name: "Smart Watch Pro",
    price: 15999,
    discountPrice: 12999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Track fitness, calls, messages, and daily goals.",
    rating: 4.3,
    reviews: 176,
    category: "Electronics",
  },
];

const testimonials = [
  {
    quote: "Amazing service and super fast delivery.",
    author: "Alice",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote: "The product quality is solid. I will buy again.",
    author: "Brian",
    rating: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote: "This is my go-to store for electronics and accessories.",
    author: "Cynthia",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    navigate(`/categories/${categorySlug}`);
  };

  const handleViewAllClick = () => {
    navigate("/products");
  };

  return (
    <div className="home-container">
      <div className="announcement-bar">
        <p>Free delivery on orders over KSh 5,000. Use <strong>NEW10</strong> for 10% off your first order.</p>
      </div>

      <div className="hero-banner">
        <div className="hero-content">
          <span className="section-eyebrow">Fresh arrivals weekly</span>
          <h1 className="hero-title">Premium Tech & Lifestyle</h1>
          <p className="hero-subtext">
            Shop dependable products across phones, fashion, electronics, and home essentials.
          </p>
          <div className="hero-cta">
            <button onClick={() => handleCategoryClick("phones")} className="primary-btn">
              Shop Now
            </button>
            <button onClick={handleViewAllClick} className="secondary-btn">
              View Products
            </button>
          </div>
        </div>
      </div>

      <div className="trust-badges">
        <div className="badge-item">
          <FaShieldAlt />
          <span>Secure Checkout</span>
        </div>
        <div className="badge-item">
          <FaTruck />
          <span>Free Delivery</span>
        </div>
        <div className="badge-item">
          <FaUndo />
          <span>Easy Returns</span>
        </div>
        <div className="badge-item">
          <FaHeadset />
          <span>24/7 Support</span>
        </div>
      </div>

      <section className="section">
        <div className="section-heading">
          <span className="section-eyebrow">Browse faster</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="category-card"
              onClick={() => handleCategoryClick(cat.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCategoryClick(cat.slug)}
            >
              <img src={cat.image} alt={cat.title} className="category-image" loading="lazy" />
              <div className="category-copy">
                <h3 className="category-title">{cat.title}</h3>
                <span>Explore collection</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section featured-products">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Top picks</span>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <button onClick={handleViewAllClick} className="view-all">
            View All
          </button>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <div className="promo-banner">
        <div className="promo-content">
          <span className="section-eyebrow">This week</span>
          <h3>Electronics deals are live</h3>
          <p>Get 20% off on selected electronics this week only.</p>
          <button onClick={() => handleCategoryClick("electronics")} className="promo-btn">
            Shop Electronics
          </button>
        </div>
      </div>

      <section className="section testimonials-section">
        <div className="section-heading">
          <span className="section-eyebrow">Trusted by shoppers</span>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonial.rating ? "star-filled" : "star-empty"} />
                ))}
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.author} className="author-avatar" />
                <span>{testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="newsletter">
        <h3>Join Our Newsletter</h3>
        <p>Get exclusive deals and product updates.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
