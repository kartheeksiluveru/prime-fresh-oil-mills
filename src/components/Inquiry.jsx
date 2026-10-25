import { useState } from "react";
import { PRODUCTS } from "../utils/oilData";

const empty = {
  company: "",
  email: "",
  sku: "yellow-mustard-oil",
  volume: "",
  notes: "",
};

export default function Inquiry() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ tone: "", text: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!form.company.trim() || !emailOk || !form.volume.trim()) {
      setStatus({
        tone: "error",
        text: "Add company, a valid email, and estimated monthly volume.",
      });
      return;
    }
    const skuName = PRODUCTS.find((item) => item.id === form.sku)?.name ?? "selected oil";
    setStatus({
      tone: "",
      text: `RFQ logged for ${skuName}. A mill desk officer will reply to ${form.email} with packing and tanker options.`,
    });
    setForm(empty);
  };

  return (
    <section className="section alt" id="inquiry">
      <div className="wrap inquiry-grid">
        <div>
          <p className="kicker">Commercial desk</p>
          <h2>Request a mill-gate quote.</h2>
          <p className="muted">
            Share monthly liters or tons. We return a packing plan (15L tin, 200L HDPE
            barrel, or 25,000L road tanker) and a CoA template for your QA team.
          </p>
        </div>
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" value={form.company} onChange={onChange} required />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="sku">SKU</label>
            <select id="sku" name="sku" value={form.sku} onChange={onChange}>
              {PRODUCTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="volume">Monthly volume</label>
            <input
              id="volume"
              name="volume"
              value={form.volume}
              onChange={onChange}
              placeholder="e.g. 25,000 L tanker / month"
              required
            />
          </div>
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="notes">Packing / label notes</label>
            <textarea id="notes" name="notes" rows="3" value={form.notes} onChange={onChange} />
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" type="submit">
              Send RFQ
            </button>
          </div>
          <p className={`form-status${status.tone ? ` ${status.tone}` : ""}`} role="status">
            {status.text}
          </p>
        </form>
      </div>
    </section>
  );
}
