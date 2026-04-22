import Navigation from '@/components/Navigation';
import Link from 'next/link';

const pillars = [
  { no:'01', name:'Authority',    desc:'Who holds decision rights across generations. Mapping authority structures that survive transition without depending on a single person.' },
  { no:'02', name:'Leadership',   desc:'Developing the next generation as operating architects â€” not just successors. Leadership as a system, not a personality.' },
  { no:'03', name:'Governance',   desc:'Boards, councils, and accountability structures that hold the institution together across family and professional lines.' },
  { no:'04', name:'Succession',   desc:'Succession as an operating architecture problem â€” not a family dynamics one. Decision ownership redesigned for the next generation.' },
  { no:'05', name:'Continuity',   desc:'The systems, rhythms, and beliefs that carry the institution forward when leadership changes. What survives the founder.' },
];

export default function FamilyBusiness() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <div className="sec" style={{background:'var(--bg)',minHeight:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>FB</div>
        <div className="inner">
          <div className="eyebrow">Family Business</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            Building institutions that<br/>outlast generations.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            Family businesses carry legacy. But legacy without structure collapses.
          </p>
        </div>
      </div>

      {/* STORY + AXION INDEX */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start',marginBottom:'56px'}}>
            <div>
              <div className="eyebrow">The Story</div>
              <h2 className="sr" style={{fontSize:'clamp(26px,3vw,40px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'20px'}}>
                Legacy is not enough.<br/>Structure is what survives.
              </h2>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85,marginBottom:'16px'}}>
                Most family businesses are built on the founder&rsquo;s energy. That energy is real. But it is not transferable without architecture.
              </p>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85}}>
                The transition from a family-run company to a structured institution is the hardest operating challenge any organisation faces.
              </p>
            </div>
            <div style={{background:'linear-gradient(135deg,rgba(200,168,108,.07),rgba(200,168,108,.02))',border:'1px solid rgba(200,168,108,.14)',borderRadius:'var(--rg)',padding:'36px'}}>
              <div style={{fontSize:'11px',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',fontWeight:600,marginBottom:'14px'}}>Axion Index</div>
              <h3 className="sr" style={{fontSize:'28px',fontWeight:400,letterSpacing:'-.03em',marginBottom:'14px',lineHeight:1.2}}>
                A system to transform family-run companies into structured institutions.
              </h3>
              <p style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.75}}>
                Not a governance template. Not a succession plan. A complete operating architecture for the next generation.
              </p>
            </div>
          </div>

          {/* 5 PILLARS */}
          <div className="eyebrow">Five Pillars</div>
          <div className="aud-grid" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
            {pillars.map((p) => (
              <article key={p.no} className="aud-card">
                <span className="aud-num">{p.no}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{justifyContent:'center'}}>Axion Index</div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Build a legacy that<br/>survives scale.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Advisory engagements for family businesses navigating generational transition. Decision ownership redesigned for the next generation.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <span className="bp" style={{fontSize:'14px',padding:'13px 30px',cursor:'pointer'}}>Explore Axion Index â†’</span>
              <Link className="bs" href="/practice" style={{fontSize:'14px',padding:'13px 30px'}}>View all services</Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(5,5,5,.95)',borderTop:'1px solid var(--line)'}}>
        <span style={{fontSize:'10px',color:'rgba(245,242,235,.16)',letterSpacing:'.04em'}}>Â© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          <Link href="/" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Home</Link>
          <Link href="/frameworks" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Frameworks</Link>
          <Link href="/practice" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
