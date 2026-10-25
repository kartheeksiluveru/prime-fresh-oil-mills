import { COMPANY } from "../utils/oilData";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-grid">
        <div>
          <p className="brand-plain">{COMPANY.legalName}</p>
          <p>
            {COMPANY.addressLine}
            <br />
            {COMPANY.city}
          </p>
          <p>
            Sales desk{" "}
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            <br />
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </p>
        </div>
        <div>
          <p>FSSAI {COMPANY.fssai}</p>
          <p>{COMPANY.iso}</p>
          <p>{COMPANY.dispatch} tanker desk · {COMPANY.millCode}</p>
          <p className="fineprint">
            © {new Date().getFullYear()} {COMPANY.legalName}. Indicative quotes are not
            a binding supply contract.
          </p>
        </div>
      </div>
    </footer>
  );
}
