import { COMPANY, MILL_STATS } from "../utils/oilData";

export default function Capabilities() {
  return (
    <>
      <section className="section seed-process-section" id="seed-to-oil">
        <div className="wrap seed-process-wrap">
          <div className="seed-process-copy"><p className="kicker">THE MILL / FROM SEED TO SPEC</p><h2>One controlled journey. Four decisive checks.</h2><p>See how each batch moves through the Sitapura mill—from incoming seed to a documented, dispatch-ready oil.</p></div>
          <div className="seed-process-frame"><iframe src="/seed-to-oil-illustration.html" title="Animated seed-to-oil process illustration" /></div>
        </div>
      </section>
      <section className="section band capabilities-section" id="mill">
      <div className="wrap capabilities-content">
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
    </>
  );
}
