import {
  formatInr,
  getHeroProduct,
  listPackaging,
} from "../utils/oilData";

export default function Hero({ onOpenSpecs }) {
  const hero = getHeroProduct();
  if (!hero) return null;

  const packs = listPackaging(hero);

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">Flagship oil</p>
          <h1>Pure Single-Source Oils. No fillers, no blends—just uncompromised quality for your brand.</h1>
          <p className="lede">
            Premium edible oil tailored for FMCG, foodservice, and private labels. We deliver certified purity (batch CoA) with flexible packing
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onOpenSpecs?.(hero.id)}
            >
              View spec sheet / CoA
            </button>
            <a className="btn btn-ghost" href="#quote">
              Calculate bulk quote
            </a>
          </div>
        </div>
        <aside className="hero-card" aria-label={`${hero.name} snapshot`}>
          <p className="kicker">{hero.grade}</p>
          <h2>{hero.name}</h2>
          <p className="muted">{hero.tagline}</p>
          <div className="metric-row">
            <div>
              <span>Purity</span>
              <b>{hero.purity}%</b>
            </div>
            <div>
              <span>Supply reliability</span>
              <b>98.4%</b>
            </div>
            <div>
              <span>Private-label packing</span>
              <b>Tin · Barrel · Tanker</b>
            </div>
          </div>
          <div className="spec-mini">
            <div>
              <span>FFA max</span>
              <b>{hero.ffaMax}%</b>
            </div>
            <div>
              <span>Moisture</span>
              <b>{hero.moisture}%</b>
            </div>
            <div>
              <span>SG at 30°C</span>
              <b>{hero.specificGravity30C}</b>
            </div>
            <div>
              <span>From</span>
              <b>{formatInr(hero.basePricePerLiter)} / L</b>
            </div>
          </div>
          <p className="pack-line">
            Formats: {(packs ?? []).map((item) => item?.label).filter(Boolean).join(" · ")}
          </p>
        </aside>
      </div>
    </section>
  );
}
