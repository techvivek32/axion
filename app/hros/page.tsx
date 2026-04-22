import Link from 'next/link';

const features = [
  { no:'01', name:'Intelligent Payroll Layer',   desc:'Wage structure validation, 50% Rule compliance, PF/ESI cascade calculations — automated and traceable.' },
  { no:'02', name:'Compliance Intelligence',     desc:'Labour Codes interpreted as live doctrine. Every obligation mapped to your headcount, states, and worker types in real time.' },
  { no:'03', name:'Decision Engine',             desc:'Six cooperating agents that route every query to the right answer — with a full audit trail and STUCK Protocol for grey areas.' },
  { no:'04', name:'Cost Simulation',             desc:'Total Employment Obligation modelled per employee. P&L vs balance sheet split. Three scenarios: conservative, aggressive, recommended.' },
];

export default function HROS() {
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
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>HR</div>
        <div className="inner">
          <div className="eyebrow">HROS</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            The operating system for<br/>modern organisations.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            Not a tool. Not a feature. A system.
          </p>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center'}}>
            <div>
              <div className="eyebrow">The Problem</div>
              <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'20px'}}>
                Compliance is treated<br/>as a checklist.
              </h2>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85,marginBottom:'16px'}}>
                But real risk lives in interpretation. Every competitor treats Labour Codes as a form. A PDF upload. A tooltip in a payroll screen.
              </p>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85}}>
                That is the gap HROS enters through.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {[
                'Legacy HRMS: checklist, not intelligence',
                'Big-4 advisory: human-scaled, not a product',
                'Point solutions: surface-level, no cost cascade',
                'HROS: doctrine, not a form',
              ].map((item, i) => (
                <div key={i} style={{padding:'16px 20px',borderRadius:'var(--r)',border:'1px solid var(--line)',background:i===3?'rgba(200,168,108,.06)':'rgba(255,255,255,.02)',borderColor:i===3?'rgba(200,168,108,.25)':'var(--line)'}}>
                  <span style={{fontSize:'13px',color:i===3?'var(--gold)':'var(--muted)',lineHeight:1.6}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div className="eyebrow">The Solution</div>
          <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'8px',maxWidth:'680px'}}>
            HROS converts labour laws into live intelligence.
          </h2>
          <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'560px',lineHeight:1.8,marginBottom:'40px'}}>
            Intelligent payroll is the wedge. Command Centre is the moat. HROS is the destination.
          </p>
          <div className="hw-grid">
            {features.map((f) => (
              <div key={f.no} className="hw-card">
                <span className="hw-step">{f.no}</span>
                <h3 className="sr" style={{fontSize:'18px'}}>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div className="cta-panel">
            <div style={{display:'flex',alignItems:'center',gap:'8px',justifyContent:'center',marginBottom:'20px'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#86d9a2',animation:'pulse 2s infinite',flexShrink:0}}></span>
              <span style={{fontSize:'10px',letterSpacing:'.18em',textTransform:'uppercase',color:'#86d9a2',fontWeight:600}}>Currently building</span>
            </div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Intelligent payroll.<br/>Compliance-native. AI-first.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Built for organisations that treat compliance as architecture, not administration. Join the waitlist or start a conversation.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <span className="bp" style={{fontSize:'14px',padding:'13px 30px',cursor:'pointer'}}>Talk to us →</span>
              <Link className="bs" href="/practice" style={{fontSize:'14px',padding:'13px 30px'}}>View Practice</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(5,5,5,.95)',borderTop:'1px solid var(--line)'}}>
        <span style={{fontSize:'10px',color:'rgba(245,242,235,.16)',letterSpacing:'.04em'}}>© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          <Link href="/" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Home</Link>
          <Link href="/practice" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Practice</Link>
          <Link href="/about" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>About</Link>
        </div>
      </footer>
    </>
  );
}
