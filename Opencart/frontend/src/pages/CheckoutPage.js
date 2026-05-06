import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCheckCircle, FaPhoneAlt, FaShieldAlt } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import "./CartPage.css";
import "./CheckoutPage.css";

const formatMoney = (value) => `KSh ${Number(value || 0).toLocaleString()}`;

export default function CheckoutPage() {
  const { cartItems, customerProfile, grandTotal, cartTotal, tax, placeOrder } = useStore();
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: customerProfile?.name || "",
    email: customerProfile?.email || "",
    phone: customerProfile?.phone || "",
    address: customerProfile?.address || "",
    paymentMethod: "mpesa",
    notes: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const placedOrder = placeOrder(
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
      },
      formData.paymentMethod
    );
    setOrder(placedOrder);
  };

  if (order) {
    return (
      <div className="order-success">
        <FaCheckCircle />
        <h1>Order placed successfully</h1>
        <p>
          Your order <strong>{order.id}</strong> is now being processed. We will use{" "}
          <strong>{order.customer.phone}</strong> to send tracking and delivery updates.
        </p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <p>Add products before checkout.</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-heading">
        <div>
          <span className="section-eyebrow">Checkout</span>
          <h1>Delivery & Tracking Details</h1>
          <p>Customers must provide a phone number so we can send order and delivery updates.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-section">
            <h2>Customer Information</h2>
            <div className="form-grid">
              <label>
                Full Name
                <input name="name" required value={formData.name} onChange={handleInputChange} />
              </label>
              <label>
                Email Address
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
              </label>
              <label>
                Phone Number for Tracking
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="^[+0-9\\s-]{9,}$"
                  placeholder="+254712345678"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Delivery Address
                <input name="address" required value={formData.address} onChange={handleInputChange} />
              </label>
            </div>
            <p className="tracking-note">
              <FaPhoneAlt /> This number will be used for order tracking, delivery calls, and status updates.
            </p>
          </div>

          <div className="form-section">
            <h2>Payment & Notes</h2>
            <div className="form-grid">
              <label>
                Payment Method
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                  <option value="mpesa">M-Pesa</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </label>
              <label>
                Delivery Notes
                <input name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Optional" />
              </label>
            </div>
          </div>

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} x{item.quantity}</span>
                <strong>{formatMoney(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatMoney(cartTotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <strong>{formatMoney(tax)}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatMoney(grandTotal)}</strong>
          </div>
          <p className="secure-note">
            <FaShieldAlt /> Checkout is recorded locally for now until backend database integration is completed.
          </p>
          <p className="secure-note">
            <FaBell /> Customer and admin notifications are created after order placement.
          </p>
        </aside>
      </div>
    </div>
  );
}
