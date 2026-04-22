import Link from 'next/link';

export default function About() {
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
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>AB</div>
        <div className="inner">
          <div className="eyebrow">About</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            Built from real-world<br/>collisions.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            This work is not theory. It comes from building and breaking systems.
          </p>
        </div>
      </div>

      {/* BIO */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
            <div>
              <div className="eyebrow">The Work</div>
              <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'24px'}}>
                Nitin<br/><em style={{color:'var(--goldb)',fontStyle:'italic'}}>Nahata</em>
              </h2>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px'}}>
                <div style={{height:'1px',width:'36px',background:'var(--gold)'}}></div>
                <span style={{fontSize:'11px',letterSpacing:'.18em',textTransform:'uppercase',color:'var(--soft)',fontWeight:600}}>Operating Architect</span>
              </div>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85,marginBottom:'16px'}}>
                Worked across startups, scale-ups, and complex organisations. Focused on where systems fail under growth.
              </p>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85,marginBottom:'24px'}}>
                22+ years inside India&rsquo;s most complex organisations — Tata Group, Standard Chartered, Udaan, Gameskraft.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                {['Tata Group','Standard Chartered','Udaan','Gameskraft'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
                <span style={{fontSize:'10px',padding:'5px 13px',border:'1px solid rgba(200,168,108,.28)',borderRadius:'999px',color:'var(--gold)',letterSpacing:'.06em',fontWeight:600}}>CHRO / CPO · Active</span>
              </div>
            </div>

            {/* EXPERIENCE + PHILOSOPHY */}
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'var(--r)',padding:'28px'}}>
                <div style={{fontSize:'10px',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--soft)',marginBottom:'10px',fontWeight:600}}>Experience</div>
                <div className="sr" style={{fontSize:'40px',fontWeight:400,color:'var(--gold)',lineHeight:1,letterSpacing:'-.04em',marginBottom:'8px'}}>22+</div>
                <p style={{fontSize:'13px',color:'var(--muted)',lineHeight:1.65}}>Years inside India&rsquo;s most complex organisations. Every engagement focused on where systems fail under scale.</p>
              </div>

              <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'var(--r)',padding:'28px'}}>
                <div style={{fontSize:'10px',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--soft)',marginBottom:'12px',fontWeight:600}}>Philosophy</div>
                <blockquote className="sr" style={{fontSize:'20px',lineHeight:1.5,fontWeight:400,fontStyle:'italic',borderLeft:'2px solid #c8a86c',paddingLeft:'20px',color:'var(--text)'}}>
                  &ldquo;Clarity is the most undervalued advantage. Systems create clarity.&rdquo;
                </blockquote>
              </div>

              <div style={{background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'var(--r)',padding:'28px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'10px'}}>
                  <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#86d9a2',flexShrink:0,animation:'pulse 2s infinite'}}></span>
                  <span style={{fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',color:'#86d9a2',fontWeight:600}}>Currently building</span>
                </div>
                <div className="sr" style={{fontSize:'22px',fontWeight:400,marginBottom:'6px'}}>HROS</div>
                <p style={{fontSize:'13px',color:'var(--muted)',lineHeight:1.6,marginBottom:'12px'}}>Intelligent payroll infrastructure for India. Compliance-native. AI-first.</p>
                <Link href="/hros" style={{fontSize:'11px',color:'var(--gold)',letterSpacing:'.05em',fontWeight:500,textDecoration:'none'}}>Learn more →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{justifyContent:'center'}}>Connect</div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Let&rsquo;s connect.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Available for consulting engagements, keynotes, board advisory, CFO roundtables, and media on workforce design &amp; AI.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <span className="bp" style={{fontSize:'14px',padding:'13px 30px',cursor:'pointer'}}>Connect →</span>
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
          <Link href="/practice" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Practice</Link>
          <Link href="/hros" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>HROS</Link>
        </div>
      </footer>
    </>
  );
}
