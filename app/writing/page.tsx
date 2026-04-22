import Navigation from '@/components/Navigation';
import Link from 'next/link';

const categories = [
  'HR Tech & Systems',
  'Startup Journey',
  'AI & Talent',
  'Organisation Design',
  'Family Business',
  'Operating Architect',
];

const articles = [
  { cat:'Startup Journey',      title:'Why Most Startups Break After 50 Employees',              desc:'The inflection point where informal systems collapse and operating architecture becomes non-negotiable.' },
  { cat:'HR Tech & Systems',    title:'The Hidden Cost of the 50% Wage Rule',                    desc:'How the Labour Codes wage restructuring creates a 6â€“12% employment cost impact most CFOs have not modelled.' },
  { cat:'AI & Talent',          title:'AI is Not Replacing Jobs â€” It\'s Replacing Structures',   desc:'The real disruption is not at the role level. It is at the decision and accountability layer.' },
  { cat:'Organisation Design',  title:'Decision Rights: The Missing Layer in Every Company',     desc:'Most organisations define who works. Almost none define who decides. That gap is where friction lives.' },
  { cat:'Operating Architect',  title:'The Coherence Equation in Practice',                      desc:'How Belief Ã— Decision Rights Ã— Rhythm Ã· Organisational Debt plays out inside real growth-stage companies.' },
  { cat:'Family Business',      title:'Succession Is an Architecture Problem',                   desc:'Why most family business transitions fail â€” and what the Axion Index framework does differently.' },
];

export default function Writing() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <div className="sec" style={{background:'var(--bg)',minHeight:'70vh',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',overflow:'hidden'}}>
        <div className="gn-hero" style={{fontSize:'420px',right:'-48px',top:'-60px',zIndex:0}}>WR</div>
        <div className="inner">
          <div className="eyebrow">Writing</div>
          <h1 className="sr" style={{fontSize:'clamp(40px,6vw,72px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-.04em',marginBottom:'28px',maxWidth:'820px'}}>
            Ideas that challenge how<br/>organisations actually work.
          </h1>
          <p style={{fontSize:'19px',color:'var(--muted)',maxWidth:'600px',lineHeight:1.85}}>
            This is where thinking becomes practical. Every article connects theory with execution.
          </p>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="sec" style={{background:'var(--bg2)',paddingBottom:'40px'}}>
        <div className="inner">
          <div className="eyebrow">Categories</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginTop:'8px'}}>
            {categories.map((c) => (
              <span key={c} className="chip" style={{cursor:'pointer',fontSize:'12px',padding:'7px 16px'}}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="sec" style={{background:'var(--bg2)',paddingTop:'0'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
            {articles.map((a, i) => (
              <div key={i} className="sc" style={{cursor:'pointer'}}>
                <div className="sc-cat">{a.cat}</div>
                <div className="sc-t">{a.title}</div>
                <div className="sc-r"></div>
                <div className="sc-b">{a.desc}</div>
                <div style={{fontSize:'11px',color:'var(--gold)',marginTop:'14px',fontWeight:500}}>Read â†’</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="sec" style={{background:'var(--bg)'}}>
        <div className="inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center'}}>
            <div>
              <div className="eyebrow">Newsletter</div>
              <h2 className="sr" style={{fontSize:'clamp(28px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-.03em',marginBottom:'16px'}}>
                The Operating<br/>Architect Brief.
              </h2>
              <p style={{fontSize:'15px',color:'var(--muted)',lineHeight:1.8}}>
                One framework insight. One uncomfortable question. One resource. Under 800 words. Every week.
              </p>
            </div>
            <div>
              <input type="email" placeholder="your@email.com" style={{width:'100%',padding:'13px 18px',background:'#1c1b1b',border:'1px solid rgba(255,255,255,.08)',borderRadius:'22px',color:'var(--text)',fontSize:'13px',marginBottom:'10px',outline:'none',display:'block'}}/>
              <span className="bp" style={{width:'100%',textAlign:'center',display:'block',fontSize:'13px',padding:'13px',cursor:'pointer'}}>Read the latest insights â†’</span>
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
