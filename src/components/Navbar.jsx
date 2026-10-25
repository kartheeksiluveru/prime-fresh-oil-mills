import { useEffect, useState } from "react";

const LINKS = [
  { href: "#catalog", label: "Catalog" },
  { href: "#quote", label: "Bulk Quote" },
  { href: "#rfq", label: "RFQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      );
    }, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="ops-bar">
        <div className="wrap ops-inner">
          <p className="ops-live" aria-live="polite">
            <span className="pulse" aria-hidden="true" />
            Sourcing Capacity: Active | PAN-India Dispatch
          </p>
          <p className="ops-meta">Mill desk · {clock} IST</p>
        </div>
      </div>
      <div className="wrap nav-row">
        <a className="brand" href="#top" onClick={close}>
          Prime Fresh Oil Mills
          <span>B2B vegetable oils</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="primary-nav" className={`nav-links${open ? " open" : ""}`} aria-label="Primary">
          {(LINKS ?? []).map((link) =>
            link?.href ? (
              <a key={link.href} href={link.href} onClick={close}>
                {link.label}
              </a>
            ) : null
          )}
          <a className="nav-cta" href="#rfq" onClick={close}>
            Request quote
          </a>
        </nav>
      </div>
    </header>
  );
}
