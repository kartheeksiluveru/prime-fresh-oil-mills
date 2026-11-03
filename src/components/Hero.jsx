import { useEffect, useState } from "react";
import { getProducts } from "../utils/oilData";

const SLIDE_IMAGES = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20at%206.02.41%E2%80%AFPM-3nhTPZxfmFC2YoAgZMgdRIdQTvBbPx.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20at%206.04.00%E2%80%AFPM-IxirG0NMlyaVvZeqxLar7SAnIfXQWQ.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20at%206.07.20%E2%80%AFPM-rfKuee5T3TMm0DpIdMXWAAOo7zb4JC.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20at%206.05.41%E2%80%AFPM-HkQOkpd6GB1U0KoI05ag0oYuzEG3VX.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-11-03%20at%206.06.37%E2%80%AFPM-VhzsTos7aOUAJOg6SD5pNRbVSMTlNZ.png",
];

export default function Hero({ onOpenSpecs }) {
  const products = getProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const product = products[activeIndex % products.length];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % SLIDE_IMAGES.length), 6500);
    return () => window.clearInterval(timer);
  }, [products.length]);

  if (!product) return null;

  const goTo = (direction) => setActiveIndex((index) => (index + direction + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);

  return (
    <section className="hero hero-carousel" id="top">
      <div className="hero-stage" style={{ backgroundImage: `url(${SLIDE_IMAGES[activeIndex % SLIDE_IMAGES.length]})` }}>
        <div className="hero-shade" />
        <div className="hero-slide-count">{String(activeIndex + 1).padStart(2, "0")} / {String(SLIDE_IMAGES.length).padStart(2, "0")} CORE SKUS</div>
        <button className="slide-control slide-prev" type="button" aria-label="Previous oil" onClick={() => goTo(-1)}>←</button>
        <button className="slide-control slide-next" type="button" aria-label="Next oil" onClick={() => goTo(1)}>→</button>
        <div className="wrap hero-carousel-content">
          <div className="hero-copy">
            <p className="kicker">{product.grade}</p>
            <h1>Pure Single-Source Oils. No fillers, no blends—just uncompromised quality for your brand.</h1>
            <p className="lede">{product.tagline}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={() => onOpenSpecs?.(product.id)}>View spec sheet / CoA</button>
              <a className="btn btn-ghost" href="#quote">Calculate bulk quote</a>
            </div>
          </div>
          <aside className="hero-card" aria-label={`${product.name} snapshot`}>
            <p className="kicker">{product.grade}</p>
            <h2>{product.name}</h2>
            <p className="muted">{product.tagline}</p>
            <div className="metric-row metric-row-simple">
              <div><span>PURITY</span><b>{product.purity}%</b></div>
              <div><span>SUPPLY RELIABILITY</span><b>98.4%</b></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
