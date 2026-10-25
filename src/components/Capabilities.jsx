import { COMPANY, MILL_STATS } from "../utils/oilData";

export default function Capabilities() {
  return (
    <section className="section band" id="mill">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">{COMPANY.millCode}</p>
            <h2>A Sitapura mill built for contract volumes.</h2>
            <p>
              {COMPANY.legalName} operates from {COMPANY.location}. Licensed {COMPANY.iso},
              FSSAI {COMPANY.fssai}. Crush, refine, fill, and tanker out under one quality
              desk.
            </p>
          </div>
        </div>
        <div className="stats">
          {(MILL_STATS ?? []).map((stat) =>
            stat?.label ? (
              <article className="stat" key={stat.label}>
                <b>{stat.value}</b>
                {stat.label}
              </article>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
