import React from "react";
import { Link } from "react-router-dom";
// import pic from "../../Images/header.jpg";
import { useCart } from "../Cart/cartContext"; // Import the useCart hook

import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <p className="empty-cart">No items in the cart</p>
          <Link to="/">
            <button className="home-button"> Go to Home</button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="cart-items-list">
            {cart.map((product, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-thumbnail">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{product.name}</h2>
                  <p className="cart-item-price">
                    ${product.price} x {product.quantity || 1}
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            Total Price: $
            {cart
              .reduce(
                (total, product) =>
                  total + product.price * (product.quantity || 1),
                0
              )
              .toFixed(2)}
          </div>

          <Link to="/checkout">
            <button className="checkout-button">Checkout</button>
          </Link>
        </>
      )}

      <style>{`
        .cart-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .cart-title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }

        .empty-cart {
          text-align: center;
          color: #666;
          font-size: 1.2em;
        }

        .cart-items-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
          transition: background-color 0.3s ease;
        }

        .cart-item:hover {
          background-color: #f9f9f9;
        }

        .cart-item-thumbnail {
          width: 100px;
          height: 100px;
          margin-right: 20px;
          flex-shrink: 0;
        }

        .cart-item-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .cart-item-details {
          flex-grow: 1;
        }

        .cart-item-name {
          margin: 0 0 10px 0;
          font-size: 1.2em;
          color: #333;
        }

        .cart-item-price {
          margin: 0;
          font-size: 1.1em;
          color: #2c5282;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Cart;
