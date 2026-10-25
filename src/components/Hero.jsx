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
          <p className="kicker">Flagship crush · {hero.sku}</p>
          <h1>Yellow Mustard Oil for brand owners who specify purity, not blends.</h1>
          <p className="lede">
            Cold-pressed, high pungency, 100% pure mustard oil for edible oil brands,
            FMCG companies, and private-label partners — with batch CoA, tin-to-tanker
            packing, and PAN-India dispatch from Sitapura, Jaipur.
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
        <aside className="hero-card" aria-label="Yellow Mustard Oil snapshot">
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
