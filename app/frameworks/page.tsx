import Link from 'next/link';

const frameworks = [
  { no:'01', name:'Human Energy Framework',      desc:'Replaces traditional org charts with energy flow systems. Maps how human energy moves, stalls, and compounds inside organisations.' },
  { no:'02', name:'Coherence Equation',           desc:'Align belief, decision rights, and rhythm. When these three are in sync, organisations move with clarity and compound over time.' },
  { no:'03', name:'Unfinished Organisation',      desc:'Organisations are never complete — they evolve. The three-stage sequence: Belief → Conviction → Rhythm.' },
  { no:'04', name:'Decision Rights Architecture', desc:'Defines who decides, not just who works. The four architecture primitives that determine how power actually flows.' },
  { no:'05', name:'AI Edge Diagnostic™',          desc:'Measures human vs AI replaceability. Structural leverage assessment using the E-D-G-E framework.' },
  { no:'06', name:'Salary Disconnect Matrix™',    desc:'Aligns pay with real value creation. Compensation vs. AI-replicable deliverables. The Value Barbell Model.' },
  { no:'07', name:'Conviction Stack',             desc:'Build human capabilities AI cannot replace. Maps irreplaceable human skills against AI-dominated capabilities.' },
  { no:'08', name:'BYD Blueprints',               desc:'Belief → Your Energy → Direction operating system. The startup-stage architecture applied guide.' },
];

export default function Frameworks() {
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
      <div className="sec" style={{background:'var(--bg)',minHeight:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>FW</div>
        <div className="inner">
          <div className="eyebrow">Frameworks</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            Frameworks that replace<br/>guesswork with structure.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            These frameworks are not academic. They are built from real organisational breakdowns and rebuilt into systems.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
            {frameworks.map((f) => (
              <div key={f.no} className="fg-card" style={{padding:'32px',minHeight:'200px',cursor:'pointer'}}>
                <span className="fg-no">{f.no}</span>
                <h3 style={{fontFamily:'Playfair Display,Georgia,serif',fontSize:'22px',fontWeight:400,marginBottom:'12px',letterSpacing:'-.02em',lineHeight:1.2}}>{f.name}</h3>
                <p style={{color:'var(--muted)',fontSize:'14px',lineHeight:1.7}}>{f.desc}</p>
                <div style={{fontSize:'11px',color:'var(--gold)',marginTop:'16px',fontWeight:500}}>Explore →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HIGHLIGHT */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center'}}>
            <div>
              <div className="eyebrow">Why frameworks matter</div>
              <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'20px'}}>
                Structure is not a constraint.<br/>It is the source of speed.
              </h2>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85,marginBottom:'16px'}}>
                Every framework here was built because a real organisation needed it. Not because a theory demanded it.
              </p>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85}}>
                They are designed to be applied — not admired.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {['Built from real breakdowns','Applied in live organisations','Designed for decision-makers','Updated as the world changes'].map((item, i) => (
                <div key={i} className="tl-item" style={{fontSize:'15px'}}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{justifyContent:'center'}}>Go deeper</div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Dive deeper into<br/>each framework.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Each framework has a full explanation, application guide, and connection to the broader operating doctrine.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <Link className="bp" href="/practice" style={{fontSize:'14px',padding:'13px 30px'}}>See how we apply them →</Link>
              <Link className="bs" href="/philosophy" style={{fontSize:'14px',padding:'13px 30px'}}>Read the philosophy</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(5,5,5,.95)',borderTop:'1px solid var(--line)'}}>
        <span style={{fontSize:'10px',color:'rgba(245,242,235,.16)',letterSpacing:'.04em'}}>© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          <Link href="/" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Home</Link>
          <Link href="/philosophy" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Philosophy</Link>
          <Link href="/practice" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
