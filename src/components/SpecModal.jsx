import { useEffect, useId, useRef, useState } from "react";
import {
  downloadCoA,
  formatLiters,
  getProductById,
  listPackaging,
} from "../utils/oilData";

export default function SpecModal({ productId, onClose }) {
  const product = getProductById(productId);
  const titleId = useId();
  const closeRef = useRef(null);
  const [coaStatus, setCoaStatus] = useState("");

  useEffect(() => {
    if (!product) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  if (!product) return null;

  const rows = [
    ["SKU", product.sku],
    ["Grade", product.grade],
    ["Botanical name", product.botanicalName],
    ["Origin", product.origin],
    ["Process", product.process],
    ["Purity (%)", product.purity],
    ["Free Fatty Acids, FFA max (%)", product.ffaMax],
    ["Moisture (%)", product.moisture],
    ["Specific Gravity at 30°C", product.specificGravity30C],
    ["Refractive Index at 40°C", product.refractiveIndex40C],
    ["Iodine Value", product.iodineValue],
    ["Saponification Value", product.saponificationValue],
    ["Pungency", product.pungency],
    ["Color / odor", `${product.color ?? "—"} · ${product.odor ?? "—"}`],
    [
      "Packaging formats",
      (listPackaging(product) ?? [])
        .map((item) => item?.label)
        .filter(Boolean)
        .join(" · "),
    ],
    ["Lead time", `${product.leadTimeDays ?? "—"} days`],
    ["Shelf life", `${product.shelfLifeMonths ?? "—"} months`],
    ["Certifications", (product.certifications ?? []).join(", ")],
  ];

  const handleCoA = () => {
    const ok = downloadCoA(product);
    setCoaStatus(
      ok
        ? "Certificate of Analysis downloaded (simulated mill copy)."
        : "Download blocked in this browser. Copy specs from the sheet instead."
    );
  };

  return (
    <div
      className="overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal-head">
          <div>
            <p className="kicker">Laboratory spec sheet</p>
            <h2 id={titleId}>{product.name}</h2>
            <p className="muted">{product.labNotes}</p>
          </div>
          <button
            ref={closeRef}
            className="icon-btn"
            type="button"
            aria-label="Close specification sheet"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <table className="spec-table">
          <tbody>
            {(rows ?? []).map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <strong>Applications:</strong> {(product.applications ?? []).join(" · ")}
        </p>
        <p className="muted">MOQ {formatLiters(product.moqLiters)} mill-gate, Jaipur.</p>
        <div className="hero-actions">
          <button className="btn btn-primary" type="button" onClick={handleCoA}>
            Download Certificate of Analysis (CoA)
          </button>
          <a className="btn btn-ghost" href="#quote" onClick={onClose}>
            Quote this SKU
          </a>
        </div>
        <p className="form-status" role="status">
          {coaStatus}
        </p>
      </div>
    </div>
  );
}
