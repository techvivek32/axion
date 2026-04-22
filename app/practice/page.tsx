import Navigation from '@/components/Navigation';
import Link from 'next/link';

const services = [
  {
    no: '01',
    name: 'Labour Codes Advisory',
    tag: 'COMPLIANCE',
    tagBg: 'rgba(55,100,180,.12)',
    tagColor: '#8aaccc',
    tagBorder: 'rgba(55,100,180,.22)',
    headline: 'Turn compliance into advantage.',
    desc: 'Labour Codes interpreted as cost, classification, and operating architecture â€” not a checklist. The 3i framework applied to your organisation.',
  },
  {
    no: '02',
    name: 'Organisation Design',
    tag: 'ARCHITECTURE',
    tagBg: 'rgba(60,140,100,.12)',
    tagColor: '#7ab895',
    tagBorder: 'rgba(60,140,100,.22)',
    headline: 'Structure how decisions actually flow.',
    desc: 'Workforce architecture diagnostics. Maps how work is distributed, controlled, and accounted for. From policy ownership to true operating architecture.',
  },
  {
    no: '03',
    name: 'Performance & Reward',
    tag: 'SYSTEMS',
    tagBg: 'rgba(100,80,160,.12)',
    tagColor: '#9b8fc0',
    tagBorder: 'rgba(100,80,160,.22)',
    headline: 'Align incentives with outcomes.',
    desc: 'Compensation structures aligned to AI-replicable vs human-irreplaceable work. Salary Disconnect Matrix applied. Value Barbell Model for defensible reward design.',
  },
];

const questions = [
  { q: 'What is broken?',       desc: 'Structured diagnostic of workforce architecture, compliance exposure, and decision ownership.' },
  { q: 'What must change?',     desc: 'Translated into a cost, risk, and structure map. Decision-grade clarity for CFOs, CHROs, and boards.' },
  { q: 'What system replaces it?', desc: 'Architecture recommendations and implementation frameworks. Roles, accountability, governance, operating rhythm.' },
];

export default function Practice() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <div className="sec" style={{background:'var(--bg)',minHeight:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>PR</div>
        <div className="inner">
          <div className="eyebrow">Practice</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            We don&rsquo;t consult.<br/>We build operating systems.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            We don&rsquo;t deliver reports. We design systems that operate even when you are not looking.
          </p>
        </div>
      </div>

      {/* SERVICES */}
      <div className="sec" style={{background:'var(--bg2)'}}>
        <div className="inner">
          <div className="eyebrow">Services</div>
          <div className="fw-rail">
            {services.map((s) => (
              <article key={s.no} className="fw-card">
                <span className="fw-no">{s.no}</span>
                <span style={{fontSize:'10px',padding:'4px 12px',borderRadius:'999px',background:s.tagBg,color:s.tagColor,border:`1px solid ${s.tagBorder}`,fontWeight:600,letterSpacing:'.08em',display:'inline-block',marginBottom:'16px'}}>{s.tag}</span>
                <h3>{s.name}</h3>
                <p style={{color:'var(--gold)',fontSize:'14px',fontWeight:500,marginBottom:'10px'}}>{s.headline}</p>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="gn" style={{fontSize:'200px',left:'-18px',top:'-16px'}}>AP</div>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
            <div>
              <div className="eyebrow">The Approach</div>
              <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'20px'}}>
                Every engagement<br/>answers three questions.
              </h2>
              <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.85}}>
                We do not optimise processes. We redesign systems. Every engagement begins with a diagnostic and ends with a structural recommendation you can act on.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0'}}>
              {questions.map((q, i) => (
                <div key={i} className="hw-card" style={{marginBottom:'14px'}}>
                  <span className="hw-step">Question {String(i+1).padStart(2,'0')}</span>
                  <h3 className="sr" style={{fontSize:'20px',marginBottom:'8px'}}>{q.q}</h3>
                  <p>{q.desc}</p>
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
            <div className="eyebrow" style={{justifyContent:'center'}}>Start here</div>
            <h2 className="sr" style={{fontSize:'clamp(30px,4vw,52px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'18px'}}>
              Start building your<br/>operating system.
            </h2>
            <p style={{fontSize:'16px',color:'var(--muted)',maxWidth:'520px',margin:'0 auto 36px',lineHeight:1.8}}>
              Every engagement begins with a diagnostic. No jargon â€” decision-grade clarity for CFOs, CHROs, and boards.
            </p>
            <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
              <span className="bp" style={{fontSize:'14px',padding:'13px 30px',cursor:'pointer'}}>Start a conversation â†’</span>
              <Link className="bs" href="/frameworks" style={{fontSize:'14px',padding:'13px 30px'}}>View Frameworks</Link>
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
          <Link href="/hros" style={{fontSize:'11px',color:'rgba(245,242,235,.22)',textDecoration:'none'}}>HROS</Link>
        </div>
      </footer>
    </>
  );
}
