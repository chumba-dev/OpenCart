import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./ProductPage.css";

const products = [
  {
    id: "1",
    name: "Samsung Galaxy S25 Ultra",
    price: 199999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    description: "Flagship camera, crisp OLED display, and all-day battery life.",
    category: "phones",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Apple iPhone 17 Pro Max",
    price: 129999,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80",
    description: "Premium build, fast chip, and a polished camera system.",
    category: "phones",
    rating: 4.7,
  },
  {
    id: "5",
    name: "ErgoSmart Work Desk",
    price: 59900,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
    description: "Height-adjustable work desk with a clean home-office profile.",
    category: "furniture",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Lumi Sofa Set",
    price: 89999,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    description: "Modern L-shaped sofa with soft fabric and generous seating.",
    category: "furniture",
    rating: 4.6,
  },
  {
    id: "7",
    name: "Nike Air Smart Sneakers",
    price: 21900,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight everyday sneakers with a comfortable fit.",
    category: "fashion",
    rating: 4.5,
  },
  {
    id: "8",
    name: "Textile Travel Band",
    price: 14900,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    description: "A smart casual accessory for travel and daily wear.",
    category: "fashion",
    rating: 4.4,
  },
  {
    id: "9",
    name: "Wireless Headphones",
    price: 9999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable over-ear sound for work, travel, and calls.",
    category: "electronics",
    rating: 4.7,
  },
  {
    id: "10",
    name: "Smart Watch Pro",
    price: 12999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Track activity, messages, and daily health signals.",
    category: "electronics",
    rating: 4.6,
  },
];

const categories = ["phones", "electronics", "fashion", "furniture"];

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  if (!categoryId) {
    return (
      <div className="catalog-page">
        <div className="catalog-hero">
          <span className="section-eyebrow">Categories</span>
          <h1>Shop by Category</h1>
          <p>Choose a category to browse a focused product collection.</p>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <button key={category} onClick={() => navigate(`/categories/${category}`)}>
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryId.toLowerCase()
  );

  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <span className="section-eyebrow">Category</span>
        <h1>{formatCategoryName(categoryId)}</h1>
        <p>Handpicked items from the {formatCategoryName(categoryId).toLowerCase()} collection.</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found in this category.</p>
          <button onClick={() => navigate("/categories")}>Back to Categories</button>
        </div>
      ) : (
        <div className="catalog-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function formatCategoryName(id) {
  return id.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
