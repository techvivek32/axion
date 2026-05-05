'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial, Environment, MeshTransmissionMaterial, Line, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Three.js: The Golden Thread ────────────────────── */
function GoldenThread({ scrollYProgress }: { scrollYProgress: any }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const lineRef = useRef<THREE.Group>(null!);

  const [particles] = useState(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 8 + Math.random() * 4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (lineRef.current) {
      lineRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.15}
        />
      </Points>
      
      <group ref={lineRef}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} rotation={[Math.random(), Math.random(), Math.random()]}>
            <torusGeometry args={[5 + i * 2, 0.01, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function LegacyMonolith() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[3, 5, 0.5]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function FamilyScene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <GoldenThread scrollYProgress={scrollYProgress} />
      <LegacyMonolith />
      <Environment preset="city" />
    </>
  );
}

/* ── Legacy Tokens ───────────────────────────────────── */
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

/* ── Background: Institutional Grid ──────────────────── */
function LegacyBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Subtle classical texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 80%)',
        opacity: 0.5
      }} />
      
      {/* Blueprint lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        opacity: 0.3
      }} />

      {/* Elegant border */}
      <div style={{ position: 'absolute', inset: '40px', border: '1px solid ' + SOFT, opacity: 0.2 }} />
    </div>
  );
}

/* ── Component: TiltCard ──────────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
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
      <div style={{ width: '32px', height: '1px', background: ACCENT }} />
      {label}
    </motion.div>
  );
}

/* ── Data ────────────────────────────────────────────── */
const architectures = [
  { num: 'I', name: 'Authority', def: 'Who decides, who escalates, who resolves.', q: 'Can every person in your organisation name who decides what — without asking?', fail: 'Founder-centric bottleneck.', detail: 'Authority architecture defines the decision rights map. Without it, every significant decision routes back to the founder — creating a bottleneck that compounds as the organisation scales. The failure is not the founder\'s capability. It is the absence of a designed system for distributing authority across generations.' },
  { num: 'II', name: 'Leadership', def: 'Family vs professional leadership roles.', q: 'Are family roles defined by capability or by birthright?', fail: 'Role confusion.', detail: 'Leadership architecture separates the family system from the professional system. When family members hold roles by default rather than by design, the organisation cannot attract or retain professional talent. The failure mode is not nepotism — it is the absence of a clear framework for how family and professional leadership coexist.' },
  { num: 'III', name: 'Governance', def: 'The daily operating system.', q: 'Does your board meet to govern — or to ratify decisions already made?', fail: 'Board exists only on paper.', detail: 'Governance architecture is the operating system of the institution. Most family businesses have governance structures that exist on paper but do not function in practice. The board meets to ratify, not to govern. The result is that the institution has no mechanism for self-correction when the operating model drifts.' },
  { num: 'IV', name: 'Succession', def: 'System, not event.', q: 'Is your succession plan a document — or a running system?', fail: 'Transition shock.', detail: 'Succession architecture treats transition as a continuous system, not a one-time event. Most family businesses treat succession as something that happens when the founder retires or dies. By then, the architecture for transition has not been built. The result is transition shock — a period of instability that destroys value and talent simultaneously.' },
  { num: 'V', name: 'Capabilities', def: 'Uncrossable competitive strengths.', q: 'What does your family business do that a PE-backed competitor cannot replicate?', fail: 'Commodity business.', detail: 'Capabilities architecture identifies and codifies the competitive strengths that are unique to the family enterprise — patient capital, long-term relationships, institutional memory, brand trust. Without this architecture, the family business competes on the same terms as any other business and loses its structural advantage.' },
];

const caseData = [
  { gen: 'Generation 1 → 2', pct: '30%', note: 'survive the transition' },
  { gen: 'Generation 2 → 3', pct: '12%', note: 'survive to the third generation' },
  { gen: 'Generation 3 → 4', pct: '3%', note: 'reach the fourth generation intact' },
];

/* ══════════════════════════════════════════════════════
   PAGE: FAMILY BUSINESS
══════════════════════════════════════════════════════ */
export default function FamilyBusiness() {
  const [activeArch, setActiveArch] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* ── Three.js Background Layer ────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <FamilyScene scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 6.1 - HERO (Redesigned) */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <Eyebrow label="Family Business Architecture" />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px, 7vw, 90px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: '40px' }}
            >
              Longevity is not inherited.<br />It is designed.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '1px', background: ACCENT, width: '120px', margin: '0 auto 40px' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <p style={{ fontSize: '20px', color: TEXT, lineHeight: 1.5, marginBottom: '38px', fontStyle: 'italic', fontWeight: 300, maxWidth: '800px', margin: '0 auto 48px' }}>
                Family businesses do not fail because markets shift. They fail because architecture does not evolve across generations.
              </p>
              <p style={{ fontSize: '18px', color: MUTED, marginBottom: '48px', lineHeight: 1.8 }}>
                Most family enterprises scale revenue before they scale structure. The result is an institution that grows in size but not in durability — dependent on the founder’s presence, vulnerable to transition, and unable to compound across generations.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#architectures" className="legacy-btn-fill">Design the Succession Architecture</a>
                <Link href="/connect" className="legacy-btn-outline">Request a Family Diagnostic</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6.2 - FIVE ARCHITECTURES (Redesigned with Modern Accordion) */}
      <section id="architectures" style={{ background: 'rgba(18,18,18,0.8)', backdropFilter: 'blur(10px)', padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <Eyebrow label="Institutional Framework" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Five architectures.<br />One outcome — longevity.
            </h2>
            <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8 }}>
                  Each architecture addresses a distinct failure mode. Together they define whether the institution survives the founder.            
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {architectures.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid ' + LINE,
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div
                  onClick={() => setActiveArch(activeArch === i ? null : i)}
                  onMouseEnter={() => setActiveArch(i)}
                  style={{ padding: '40px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '40px', alignItems: 'center' }}
                >
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', color: activeArch === i ? '#fff' : SOFT, transition: 'color 0.4s' }}>{a.num}</span>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', letterSpacing: '-0.02em' }}>{a.name}</h3>
                    <p style={{ fontSize: '15px', color: MUTED, margin: 0 }}>{a.def}</p>
                  </div>
                  <motion.div 
                    animate={{ rotate: activeArch === i ? 45 : 0 }} 
                    style={{ fontSize: '32px', fontWeight: 200, color: activeArch === i ? '#fff' : SOFT }}
                  >+</motion.div>
                </div>

                <AnimatePresence>
                  {activeArch === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 40px 60px 160px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px' }}>
                        <div>
                          <div style={{ fontSize: '10px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>[ DIAGNOSTIC_QUESTION ]</div>
                          <p style={{ fontSize: '20px', color: TEXT, lineHeight: 1.5, marginBottom: '40px', fontStyle: 'italic', borderLeft: '2px solid #fff', paddingLeft: '24px' }}>&ldquo;{a.q}&rdquo;</p>
                          <div style={{ fontSize: '10px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>[ SYSTEM_DETAIL ]</div>
                          <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8 }}>{a.detail}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div style={{ fontSize: '10px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>[ FAILURE_MODE ]</div>
                          <p style={{ fontSize: '28px', color: TEXT, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.03em' }}>{a.fail}</p>
                          <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                            <div style={{ width: '40px', height: '1px', background: SOFT }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6.3 - SYSTEM LOGIC (Redesigned with Interactive Grid) */}
      <section style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
            >
              <Eyebrow label="System Logic" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '56px', fontWeight: 400, lineHeight: 1.1, marginBottom: '32px', letterSpacing: '-0.04em' }}>
                Five Architectures operate as a system.
              </h2>
              <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8 }}>
                These are not independent pillars. Each architecture depends on the others. Authority without governance is arbitrary. Succession without leadership architecture is destabilising. Capabilities without governance are unprotected. The system only holds when all five are designed together.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', background: LINE, border: '1px solid ' + LINE }}>
              {architectures.map((a, i) => (
                <motion.div
                  key={a.num}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', scale: 0.98 }}
                  style={{ background: BG, padding: '48px 32px', textAlign: 'center', transition: 'all 0.3s ease' }}
                >
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', color: SOFT, marginBottom: '12px' }}>{a.num}</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{a.name}</div>
                </motion.div>
              ))}
              <div style={{ background: BG, padding: '48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid ' + SOFT, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: SOFT }}>&rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6.4 - CASE LOGIC (Redesigned with Signal Registry Style) */}
      <section id="case" style={{ background: 'rgba(18,18,18,0.8)', backdropFilter: 'blur(10px)', padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Evidence" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', marginBottom: '80px' }}>
            The Survival Statistics.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: LINE, border: '1px solid ' + LINE }}>
            {caseData.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '250px 1fr 200px', 
                  gap: '40px', 
                  alignItems: 'center', 
                  background: 'rgba(18,18,18,0.5)', 
                  padding: '48px 40px',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>{c.gen}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '80px', fontWeight: 400, color: ACCENT, lineHeight: 1 }}>{c.pct}</div>
                <div style={{ fontSize: '14px', color: MUTED, fontStyle: 'italic', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.note}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            style={{ marginTop: '60px', padding: '40px', border: '1px solid ' + LINE, background: 'rgba(255,255,255,0.01)', textAlign: 'center' }}
          >
            <p style={{ fontSize: '13px', color: SOFT, lineHeight: 1.7, margin: 0, letterSpacing: '0.05em' }}>
              SOURCE_REGISTRY: FAMILY BUSINESS INSTITUTE // MCKINSEY GLOBAL // HARVARD BUSINESS REVIEW longitudinal studies. 
              <br />The pattern is absolute: failure is architectural, not individual.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6.5 - CTA (Redesigned as High-Impact Monolith) */}
      <section id="cta" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, fontStyle: 'italic', marginBottom: '80px' }}>
              &ldquo;Governance is not a handover plan.<br />
              <span style={{ color: MUTED }}>It is a structured transition that preserves what was built and creates what comes next.</span>&rdquo;
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
            >
              <Link href="/connect" className="legacy-btn-fill">Request a Succession Diagnostic</Link>
              <Link href="/founder" className="legacy-btn-outline">Speak with the Founder</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 56px', borderTop: '1px solid ' + LINE, background: '#000', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.2em' }}>© 2026 AXION INDEX // GEN_ARCHITECTURE</span>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[['/', 'HOME'], ['/about', 'ABOUT'], ['/founder', 'FOUNDER'], ['/connect', 'CONNECT']].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.2em', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = SOFT}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .legacy-btn-fill {
          display: inline-block;
          padding: 18px 48px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid #fff;
        }
        .legacy-btn-fill:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255,255,255,0.1);
        }
        .legacy-btn-outline {
          display: inline-block;
          padding: 18px 48px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .legacy-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          #hero > div { grid-template-columns: 1fr !important; text-align: center; }
          #architectures > div > div:last-child { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}
