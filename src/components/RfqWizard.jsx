import { useMemo, useState } from "react";
import {
  BUSINESS_TYPES,
  HUBS,
  PACKAGING_FORMATS,
  VOLUME_MAX,
  VOLUME_MIN,
  calculateQuote,
  clampVolume,
  formatInrExact,
  formatLiters,
  generateRfqId,
  getProducts,
  validateEmail,
  validateGstin,
  validatePhone,
} from "../utils/oilData";

const STEPS = [
  "Buyer details",
  "Order specs",
  "Compliance",
  "Submitted",
];

const emptyBuyer = {
  company: "",
  businessType: "Edible Oil Brand",
  gstin: "",
  contactName: "",
  email: "",
  phone: "",
};

const emptyAddons = {
  sampleKit: false,
  batchCoa: true,
  plantAudit: false,
};

export default function RfqWizard({ quote, onQuoteChange }) {
  const [step, setStep] = useState(1);
  const [buyer, setBuyer] = useState(emptyBuyer);
  const [addons, setAddons] = useState(emptyAddons);
  const [errors, setErrors] = useState({});
  const [rfqId, setRfqId] = useState("");

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

  const patchBuyer = (event) => {
    const { name, value } = event.target;
    setBuyer((current) => ({ ...current, [name]: value }));
  };

  const validateStep1 = () => {
    const next = {
      company: buyer.company.trim() ? "" : "Enter the buying company name.",
      businessType: buyer.businessType ? "" : "Select a business type.",
      gstin: validateGstin(buyer.gstin),
      contactName: buyer.contactName.trim() ? "" : "Enter a contact person.",
      email: validateEmail(buyer.email),
      phone: validatePhone(buyer.phone),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const validateStep2 = () => {
    const volume = clampVolume(quote?.volumeLiters, result?.product);
    const next = {
      productId: quote?.productId ? "" : "Select a product.",
      volumeLiters:
        volume >= VOLUME_MIN && volume <= VOLUME_MAX
          ? ""
          : `Volume must be between ${VOLUME_MIN} and ${VOLUME_MAX} liters.`,
      packagingId: quote?.packagingId ? "" : "Select packaging.",
      hubId: quote?.hubId ? "" : "Select a destination hub.",
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((current) => Math.min(4, current + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  };

  const submit = (event) => {
    event.preventDefault();
    const buyerOk = validateStep1();
    if (!buyerOk) {
      setStep(1);
      return;
    }
    const orderOk = validateStep2();
    if (!orderOk) {
      setStep(2);
      return;
    }
    setRfqId(generateRfqId(2026));
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setBuyer(emptyBuyer);
    setAddons(emptyAddons);
    setErrors({});
    setRfqId("");
  };

  return (
    <section className="section" id="rfq">
      <div className="wrap rfq-shell">
        <div>
          <p className="kicker">Request for quotation</p>
          <h2>Four-step mill RFQ for corporate buyers.</h2>
          <p className="muted">
            Order specs are pre-filled from the bulk calculator. Empty fields and
            invalid GSTIN formats are blocked before submission.
          </p>
        </div>
        <ol className="stepper" aria-label="RFQ steps">
          {(STEPS ?? []).map((label, index) => {
            const n = index + 1;
            return (
              <li key={label} className={n === step ? "active" : n < step ? "done" : ""}>
                <span>{n}</span>
                {label}
              </li>
            );
          })}
        </ol>
        <form className="panel rfq-form" onSubmit={submit} noValidate>
          {step === 1 ? (
            <div className="form-grid">
              <div className="field">
                <label htmlFor="company">Company name</label>
                <input
                  id="company"
                  name="company"
                  value={buyer.company}
                  onChange={patchBuyer}
                  autoComplete="organization"
                />
                {errors.company ? <p className="field-error">{errors.company}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="businessType">Business type</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={buyer.businessType}
                  onChange={patchBuyer}
                >
                  {(BUSINESS_TYPES ?? []).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType ? (
                  <p className="field-error">{errors.businessType}</p>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="gstin">GSTIN</label>
                <input
                  id="gstin"
                  name="gstin"
                  value={buyer.gstin}
                  onChange={(event) =>
                    setBuyer((current) => ({
                      ...current,
                      gstin: event.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="08ABCDE1234F1Z5"
                  maxLength={15}
                />
                {errors.gstin ? <p className="field-error">{errors.gstin}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="contactName">Contact person</label>
                <input
                  id="contactName"
                  name="contactName"
                  value={buyer.contactName}
                  onChange={patchBuyer}
                  autoComplete="name"
                />
                {errors.contactName ? (
                  <p className="field-error">{errors.contactName}</p>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={buyer.email}
                  onChange={patchBuyer}
                  autoComplete="email"
                />
                {errors.email ? <p className="field-error">{errors.email}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="phone">Contact number</label>
                <input
                  id="phone"
                  name="phone"
                  value={buyer.phone}
                  onChange={patchBuyer}
                  autoComplete="tel"
                />
                {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="form-grid">
              <div className="field">
                <label htmlFor="rfq-product">Product</label>
                <select
                  id="rfq-product"
                  value={quote?.productId ?? ""}
                  onChange={(event) =>
                    onQuoteChange?.({ ...(quote ?? {}), productId: event.target.value })
                  }
                >
                  {(products ?? []).map((item) =>
                    item?.id ? (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ) : null
                  )}
                </select>
                {errors.productId ? <p className="field-error">{errors.productId}</p> : null}
              </div>
              <div className="field">
                <label htmlFor="rfq-volume">Volume (liters)</label>
                <input
                  id="rfq-volume"
                  type="number"
                  min={VOLUME_MIN}
                  max={VOLUME_MAX}
                  value={quote?.volumeLiters ?? VOLUME_MIN}
                  onChange={(event) =>
                    onQuoteChange?.({
                      ...(quote ?? {}),
                      volumeLiters: clampVolume(event.target.value, result?.product),
                    })
                  }
                />
                {errors.volumeLiters ? (
                  <p className="field-error">{errors.volumeLiters}</p>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="rfq-pack">Packaging</label>
                <select
                  id="rfq-pack"
                  value={quote?.packagingId ?? ""}
                  onChange={(event) =>
                    onQuoteChange?.({ ...(quote ?? {}), packagingId: event.target.value })
                  }
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
                <label htmlFor="rfq-hub">Destination hub</label>
                <select
                  id="rfq-hub"
                  value={quote?.hubId ?? ""}
                  onChange={(event) =>
                    onQuoteChange?.({ ...(quote ?? {}), hubId: event.target.value })
                  }
                >
                  {(HUBS ?? []).map((item) =>
                    item?.id ? (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
              <p className="quote-inline">
                Recalculated total {formatInrExact(result?.grandTotal)} for{" "}
                {formatLiters(result?.volume)} of {result?.product?.name}.
              </p>
            </div>
          ) : null}

          {step === 3 ? (
            <fieldset className="addons">
              <legend>Compliance & sample add-ons</legend>
              <label className="check">
                <input
                  type="checkbox"
                  checked={addons.sampleKit}
                  onChange={(event) =>
                    setAddons((current) => ({
                      ...current,
                      sampleKit: event.target.checked,
                    }))
                  }
                />
                Request physical sample kit (500ml)
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={addons.batchCoa}
                  onChange={(event) =>
                    setAddons((current) => ({
                      ...current,
                      batchCoa: event.target.checked,
                    }))
                  }
                />
                Require batch CoA & ISO reports
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={addons.plantAudit}
                  onChange={(event) =>
                    setAddons((current) => ({
                      ...current,
                      plantAudit: event.target.checked,
                    }))
                  }
                />
                Schedule plant audit
              </label>
            </fieldset>
          ) : null}

          {step === 4 ? (
            <div className="success-card">
              <p className="kicker">RFQ accepted</p>
              <h3>Tracking ID {rfqId || "PFOM-2026-0000"}</h3>
              <p className="sla">Turnaround within 4 business hours.</p>
              <dl className="summary">
                <div>
                  <dt>Company</dt>
                  <dd>
                    {buyer.company} · {buyer.businessType}
                  </dd>
                </div>
                <div>
                  <dt>GSTIN</dt>
                  <dd>{buyer.gstin}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    {buyer.contactName} · {buyer.email} · {buyer.phone}
                  </dd>
                </div>
                <div>
                  <dt>Order</dt>
                  <dd>
                    {result?.product?.name} · {formatLiters(result?.volume)} ·{" "}
                    {result?.pack?.label} to {result?.hub?.label}
                  </dd>
                </div>
                <div>
                  <dt>Indicative value</dt>
                  <dd>{formatInrExact(result?.grandTotal)}</dd>
                </div>
                <div>
                  <dt>Add-ons</dt>
                  <dd>
                    {[
                      addons.sampleKit ? "500ml sample kit" : null,
                      addons.batchCoa ? "Batch CoA & ISO" : null,
                      addons.plantAudit ? "Plant audit" : null,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "None"}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}

          <div className="wizard-actions">
            {step > 1 && step < 4 ? (
              <button className="btn btn-ghost" type="button" onClick={goBack}>
                Back
              </button>
            ) : null}
            {step < 3 ? (
              <button className="btn btn-primary" type="button" onClick={goNext}>
                Continue
              </button>
            ) : null}
            {step === 3 ? (
              <button className="btn btn-primary" type="submit">
                Submit RFQ
              </button>
            ) : null}
            {step === 4 ? (
              <button className="btn btn-primary" type="button" onClick={reset}>
                File another RFQ
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
