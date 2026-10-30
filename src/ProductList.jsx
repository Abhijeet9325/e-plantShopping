import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, ShoppingBag } from "lucide-react";
import { addItem } from "./CartSlice.jsx";

export const products = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor", price: 24, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=900&q=80", description: "A bold tropical favorite with iconic split leaves." },
  { id: 2, name: "Snake Plant", category: "Easy Care", price: 18, image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?auto=format&fit=crop&w=900&q=80", description: "Architectural leaves and low-maintenance care." },
  { id: 3, name: "Golden Pothos", category: "Hanging", price: 16, image: "https://images.unsplash.com/photo-1616690249450-4c6a6a4d6f4f?auto=format&fit=crop&w=900&q=80", description: "Trailing green vines that brighten shelves." },
  { id: 4, name: "Peace Lily", category: "Indoor", price: 22, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=80", description: "Elegant foliage for a calm, leafy corner." },
  { id: 5, name: "Rubber Plant", category: "Statement", price: 29, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80", description: "Glossy leaves that make a striking focal point." },
  { id: 6, name: "ZZ Plant", category: "Easy Care", price: 21, image: "https://images.unsplash.com/photo-1632207691143-643e2c6b9f69?auto=format&fit=crop&w=900&q=80", description: "A resilient plant for busy plant parents." }
];

export default function ProductList({ onOpenCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [category, setCategory] = React.useState("All");
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const visibleProducts = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <section className="products-section section-wrap" id="plants">
      <div className="products-title-row">
        <div>
          <span className="eyebrow">Find your green</span>
          <h2>Plants for your happy place</h2>
          <p>Thoughtfully picked favorites for every kind of plant lover.</p>
        </div>
        <button className="cart-shortcut" onClick={onOpenCart}>
          <ShoppingBag size={18} /> View cart <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </button>
      </div>
      <div className="filter-row" aria-label="Filter plants by category">
        {categories.map((item) => (
          <button key={item} className={`filter-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => {
          const inCart = cartItems.some((item) => item.id === product.id);
          return (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-info">
                <div className="product-name-price"><h3>{product.name}</h3><strong>${product.price}</strong></div>
                <p>{product.description}</p>
                <button className={`add-button ${inCart ? "added" : ""}`} onClick={() => dispatch(addItem(product))}>
                  {inCart ? <Check size={17} /> : <ShoppingBag size={17} />}
                  {inCart ? "Add another" : "Add to cart"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
