import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus, FaShieldAlt, FaShoppingCart, FaTrash } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import "./CartPage.css";

const formatMoney = (value) => `KSh ${Number(value || 0).toLocaleString()}`;

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    discount,
    shippingCost,
    tax,
    cartTotal,
    grandTotal,
    clearCart,
  } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode);
    setCouponMessage(result.message);
    if (result.success) setCouponCode("");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FaShoppingCart />
        <h1>Your cart is empty</h1>
        <p>Add products to your cart and they will appear here before checkout.</p>
        <Link to="/products">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-heading">
        <div>
          <span className="section-eyebrow">Shopping cart</span>
          <h1>Your Cart</h1>
          <p>Review quantities, apply a coupon, then continue to checkout.</p>
        </div>
        <button onClick={clearCart} className="clear-cart-button">
          <FaTrash /> Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item">
              <Link to={`/products/${item.id}`} className="cart-image">
                {item.image ? <img src={item.image} alt={item.name} /> : <FaShoppingCart />}
              </Link>

              <div className="cart-copy">
                <span>{item.category || "OpenCart"}</span>
                <Link to={`/products/${item.id}`} className="cart-product-name">
                  {item.name}
                </Link>
                <strong>{formatMoney(item.price)}</strong>
              </div>

              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <FaPlus />
                </button>
              </div>

              <div className="cart-line-total">
                <strong>{formatMoney(item.price * item.quantity)}</strong>
                <button onClick={() => removeFromCart(item.id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            </article>
          ))}

          <div className="coupon-panel">
            <div>
              <h3>Coupon code</h3>
              <p>Try OPEN10 or OPEN20 for a demo discount.</p>
            </div>
            <div className="coupon-form">
              <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon" />
              <button onClick={handleApplyCoupon}>Apply</button>
            </div>
            {couponMessage && <span className="coupon-message">{couponMessage}</span>}
            {discount > 0 && (
              <button onClick={removeCoupon} className="remove-coupon">
                Remove coupon
              </button>
            )}
          </div>
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatMoney(cartTotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <strong>-{formatMoney(discount)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shippingCost === 0 ? "Free" : formatMoney(shippingCost)}</strong>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <strong>{formatMoney(tax)}</strong>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatMoney(grandTotal)}</strong>
          </div>
          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
          <p className="secure-note">
            <FaShieldAlt /> Secure checkout. Phone number is required for order tracking updates.
          </p>
        </aside>
      </div>
    </div>
  );
}
