import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { removeItem, updateQuantity } from "./CartSlice.jsx";

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="cart-page section-wrap" id="cart">
      <button className="back-link" onClick={onContinueShopping}><ArrowLeft size={17} /> Continue shopping</button>
      <div className="cart-heading">
        <div><span className="eyebrow">Your selected greens</span><h2>Shopping cart</h2></div>
        <span className="cart-count">{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
      </div>
      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon"><ShoppingBag size={30} /></span>
          <h3>Your cart is looking a little empty</h3>
          <p>Find a plant you love and it will appear here.</p>
          <button className="primary-button" onClick={onContinueShopping}>Explore plants</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-list">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-main"><h3>{item.name}</h3><p>${item.price.toFixed(2)} each</p>
                  <button className="remove-button" onClick={() => dispatch(removeItem(item.id))}><Trash2 size={15} /> Remove</button>
                </div>
                <div className="quantity-control">
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}><Minus size={15} /></button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><Plus size={15} /></button>
                </div>
                <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
              </article>
            ))}
          </div>
          <aside className="order-summary">
            <h3>Order summary</h3>
            <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>Free</span></div>
            <div className="summary-line total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
            <button className="primary-button checkout-button" onClick={() => window.alert("Thanks! Checkout is a demo for this assignment.")}>Continue to checkout</button>
            <p className="summary-note">Taxes, if applicable, are calculated at checkout.</p>
          </aside>
        </div>
      )}
    </section>
  );
}
