'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Text, Float as FloatDrei, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

const BG='#080808',BG2='#0c0c0c',PANEL='rgba(20,20,20,0.4)',TEXT='#ffffff',MUTED='rgba(255,255,255,.6)',SOFT='rgba(255,255,255,.35)',LINE='rgba(255,255,255,.08)',GOLD='#ffffff',GOLDB='#cccccc',RUST='#444444', ACCENT='#38bdf8';

// ── Three.js Components ─────────────────────────────────

function DataCloud() {
  const points = useRef<THREE.Points>(null!);
  const [coords] = useState(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <Points ref={points} positions={coords} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function FloatingStructure() {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.y = Math.sin(time / 2);
    mesh.current.position.y = Math.sin(time / 1.5) * 0.2;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh
          ref={mesh}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <octahedronGeometry args={[2, 0]} />
          <MeshWobbleMaterial
            color={hovered ? "#38bdf8" : "#ffffff"}
            factor={0.4}
            speed={2}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.005, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <DataCloud />
      <FloatingStructure />
    </>
  );
}
const VP={once:false,margin:'-60px'};
const fadeUp={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const fadeIn={hidden:{opacity:0},show:{opacity:1,transition:{duration:0.7,ease:[0.22,1,0.36,1]as const}}};
const scaleUp={hidden:{opacity:0,scale:0.95},show:{opacity:1,scale:1,transition:{duration:0.6,ease:[0.22,1,0.36,1]as const}}};
const slideLeft={hidden:{opacity:0,x:-30},show:{opacity:1,x:0,transition:{duration:0.6,ease:[0.22,1,0.36,1]as const}}};
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

const CODE_COLORS:Record<string,string>={CW:'rgba(255,255,255,.1)',CIR:'rgba(255,255,255,.08)',CSS:'rgba(255,255,255,.06)',COSH:'rgba(255,255,255,.04)'};
const CODE_TEXT:Record<string,string>={CW:'#ffffff',CIR:'#eeeeee',CSS:'#dddddd',COSH:'#cccccc'};

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

function TypewriterText({text}:{text:string}){
  const [displayed,setDisplayed]=useState('');
  const [done,setDone]=useState(false);
  useEffect(()=>{
    let i=0;
    setDisplayed('');
    setDone(false);
    const id=setInterval(()=>{
      i++;
      setDisplayed(text.slice(0,i));
      if(i>=text.length){clearInterval(id);setDone(true);}
    },38);
    return()=>clearInterval(id);
  },[text]);
  return(
    <span style={{
      background:'linear-gradient(90deg, #ffffff 0%, #38bdf8 30%, #ffffff 55%, #38bdf8 80%, #ffffff 100%)',
      backgroundSize:'200% auto',
      WebkitBackgroundClip:'text',
      WebkitTextFillColor:'transparent',
      backgroundClip:'text',
      animation: done ? 'shimmerText 3s linear infinite' : 'none',
    }}>
      {displayed}
      {!done&&(
        <motion.span
          animate={{opacity:[1,0]}}
          transition={{duration:0.5,repeat:Infinity,repeatType:'reverse'}}
          style={{display:'inline-block',width:'3px',height:'0.85em',background:'#ffffff',marginLeft:'4px',verticalAlign:'middle',borderRadius:'1px',WebkitTextFillColor:'initial'}}
        />
      )}
    </span>
  );
}

export default function LabourCodes(){
  const [activeQ,setActiveQ]=useState<number|null>(null);
  const [activeCat,setActiveCat]=useState('All');
  const [activeFAQ,setActiveFAQ]=useState<number|null>(null);
  const [activeCode, setActiveCode] = useState<number>(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const tickerRef=useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const tracker = document.getElementById('state-tracker');
      if (tracker) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide tracker
          tracker.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up - show tracker
          tracker.style.transform = 'translateY(0)';
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered=activeCat==='All'?QUESTIONS:QUESTIONS.filter(q=>q.cat===activeCat);

  const handleScenarioNext = () => {
    setScenarioIndex((prev) => (prev + 1) % filtered.length);
  };

  const handleScenarioPrev = () => {
    setScenarioIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // Get a window of items based on count
  const getVisibleScenarios = () => {
    const count = filtered.length;
    if (count === 0) return [];
    
    const items = [];
    if (count === 1) {
      // Just show the one item in the center
      items.push({ ...filtered[0], virtualIdx: 0, actualIdx: 0, position: 1 });
    } else if (count === 2) {
      // Show two items
      const idx1 = scenarioIndex;
      const idx2 = (scenarioIndex + 1) % 2;
      items.push({ ...filtered[idx1], virtualIdx: scenarioIndex, actualIdx: idx1, position: 1 });
      items.push({ ...filtered[idx2], virtualIdx: scenarioIndex + 1, actualIdx: idx2, position: 2 });
    } else {
      // Show three items for 3+ items
      for (let i = -1; i <= 1; i++) {
        const virtualIdx = scenarioIndex + i;
        const actualIdx = (virtualIdx % count + count) % count;
        items.push({ ...filtered[actualIdx], virtualIdx, actualIdx, position: i + 1 });
      }
    }
    return items;
  };

  const visibleScenarios = getVisibleScenarios();

  return(
    <div style={{background:BG,minHeight:'100vh',color:TEXT,fontFamily:'Inter,-apple-system,sans-serif'}}>
      <NavBar/>

      {/* TICKER - "PULSE" MONITOR STYLE */}
      <div id="state-tracker" style={{background:'#050505',borderBottom:`1px solid ${LINE}`,overflow:'hidden',position:'sticky',top:'57px',zIndex:190,transform:'translateY(0)',transition:'transform 0.3s ease', backdropFilter: 'blur(12px)'}}>
        <div style={{display:'flex',alignItems:'stretch', height: '48px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'0 24px',borderRight:`1px solid ${LINE}`,background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: ACCENT}} />
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:ACCENT,boxShadow: `0 0 10px ${ACCENT}`, animation:'pulse 2s infinite',flexShrink:0}}/>
            <span style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.2em',textTransform:'uppercase',color:TEXT}}>Live Registry</span>
          </div>
          <div style={{flex:1,overflow:'hidden',position:'relative', display: 'flex', alignItems: 'center'}}>
            <div ref={tickerRef} style={{display:'flex',alignItems:'center',height:'100%',whiteSpace:'nowrap',willChange:'transform'}}>
              {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i)=>(
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '48px'}}>
                  <span style={{fontSize:'11px',color:MUTED,letterSpacing:'0.02em', fontWeight: 500}}>{item}</span>
                  <div style={{width: '4px', height: '4px', borderRadius: '50%', background: LINE}} />
                </div>
              ))}
            </div>
            {/* Fade overlays */}
            <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(90deg, #050505 0%, transparent 5%, transparent 95%, #050505 100%)`}} />
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'16px',padding:'0 24px',borderLeft:`1px solid ${LINE}`, background: 'rgba(56,189,248,0.05)'}}>
            <span style={{fontSize:'9px',fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:ACCENT}}>Signal: 102.4Hz</span>
            <div style={{display: 'flex', gap: '2px'}}>
              {[1,2,3,4,5].map(j => (
                <motion.div key={j} animate={{ height: [4, 12, 6, 10, 4] }} transition={{ duration: 1, repeat: Infinity, delay: j * 0.1 }} style={{ width: '2px', background: ACCENT }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'160px 56px',position:'relative',overflow:'hidden',minHeight:'90vh',display:'flex',alignItems:'center'}}>
        <motion.div style={{ opacity, scale, position:'absolute', inset:0, zIndex:0 }}>
          <Canvas>
            <Scene />
          </Canvas>
        </motion.div>

        <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',
          backgroundImage:'radial-gradient(circle, rgba(56,189,248,0.15) 1px, transparent 1px)',
          backgroundSize:'48px 48px',
          maskImage:'radial-gradient(ellipse at 50% 50%, black 20%, transparent 90%)',
          WebkitMaskImage:'radial-gradient(ellipse at 50% 50%, black 20%, transparent 90%)',
          opacity:0.4
        }}/>

        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr',gap:'48px',alignItems:'center',position:'relative',zIndex:2}}>
          <div style={{textAlign:'center'}}>
            <Eyebrow label="Labour Codes"/>
            <motion.h1
              style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(40px,7vw,88px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.05em',color:TEXT,marginBottom:'32px'}}>
              <TypewriterText text="Four codes. One operating architecture." />
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.3}}
              style={{fontSize:'18px',color:MUTED,lineHeight:1.7,maxWidth:'600px',margin:'0 auto 48px'}}>
              India&rsquo;s Labour Codes consolidate 29 central laws into 4. Most organisations treat this as a compliance update. We treat it as an operating architecture redesign.
            </motion.p>
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{delay:0.4}}
              style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
              <a href="#four-codes"
                style={{display:'inline-block',padding:'14px 32px',background:GOLD,color:'#020617',fontSize:'14px',fontWeight:600,letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'all .3s ease',boxShadow:'0 0 20px rgba(56,189,248,0.3)'}}
                onMouseOver={e=>{e.currentTarget.style.background=GOLDB;e.currentTarget.style.transform='scale(1.05)'}}
                onMouseOut={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.transform='scale(1)'}}>
                Explore the Four Codes ↓
              </a>
              <Link href="/connect"
                style={{display:'inline-block',padding:'14px 32px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.12)',color:MUTED,fontSize:'14px',letterSpacing:'.04em',borderRadius:'999px',textDecoration:'none',transition:'all .3s ease'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor=ACCENT;e.currentTarget.style.color=TEXT;e.currentTarget.style.boxShadow=`0 0 15px ${ACCENT}44`}}
                onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.12)';e.currentTarget.style.color=MUTED;e.currentTarget.style.boxShadow='none'}}>
                Request a Diagnostic →
              </Link>
            </motion.div>
          </div>

          <motion.div 
            style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'2px', marginTop: '40px'}}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {[
              {n:'29',label:'Central laws consolidated'},
              {n:'4', label:'Labour Codes'},
              {n:'36',label:'States + UTs to notify'},
              {n:'2019–20',label:'Years of enactment'},
            ].map((s,i)=>(
              <div key={i} style={{background:PANEL,backdropFilter:'blur(12px)',padding:'32px 24px',borderRadius:'12px',border:`1px solid ${LINE}`,textAlign:'center',transition:'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT;e.currentTarget.style.transform='translateY(-5px)';e.currentTarget.style.background='rgba(56,189,248,0.05)'}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=LINE;e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background=PANEL}}
              >
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'32px',fontWeight:400,color:GOLD,lineHeight:1,letterSpacing:'-0.04em',marginBottom:'8px'}}>{s.n}</div>
                <div style={{fontSize:'11px',color:SOFT,lineHeight:1.4,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOUR CODES - VERTICAL ACCORDION STYLE (IMAGE 1 REF) */}
      <section id="four-codes" style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'160px 56px',position:'relative'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px'}}>
            <div>
              <Eyebrow label="The Four Codes"/>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
                style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.05em',color:TEXT, margin: 0}}>
                Four codes.<br/>One framework.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
              style={{fontSize:'16px',color:MUTED,lineHeight:1.7,maxWidth:'400px', margin: 0}}>
              Each code consolidates multiple acts. Redesigning the operating architecture of every Indian employer.
            </motion.p>
          </div>

          <div style={{display:'flex', height: '500px', gap: '12px', overflow: 'hidden'}}>
            {FOUR_CODES.map((c,i)=>(
              <motion.div 
                key={c.code}
                animate={{ width: activeCode === i ? '55%' : '15%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveCode(i)}
                style={{
                  position: 'relative',
                  background: PANEL,
                  borderRadius: '24px',
                  border: `1px solid ${activeCode === i ? ACCENT : LINE}`,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px',
                  transition: 'border-color 0.4s'
                }}
              >
                {/* Background Number */}
                <div style={{
                  position: 'absolute',
                  top: '32px',
                  right: '32px',
                  fontSize: '100px',
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 900,
                  color: `${CODE_TEXT[c.code]}11`,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  opacity: activeCode === i ? 1 : 0.5,
                  transition: 'opacity 0.4s'
                }}>
                  {c.num}
                </div>

                {/* Vertical Title (when collapsed) */}
                <AnimatePresence>
                  {activeCode !== i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(-90deg)',
                        transformOrigin: 'center center',
                        whiteSpace: 'nowrap',
                        fontSize: '13px',
                        fontWeight: 800,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: CODE_TEXT[c.code],
                        opacity: 0.6
                      }}
                    >
                      {c.name}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Content */}
                <motion.div
                  animate={{ opacity: activeCode === i ? 1 : 0, y: activeCode === i ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: activeCode === i ? 0.3 : 0 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: activeCode === i ? 'auto' : 'none' }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      letterSpacing: '0.2em', 
                      textTransform: 'uppercase', 
                      color: CODE_TEXT[c.code], 
                      padding: '5px 12px', 
                      background: CODE_COLORS[c.code], 
                      borderRadius: '999px',
                      border: `1px solid ${CODE_TEXT[c.code]}22`
                    }}>
                      {c.code} · {c.year}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: 600, color: TEXT, marginBottom: '16px', letterSpacing: '-0.03em' }}>
                    {c.name}
                  </h3>
                  <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.6, maxWidth: '460px' }}>
                    {c.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKER CLASSIFICATION - "HOLOGRAPHIC BLUEPRINT" STYLE WITH PERFECT STACKING */}
      <section style={{background:'#050505', borderBottom:`1px solid ${LINE}`, padding:'100px 56px', position: 'relative', overflow: 'visible'}}>
        {/* Animated Scanner Beam */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', left: 0, width: '100%', height: '20vh', background: `linear-gradient(to bottom, transparent, ${ACCENT}08, transparent)`, zIndex: 1, pointerEvents: 'none' }}
        />
        
        <div style={{maxWidth:'1200px', margin:'0 auto', position: 'relative', zIndex: 2}}>
          <div style={{display: 'flex', gap: '80px', alignItems: 'flex-start'}}>
            <div style={{position: 'sticky', top: '100px', width: '40%', height: 'fit-content'}}>
              <Eyebrow label="Worker Classification"/>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
                style={{fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(32px,4.5vw,64px)', fontWeight:400, lineHeight:1, letterSpacing:'-0.04em', color:TEXT, marginBottom:'40px'}}>
                Six worker types.<br/><span style={{fontStyle: 'italic', color: ACCENT, fontSize: '0.7em', display: 'block', marginTop: '8px'}}>Different obligations.</span>
              </motion.h2>
              <p style={{fontSize: '18px', color: MUTED, lineHeight: 1.7, maxWidth: '400px', marginBottom: '48px'}}>
                The codes introduce new worker definitions. Classification determines which codes apply and what obligations are triggered.
              </p>
              
              {/* Technical Spec Box */}
              <div style={{padding: '32px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: `1px solid ${LINE}`, backdropFilter: 'blur(10px)'}}>
                <div style={{fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '20px'}}>System Metadata</div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  {[
                    ['Source', '29 Central Laws'],
                    ['Consolidation', '4 Unified Codes'],
                    ['Status', 'Active Implementation'],
                    ['Protocol', 'Architectural Redesign']
                  ].map(([k, v]) => (
                    <div key={k} style={{display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${LINE}`, paddingBottom: '8px'}}>
                      <span style={{fontSize: '11px', color: SOFT}}>{k}</span>
                      <span style={{fontSize: '11px', color: TEXT, fontWeight: 700}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{width: '60%', position: 'relative'}}>
              {WORKERS.map((w, i) => (
                <motion.div 
                  key={w.no} 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                  style={{
                    background: '#0a0a0a',
                    padding: '48px 64px',
                    position: 'sticky',
                    top: `${100 + (i * 32)}px`, // Increased stagger for better header visibility
                    zIndex: i + 10,
                    borderRadius: '32px',
                    border: `1px solid ${LINE}`,
                    boxShadow: '0 -20px 60px rgba(0,0,0,0.9)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    height: '380px', // Uniform height for all cards
                    marginBottom: '80px', // Much smaller margin to show next card immediately
                    transition: 'border-color 0.4s, background 0.4s'
                  }}
                  whileHover={{ borderColor: ACCENT, background: '#0d0d0d' }}
                >
                  {/* Holographic Number */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '-20px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    fontSize: '160px', 
                    fontWeight: 900, 
                    color: 'transparent',
                    WebkitTextStroke: `1px ${LINE}`,
                    fontFamily: "'Playfair Display',serif",
                    opacity: 0.2,
                    pointerEvents: 'none'
                  }}>
                    {w.no}
                  </div>

                  <div style={{ position: 'relative', zIndex: 1, paddingLeft: '60px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                      <div>
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '12px' }}>Type {w.no}</span>
                        <h3 style={{ fontSize: '32px', fontWeight: 600, color: TEXT, margin: 0, letterSpacing: '-0.03em' }}>{w.name}</h3>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '200px' }}>
                        {w.codes.map(c => (
                          <span key={c} style={{ fontSize: '10px', fontWeight: 800, color: CODE_TEXT[c], background: CODE_COLORS[c], padding: '6px 12px', borderRadius: '4px', border: `1px solid ${CODE_TEXT[c]}22` }}>{c}</span>
                        ))}
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, margin: 0, maxWidth: '480px' }}>{w.desc}</p>
                    
                    {/* Animated Data Bar */}
                    <div style={{ marginTop: '40px', height: '1px', width: '100%', background: LINE, position: 'relative' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} 
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Spacer to allow full scroll through the stack */}
              <div style={{ height: '40vh' }} />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS COMPARISON - HIGH END TABLE */}
      <section style={{background:BG2,borderBottom:`1px solid ${LINE}`,padding:'160px 56px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Eyebrow label="What Changes"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.05em',color:TEXT,marginBottom:'80px'}}>
            Structural<br/>Shifts.
          </motion.h2>
          
          <div style={{ background: LINE, borderRadius: '32px', padding: '1px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: BG2 }}>
              {['Provision', 'Legacy State', 'Labour Code Architecture'].map((h, i) => (
                <div key={h} style={{ padding: '32px 48px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: SOFT, borderRight: i < 2 ? `1px solid ${LINE}` : 'none' }}>{h}</div>
              ))}
            </div>
            {BENEFITS.map((b, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VP}
                style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: BG2, borderTop: `1px solid ${LINE}` }}
              >
                <div style={{ padding: '48px', fontSize: '20px', fontWeight: 600, color: TEXT, borderRight: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {b.changed && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />}
                  {b.item}
                </div>
                <div style={{ padding: '48px', fontSize: '16px', color: SOFT, fontStyle: 'italic', borderRight: `1px solid ${LINE}`, lineHeight: 1.6, display: 'flex', alignItems: 'center' }}>{b.before}</div>
                <div style={{ padding: '48px', fontSize: '16px', color: b.changed ? TEXT : MUTED, fontWeight: b.changed ? 600 : 400, lineHeight: 1.6, display: 'flex', alignItems: 'center', background: b.changed ? 'rgba(56,189,248,0.02)' : 'transparent' }}>
                  {b.after}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIGGER MATRIX - BENTO GRID (IMAGE 1 REF) */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'160px 56px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Eyebrow label="Trigger Matrix"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.05em',color:TEXT,marginBottom:'80px'}}>
            Compliance<br/>Triggers.
          </motion.h2>
          
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap: '2px', background: LINE, borderRadius: '32px', overflow: 'hidden', border: `1px solid ${LINE}`}}>
            {TRIGGERS.map((t,i)=>(
              <motion.div 
                key={i} 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VP}
                whileHover={{ background: 'rgba(56,189,248,0.04)' }}
                style={{ background: BG, padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px', transition: 'background 0.4s' }}
              >
                <div style={{ fontSize: '22px', fontWeight: 600, color: TEXT, lineHeight: 1.3, letterSpacing: '-0.02em', minHeight: '3em' }}>{t.trigger}</div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {t.codes.map(c => (
                    <span key={c} style={{ fontSize: '10px', fontWeight: 800, color: CODE_TEXT[c], background: CODE_COLORS[c], padding: '4px 10px', borderRadius: '4px', border: `1px solid ${CODE_TEXT[c]}22` }}>{c}</span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: `1px solid ${LINE}` }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, display: 'block', marginBottom: '12px' }}>Protocol</span>
                  <p style={{ fontSize: '14px', color: MUTED, margin: 0, lineHeight: 1.6 }}>{t.action}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC SCENARIOS - INFINITE CAROUSEL STYLE */}
      <section style={{background:BG, borderBottom:`1px solid ${LINE}`, padding:'160px 0', overflow: 'hidden', position: 'relative'}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', padding: '0 56px'}}>
          <Eyebrow label="Strategic Architecture" />
          <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px'}}>
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
              style={{fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(40px,6vw,88px)', fontWeight:400, lineHeight:0.9, letterSpacing:'-0.06em', color:TEXT, margin: 0}}>
              Strategic<br/><span style={{fontStyle: 'italic', color: ACCENT}}>Scenarios.</span>
            </motion.h2>
            
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '32px'}}>
              {/* All Categories Design */}
              <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '16px', border: `1px solid ${LINE}`}}>
                {['All',...CATEGORIES].map(c=>(
                  <button key={c} onClick={()=>{setActiveCat(c); setScenarioIndex(0);}}
                    style={{
                      padding:'10px 16px', 
                      borderRadius:'8px', 
                      border:'1px solid', 
                      borderColor: activeCat===c ? ACCENT : 'transparent',
                      background:activeCat===c?`${ACCENT}11`:'transparent', 
                      color:activeCat===c?TEXT:SOFT, 
                      fontSize:'10px', 
                      fontWeight:800, 
                      cursor:'pointer', 
                      letterSpacing:'0.12em', 
                      textTransform: 'uppercase', 
                      transition:'all .3s ease',
                      textAlign: 'center'
                    }}>
                    {c}
                  </button>
                ))}
              </div>
              <p style={{fontSize: '12px', color: SOFT, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0}}>Domain Filter Console</p>
            </div>
          </div>
        </div>

        <div style={{position: 'relative', width: '100%', padding: '0 56px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* Side Arrows */}
          {filtered.length > 1 && (
            <>
              <button onClick={handleScenarioPrev} 
                style={{position: 'absolute', left: '80px', zIndex: 20, width: '64px', height: '64px', borderRadius: '50%', border: `1px solid ${LINE}`, background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(10px)', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'}} 
                onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.color=ACCENT; e.currentTarget.style.transform='scale(1.1) translateX(-5px)'}} 
                onMouseLeave={e=>{e.currentTarget.style.borderColor=LINE; e.currentTarget.style.color=TEXT; e.currentTarget.style.transform='scale(1) translateX(0)'}}>
                <span style={{fontSize: '24px'}}>←</span>
              </button>
              
              <button onClick={handleScenarioNext} 
                style={{position: 'absolute', right: '80px', zIndex: 20, width: '64px', height: '64px', borderRadius: '50%', border: `1px solid ${LINE}`, background: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(10px)', color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'}} 
                onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT; e.currentTarget.style.color=ACCENT; e.currentTarget.style.transform='scale(1.1) translateX(5px)'}} 
                onMouseLeave={e=>{e.currentTarget.style.borderColor=LINE; e.currentTarget.style.color=TEXT; e.currentTarget.style.transform='scale(1) translateX(0)'}}>
                <span style={{fontSize: '24px'}}>→</span>
              </button>
            </>
          )}

          <div style={{display: 'flex', gap: '32px', width: '100%', maxWidth: '1400px', justifyContent: 'center'}}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleScenarios.map((q: any) => {
                const isCenter = (filtered.length === 1) || (filtered.length >= 3 && q.position === 1) || (filtered.length === 2 && q.position === 1);
                const isLeft = (filtered.length >= 3 && q.position === 0);
                const isRight = (filtered.length >= 3 && q.position === 2) || (filtered.length === 2 && q.position === 2);

                return (
                  <motion.div
                    key={`${q.q}-${q.virtualIdx}`}
                    layout
                    initial={{ 
                      opacity: 0, 
                      x: isRight ? 100 : isLeft ? -100 : 0, 
                      scale: 0.9 
                    }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.4, 
                      x: 0, 
                      scale: isCenter ? 1 : 0.9, 
                      zIndex: isCenter ? 10 : 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: isLeft ? -100 : isRight ? 100 : 0, 
                      scale: 0.8 
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      flex: '0 0 450px',
                      height: '550px',
                      background: PANEL,
                      borderRadius: '32px',
                      border: `1px solid ${isCenter ? ACCENT : LINE}`,
                      padding: '48px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: isCenter ? 'default' : 'pointer',
                      filter: isCenter ? 'none' : 'blur(1px)',
                      transition: 'border-color 0.4s, filter 0.4s'
                    }}
                    onClick={() => {
                      if (isLeft) handleScenarioPrev();
                      if (isRight) handleScenarioNext();
                    }}
                  >
                    {/* Image 4 Style Numbering */}
                    <div style={{ position: 'absolute', top: '-20px', right: '20px', fontSize: '180px', fontFamily: "'Playfair Display',serif", fontWeight: 900, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none' }}>
                      {String(q.actualIdx + 1).padStart(2, '0')}
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, padding: '4px 12px', background: `${ACCENT}11`, borderRadius: '4px', border: `1px solid ${ACCENT}22` }}>
                          {q.cat}
                        </span>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT }}>
                          <span style={{ fontSize: '18px' }}>{isCenter ? '✓' : '+'}</span>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '32px', fontWeight: 500, color: TEXT, marginBottom: 'auto', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                        {q.q}
                      </h3>

                      <motion.div 
                        initial={false}
                        animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 20 }}
                        style={{ marginTop: '40px' }}
                      >
                        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: SOFT, marginBottom: '16px' }}>Architectural Response</div>
                        <div style={{ height: '2px', width: '40px', background: ACCENT, marginBottom: '24px' }} />
                        <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.7, margin: 0 }}>
                          {q.a}
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Subtle Glow */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(circle at 100% 100%, ${ACCENT}08, transparent 60%)`, pointerEvents: 'none' }} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQ - STRUCTURAL LAYOUT (IMAGE 3 REF) */}
      <section style={{background:BG,borderBottom:`1px solid ${LINE}`,padding:'160px 56px'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <Eyebrow label="FAQ"/>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,4vw,64px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.05em',color:TEXT,marginBottom:'100px'}}>
            Common<br/>Inquiries.
          </motion.h2>
          
          <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'80px'}}>
            {FAQS.map((f,i)=>(
              <motion.div 
                key={i} 
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VP}
                style={{ position: 'relative', paddingLeft: '80px' }}
              >
                <div style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: '-10px', 
                  fontSize: '64px', 
                  fontWeight: 900, 
                  WebkitTextStroke: `1px ${LINE}`, 
                  color: 'transparent',
                  fontFamily: "'Playfair Display',serif",
                  lineHeight: 1
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: TEXT, marginBottom: '24px', letterSpacing: '-0.01em' }}>{f.q}</h3>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, margin: 0 }}>{f.a}</p>
                
                <div style={{ marginTop: '40px', width: '40px', height: '1px', background: ACCENT }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - COMMAND CENTER STYLE */}
      <section style={{background:BG,padding:'200px 56px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        {/* Architectural Grid Background */}
        <div style={{position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`, backgroundSize: '100px 100px'}} />
        
        <motion.div style={{ position:'absolute', inset:0, zIndex:0, opacity: 0.4 }}>
          <Canvas>
            <Scene />
          </Canvas>
        </motion.div>
        <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 50% 50%, transparent 0%, ${BG} 70%)`,zIndex:1}}/>
        
        <div style={{maxWidth:'1000px',margin:'0 auto',textAlign:'center',position:'relative',zIndex:2}}>
          <Eyebrow label="Get Started" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(40px,6vw,80px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.05em',color:TEXT,fontStyle:'italic',marginBottom:'64px'}}>
            Redesign what<br/>must hold.
          </motion.h2>
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{display:'flex',gap:'24px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/connect"
              style={{display:'inline-block',padding:'20px 48px',background:GOLD,color:'#000000',fontSize:'16px',fontWeight:800,letterSpacing:'.08em',textTransform: 'uppercase',borderRadius:'4px',textDecoration:'none',transition:'all .4s cubic-bezier(0.22, 1, 0.36, 1)',boxShadow:`0 0 30px ${ACCENT}33`}}
              onMouseOver={e=>{e.currentTarget.style.transform='translateY(-8px)';e.currentTarget.style.background=ACCENT;e.currentTarget.style.color='#000'}}
              onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background=GOLD;e.currentTarget.style.color='#000'}}>
              Request Diagnostic
            </Link>
            <Link href="/founder"
              style={{display:'inline-block',padding:'20px 48px',background:'transparent',border:`1px solid ${LINE}`,color:TEXT,fontSize:'16px',fontWeight: 700, letterSpacing:'.08em',textTransform: 'uppercase',borderRadius:'4px',textDecoration:'none',transition:'all .4s cubic-bezier(0.22, 1, 0.36, 1)', backdropFilter: 'blur(10px)'}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=ACCENT;e.currentTarget.style.transform='translateY(-8px)';e.currentTarget.style.background='rgba(56,189,248,0.05)'}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=LINE;e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.background='transparent'}}>
              Founder Briefing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - ARCHITECTURAL STYLE */}
      <footer style={{background:'#050505',padding:'80px 56px',borderTop:`1px solid ${LINE}`, position: 'relative', zIndex: 2}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '80px'}}>
          <div>
            <div style={{fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: TEXT, marginBottom: '24px'}}>AXION INDEX.</div>
            <p style={{fontSize: '14px', color: SOFT, lineHeight: 1.6, maxWidth: '300px'}}>Redesigning the operating architecture of work, labour, and decision ownership.</p>
          </div>
          
          {[
            {title: 'Practice', links: [['/', 'Home'], ['/about', 'About'], ['/expertise', 'Expertise']]},
            {title: 'Context', links: [['/founder', 'Founder'], ['/connect', 'Connect'], ['/journal', 'Journal']]},
            {title: 'Legal', links: [['/privacy', 'Privacy'], ['/terms', 'Terms'], ['/compliance', 'Compliance']]}
          ].map((col, idx) => (
            <div key={idx}>
              <div style={{fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '24px'}}>{col.title}</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {col.links.map(([href, label]) => (
                  <Link key={href} href={href} style={{fontSize: '14px', color: SOFT, textDecoration: 'none', transition: 'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color=TEXT} onMouseOut={e=>e.currentTarget.style.color=SOFT}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{maxWidth: '1200px', margin: '64px auto 0', paddingTop: '32px', borderTop: `1px solid ${LINE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize:'12px',color:SOFT,letterSpacing:'0.04em'}}>© 2026 Axion Index · Redesigning Operating Architecture</span>
          <div style={{display: 'flex', gap: '24px'}}>
            {['Twitter', 'LinkedIn', 'Instagram'].map(platform => (
              <span key={platform} style={{fontSize: '12px', color: SOFT, cursor: 'pointer', transition: 'color 0.2s'}} onMouseOver={e=>e.currentTarget.style.color=ACCENT} onMouseOut={e=>e.currentTarget.style.color=SOFT}>{platform}</span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Image 4 Ref - technical lines */
        div[style*="paddingBottom: '48px'"]:hover .worker-line {
          width: 100% !important;
        }

        /* Smooth hover for vertical cards */
        div[style*="cursor: 'pointer'"]:hover {
          border-color: ${ACCENT} !important;
        }

        @media(max-width:1024px){
          section>div{grid-template-columns:1fr!important}
          div[style*="display: 'flex'"][style*="height: '600px'"] {
            flex-direction: column !important;
            height: auto !important;
          }
          div[style*="animate={{ width: activeCode === i ? '55%' : '15%' }}"] {
            width: 100% !important;
            height: 400px !important;
          }
        }
        @media(max-width:767px){
          section{padding:100px 24px!important}
          div[style*="display: 'grid'"][style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="display: 'grid'"][style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="display: 'grid'"][style*="gridTemplateColumns: '1.2fr 1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
          footer{padding:60px 24px!important;flex-direction:column!important;text-align:center!important}
        }
      `}</style>
    </div>
  );
}
