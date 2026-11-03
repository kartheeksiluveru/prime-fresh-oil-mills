export default function ConversationCta() {
  return (
    <section className="conversation-section" aria-labelledby="conversation-title">
      <div className="wrap conversation-card">
        <div className="conversation-orbit conversation-orbit-one" aria-hidden="true" />
        <div className="conversation-orbit conversation-orbit-two" aria-hidden="true" />
        <div className="conversation-copy">
          <p className="kicker">Wholesale partnerships / Commercial desk</p>
          <h2 id="conversation-title">Ready for your <em>next bulk dispatch?</em></h2>
          <p>Tell us what your brand needs. We’ll shape the right oil, pack format, and dispatch route with you.</p>
          <div className="conversation-meta"><span>Mill-gate pricing</span><span>CoA-ready batches</span><span>Pan-India dispatch</span></div>
        </div>
        <a className="conversation-button" href="#rfq">Start a conversation <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
