// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Products</Link>
    <Link to="/orders">Orders</Link>
    <Link to="/add-product">Add Product</Link>
  </nav>
);

export default Navbar;
