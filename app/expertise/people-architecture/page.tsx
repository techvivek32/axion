'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import NavBar from '@/components/NavBar';

/* ── Structural Tokens ───────────────────────────────── */
const BG    = '#050505';
const BG2   = '#080808';
const PANEL = 'rgba(255,255,255,0.02)';
const TEXT  = '#ffffff';
const MUTED = 'rgba(255,255,255,0.5)';
const SOFT  = 'rgba(255,255,255,0.2)';
const LINE  = 'rgba(255,255,255,0.06)';
const GOLD  = '#ffffff';
const ACCENT = '#ffffff';

const VP = { once: false, margin: '-100px' };

/* ── 3D Tilt Component ───────────────────────────────── */
function TiltWrapper({ children, intensity = 10 }: { children: React.ReactNode, intensity?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Background: Architectural Surface ────────────────── */
function StructuralBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none', perspective: '1200px' }}>
      {/* 3D Structural Grid */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-100%', 
          backgroundImage: `linear-gradient(${LINE} 1.5px, transparent 1.5px), linear-gradient(90deg, ${LINE} 1.5px, transparent 1.5px)`,
          backgroundSize: '100px 100px',
          transform: 'rotateX(70deg) translateY(-10%)',
          opacity: 0.25,
          y
        }} 
      />
      
      {/* Subtle layered depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 60%)',
        opacity: 0.5
      }} />

      {/* Vertical architectural accents */}
      <div style={{ position: 'absolute', left: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', right: '5%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)', opacity: 0.5 }} />
    </div>
  );
}

/* ── Floating Structural Dots ────────────────────────── */
function StructuralParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
          animate={{ y: [null, "-15%"], opacity: [0, 0.2, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: Math.random() * 8 + 12, repeat: Infinity, delay: Math.random() * 5 }}
          style={{ position: 'absolute', width: '3px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '1px' }}
        />
      ))}
    </div>
  );
}

/* ── Component: Eyebrow ──────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '10px',
        fontWeight: 800,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: ACCENT,
        marginBottom: '32px'
      }}
    >
      <div style={{ width: '4px', height: '4px', background: ACCENT, borderRadius: '50%' }} />
      {label}
    </motion.div>
  );
}

/* ── Data ────────────────────────────────────────────── */
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

/* ── 3D Hero Decoration ─────────────────────────────── */
function HeroDecoration() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <div style={{ fontSize: '180px', fontFamily: "'Playfair Display',serif", color: 'rgba(255,255,255,0.05)', userSelect: 'none' }}>A</div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ position: 'absolute', width: '400px', height: '400px', border: '1px solid ' + SOFT, borderRadius: '50%', opacity: 0.2 }} />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', width: '320px', height: '320px', border: '1px dashed ' + SOFT, borderRadius: '50%', opacity: 0.3 }} 
      />
      <div style={{ fontSize: '180px', fontFamily: "'Playfair Display',serif", color: 'rgba(255,255,255,0.05)', userSelect: 'none' }}>A</div>
      
      {/* Decorative architectural markers */}
      {[0, 90, 180, 270].map((deg) => (
        <div 
          key={deg}
          style={{ 
            position: 'absolute', 
            width: '20px', 
            height: '1px', 
            background: ACCENT, 
            opacity: 0.4,
            transform: `rotate(${deg}deg) translateX(180px)`
          }} 
        />
      ))}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE: PEOPLE ARCHITECTURE
══════════════════════════════════════════════════════ */
export default function PeopleArchitecture() {
  const [activeBCR, setActiveBCR] = useState<number | null>(null);
  const [activeSurface, setActiveSurface] = useState<number | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 7.1 - HERO (Enhanced) */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden' }}>
        <StructuralBackground />
        <StructuralParticles />

        <motion.div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            width: '100%', 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 0.8fr', 
            gap: '80px', 
            alignItems: 'center', 
            position: 'relative', 
            zIndex: 1,
            opacity: heroOpacity,
            y: heroY
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <Eyebrow label="People Architecture" />
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.04em', color: TEXT, marginBottom: '32px' }}
            >
              The Playbook that defines the soul of the organisation.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ width: '80px', height: '2px', background: ACCENT, marginBottom: '40px' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <p style={{ fontSize: '18px', color: TEXT, lineHeight: 1.6, marginBottom: '32px', maxWidth: '600px', fontWeight: 300 }}>
                People Architecture is the direct expression of the platform methodology — <span style={{ color: MUTED }}>Belief &rarr; Conviction &rarr; Rhythm</span> — in how organisations hire, engage, reward, and assess.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a href="#bcr" className="people-btn-fill">Read the BCR Framework</a>
                <a href="#surfaces" className="people-btn-outline">See the Four Surfaces</a>
              </div>
            </motion.div>
          </div>

          <HeroDecoration />
        </motion.div>
      </section>

      {/* SECTION 7.2 - BCR FRAMEWORK (Enhanced with 3D) */}
      <section id="bcr" style={{ background: BG2, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Operational Framework" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', marginBottom: '80px', alignItems: 'flex-end' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Belief &rarr; Conviction &rarr; Rhythm.
            </h2>
            <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.6, maxWidth: '500px' }}>
              Every organisation is somewhere in this sequence. The diagnostic question is not which stage you are in — it is whether you know where you are stuck.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: LINE }}>
            {bcrNodes.map((n, i) => (
              <TiltWrapper key={n.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  onClick={() => setActiveBCR(activeBCR === i ? null : i)}
                  style={{
                    background: BG2,
                    padding: '56px 40px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    borderTop: activeBCR === i ? '2px solid #fff' : '0px solid #fff',
                    height: '100%',
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div style={{ transform: "translateZ(20px)" }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: SOFT, letterSpacing: '0.2em', marginBottom: '32px' }}>[ STAGE_0{i+1} ]</div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '12px' }}>{n.label}</h3>
                    <p style={{ fontSize: '16px', color: MUTED, marginBottom: '24px' }}>{n.sub}</p>
                    <p style={{ fontSize: '13px', color: ACCENT, fontStyle: 'italic', marginBottom: '32px' }}>{n.fail}</p>
                    
                    <AnimatePresence>
                      {activeBCR === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingTop: '32px', borderTop: '1px solid ' + LINE }}>
                            <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8 }}>{n.detail}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7.3 - FOUR SURFACES (Enhanced with 3D) */}
      <section id="surfaces" style={{ background: BG, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Structural Visibility" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Four surfaces where architecture becomes visible.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {surfaces.map((s, i) => (
              <TiltWrapper key={s.name} intensity={15}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VP}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  onClick={() => setActiveSurface(activeSurface === i ? null : i)}
                  style={{
                    background: PANEL,
                    border: '1px solid ' + LINE,
                    padding: '48px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div style={{ transform: "translateZ(30px)" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400 }}>{s.name}</h3>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: SOFT }}>[ SURFACE_0{i+1} ]</span>
                    </div>
                    <p style={{ fontSize: '18px', color: TEXT, marginBottom: '16px', fontWeight: 500 }}>{s.def}</p>
                    <p style={{ fontSize: '14px', color: ACCENT, fontStyle: 'italic', marginBottom: '24px' }}>{s.fail}</p>

                    <AnimatePresence>
                      {activeSurface === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ paddingTop: '24px', borderTop: '1px solid ' + LINE }}>
                            <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8 }}>{s.detail}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {/* Subtle Corner Accent */}
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', background: `linear-gradient(135deg, transparent 50%, ${LINE} 50%)` }} />
                  
                  {/* 3D Depth Decoration */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid ' + LINE, transform: 'translateZ(-20px)', pointerEvents: 'none' }} />
                </motion.div>
              </TiltWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7.4 - PLAYBOOK (Redesigned) */}
      <section id="playbook" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="Institutional Assets" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 400, lineHeight: 1.1, marginBottom: '32px' }}>
                From belief to system.
              </h2>
              <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8, marginBottom: '40px' }}>
                The Playbook is the codified document that defines how the organisation operates across all four surfaces. It is not an HR policy manual. It is the operating system — the document that makes the architecture transferable, defensible, and institutional.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Hiring loops', 'Engagement rhythm', 'Reward logic', 'Assessment clarity'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VP}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid ' + LINE }}
                  >
                    <div style={{ width: '6px', height: '6px', background: ACCENT, borderRadius: '50%' }} />
                    <span style={{ fontSize: '15px', fontWeight: 500 }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <TiltWrapper>
              <motion.div
                initial={{ opacity: 0, rotate: 2 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={VP}
                style={{ background: '#111', border: '1px solid ' + LINE, padding: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', position: 'relative', transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(40px)" }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '50%' }} />
                    <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '50%' }} />
                    <div style={{ width: '12px', height: '12px', background: '#333', borderRadius: '50%' }} />
                  </div>
                  <div style={{ fontSize: '10px', color: SOFT, fontFamily: 'monospace', marginBottom: '32px' }}>[ DOCUMENT_SYSTEM_v1.2 ]</div>
                  
                  {[
                    { section: '01', title: 'Belief Statement', status: 'Defined' },
                    { section: '02', title: 'Hiring Architecture', status: 'Active' },
                    { section: '03', title: 'Engagement Rhythm', status: 'Active' },
                    { section: '04', title: 'Reward Logic', status: 'Review' },
                    { section: '05', title: 'Assessment Framework', status: 'Draft' },
                  ].map((row, i) => (
                    <div key={row.section} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: '20px', padding: '16px 0', borderBottom: '1px solid ' + LINE }}>
                      <span style={{ fontSize: '11px', color: SOFT }}>{row.section}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{row.title}</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: row.status === 'Active' ? ACCENT : SOFT, letterSpacing: '0.1em' }}>{row.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TiltWrapper>
          </div>
        </div>
      </section>

      {/* SECTION 7.5 - CTA (Redesigned) */}
      <section id="cta" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', background: '#000' }}>
        <StructuralBackground />
        <div style={{ maxWidth: '1000px', zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em', color: TEXT, fontStyle: 'italic', marginBottom: '60px' }}
          >
            &ldquo;Accountability is not an org chart attribute. It is the structural integrity of the system.&rdquo;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/connect" className="people-btn-fill">Request a People Architecture Scan</Link>
            <Link href="/founder" className="people-btn-outline">Speak with the Founder</Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 56px', borderTop: '1px solid ' + LINE, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000' }}>
        <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.1em' }}>© 2026 AXION INDEX</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[['/', 'HOME'], ['/about', 'ABOUT'], ['/founder', 'FOUNDER'], ['/connect', 'CONNECT']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.15em' }}>{label}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        .people-btn-fill {
          display: inline-block;
          padding: 16px 40px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .people-btn-fill:hover {
          background: #eee;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }
        .people-btn-outline {
          display: inline-block;
          padding: 16px 40px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .people-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          #hero > div { text-align: left !important; }
          #bcr > div > div:last-child { grid-template-columns: 1fr !important; }
          #surfaces > div > div:last-child { grid-template-columns: 1fr !important; }
          #playbook > div > div { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </div>
  );
}
