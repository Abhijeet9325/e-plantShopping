import React from "react";
import { ArrowRight, Leaf, Menu, ShoppingBag, Sparkles } from "lucide-react";
import AboutUs from "./components/AboutUs.jsx";
import ProductList from "./ProductList.jsx";
import CartItem from "./CartItem.jsx";
import { useSelector } from "react-redux";

export default function App() {
  const [page, setPage] = React.useState("home");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }}>
          <span className="brand-mark"><Leaf size={23} /></span>
          <span>Paradise <strong>Nursery</strong><small>GROW A LITTLE HAPPINESS</small></span>
        </a>
        <button className="mobile-menu-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button className={page === "home" ? "nav-active" : ""} onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("plants")}>Plants</button>
          <button onClick={() => goTo("about")}>About Us</button>
        </nav>
        <button className="header-cart" onClick={() => goTo("cart")}><ShoppingBag size={18} /><span>Cart</span><b>{cartCount}</b></button>
      </header>

      {page === "home" && <>
        <main>
          <section className="hero" id="home">
            <div className="hero-content">
              <span className="hero-kicker"><Sparkles size={15} /> YOUR LITTLE CORNER OF NATURE</span>
              <h1>Bring home a little <em>paradise.</em></h1>
              <p>Discover beautiful indoor plants that bring fresh energy, calm moments, and a touch of green to your everyday life.</p>
              <button className="primary-button hero-button" onClick={() => goTo("plants")}>Get Started <ArrowRight size={18} /></button>
              <div className="hero-trust"><span><Leaf size={16} /> Carefully selected plants</span><span>✦ Easy care favorites</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-blob"></div>
              <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=85" alt="Lush green houseplants in a bright home" />
              <div className="floating-note"><span className="note-icon"><Leaf size={20} /></span><span><strong>Make room for green</strong><small>Happier spaces start here</small></span></div>
            </div>
          </section>
          <div className="benefit-strip">
            <div><span>01</span><strong>Easy to love</strong><small>Plants for every experience level</small></div>
            <div><span>02</span><strong>Fresh spaces</strong><small>Bring natural beauty indoors</small></div>
            <div><span>03</span><strong>Grow your way</strong><small>Find a plant that fits your life</small></div>
          </div>
          <ProductList onOpenCart={() => goTo("cart")} />
          <AboutUs />
        </main>
      </>}

      {page === "plants" && <main><ProductList onOpenCart={() => goTo("cart")} /><AboutUs /></main>}
      {page === "about" && <main><AboutUs /><ProductList onOpenCart={() => goTo("cart")} /></main>}
      {page === "cart" && <main><CartItem onContinueShopping={() => goTo("plants")} /></main>}

      <footer className="site-footer">
        <a className="footer-brand" href="#home" onClick={(event) => { event.preventDefault(); goTo("home"); }}><Leaf size={19} /> Paradise Nursery</a>
        <p>Make your space feel more alive, one plant at a time.</p>
        <span>© {new Date().getFullYear()} Paradise Nursery. Made for plant lovers.</span>
      </footer>
    </div>
  );
}
