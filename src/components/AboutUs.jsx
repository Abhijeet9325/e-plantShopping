import React from "react";
import { Leaf, Sprout, HeartHandshake } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="about-section section-wrap" id="about">
      <div className="section-heading">
        <span className="eyebrow">A little about us</span>
        <h2>Helping you grow a greener home.</h2>
        <p>
          Paradise Nursery makes it easy to bring nature into your everyday
          spaces with beautiful plants, helpful guidance, and simple care tips.
        </p>
      </div>
      <div className="values-grid">
        <article className="value-card">
          <span className="value-icon"><Leaf size={23} /></span>
          <h3>Plants for every space</h3>
          <p>From desk-friendly greens to statement plants for your living room.</p>
        </article>
        <article className="value-card">
          <span className="value-icon"><Sprout size={23} /></span>
          <h3>Grow with confidence</h3>
          <p>Choose plants with clear descriptions to help you care for them.</p>
        </article>
        <article className="value-card">
          <span className="value-icon"><HeartHandshake size={23} /></span>
          <h3>Nature made simple</h3>
          <p>We believe a little greenery can make a space feel more welcoming.</p>
        </article>
      </div>
    </section>
  );
}
