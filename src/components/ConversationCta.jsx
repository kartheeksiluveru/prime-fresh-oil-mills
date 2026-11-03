import { useState } from "react";

const INITIAL_FORM = { name: "", contact: "", volume: "" };

export default function ConversationCta() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const openDrawer = () => { setStep(1); setIsOpen(true); };
  const closeDrawer = () => setIsOpen(false);
  const submit = (event) => { event.preventDefault(); setStep(2); };

  return (
    <section className="conversation-section" aria-labelledby="conversation-title">
      <div className="wrap conversation-card">
        <div className="conversation-orbit conversation-orbit-one" aria-hidden="true" />
        <div className="conversation-orbit conversation-orbit-two" aria-hidden="true" />
        <div className="conversation-copy">
          <p className="kicker">Wholesale partnerships / Commercial desk</p>
          <h2 id="conversation-title">Ready for your <em>next bulk dispatch?</em></h2>
          <div className="conversation-meta"><span>Mill-gate pricing</span><span>CoA-ready batches</span><span>Pan-India dispatch</span></div>
        </div>
        <div className={`conversation-drawer-wrap ${isOpen ? "open" : ""}`}>
          <button className="conversation-button" type="button" onClick={openDrawer} aria-expanded={isOpen} aria-controls="conversation-drawer">Start a conversation <span aria-hidden="true">↗</span></button>
          <div className="conversation-drawer" id="conversation-drawer" aria-hidden={!isOpen}>
            {step === 1 ? <form onSubmit={submit}>
              <div className="owner-card"><div className="owner-avatar" aria-hidden="true">VS</div><div className="owner-info"><span className="drawer-eyebrow">Your commercial desk lead</span><strong>Punit</strong><small>Head of Commercial Sales &amp; Dispatch</small><span className="owner-status"><i aria-hidden="true" /> Active at Sitapura Plant</span></div><div className="owner-actions"><a href="https://wa.me/911412771840?text=Hello%20Vikram%2C%20I%27d%20like%20to%20discuss%20a%20bulk%20oil%20requirement." target="_blank" rel="noreferrer" aria-label="WhatsApp Vikram Singh">WhatsApp</a><a href="tel:+911412771840" aria-label="Call Vikram Singh">Call</a></div></div>
              <div className="drawer-heading"><span>01 / 02</span><strong>Give the mill desk a starting point.</strong></div>
              <div className="drawer-fields">
                <div className="drawer-field"><label htmlFor="conversation-name">Name</label><input id="conversation-name" name="name" value={form.name} onChange={update} required placeholder="Your full name" /></div>
                <div className="drawer-field"><label htmlFor="conversation-contact">Phone or email</label><input id="conversation-contact" name="contact" value={form.contact} onChange={update} required placeholder="Best way to reach you" /></div>
                <div className="drawer-field drawer-field-wide"><label htmlFor="conversation-volume">Brief volume needs</label><textarea id="conversation-volume" name="volume" value={form.volume} onChange={update} required rows="2" placeholder="e.g. 20 MT mustard oil, monthly dispatch to Mumbai" /></div>
              </div>
              <div className="drawer-actions"><button className="drawer-close" type="button" onClick={closeDrawer}>Not now</button><button className="drawer-submit" type="submit">Continue to mill desk <span aria-hidden="true">↗</span></button></div>
            </form> : <div className="drawer-success" role="status" aria-live="polite"><span className="drawer-success-mark">✓</span><div><span className="drawer-eyebrow">02 / 02 · Request received</span><strong>Routing to Sitapura Mill Desk...</strong><p>A commercial specialist will pick this up with your preferred contact.</p></div><button className="drawer-close" type="button" onClick={closeDrawer}>Close</button></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
