'use client';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Points, PointMaterial, MeshTransmissionMaterial, Environment, Center, Text as Text3D } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Three.js: The Intellectual Monolith ────────────── */
function Monolith({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1.2]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
      meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <octahedronGeometry args={[2, 0]} />
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

function FluidWisdom() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [particles] = useState(() => {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 10 + Math.random() * 5;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.15}
      />
    </Points>
  );
}

function AboutScene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Monolith scrollYProgress={scrollYProgress} />
      <FluidWisdom />
      <Environment preset="city" />
    </>
  );
}


/* -- Motion variants -- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (d = 0.15) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});
const lineGrowY = {
  hidden: { scaleY: 0, originY: 0 },
  show:   { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const lineGrowX = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const VP = { once: false, margin: '-60px' };

/* ── Color tokens — monochrome palette ───────────────── */
const BG       = '#080808';
const BG2      = '#121212';
const PANEL    = '#1a1a1a';
const PANEL2   = '#222222';
const TEXT     = '#ffffff';
const MUTED    = 'rgba(255,255,255,.6)';
const SOFT     = 'rgba(255,255,255,.35)';
const LINE     = 'rgba(255,255,255,.08)';
const LINE_STR = 'rgba(255,255,255,.15)';
const GOLD     = '#ffffff';
const GOLDB    = '#cccccc';

/* ── Word-by-word headline ────────────────────────────── */
function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={{ display: 'inline', ...style }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={fadeUp}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Eyebrow ──────────────────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: GOLD, marginBottom: '20px',
      }}
    >
      <span style={{ width: '24px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

/* ── Component: GlassCard ────────────────────────────── */
function GlassCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }}
      whileHover={{ y: -10, transition: { duration: 0.4 } }}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        borderRadius: '2px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif' }}>
      <NavBar />

      {/* ── Three.js Background Layer ────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <AboutScene scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* ── 2.1 GENESIS (Redesigned) ─────────────────── */}
      <section id="genesis" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <Eyebrow label="Genesis" />
            <h1 style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(40px, 6vw, 90px)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.06em',
              color: TEXT,
              marginBottom: '40px',
            }}>
              <WordReveal text="Axion Index exists to codify what individual intellect cannot." />
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1.5, delay: 1 }}
              style={{ height: '1px', background: GOLD, margin: '0 auto 40px' }} 
            />
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{ fontSize: '20px', color: MUTED, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto', fontStyle: 'italic' }}
            >
              The work is pattern-codification — converting individual intellect into institutional structure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2.2 THE GAP (Redesigned) ─────────────────── */}
      <section id="gap" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '160px 56px', position: 'relative', zIndex: 1, background: 'rgba(8,8,8,0.5)', backdropFilter: 'blur(5px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'flex-start' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1 }}
              style={{ position: 'sticky', top: '160px' }}
            >
              <Eyebrow label="The Gap" />
              <h2 style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                color: TEXT,
                marginBottom: '40px'
              }}>
                HR&rsquo;s biggest historical failure has been dependence on individual intellect.
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.8 }}
                style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', border: '1px solid ' + LINE, position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '120px', fontWeight: 900, color: 'rgba(255,255,255,0.03)', fontFamily: 'serif' }}>"</div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '0.2em', marginBottom: '24px', fontFamily: 'monospace' }}>[ SIGNAL_01 ]</div>
                <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                  HR has historically depended on the right person, in the right role, making the right judgment in the moment. When that person leaves, the architecture collapses. Axion Index makes the patterns explicit, transferable, and institutional, so the architecture survives the person.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', border: '1px solid ' + LINE, position: 'relative' }}
              >
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', fontSize: '120px', fontWeight: 900, color: 'rgba(255,255,255,0.03)', fontFamily: 'serif' }}>"</div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '0.2em', marginBottom: '24px', fontFamily: 'monospace' }}>[ SIGNAL_02 ]</div>
                <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                  Most organisations under-invest in the choices that look small in the moment and decide everything afterwards. By the time the cost shows, the architecture has already drifted.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2.3 WHAT WE DO (Redesigned) ──────────────── */}
      <section id="what" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <Eyebrow label="What We Do" />
            <h2 style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.05em',
              color: TEXT,
            }}>
              Diagnose. Codify.<br />Redesign. Operate.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { no: '01', verb: 'Diagnose',  body: 'Surface where the architecture has drifted before the cost becomes visible.' },
              { no: '02', verb: 'Codify',    body: 'Convert observed patterns into transferable frameworks — BCR, 3i, Five Architectures, Four Actors.' },
              { no: '03', verb: 'Redesign',  body: 'Install the architecture the operating model actually needs.' },
              { no: '04', verb: 'Operate',   body: 'Keep the redesign alive through HROS, the operating system layer.' },
            ].map((item, i) => (
              <GlassCard key={item.no} delay={i * 0.1}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: SOFT, marginBottom: '32px', fontFamily: 'monospace' }}>[{item.no}]</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 400, color: TEXT, marginBottom: '20px' }}>{item.verb}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7 }}>{item.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2.4 WHAT THIS MEANS (Redesigned) ─────────── */}
      <section id="you" style={{ padding: '160px 56px', position: 'relative', zIndex: 1, background: 'rgba(18,18,18,0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="What This Means" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.04em' }}>For your leadership.</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { role: 'Founder / CEO', body: 'See where the organisation will break before it does.' },
              { role: 'CFO',           body: 'Read workforce as cost, risk, and control architecture — not headcount.' },
              { role: 'CHRO',          body: 'Move from program ownership to system architecture.' },
            ].map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                style={{ padding: '48px', border: '1px solid ' + LINE, background: 'rgba(255,255,255,0.01)' }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: GOLD, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>{item.role}</div>
                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2.5 HOW WE HOLD TOGETHER (Redesigned) ────── */}
      <section id="how" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <Eyebrow label="How We Hold Together" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em' }}>The Architecture of Continuity.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { label: 'Layer 01', name: "Founder's Thinking",  desc: 'The intellectual foundation — frameworks, doctrine, pattern library.' },
                { label: 'Layer 02', name: 'Axion Index',          desc: 'The codification platform — where patterns become transferable architecture.' },
                { label: 'Layer 03', name: 'HROS',                 desc: 'The operating system — where architecture becomes live infrastructure.' },
              ].map((layer, i) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 20, background: 'rgba(255,255,255,0.03)' }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr',
                    gap: '24px',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.01)',
                    padding: '32px',
                    borderLeft: `2px solid ${GOLD}`,
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, fontFamily: 'monospace' }}>{layer.label}</div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 500, color: TEXT, marginBottom: '4px' }}>{layer.name}</div>
                    <div style={{ fontSize: '14px', color: MUTED, lineHeight: 1.6 }}>{layer.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '60px', border: '1px solid ' + LINE }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '32px' }}>Belief &rarr; Conviction &rarr; Rhythm</h3>
              <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>
                Every engagement diagnoses where you are stuck in one sequence: Belief &rarr; Conviction &rarr; Rhythm. The platform itself stands on three layers — the founder&rsquo;s thinking, Axion Index as the codification platform, HROS as the operating system being built on top.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2.6 CLOSING (Redesigned) ─────────────────── */}
      <section id="close" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 400,
              letterSpacing: '-0.06em',
              lineHeight: 0.9,
              color: TEXT,
              marginBottom: '60px',
            }}
          >
            From ambiguity<br />to architecture.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Link href="/founder" className="lab-btn-fill">Meet the Founder</Link>
            <Link href="/connect" className="lab-btn-outline">Book a Diagnostic</Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(5,5,4,.98)', padding: '40px 56px', position: 'relative', zIndex: 1, borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.05em' }}>© 2026 Axion Index</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['/', 'Home'], ['/founder', 'Founder'], ['/connect', 'Connect']].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: '12px', color: SOFT, textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = TEXT} onMouseOut={e => e.currentTarget.style.color = SOFT}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Global CSS for About Page */}
      <style jsx global>{`
        .lab-btn-fill {
          padding: 16px 40px;
          background: #fff;
          color: #000;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #fff;
        }
        .lab-btn-fill:hover {
          background: transparent;
          color: #fff;
        }
        .lab-btn-outline {
          padding: 16px 40px;
          background: transparent;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .lab-btn-outline:hover {
          background: rgba(255,255,255,0.05);
          border-color: #fff;
        }
      `}</style>
    </div>
  );
}
