import { useCart } from "../context/CartManager";
import { useState } from "react";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price * 80,
    0
  );

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>₹{(item.price * 80).toFixed(0)}</p>
              <div className="cart-item-controls">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{total.toFixed(0)}</h3>
          <button onClick={handleCheckout} className="checkout-btn">
            Checkout
          </button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );
}

export default Cart;