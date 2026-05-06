import React from "react";
import ProductCard from "../components/ProductCard";
import "./ProductPage.css";

const products = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    price: 80799,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/16/2361531/1.jpg",
    description: "Apple's advanced 6.9-inch iPhone with A18 Pro chip and 48MP camera.",
    category: "Phones",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Top Fry Cooking Oil - 3L",
    price: 799,
    image: "https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/75/8371021/1.jpg",
    description: "Healthy cooking oil for daily family meals.",
    category: "Home",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Sofa Set - 5 Seater",
    price: 45000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    description: "Modern and comfy high-density foam sofa.",
    category: "Furniture",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Men's Sneakers - Black",
    price: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Stylish sneakers for everyday wear.",
    category: "Fashion",
    rating: 4.4,
  },
  {
    id: "5",
    name: "Bluetooth Headphones",
    price: 7999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Wireless noise-canceling over-ear headphones.",
    category: "Electronics",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Ballpoint Pen - 10 Pack",
    price: 199,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80",
    description: "Smooth writing pens for office and school.",
    category: "Stationery",
    rating: 4.3,
  },
  {
    id: "24",
    name: "Portable Power Bank - 10000mAh",
    price: 2499,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80",
    description: "Compact backup charger for mobile devices.",
    category: "Electronics",
    rating: 4.6,
  },
];

export default function ProductsPage() {
  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <span className="section-eyebrow">Catalog</span>
        <h1>All Products</h1>
        <p>Browse the full OpenCart collection with consistent product cards and clear pricing.</p>
      </div>

      <div className="catalog-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
