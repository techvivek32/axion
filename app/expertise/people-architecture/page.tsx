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
const stagger=(d=0.15)=>({hidden:{},show:{transition:{staggerChildren:d}}});
const lineGrowX={hidden:{scaleX:0,originX:0},show:{scaleX:1,transition:{duration:0.9,ease:[0.22,1,0.36,1]as const}}};

function Eyebrow({label}:{label:string}){
  return(
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{display:'inline-flex',alignItems:'center',gap:'10px',fontSize:'10px',fontWeight:700,letterSpacing:'0.22em',textTransform:'uppercase',color:GOLD,marginBottom:'20px'}}>
      <span style={{width:'24px',height:'1px',background:GOLD,flexShrink:0}}/>
      {label}
    </motion.div>
  );
}

const bcrNodes=[
  {label:'Belief',    sub:'Founder intent',         fail:'Without conviction → fragility',       detail:'Belief is the founding conviction — the reason the organisation exists beyond revenue. It is not a mission statement. It is the operating logic that determines which decisions are made and which are refused. Without belief, the organisation has no north star.'},
  {label:'Conviction',sub:'Behaviour alignment',    fail:'Without rhythm → bureaucracy',          detail:'Conviction is belief tested and shared. It is the moment when the founder\'s intent becomes the organisation\'s behaviour. Conviction is what allows the organisation to make consistent decisions without the founder in the room.'},
  {label:'Rhythm',    sub:'Repeatable system',       fail:'Without belief → empty execution',      detail:'Rhythm is the operating cadence — the repeatable system that makes performance predictable. Without rhythm, the organisation depends on heroic individual effort. With rhythm, performance compounds.'},
];

const surfaces=[
  {name:'Hire',    fail:'Hiring for role, not for system fit.',    def:'The bar, the signal, the loop.',         detail:'Hiring architecture defines what the organisation is selecting for — not just capability, but system fit. The failure mode is hiring people who can do the job but cannot operate within the belief system. The result is cultural drift that compounds with every hire.'},
  {name:'Engage',  fail:'Activity without direction.',             def:'The rhythm of work here.',               detail:'Engagement architecture defines how work flows — the cadence of communication, the structure of accountability, the rhythm of feedback. Without it, people are busy but not directed. Activity accumulates without compounding.'},
  {name:'Reward',  fail:'Misaligned incentives.',                  def:'What we pay for — and what we do not.',  detail:'Reward architecture defines what the organisation values in practice, not in principle. The failure mode is rewarding behaviour that contradicts the belief system. When incentives are misaligned, the organisation selects against its own values over time.'},
  {name:'Assess',  fail:'No clear differentiation.',              def:'Great. Good. Not here. Why.',            detail:'Assessment architecture defines how the organisation differentiates performance — not just who is performing, but why, and what the organisation will do about it. Without clear assessment, the organisation cannot develop talent or make defensible decisions about who stays and who does not.'},
];

export default function PeopleArchitecture(){
  const [activeBCR,setActiveBCR]=useState<number|null>(null);
  const [activeSurface,setActiveSurface]=useState<number|null>(null);

  return(
    <div style={{background:BG,minHeight:'100vh',color:TEXT,fontFamily:'Inter,-apple-system,sans-serif'}}>
      <NavBar/>

      {/* 7.1 HERO */}
      <section id="hero" style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'120px 56px',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 60%,rgba(200,168,108,.05),transparent 60%)',zIndex:0}}/>
        <div style={{maxWidth:'800px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
          <Eyebrow label="People Architecture"/>
          <motion.h1 variants={stagger(0.04)} initial="hidden" animate="show"
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1.04,letterSpacing:'-0.04em',color:TEXT,marginBottom:'24px'}}>
            {['The','Playbook','that','defines','the','soul','of','the','organisation.'].map((w,i)=>(
              <motion.span key={i} variants={fadeUp} style={{display:'inline-block',marginRight:'0.28em'}}>{w}</motion.span>
            ))}
          </motion.h1>
          {/* Gold underline */}
          <motion.div initial={{scaleX:0,originX:0.5}} animate={{scaleX:1}} transition={{delay:0.8,duration:0.8,ease:'easeOut'}}
            style={{width:'80px',height:'2px',background:GOLD,margin:'0 auto 28px'}}/>
          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.4}}
            style={{fontSize:'16px',color:MUTED,lineHeight:1.88,marginBottom:'36px'}}>
            People Architecture is the direct expression of the platform methodology — Belief &rarr; Conviction &rarr; Rhythm — in how organisations hire, engage, reward, and assess.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.5}}
            style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="#bcr"
              style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s'}}
              onMouseOver={e=>e.currentTarget.style.background=GOLDB}
              onMouseOut={e=>e.currentTarget.style.background=GOLD}>
              Read the BCR Framework ↓
            </a>
            <a href="#surfaces"
              style={{display:'inline-block',padding:'11px 26px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.12)',color:MUTED,fontSize:'13px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'border-color .2s,color .2s'}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=GOLD;e.currentTarget.style.color=GOLD}}
              onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color=MUTED}}>
              See the Four Surfaces ↓
            </a>
          </motion.div>
        </div>
      </section>

      {/* 7.2 BCR FRAMEWORK */}
      <section id="bcr" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="BCR Framework"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Belief &rarr; Conviction &rarr; Rhythm.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            Every organisation is somewhere in this sequence. The diagnostic question is not which stage you are in — it is whether you know where you are stuck.
          </motion.p>

          {/* BCR diagram */}
          <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',alignItems:'stretch',gap:'0',marginBottom:'32px',flexWrap:'wrap'}}>
            {bcrNodes.map((n,i)=>(
              <div key={n.label} style={{display:'flex',alignItems:'center',flex:1,minWidth:'200px'}}>
                <motion.div variants={scaleUp}
                  onClick={()=>setActiveBCR(activeBCR===i?null:i)}
                  style={{
                    flex:1,padding:'28px 24px',
                    border:`1px solid ${activeBCR===i?GOLD:LINE}`,
                    background:activeBCR===i?'rgba(200,168,108,.06)':PANEL,
                    cursor:'pointer',
                    transition:'border-color .2s,background .2s',
                    position:'relative',
                  }}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(200,168,108,.3),transparent)`}}/>
                  <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:GOLD,marginBottom:'10px'}}>{String(i+1).padStart(2,'0')}</div>
                  <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'24px',fontWeight:400,color:TEXT,marginBottom:'6px'}}>{n.label}</div>
                  <div style={{fontSize:'12px',color:MUTED,marginBottom:'8px'}}>{n.sub}</div>
                  <div style={{fontSize:'11px',color:RUST,fontStyle:'italic'}}>{n.fail}</div>
                </motion.div>
                {i<2&&(
                  <motion.div variants={lineGrowX}
                    style={{width:'32px',height:'1px',background:GOLD,flexShrink:0}}/>
                )}
              </div>
            ))}
          </motion.div>

          {/* Expanded node detail */}
          <AnimatePresence>
            {activeBCR!==null&&(
              <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}>
                <div style={{background:PANEL,borderLeft:`3px solid ${GOLD}`,padding:'24px 28px',borderTop:`1px solid ${LINE}`}}>
                  <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:GOLD,marginBottom:'10px'}}>{bcrNodes[activeBCR].label}</div>
                  <p style={{fontSize:'14px',color:MUTED,lineHeight:1.8}}>{bcrNodes[activeBCR].detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 7.3 FOUR SURFACES */}
      <section id="surfaces" style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <Eyebrow label="Four Surfaces"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(26px,3.5vw,44px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'12px'}}>
            Four surfaces where architecture becomes visible.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontSize:'15px',color:MUTED,lineHeight:1.8,marginBottom:'48px',maxWidth:'600px'}}>
            Architecture is not visible in documents. It is visible in what the organisation does when it hires, engages, rewards, and assesses.
          </motion.p>

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'2px'}}>
            {surfaces.map((s,i)=>(
              <motion.div key={s.name} variants={scaleUp}
                onClick={()=>setActiveSurface(activeSurface===i?null:i)}
                whileHover={{y:-5,borderColor:GOLD,transition:{duration:0.2}}}
                style={{
                  background:PANEL,
                  border:`1px solid ${activeSurface===i?GOLD:LINE}`,
                  padding:'32px 28px',
                  cursor:'pointer',
                  position:'relative',
                  overflow:'hidden',
                  transition:'border-color .2s',
                }}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,rgba(200,168,108,.3),transparent)`}}/>
                <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',color:GOLD,marginBottom:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{width:'16px',height:'1px',background:GOLD,flexShrink:0}}/>{String(i+1).padStart(2,'0')}
                </div>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'26px',fontWeight:400,color:TEXT,marginBottom:'8px'}}>{s.name}</div>
                <div style={{fontSize:'14px',color:MUTED,marginBottom:'10px',lineHeight:1.6}}>{s.def}</div>
                <div style={{fontSize:'12px',color:RUST,fontStyle:'italic'}}>{s.fail}</div>

                <AnimatePresence>
                  {activeSurface===i&&(
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}>
                      <div style={{paddingTop:'16px',marginTop:'16px',borderTop:`1px solid ${LINE}`}}>
                        <p style={{fontSize:'13px',color:MUTED,lineHeight:1.8}}>{s.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7.4 PLAYBOOK */}
      <section id="playbook" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'96px 56px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start'}}>
          <div>
            <Eyebrow label="The Playbook"/>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
              style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(24px,3vw,40px)',fontWeight:400,lineHeight:1.1,letterSpacing:'-0.04em',color:TEXT,marginBottom:'20px'}}>
              From belief to system.
            </motion.h2>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
              style={{fontSize:'15px',color:MUTED,lineHeight:1.88,marginBottom:'28px'}}>
              The Playbook is the codified document that defines how the organisation operates across all four surfaces. It is not an HR policy manual. It is the operating system — the document that makes the architecture transferable, defensible, and institutional.
            </motion.p>
            <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP}
              style={{display:'flex',flexDirection:'column',gap:'0'}}>
              {['Hiring loops','Engagement rhythm','Reward logic','Assessment clarity'].map((item,i)=>(
                <motion.div key={item} variants={fadeUp}
                  style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 0',borderBottom:`1px solid ${LINE}`}}>
                  <span style={{width:'6px',height:'6px',borderRadius:'50%',background:GOLD,flexShrink:0}}/>
                  <span style={{fontSize:'14px',color:MUTED}}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Document preview */}
          <motion.div variants={scaleUp} initial="hidden" whileInView="show" viewport={VP}
            style={{background:PANEL,border:`1px solid ${LINE}`,overflow:'hidden'}}>
            <div style={{padding:'12px 16px',borderBottom:`1px solid ${LINE}`,background:'rgba(255,255,255,.02)',display:'flex',gap:'6px'}}>
              {['#ff5f57','#febc2e','#28c840'].map((c,i)=><div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c}}/>)}
              <span style={{fontSize:'10px',color:SOFT,marginLeft:'8px',letterSpacing:'0.1em'}}>PEOPLE_ARCHITECTURE_PLAYBOOK.pdf</span>
            </div>
            <div style={{padding:'24px'}}>
              {[
                {section:'01',title:'Belief Statement',status:'Defined'},
                {section:'02',title:'Hiring Architecture',status:'Active'},
                {section:'03',title:'Engagement Rhythm',status:'Active'},
                {section:'04',title:'Reward Logic',status:'Review'},
                {section:'05',title:'Assessment Framework',status:'Draft'},
              ].map((row,i)=>(
                <div key={row.section} style={{display:'grid',gridTemplateColumns:'32px 1fr 60px',gap:'12px',alignItems:'center',padding:'10px 0',borderBottom:`1px solid ${LINE}`}}>
                  <span style={{fontSize:'10px',color:SOFT,fontFamily:'monospace'}}>{row.section}</span>
                  <span style={{fontSize:'13px',color:TEXT}}>{row.title}</span>
                  <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',color:row.status==='Active'?GOLD:row.status==='Review'?RUST:SOFT}}>{row.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7.5 CTA */}
      <section id="cta" style={{background:BG,padding:'120px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}
          style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(200,168,108,.06),transparent 60%)',zIndex:0}}/>
        <div style={{position:'relative',zIndex:1}}>
          <motion.p initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={VP} transition={{duration:0.8,ease:'easeOut'}}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(28px,4.5vw,56px)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.04em',color:TEXT,marginBottom:'40px'}}>
            Define how your organisation works.
          </motion.p>
          <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={VP} transition={{delay:0.3,duration:0.6}}
            style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/connect"
              style={{display:'inline-block',padding:'11px 26px',background:GOLD,color:'#2a1800',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'background .2s,transform .18s',boxShadow:'0 12px 40px rgba(200,168,108,.3)'}}
              onMouseOver={e=>{e.currentTarget.style.background=GOLDB;e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseOut={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='translateY(0)'}}>
              Request a People Architecture Diagnostic →
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
          #hero>div{text-align:left!important}
          #playbook>div{grid-template-columns:1fr!important;gap:40px!important}
          #surfaces>div>div:last-child{grid-template-columns:1fr!important}
          #bcr>div>div:nth-child(3){flex-direction:column!important;align-items:flex-start!important}
        }
        @media(max-width:767px){
          section{padding:64px 20px!important}
          footer{padding:20px!important;flex-direction:column!important;text-align:center!important}
        }
      `}</style>
    </div>
  );
}
