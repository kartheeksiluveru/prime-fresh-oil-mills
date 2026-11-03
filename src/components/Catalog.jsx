import { formatInr, getProducts } from "../utils/oilData";

export default function Catalog({ onOpenSpecs }) {
  const products = getProducts();

  return (
    <section className="section" id="catalog">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Industrial catalog</p>
            <h2>Mill-gate oils for contract packing and bulk fill.</h2>
            <p>
              Every SKU ships with a batch CoA. Prices are mill-gate, exclusive of GST
              and freight.
            </p>
          </div>
        </div>
        <div className="catalog-grid">
          {(products ?? []).length === 0 ? (
            <div className="empty-state">
              <h3>Catalog unavailable</h3>
              <p className="muted">Reload to restore mill SKUs.</p>
            </div>
          ) : (
            (products ?? []).map((product) => {
              if (!product?.id) return null;
              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img className="product-image" src={product.image} alt={`${product.name} oil and source ingredients`} loading="lazy" />
                  </div>
                  <div className="badge-row">
                      <span className="badge grade">{product.grade ?? "Mill grade"}</span>
                  </div>
                  <div className="catalog-title-row">
                    <h3>{product.name}</h3>
                    <p className="price">{formatInr(product.basePricePerLiter)} / L</p>
                  </div>
                  <dl className="spec-list">
                    <div>
                      <dt>Purity %</dt>
                      <dd>{product.purity ?? "—"}</dd>
                    </div>
                    <div>
                      <dt>FFA max %</dt>
                      <dd>{product.ffaMax ?? "—"}</dd>
                    </div>
                    <div>
                      <dt>Moisture %</dt>
                      <dd>{product.moisture ?? "—"}</dd>
                    </div>
                    <div>
                      <dt>SG at 30°C</dt>
                      <dd>{product.specificGravity30C ?? "—"}</dd>
                    </div>
                  </dl>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => onOpenSpecs?.(product.id)}
                  >
                    View Spec Sheet / CoA
                  </button>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
