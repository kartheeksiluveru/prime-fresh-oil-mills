import { useMemo, useState } from "react";
import {
  HUBS,
  PACKAGING_FORMATS,
  VOLUME_MAX,
  VOLUME_MIN,
  calculateQuote,
  clampVolume,
  formatInrExact,
  formatLiters,
  getHeroProduct,
  getProducts,
} from "../utils/oilData";

export default function QuoteCalculator({ quote, onQuoteChange, onProceed }) {
  const [showBreakdown, setShowBreakdown] = useState(true);
  const products = getProducts();
  const result = useMemo(
    () =>
      calculateQuote({
        productId: quote?.productId,
        volumeLiters: quote?.volumeLiters,
        packagingId: quote?.packagingId,
        hubId: quote?.hubId,
      }),
    [quote?.productId, quote?.volumeLiters, quote?.packagingId, quote?.hubId]
  );

  const product = result?.product ?? getHeroProduct();
  const min = Math.max(VOLUME_MIN, product?.moqLiters ?? VOLUME_MIN);

  const patch = (partial) => onQuoteChange?.({ ...(quote ?? {}), ...partial });

  const onVolumeChange = (raw) => {
    patch({ volumeLiters: clampVolume(raw, product) });
  };

  const discountPct = Math.round((result?.discountRate ?? 0) * 100);

  return (
    <section className="section band" id="quote">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Bulk quotation calculator</p>
            <h2>Landed mill estimate before you file an RFQ.</h2>
            <p>
              Volume discounts apply automatically above 5,000 L, 20,000 L, and 50,000 L.
              GST is 5% on edible oil, packing, and freight.
            </p>
          </div>
        </div>
        <div className="calc-grid">
          <form
            className="panel"
            onSubmit={(event) => {
              event.preventDefault();
              onProceed?.();
            }}
          >
            <div className="field">
              <label htmlFor="calc-product">Product</label>
              <select
                id="calc-product"
                value={quote?.productId ?? product?.id ?? ""}
                onChange={(event) => patch({ productId: event.target.value })}
              >
                {(products ?? []).map((item) =>
                  item?.id ? (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div className="field">
              <label htmlFor="calc-volume">
                Order volume ({formatLiters(min)} – {formatLiters(VOLUME_MAX)})
              </label>
              <div className="volume-row">
                <input
                  id="calc-volume"
                  type="range"
                  min={min}
                  max={VOLUME_MAX}
                  step={100}
                  value={result?.volume ?? min}
                  onChange={(event) => onVolumeChange(event.target.value)}
                />
                <input
                  aria-label="Volume in liters"
                  type="number"
                  min={min}
                  max={VOLUME_MAX}
                  step={50}
                  value={result?.volume ?? min}
                  onChange={(event) => onVolumeChange(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="calc-pack">Packaging format</label>
              <select
                id="calc-pack"
                value={quote?.packagingId ?? result?.pack?.id ?? "tin"}
                onChange={(event) => patch({ packagingId: event.target.value })}
              >
                {(PACKAGING_FORMATS ?? []).map((item) =>
                  item?.id ? (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <div className="field">
              <label htmlFor="calc-hub">Delivery destination hub</label>
              <select
                id="calc-hub"
                value={quote?.hubId ?? result?.hub?.id ?? "delhi-ncr"}
                onChange={(event) => patch({ hubId: event.target.value })}
              >
                {(HUBS ?? []).map((item) =>
                  item?.id ? (
                    <option key={item.id} value={item.id}>
                      {item.label} · {item.km} km from mill
                    </option>
                  ) : null
                )}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">
              Use this quote in RFQ
            </button>
          </form>
          <aside className="panel quote-card">
            <p className="kicker">Indicative landed quote</p>
            <p className="quote-total">{formatInrExact(result?.grandTotal)}</p>
            <p className="muted">
              {result?.product?.name} · {formatLiters(result?.volume)} ·{" "}
              {result?.pack?.label} · {result?.hub?.label}
            </p>
            {discountPct > 0 ? (
              <p className="discount-note">{discountPct}% volume discount applied</p>
            ) : (
              <p className="muted">Add volume above 5,000 L to unlock a mill discount.</p>
            )}
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setShowBreakdown((value) => !value)}
            >
              {showBreakdown ? "Hide cost breakdown" : "Show cost breakdown"}
            </button>
            {showBreakdown ? (
              <dl className="breakdown">
                <div>
                  <dt>Base subtotal ({formatInrExact(result?.unitPrice)} / L)</dt>
                  <dd>{formatInrExact(result?.baseSubtotal)}</dd>
                </div>
                <div>
                  <dt>Volume discount</dt>
                  <dd>− {formatInrExact(result?.discountAmount)}</dd>
                </div>
                <div>
                  <dt>Packaging adjustment ({result?.units} units)</dt>
                  <dd>{formatInrExact(result?.packagingCost)}</dd>
                </div>
                <div>
                  <dt>Estimated freight ({result?.hub?.km} km)</dt>
                  <dd>{formatInrExact(result?.freight)}</dd>
                </div>
                <div>
                  <dt>GST 5%</dt>
                  <dd>{formatInrExact(result?.gst)}</dd>
                </div>
                <div className="total">
                  <dt>Estimated total</dt>
                  <dd>{formatInrExact(result?.grandTotal)}</dd>
                </div>
              </dl>
            ) : null}
            <p className="fineprint">
              Indicative mill estimate only. Confirmed RFQs are firm after QA and tanker
              slotting.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
