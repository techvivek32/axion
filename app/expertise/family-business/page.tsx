'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';

const BG='#080706',BG2='#0d0c0b',PANEL='#171717',TEXT='#f5f2eb',MUTED='rgba(210,205,195,.62)',SOFT='rgba(210,205,195,.38)',LINE='rgba(255,255,255,.06)',GOLD='#c8a86c',GOLDB='#e5c385',RUST='#8C3B28';
const VP={once:false,margin:'-60px'};
const fadeUp={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const fadeIn={hidden:{opacity:0},show:{opacity:1,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const scaleUp={hidden:{opacity:0,scale:0.95},show:{opacity:1,scale:1,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const slideLeft={hidden:{opacity:0,x:-40},show:{opacity:1,x:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const stagger=(d=0.15)=>({hidden:{},show:{transition:{staggerChildren:d}}});
const lineGrowY={hidden:{scaleY:0,originY:0},show:{scaleY:1,transition:{duration:1,ease:[0.22,1,0.36,1]as const}}};

function Eyebrow({label}:{label:string}){
  return(
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:GOLD,marginBottom:'20px'}}>
      <span style={{width:'24px',height:'1px',background:GOLD,flexShrink:0}}/>
      {label}
    </motion.div>
  );
}

const architectures=[
  {num:'I',  name:'Authority',    def:'Who decides, who escalates, who resolves.',    q:'Can every person in your organisation name who decides what — without asking?', fail:'Founder-centric bottleneck.',  detail:'Authority architecture defines the decision rights map. Without it, every significant decision routes back to the founder — creating a bottleneck that compounds as the organisation scales. The failure is not the founder\'s capability. It is the absence of a designed system for distributing authority across generations.'},
  {num:'II', name:'Leadership',   def:'Family vs professional leadership roles.',      q:'Are family roles defined by capability or by birthright?',                      fail:'Role confusion.',             detail:'Leadership architecture separates the family system from the professional system. When family members hold roles by default rather than by design, the organisation cannot attract or retain professional talent. The failure mode is not nepotism — it is the absence of a clear framework for how family and professional leadership coexist.'},
  {num:'III',name:'Governance',   def:'The daily operating system.',                  q:'Does your board meet to govern — or to ratify decisions already made?',         fail:'Board exists only on paper.', detail:'Governance architecture is the operating system of the institution. Most family businesses have governance structures that exist on paper but do not function in practice. The board meets to ratify, not to govern. The result is that the institution has no mechanism for self-correction when the operating model drifts.'},
  {num:'IV', name:'Succession',   def:'System, not event.',                           q:'Is your succession plan a document — or a running system?',                    fail:'Transition shock.',           detail:'Succession architecture treats transition as a continuous system, not a one-time event. Most family businesses treat succession as something that happens when the founder retires or dies. By then, the architecture for transition has not been built. The result is transition shock — a period of instability that destroys value and talent simultaneously.'},
  {num:'V',  name:'Capabilities', def:'Uncrossable competitive strengths.',           q:'What does your family business do that a PE-backed competitor cannot replicate?',fail:'Commodity business.',         detail:'Capabilities architecture identifies and codifies the competitive strengths that are unique to the family enterprise — patient capital, long-term relationships, institutional memory, brand trust. Without this architecture, the family business competes on the same terms as any other business and loses its structural advantage.'},
];

const caseData=[
  {gen:'Generation 1 → 2',pct:'30%',note:'survive the transition'},
  {gen:'Generation 2 → 3',pct:'12%',note:'survive to the third generation'},
  {gen:'Generation 3 → 4',pct:'3%', note:'reach the fourth generation intact'},
];

export default function FamilyBusiness(){
  const [activeArch,setActiveArch]=useState<number|null>(null);
  const [hoveredArch,setHoveredArch]=useState<number|null>(null);

  return(
    <div style={{background:BG,minHeight:'100vh',color:TEXT,fontFamily:'Inter,-apple-system,sans-serif'}}>
      <NavBar/>

      {/* 6.1 HERO */}
      <section id="hero" style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'0 56px',minHeight:'80vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(200,168,108,.05),transparent 60%)',zIndex:0}}/>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'64px',alignItems:'center',position:'relative',zIndex:1,width:'100%',padding:'96px 0'}}>
          <div>
            <Eyebrow label="Family Business Architecture"/>
            <motion.h1 variants={stagger(0.04)} initial="hidden" animate="show"
              style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(36px,5.5vw,68px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-0.04em',color:TEXT,marginBottom:'24px'}}>
              {['Longevity','is','not','inherited.','It','is','designed.'].map((w,i)=>(
                <motion.span key={i} variants={fadeUp} style={{display:'inline-block',marginRight:'0.28em'}}>{w}</motion.span>
              ))}
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show"
              style={{fontSize:'17px',color:GOLD,lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>
              Family businesses do not fail because markets shift. They fail because architecture does not evolve across generations.
            </motion.p>
            <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.3}}
              style={{fontSize:'15px',color:MUTED,lineHeight:1.88,maxWidth:'520px',marginBottom:'36px'}}>
              Most family enterprises scale revenue before they scale structure. The result is an institution that grows in size but not in durability — dependent on the founder&rsquo;s presence, vulnerable to transition, and unable to compound across generations.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.4}}
              style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>
              <a href="#architectures"
                style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s'}}
                onMouseOver={e=>e.currentTarget.style.background=GOLDB}
                onMouseOut={e=>e.currentTarget.style.background=GOLD}>
                See the Five Architectures ↓
              </a>
              <Link href="/connect"
                style={{display:'inline-block',padding:'11px 26px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.12)',color:MUTED,fontSize:'13px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'border-color .2s,color .2s'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color=MUTED}}>
                Request a Family Diagnostic →
              </Link>
            </motion.div>
          </div>
          {/* Roman numeral V */}
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:1.8,ease:'easeOut'}}
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(120px,18vw,220px)',fontWeight:400,color:'rgba(200,168,108,.08)',lineHeight:1,userSelect:'none',letterSpacing:'-0.06em'}}>V</span>
          </motion.div>
        </div>
      </section>

      {/* 6.2 FIVE ARCHITECTURES */}
      <section id="architectures" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Five Architectures"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Five architectures. One outcome — longevity.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            Each architecture addresses a distinct failure mode. Together they define whether the institution survives the founder.
          </motion.p>

          {/* Timeline line */}
          <div style={{position:'relative',paddingLeft:'48px'}}>
            <motion.div variants={lineGrowY} initial="hidden" whileInView="show" viewport={VP}
              style={{position:'absolute',left:'16px',top:0,bottom:0,width:'2px',background:`linear-gradient(to bottom,${RUST},rgba(140,59,40,.2))`}}/>

            <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP}
              style={{display:'flex',flexDirection:'column',gap:'2px'}}>
              {architectures.map((a,i)=>(
                <motion.div key={a.num} variants={slideLeft}
                  onMouseEnter={()=>setHoveredArch(i)}
                  onMouseLeave={()=>setHoveredArch(null)}
                  onClick={()=>setActiveArch(activeArch===i?null:i)}
                  style={{
                    background:PANEL,
                    borderLeft:`3px solid ${hoveredArch===i||activeArch===i?GOLD:LINE}`,
                    padding:'28px 28px 28px 24px',
                    cursor:'pointer',
                    position:'relative',
                    transition:'border-color .2s',
                    borderTop:`1px solid ${LINE}`,
                  }}>
                  {/* Timeline dot */}
                  <div style={{position:'absolute',left:'-37px',top:'32px',width:'10px',height:'10px',borderRadius:'50%',background:RUST,border:`2px solid ${BG2}`}}/>
                  {/* Top shimmer */}
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(200,168,108,.25),transparent)`}}/>

                  <div style={{display:'grid',gridTemplateColumns:'56px 1fr auto',gap:'20px',alignItems:'start'}}>
                    <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'32px',fontWeight:400,color:'rgba(200,168,108,.4)',lineHeight:1}}>{a.num}</span>
                    <div>
                      <div style={{fontSize:'20px',fontWeight:600,color:TEXT,marginBottom:'6px',letterSpacing:'-0.01em'}}>{a.name}</div>
                      <div style={{fontSize:'14px',color:MUTED,lineHeight:1.7,marginBottom:'8px'}}>{a.def}</div>
                      <div style={{fontSize:'12px',color:SOFT,fontStyle:'italic'}}>Diagnostic: {a.q}</div>
                    </div>
                    <motion.span animate={{rotate:activeArch===i?45:0}} transition={{duration:0.2}}
                      style={{fontSize:'20px',color:GOLD,flexShrink:0,marginTop:'4px',display:'block'}}>+</motion.span>
                  </div>

                  {/* Expandable overlay */}
                  <AnimatePresence>
                    {activeArch===i&&(
                      <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3,ease:'easeOut'}}
                        style={{overflow:'hidden'}}>
                        <div style={{paddingTop:'20px',marginTop:'20px',borderTop:`1px solid ${LINE}`}}>
                          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>
                            <div>
                              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:GOLD,marginBottom:'8px'}}>Explanation</div>
                              <p style={{fontSize:'13px',color:MUTED,lineHeight:1.8}}>{a.detail}</p>
                            </div>
                            <div>
                              <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:RUST,marginBottom:'8px'}}>Failure Mode</div>
                              <p style={{fontSize:'13px',color:'rgba(210,205,195,.55)',lineHeight:1.8,fontStyle:'italic'}}>{a.fail}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6.3 FRAMEWORK EXPLANATION */}
      <section id="framework" style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="System Logic"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,40px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'20px'}}>
            Five architectures operate as a system.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.88,maxWidth:'640px',marginBottom:'48px'}}>
            These are not independent pillars. Each architecture depends on the others. Authority without governance is arbitrary. Succession without leadership architecture is destabilising. Capabilities without governance are unprotected. The system only holds when all five are designed together.
          </motion.p>

          {/* Flow diagram */}
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',alignItems:'center',flexWrap:'wrap',gap:'0'}}>
            {architectures.map((a,i)=>(
              <div key={a.num} style={{display:'flex',alignItems:'center'}}>
                <motion.div variants={scaleUp}
                  style={{padding:'16px 20px',border:`1px solid rgba(200,168,108,.25)`,background:PANEL,textAlign:'center',minWidth:'120px'}}>
                  <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'11px',color:GOLD,marginBottom:'4px'}}>{a.num}</div>
                  <div style={{fontSize:'13px',fontWeight:600,color:TEXT}}>{a.name}</div>
                </motion.div>
                {i<4&&(
                  <motion.div initial={{scaleX:0,originX:0}} whileInView={{scaleX:1}} viewport={VP} transition={{duration:0.6,delay:i*0.1}}
                    style={{width:'32px',height:'1px',background:GOLD,flexShrink:0}}/>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6.4 CASE LOGIC */}
      <section id="case" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Evidence"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,40px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Why most family businesses fail across generations.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'40px',maxWidth:'600px'}}>
            The data is consistent across geographies and sectors. The failure is not market-driven. It is architecture-driven.
          </motion.p>

          <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',flexDirection:'column',gap:'2px'}}>
            {caseData.map((c,i)=>(
              <motion.div key={i} variants={fadeUp}
                style={{display:'grid',gridTemplateColumns:'200px 120px 1fr',gap:'24px',alignItems:'center',background:PANEL,padding:'24px 28px',borderLeft:`4px solid ${RUST}`,borderTop:`1px solid ${LINE}`}}>
                <div style={{fontSize:'13px',fontWeight:600,color:TEXT}}>{c.gen}</div>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'40px',fontWeight:400,color:RUST,lineHeight:1,letterSpacing:'-0.04em'}}>{c.pct}</div>
                <div style={{fontSize:'13px',color:MUTED,fontStyle:'italic'}}>{c.note}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
            style={{marginTop:'28px',padding:'20px 24px',background:PANEL,borderTop:`1px solid ${LINE}`}}>
            <p style={{fontSize:'12px',color:SOFT,lineHeight:1.7}}>
              Source: Family Business Institute; McKinsey Global Institute; Harvard Business Review longitudinal studies on family enterprise succession. The pattern is consistent: the failure is not capability. It is architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6.5 CTA */}
      <section id="cta" style={{background:BG,padding:'120px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(200,168,108,.06),transparent 60%)',zIndex:0}}/>
        <div style={{position:'relative',zIndex:1}}>
          <motion.p initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={VP} transition={{duration:0.8,ease:'easeOut'}}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,60px)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            Design what survives you.
          </motion.p>
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={VP} transition={{delay:0.3,duration:0.6}}
            style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/connect"
              style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s,transform .18s',boxShadow:'0 12px 40px rgba(200,168,108,.3)'}}
              onMouseOver={e=>{e.currentTarget.style.background=GOLDB;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseOut={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}>
              Request a Family Business Diagnostic →
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
          #hero>div>div{grid-template-columns:1fr!important}
          #hero>div>div>div:last-child{display:none!important}
          #framework>div>div:last-child{flex-direction:column!important;align-items:flex-start!important}
          #case>div>div:last-child>div{grid-template-columns:1fr!important}
        }
        @media(max-width:767px){
          section{padding:64px 20px!important}
          #architectures>div>div:last-child{padding-left:24px!important}
          #architectures>div>div:last-child>div>div>div{grid-template-columns:1fr!important}
          footer{padding:20px!important;flex-direction:column!important;text-align:center!important}
        }
      `}</style>
    </div>
  );
}
