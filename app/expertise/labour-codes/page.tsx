'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';

const BG='#080706',BG2='#0d0c0b',PANEL='#171717',TEXT='#f5f2eb',MUTED='rgba(210,205,195,.62)',SOFT='rgba(210,205,195,.38)',LINE='rgba(255,255,255,.06)',GOLD='#c8a86c',GOLDB='#e5c385',RUST='#8C3B28';
const VP={once:false,margin:'-60px'};
const fadeUp={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:0.7,ease:'easeOut'}}};
const fadeIn={hidden:{opacity:0},show:{opacity:1,transition:{duration:0.7,ease:'easeOut'}}};
const scaleUp={hidden:{opacity:0,scale:0.95},show:{opacity:1,scale:1,transition:{duration:0.6,ease:'easeOut'}}};
const slideLeft={hidden:{opacity:0,x:-30},show:{opacity:1,x:0,transition:{duration:0.6,ease:'easeOut'}}};
const stagger=(d=0.1)=>({hidden:{},show:{transition:{staggerChildren:d}}});

function Eyebrow({label}:{label:string}){
  return(
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:GOLD,marginBottom:'20px'}}>
      <span style={{width:'24px',height:'1px',background:GOLD,flexShrink:0}}/>
      {label}
    </motion.div>
  );
}

// ── Static ticker data ──────────────────────────────────
const TICKER_ITEMS = [
  'TAMIL NADU · CW✓ CIR✓ CSS✓ COSH✓ · All 4 codes notified · 2026-04-15',
  'MAHARASHTRA · CW◐ CIR○ CSS◐ COSH○ · Drafting in progress',
  'KARNATAKA · CW✓ CIR◐ CSS✓ COSH◐ · Partial notification',
  'DELHI · CW✓ CIR○ CSS✓ COSH○ · Wages + Security notified',
  'GUJARAT · CW✓ CIR✓ CSS◐ COSH○ · IR Code notified',
  'RAJASTHAN · CW◐ CIR○ CSS○ COSH○ · Early stage',
  'TELANGANA · CW✓ CIR✓ CSS✓ COSH◐ · 3 codes active',
  'WEST BENGAL · CW○ CIR○ CSS○ COSH○ · Pending',
  'UTTAR PRADESH · CW✓ CIR◐ CSS◐ COSH○ · Wages notified',
  'KERALA · CW✓ CIR✓ CSS✓ COSH✓ · All 4 codes notified · 2026-03-01',
];

// ── Worker classification ───────────────────────────────
const WORKERS = [
  {no:'01',name:'Employee',desc:'Salary > ₹15,000 · All 4 codes apply',codes:['CW','CIR','CSS','COSH']},
  {no:'02',name:'Worker',desc:'Wage employed · Core protections apply',codes:['CW','CSS','COSH']},
  {no:'03',name:'Fixed-Term',desc:'Parity benefits from day one',codes:['CW','CSS']},
  {no:'04',name:'Contract Labour',desc:'Principal employer liability',codes:['CW','CSS','COSH']},
  {no:'05',name:'Gig Worker',desc:'CSS social security provisions',codes:['CSS']},
  {no:'06',name:'Platform Worker',desc:'Aggregator contribution obligations',codes:['CSS']},
];

const CODE_COLORS:Record<string,string>={CW:'rgba(200,168,108,.2)',CIR:'rgba(107,127,153,.2)',CSS:'rgba(60,140,100,.2)',COSH:'rgba(140,59,40,.2)'};
const CODE_TEXT:Record<string,string>={CW:GOLD,CIR:'#8aaccc',CSS:'#7ab895',COSH:'#c4956a'};

// ── Four Codes ──────────────────────────────────────────
const FOUR_CODES = [
  {num:'I',  code:'CW',  name:'Code on Wages',              year:'2019',desc:'Redefines wages, minimum wage, payment of wages, and equal remuneration across all establishments.'},
  {num:'II', code:'CIR', name:'Industrial Relations Code',   year:'2020',desc:'Consolidates trade union law, industrial disputes, and standing orders into one operating framework.'},
  {num:'III',code:'CSS', name:'Social Security Code',        year:'2020',desc:'Unifies PF, ESI, gratuity, maternity, and social security for gig and platform workers.'},
  {num:'IV', code:'COSH',name:'OSH Code',                    year:'2020',desc:'Covers occupational safety, health, and working conditions across all sectors and establishment sizes.'},
];

// ── Questions ───────────────────────────────────────────
const CATEGORIES = ['Cost','Classification','Operations','Benefits','Structure','State','Overtime','Contract'];
const QUESTIONS:{cat:string;q:string;a:string}[] = [
  {cat:'Cost',q:'How much does cost change under the new wage definition?',a:'The unified wage definition typically increases the base for PF, gratuity, and bonus calculations by 15–40% depending on current CTC structure. Calculate impact →'},
  {cat:'Cost',q:'Does the 50% basic wage rule apply to all employees?',a:'Yes — the Code on Wages mandates that basic wages must be at least 50% of total remuneration for PF calculation purposes. Calculate impact →'},
  {cat:'Classification',q:'How is a gig worker classified under the new codes?',a:'Gig workers are defined under the Social Security Code as persons earning from work outside traditional employer-employee relationships. They attract CSS obligations. Calculate impact →'},
  {cat:'Classification',q:'What triggers fixed-term employee status?',a:'A fixed-term employee is engaged for a specific duration with written contract. They receive parity benefits including gratuity from day one. Calculate impact →'},
  {cat:'Operations',q:'What is the single registration requirement?',a:'The OSH Code introduces a unified registration replacing multiple registrations under earlier acts. One registration covers all applicable codes. Calculate impact →'},
  {cat:'Benefits',q:'How does gratuity change for fixed-term employees?',a:'Fixed-term employees are entitled to gratuity on a pro-rata basis from day one — removing the earlier 5-year threshold for this category. Calculate impact →'},
  {cat:'Structure',q:'What are the new standing order requirements?',a:'The IR Code requires establishments with 300+ workers to maintain standing orders. Earlier threshold was 100 workers under the Industrial Employment Act. Calculate impact →'},
  {cat:'State',q:'Which states have notified all four codes?',a:'As of 2026, Tamil Nadu, Kerala, and a few others have notified all four codes. Most states are in partial or draft stages. Calculate impact →'},
];

// ── Triggers ────────────────────────────────────────────
const TRIGGERS = [
  {trigger:'New hire (wage > ₹15K)',codes:['CW','CSS'],action:'PF + ESI registration required'},
  {trigger:'Salary restructuring',codes:['CW'],action:'Recalculate wage definition compliance'},
  {trigger:'Bonus payment',codes:['CW'],action:'Apply revised bonus calculation formula'},
  {trigger:'Termination',codes:['CIR','CSS'],action:'Notice period + gratuity obligations'},
  {trigger:'Contract labour engagement',codes:['CW','CSS','COSH'],action:'Principal employer liability assessment'},
  {trigger:'Gig worker onboarding',codes:['CSS'],action:'Social security contribution setup'},
];

// ── Benefits comparison ─────────────────────────────────
const BENEFITS = [
  {item:'Wages definition',before:'Multiple definitions across acts',after:'Unified definition across all 4 codes',changed:true},
  {item:'Gratuity (fixed-term)',before:'5-year threshold required',after:'Pro-rata from day one',changed:true},
  {item:'EPF base',before:'Basic + DA only',after:'50% of total remuneration minimum',changed:true},
  {item:'Bonus eligibility',before:'₹10,000 wage ceiling',after:'Revised ceiling under CW',changed:true},
  {item:'Leave encashment',before:'Varies by state',after:'Standardised under OSH Code',changed:true},
  {item:'Maternity benefit',before:'Establishments with 10+ women',after:'Maintained, extended to gig',changed:false},
];

// ── FAQ ─────────────────────────────────────────────────
const FAQS = [
  {q:'Is this legal advice?',a:'No. This page provides structural and operational context for understanding India\'s Labour Codes. For legal advice specific to your organisation, consult qualified labour law counsel.'},
  {q:'How current is the data on this page?',a:'The static data reflects the state of Labour Code notifications as of early 2026. State-level notifications change frequently. Always verify with official gazette notifications.'},
  {q:'Do I need a lawyer to implement Labour Code compliance?',a:'For complex organisations — especially those with contract labour, gig workers, or multi-state operations — legal counsel is strongly recommended. The codes introduce significant liability shifts.'},
  {q:'What is the 3i engagement model?',a:'Interpret → Integrate → Institutionalise. Axion Index reads the codes as operating architecture, not compliance checklists, and redesigns the workforce structure accordingly.'},
];

export default function LabourCodes(){
  const [activeQ,setActiveQ]=useState<number|null>(null);
  const [activeCat,setActiveCat]=useState('All');
  const [activeFAQ,setActiveFAQ]=useState<number|null>(null);
  const tickerRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const el=tickerRef.current;
    if(!el)return;
    let x=0;
    const speed=0.5;
    const step=()=>{
      x-=speed;
      if(x<-el.scrollWidth/2)x=0;
      el.style.transform=`translateX(${x}px)`;
      requestAnimationFrame(step);
    };
    const id=requestAnimationFrame(step);
    return()=>cancelAnimationFrame(id);
  },[]);

  const filtered=activeCat==='All'?QUESTIONS:QUESTIONS.filter(q=>q.cat===activeCat);

  return(
    <div style={{background:BG,minHeight:'100vh',color:TEXT,fontFamily:'Inter,-apple-system,sans-serif'}}>
      <NavBar/>

      {/* TICKER */}
      <div style={{background:'#0a0a09',borderBottom:`1px solid ${LINE}`,overflow:'hidden',position:'sticky',top:'57px',zIndex:190}}>
        <div style={{display:'flex',alignItems:'stretch'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'7px 20px',borderRight:`1px solid ${LINE}`,flexShrink:0}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:GOLD,animation:'pulse 2s infinite',flexShrink:0}}/>
            <span style={{fontSize:'9px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:GOLD}}>State Tracker</span>
          </div>
          <div style={{flex:1,overflow:'hidden',position:'relative'}}>
            <div ref={tickerRef} style={{display:'flex',alignItems:'center',height:'100%',whiteSpace:'nowrap',willChange:'transform'}}>
              {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i)=>(
                <span key={i} style={{fontSize:'10px',color:'rgba(245,242,235,.5)',letterSpacing:'0.03em',padding:'7px 32px 7px 0'}}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'120px 56px',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 40% 50%,rgba(200,168,108,.05),transparent 60%)',zIndex:0}}/>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center',position:'relative',zIndex:1}}>
          <div>
            <Eyebrow label="Labour Codes"/>
            <motion.h1 variants={stagger(0.04)} initial="hidden" animate="show"
              style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(36px,5.5vw,64px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-0.04em',color:TEXT,marginBottom:'24px'}}>
              {['Four','codes.','One','operating','architecture.'].map((w,i)=>(
                <motion.span key={i} variants={fadeUp} style={{display:'inline-block',marginRight:'0.28em'}}>{w}</motion.span>
              ))}
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.3}}
              style={{fontSize:'16px',color:MUTED,lineHeight:1.88,maxWidth:'480px',marginBottom:'36px'}}>
              India&rsquo;s Labour Codes consolidate 29 central laws into 4. Most organisations treat this as a compliance update. We treat it as an operating architecture redesign.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.4}}
              style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>
              <a href="#four-codes"
                style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s'}}
                onMouseOver={e=>e.currentTarget.style.background=GOLDB}
                onMouseOut={e=>e.currentTarget.style.background=GOLD}>
                Explore the Four Codes ↓
              </a>
              <Link href="/connect"
                style={{display:'inline-block',padding:'11px 26px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.12)',color:MUTED,fontSize:'13px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'border-color .2s,color .2s'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color=MUTED}}>
                Request a Diagnostic →
              </Link>
            </motion.div>
          </div>
          <motion.div variants={stagger(0.12)} initial="hidden" animate="show"
            style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}}>
            {[{n:'29',label:'Central laws consolidated'},{n:'4',label:'Labour Codes'},{n:'36',label:'States + UTs to notify'},{n:'2019–20',label:'Years of enactment'}].map((s,i)=>(
              <motion.div key={i} variants={scaleUp}
                style={{background:PANEL,border:`1px solid ${LINE}`,padding:'28px 24px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(200,168,108,.3),transparent)`}}/>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'40px',fontWeight:400,color:GOLD,lineHeight:1,letterSpacing:'-0.04em',marginBottom:'8px'}}>{s.n}</div>
                <div style={{fontSize:'12px',color:MUTED,lineHeight:1.5}}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOUR CODES */}
      <section id="four-codes" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="The Four Codes"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Four codes. One unified framework.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            Each code consolidates multiple earlier acts. Together they redefine the operating architecture of every Indian employer.
          </motion.p>
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'2px'}}>
            {FOUR_CODES.map((c,i)=>(
              <motion.div key={c.code} variants={scaleUp}
                style={{background:PANEL,border:`1px solid ${LINE}`,padding:'32px 28px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:CODE_TEXT[c.code],opacity:0.5}}/>
                <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                  <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'28px',fontWeight:400,color:'rgba(200,168,108,.3)',lineHeight:1}}>{c.num}</span>
                  <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:CODE_TEXT[c.code],padding:'3px 10px',background:CODE_COLORS[c.code],borderRadius:'4px'}}>{c.code} · {c.year}</span>
                </div>
                <div style={{fontSize:'18px',fontWeight:600,color:TEXT,marginBottom:'10px',letterSpacing:'-0.01em'}}>{c.name}</div>
                <p style={{fontSize:'13px',color:MUTED,lineHeight:1.75}}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WORKER CLASSIFICATION */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Worker Classification"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Six worker types. Different obligations.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            The codes introduce new worker definitions. Classification determines which codes apply and what obligations are triggered.
          </motion.p>
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexDirection:'column',gap:'2px'}}>
            {WORKERS.map((w,i)=>(
              <motion.div key={w.no} variants={fadeUp}
                style={{display:'grid',gridTemplateColumns:'48px 1fr 1fr auto',gap:'20px',alignItems:'center',background:PANEL,padding:'20px 24px',borderLeft:`3px solid ${LINE}`,borderTop:`1px solid ${LINE}`,transition:'border-color .2s'}}
                onMouseOver={e=>e.currentTarget.style.borderLeftColor=GOLD}
                onMouseOut={e=>e.currentTarget.style.borderLeftColor=LINE}>
                <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',color:SOFT,fontFamily:'monospace'}}>{w.no}</span>
                <div>
                  <div style={{fontSize:'15px',fontWeight:600,color:TEXT,marginBottom:'3px'}}>{w.name}</div>
                  <div style={{fontSize:'12px',color:MUTED}}>{w.desc}</div>
                </div>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {w.codes.map(c=>(
                    <span key={c} style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',color:CODE_TEXT[c],background:CODE_COLORS[c],padding:'3px 8px',borderRadius:'4px'}}>{c}</span>
                  ))}
                </div>
                <span style={{fontSize:'11px',color:GOLD}}>→</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BENEFITS COMPARISON */}
      <section style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="What Changes"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Before and after the codes.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            The codes are not incremental updates. Several provisions represent structural shifts in employer obligations.
          </motion.p>
          <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexDirection:'column',gap:'2px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px',marginBottom:'2px'}}>
              {['Item','Before','After (Codes)'].map(h=>(
                <div key={h} style={{background:'rgba(255,255,255,.03)',padding:'10px 16px',fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:SOFT}}>{h}</div>
              ))}
            </div>
            {BENEFITS.map((b,i)=>(
              <motion.div key={i} variants={fadeUp}
                style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'2px'}}>
                <div style={{background:PANEL,padding:'16px',fontSize:'13px',fontWeight:600,color:TEXT,borderLeft:`3px solid ${b.changed?GOLD:LINE}`}}>{b.item}</div>
                <div style={{background:PANEL,padding:'16px',fontSize:'13px',color:MUTED,fontStyle:'italic'}}>{b.before}</div>
                <div style={{background:PANEL,padding:'16px',fontSize:'13px',color:b.changed?GOLD:MUTED,fontWeight:b.changed?600:400}}>{b.after}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TRIGGER MATRIX */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Trigger Matrix"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Every HR event triggers obligations.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            The codes are not passive. Every routine HR action now has a compliance trigger.
          </motion.p>
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexDirection:'column',gap:'2px'}}>
            {TRIGGERS.map((t,i)=>(
              <motion.div key={i} variants={fadeUp}
                style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:'20px',alignItems:'center',background:PANEL,padding:'20px 24px',borderTop:`1px solid ${LINE}`}}>
                <div style={{fontSize:'14px',fontWeight:600,color:TEXT}}>{t.trigger}</div>
                <div style={{display:'flex',gap:'6px'}}>
                  {t.codes.map(c=>(
                    <span key={c} style={{fontSize:'10px',fontWeight:700,color:CODE_TEXT[c],background:CODE_COLORS[c],padding:'3px 8px',borderRadius:'4px'}}>{c}</span>
                  ))}
                </div>
                <div style={{fontSize:'13px',color:MUTED,fontStyle:'italic'}}>{t.action}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Q&A */}
      <section style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Questions"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            The questions every CFO and CHRO is asking.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'32px',maxWidth:'600px'}}>
            Structural answers to the questions that matter most.
          </motion.p>
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'32px'}}>
            {['All',...CATEGORIES].map(c=>(
              <button key={c} onClick={()=>setActiveCat(c)}
                style={{padding:'6px 16px',borderRadius:'999px',border:'1px solid',borderColor:activeCat===c?GOLD:LINE,background:activeCat===c?'rgba(200,168,108,.1)':'rgba(255,255,255,.02)',color:activeCat===c?GOLD:SOFT,fontSize:'11px',fontWeight:activeCat===c?700:400,cursor:'pointer',letterSpacing:'0.04em',transition:'all .2s'}}>
                {c}
              </button>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCat} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.25}}
              style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {filtered.map((q,i)=>(
                <div key={i} style={{background:PANEL,borderTop:`1px solid ${LINE}`,overflow:'hidden'}}>
                  <button onClick={()=>setActiveQ(activeQ===i?null:i)}
                    style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 24px',background:'none',border:'none',cursor:'pointer',textAlign:'left',gap:'16px'}}>
                    <div>
                      <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:GOLD,marginRight:'12px'}}>{q.cat}</span>
                      <span style={{fontSize:'14px',color:TEXT}}>{q.q}</span>
                    </div>
                    <motion.span animate={{rotate:activeQ===i?45:0}} transition={{duration:0.2}}
                      style={{fontSize:'18px',color:GOLD,flexShrink:0}}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {activeQ===i&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}}>
                        <div style={{padding:'0 24px 20px',borderTop:`1px solid ${LINE}`}}>
                          <p style={{fontSize:'14px',color:MUTED,lineHeight:1.8,paddingTop:'16px'}}>{q.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto'}}>
          <Eyebrow label="FAQ"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,40px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            Frequently asked.
          </motion.h2>
          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexDirection:'column',gap:'2px'}}>
            {FAQS.map((f,i)=>(
              <motion.div key={i} variants={fadeUp} style={{background:PANEL,borderTop:`1px solid ${LINE}`,overflow:'hidden'}}>
                <button onClick={()=>setActiveFAQ(activeFAQ===i?null:i)}
                  style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 24px',background:'none',border:'none',cursor:'pointer',textAlign:'left',gap:'16px'}}>
                  <span style={{fontSize:'14px',fontWeight:600,color:TEXT}}>{f.q}</span>
                  <motion.span animate={{rotate:activeFAQ===i?45:0}} transition={{duration:0.2}}
                    style={{fontSize:'18px',color:GOLD,flexShrink:0}}>+</motion.span>
                </button>
                <AnimatePresence>
                  {activeFAQ===i&&(
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}}>
                      <div style={{padding:'0 24px 20px',borderTop:`1px solid ${LINE}`}}>
                        <p style={{fontSize:'14px',color:MUTED,lineHeight:1.8,paddingTop:'16px'}}>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:BG,padding:'120px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(200,168,108,.06),transparent 60%)',zIndex:0}}/>
        <div style={{position:'relative',zIndex:1}}>
          <motion.p initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={VP} transition={{duration:0.8,ease:'easeOut'}}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(28px,4.5vw,56px)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            Treat compliance as architecture.
          </motion.p>
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={VP} transition={{delay:0.3,duration:0.6}}
            style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/connect"
              style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s,transform .18s',boxShadow:'0 12px 40px rgba(200,168,108,.3)'}}
              onMouseOver={e=>{e.currentTarget.style.background=GOLDB;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseOut={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}>
              Request a Labour Codes Diagnostic →
            </Link>
            <Link href="/founder"
              style={{display:'inline-block',padding:'11px 26px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.12)',color:MUTED,fontSize:'13px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'border-color .2s,color .2s,transform .18s'}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color=MUTED;e.currentTarget.style.transform='translateY(0)'}}>
              Speak with the Founder →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'rgba(5,5,4,.98)',padding:'20px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',borderTop:`1px solid ${LINE}`,flexWrap:'wrap',gap:'16px'}}>
        <span style={{fontSize:'10px',color:SOFT,letterSpacing:'0.04em'}}>© 2026 Axion Index</span>
        <div style={{display:'flex',gap:'22px'}}>
          {[['/', 'Home'],['/about','About'],['/founder','Founder'],['/connect','Connect']].map(([href,label])=>(
            <Link key={href} href={href} style={{fontSize:'11px',color:SOFT}}>{label}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        @media(max-width:1024px){
          section>div{grid-template-columns:1fr!important}
        }
        @media(max-width:767px){
          section{padding:64px 20px!important}
          footer{padding:20px!important;flex-direction:column!important;text-align:center!important}
        }
      `}</style>
    </div>
  );
}
