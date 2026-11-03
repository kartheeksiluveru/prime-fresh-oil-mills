import { useState } from "react";

const CAKES = [
  {
    id: "mustard-cake",
    number: "01",
    label: "MUSTARD CAKE",
    name: "Yellow Mustard Cake",
    protein: "38–42%",
    oil: "<8%",
    accent: "amber",
    packaging: "25 kg HDPE Bags · 1,000 kg Pallets",
    moq: "MOQ 5 MT",
    forms: ["25 kg HDPE Bags", "1,000 kg Jumbo Bags", "Bulk Loose Truckload"],
  },
  {
    id: "sesame-cake",
    number: "02",
    label: "SESAME CAKE",
    name: "Black Sesame Cake",
    protein: "42–46%",
    oil: "<7%",
    accent: "lime",
    packaging: "25 kg HDPE Bags · Bulk Loose Tankers",
    moq: "MOQ 2 MT",
    forms: ["25 kg HDPE Bags", "1,000 kg Jumbo Bags", "Bulk Loose Truckload"],
  },
];

const initialForm = {
  tonnage: 5,
  formFactor: "25 kg HDPE Bags",
  destination: "",
  schedule: "Immediate / Spot Loading",
  specs: [],
  company: "",
  gstin: "",
  contact: "",
  email: "",
  phone: "",
};

export default function ByProducts() {
  const [selectedCake, setSelectedCake] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState({});

  const openRfq = (cake) => {
    setSelectedCake(cake);
    setForm({ ...initialForm, formFactor: cake.forms[0], tonnage: cake.id === "sesame-cake" ? 2 : 5 });
    setStep(1);
    setSubmitted(false);
    setErrors({});
  };
  const closeRfq = () => setSelectedCake(null);
  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "tonnage") setErrors((current) => ({ ...current, tonnage: "" }));
  };
  const validateTonnage = () => {
    const quantity = Number(form.tonnage);
    const message = !Number.isFinite(quantity) || quantity <= 0
      ? "Enter a positive quantity greater than zero."
      : !Number.isInteger(quantity) || quantity < 2 || quantity > 500
        ? "Quantity must be a whole number between 2 and 500 MT."
        : "";
    setErrors((current) => ({ ...current, tonnage: message }));
    return !message;
  };
  const continueToStep = () => {
    if (step === 1 && !validateTonnage()) return;
    setStep((current) => current + 1);
  };
  const toggleSpec = (value) => setForm((current) => ({ ...current, specs: current.specs.includes(value) ? current.specs.filter((item) => item !== value) : [...current.specs, value] }));
  const submit = (event) => {
    event.preventDefault();
    if (!validateTonnage()) {
      setStep(1);
      return;
    }
    setReference(`PFOM-CAKE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  return (
    <>
      <section className="section byproducts-section" id="by-products">
        <div className="wrap">
          <div className="section-head byproducts-head">
            <p className="kicker">Sustainable by-products / Feed &amp; extraction</p>
            <h2>Maximum value extracted. Every grain utilized.</h2>
            <p>High-protein de-oiled meal and expeller cakes refined for commercial feed blending, agricultural soil conditioning, and industrial extraction.</p>
          </div>
          <div className="byproduct-grid">
            {CAKES.map((cake) => (
              <article className={`byproduct-card ${cake.accent}`} key={cake.id}>
                <p className="byproduct-index">{cake.number} / {cake.label}</p>
                <h3>{cake.name}</h3>
                <div className="cake-metrics"><div><b>{cake.protein}</b><span>Protein</span></div><div><b>{cake.oil}</b><span>Residual oil</span></div></div>
                <p className="byproduct-pack">{cake.packaging} <strong>· {cake.moq}</strong></p>
                <button className="btn btn-primary" type="button" onClick={() => openRfq(cake)}>Request By-Product RFQ</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedCake && (
        <div className="overlay cake-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeRfq()}>
          <section className="modal cake-modal" role="dialog" aria-modal="true" aria-labelledby="cake-rfq-title">
            <div className="modal-head"><div><p className="kicker">By-product commercial desk</p><h2 id="cake-rfq-title">{submitted ? "Firm quote request received" : `${selectedCake.name} RFQ`}</h2></div><button className="icon-btn" type="button" onClick={closeRfq} aria-label="Close RFQ">×</button></div>
            {submitted ? (
              <div className="cake-success"><div className="success-mark">✓</div><h3>Reference {reference}</h3><p>Your request is queued for the by-product desk. Confirmation metadata will be sent to <strong>{form.email}</strong> by email and SMS.</p><button className="btn btn-primary" type="button" onClick={closeRfq}>Done</button></div>
            ) : (
              <form onSubmit={submit}>
                <ol className="cake-stepper"><li className={step >= 1 ? "active" : ""}>01 <span>Grade &amp; tonnage</span></li><li className={step >= 2 ? "active" : ""}>02 <span>Delivery &amp; schedule</span></li><li className={step >= 3 ? "active" : ""}>03 <span>Business information</span></li></ol>
                {step === 1 && <div className="cake-form-step"><div className="cake-selected"><span>Selected cake</span><strong>{selectedCake.name}</strong></div><div className="field"><label htmlFor="tonnage">Volume ({form.tonnage} MT)</label><input id="tonnage" name="tonnage" type="range" min="2" max="500" value={form.tonnage} onChange={update} /><input className="tonnage-number" name="tonnage" type="number" min="2" max="500" step="1" value={form.tonnage} onChange={update} aria-invalid={Boolean(errors.tonnage)} aria-describedby="tonnage-error" />{errors.tonnage && <p className="field-error" id="tonnage-error" role="alert">{errors.tonnage}</p>}</div><fieldset className="cake-options"><legend>Form factor</legend>{selectedCake.forms.map((item) => <label key={item}><input type="radio" name="formFactor" value={item} checked={form.formFactor === item} onChange={update} />{item}</label>)}</fieldset></div>}
                {step === 2 && <div className="cake-form-step"><div className="field"><label htmlFor="destination">Destination pincode / port</label><input id="destination" name="destination" value={form.destination} onChange={update} placeholder="e.g. Mundra Port / 302017" required /></div><div className="field"><label htmlFor="schedule">Dispatch schedule</label><select id="schedule" name="schedule" value={form.schedule} onChange={update}><option>Immediate / Spot Loading</option><option>Monthly Recurring Contract</option><option>Quarterly Supply Contract</option></select></div><fieldset className="cake-options"><legend>Custom specifications</legend>{["Low Moisture < 6%", "Fibre Control < 10%", "Custom Mesh Size"].map((item) => <label key={item}><input type="checkbox" checked={form.specs.includes(item)} onChange={() => toggleSpec(item)} />{item}</label>)}</fieldset></div>}
                {step === 3 && <div className="cake-form-step"><div className="form-grid"><div className="field"><label htmlFor="company">Company name</label><input id="company" name="company" value={form.company} onChange={update} required /></div><div className="field"><label htmlFor="gstin">GSTIN (optional)</label><input id="gstin" name="gstin" value={form.gstin} onChange={update} /></div><div className="field"><label htmlFor="contact">Contact name</label><input id="contact" name="contact" value={form.contact} onChange={update} required /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={update} required /></div><div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" value={form.phone} onChange={update} required /></div></div></div>}
                <div className="wizard-actions"><button className="btn btn-ghost" type="button" onClick={() => step === 1 ? closeRfq() : setStep(step - 1)}>{step === 1 ? "Cancel" : "Back"}</button>{step < 3 ? <button className="btn btn-primary" type="button" onClick={continueToStep}>Continue</button> : <button className="btn btn-primary" type="submit">Generate Firm By-Product Quote ↗</button>}</div>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
