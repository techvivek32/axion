import Link from 'next/link';

export default function Philosophy() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div style={{lineHeight:1}}>
          <svg width="144" height="46" viewBox="0 0 360 116" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="82" fill="#f5f0e6" fontFamily="Inter,-apple-system,sans-serif" fontSize="82" fontWeight="900" letterSpacing="-5">AX</text>
            <line x1="112" y1="5" x2="112" y2="88" stroke="#c8a86c" strokeWidth="1.8" opacity="0.6"/>
            <text x="119" y="82" fill="#c8a86c" fontFamily="Inter,-apple-system,sans-serif" fontSize="82" fontWeight="300" letterSpacing="-3">ION</text>
            <polygon points="278,80 285,66 292,80" fill="#c8a86c" opacity="0.45"/>
            <polygon points="297,80 307,52 317,80" fill="#c8a86c" opacity="0.72"/>
            <polygon points="322,80 335,24 348,80" fill="#c8a86c"/>
            <rect x="0" y="94" width="348" height="20" fill="#c8a86c"/>
            <text x="174" y="108" textAnchor="middle" fill="#1a0e00" fontFamily="Inter,-apple-system,sans-serif" fontSize="9" fontWeight="900" letterSpacing="17">INDEX</text>
          </svg>
        </div>
        <div style={{display:'flex',gap:'22px',alignItems:'center'}}>
          <Link className="nl" href="/">Home</Link>
          <Link className="nl" href="/philosophy">Philosophy</Link>
          <Link className="nl" href="/frameworks">Frameworks</Link>
          <Link className="nl" href="/writing">Writing</Link>
          <Link className="nl" href="/practice">Practice</Link>
          <Link className="nl" href="/family-business">Family Business</Link>
          <Link className="nl" href="/hros">HROS</Link>
          <Link className="nl" href="/about">About</Link>
          <span className="bp" style={{padding:'8px 20px',fontSize:'11px'}}>Book a call</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="sec" style={{background:'var(--bg)',minHeight:'80vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>01</div>
        <div className="inner">
          <div className="eyebrow">Philosophy</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            The system beneath the organisation is what defines its future.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'640px',lineHeight:1.85}}>
            Most companies don&rsquo;t fail because of bad strategy. They fail because the operating system underneath their people was never designed.
          </p>
        </div>
      </div>

      {/* THE PROBLEM */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="gn" style={{fontSize:'200px',left:'-18px',top:'-16px'}}>02</div>
        <div className="inner">
          <div className="eyebrow">The Problem</div>
          <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,46px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'24px',maxWidth:'680px'}}>
            Organisations were built for stability.<br/>The world moved to complexity.
          </h2>
          <p style={{fontSize:'17px',color:'var(--muted)',maxWidth:'640px',lineHeight:1.85,marginBottom:'20px'}}>
            We built hierarchies, roles, and processes. But we never designed how decisions flow, how ownership behaves, or how systems evolve.
          </p>
          <p style={{fontSize:'17px',color:'var(--text)',maxWidth:'640px',lineHeight:1.85,fontStyle:'italic'}}>
            The result is invisible friction.
          </p>
        </div>
      </div>

      {/* THESIS / ANTI-THESIS / SYNTHESIS */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="gn-hero" style={{fontSize:'360px',left:'-32px',bottom:'-40px',zIndex:0}}>03</div>
        <div className="inner">
          <div className="eyebrow">Core Framework</div>
          <div className="fw-rail">
            <article className="fw-card">
              <span className="fw-no">Thesis</span>
              <h3 style={{fontSize:'28px'}}>People drive<br/>organisations.</h3>
              <p>Without people, there is no organisation. Energy, judgment, and execution all flow through humans.</p>
            </article>
            <article className="fw-card">
              <span className="fw-no">Anti-Thesis</span>
              <h3 style={{fontSize:'28px'}}>People without<br/>structure create chaos.</h3>
              <p>Energy without direction is noise. Judgment without accountability is risk. Execution without rhythm is fragmentation.</p>
            </article>
            <article className="fw-card">
              <span className="fw-no">Synthesis</span>
              <h3 style={{fontSize:'28px'}}>Clarity emerges when<br/>systems align.</h3>
              <p>When systems, decisions, and people align — organisations move with clarity. When they don&rsquo;t, friction becomes invisible.</p>
            </article>
          </div>
        </div>
      </div>

      {/* CORE IDEAS */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div className="eyebrow">Core Ideas</div>
          <h2 className="sr" style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:400,lineHeight:1.15,letterSpacing:'-.02em',marginBottom:'8px'}}>
            Four principles that define<br/>operating intelligence.
          </h2>
          <div className="fg">
            <div className="fg-card">
              <span className="fg-no">01</span>
              <h3>Human Energy<br/>&gt; Org Charts</h3>
              <p>Organisations are energy systems, not reporting structures. Map the energy, not the boxes.</p>
            </div>
            <div className="fg-card">
              <span className="fg-no">02</span>
              <h3>Decision Rights<br/>&gt; Titles</h3>
              <p>Who decides matters more than who reports. Decision rights define power, not job titles.</p>
            </div>
            <div className="fg-card">
              <span className="fg-no">03</span>
              <h3>Systems<br/>&gt; People Dependency</h3>
              <p>Systems that depend on specific people break when those people leave. Build systems that outlast individuals.</p>
            </div>
            <div className="fg-card">
              <span className="fg-no">04</span>
              <h3>Clarity<br/>&gt; Speed</h3>
              <p>Speed without clarity is chaos. Clarity creates sustainable speed. Most organisations optimise for the wrong one.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{justifyContent:'center'}}>Next Step</div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Explore the frameworks<br/>that power this thinking.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Eight signature frameworks that turn philosophy into operating systems. Each one built from real organisational collisions.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link className="bp" href="/frameworks" style={{fontSize:'14px',padding:'13px 30px'}}>View Frameworks →</Link>
              <Link className="bs" href="/" style={{fontSize:'14px',padding:'13px 30px'}}>Back to Home</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(5,5,5,.95)',borderTop:'1px solid var(--line)'}}>
        <span style={{fontSize:'10px',color:'rgba(245,242,235,.16)',letterSpacing:'.04em'}}>© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          <Link href="/" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Home</Link>
          <Link href="/frameworks" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Frameworks</Link>
          <Link href="/practice" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
