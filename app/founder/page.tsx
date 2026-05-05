'use client';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial, Environment, MeshTransmissionMaterial, MeshDistortMaterial, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Three.js: The Architect's Prism ────────────────── */
function ArchitectPrism({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const [particles] = useState(() => {
    const arr = new Float32Array(2500 * 3);
    for (let i = 0; i < 2500; i++) {
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
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[4, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
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

      <Points ref={pointsRef} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.1}
        />
      </Points>
      
      {/* Structural Orbit Rings */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[6 + i * 2, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function FounderScene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ArchitectPrism scrollYProgress={scrollYProgress} />
      <Environment preset="city" />
    </>
  );
}

/* ── 3D Card Wrapper ──────────────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Motion variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show:   { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (d = 0.15) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});
const lineGrowX = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const VP = { once: false, margin: '-100px' };

/* ── Homepage color tokens ────────────────────────────── */
const BG    = '#050505';
const BG2   = '#0a0a0a';
const PANEL = 'rgba(255,255,255,0.03)';
const TEXT  = '#ffffff';
const MUTED = 'rgba(255,255,255,0.5)';
const SOFT  = 'rgba(255,255,255,0.25)';
const LINE  = 'rgba(255,255,255,0.08)';
const GOLD  = '#ffffff';

/* ── Eyebrow ──────────────────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: '24px' }}>
      <span style={{ width: '32px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

/* ── Word-by-word reveal ──────────────────────────────── */
function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline', ...style }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>
      ))}
    </motion.span>
  );
}

/* ── Career cards ─────────────────────────────────────── */
const arc = [
  {
    org:   'Standard Chartered',
    year:  'Early career',
    scope: 'Built rewards architecture across a 700-to-10,000 scaled operation.',
    codified: 'Data is how HR earns authority, not how it gets ignored.',
  },
  {
    org:   'Tata Global Beverages',
    year:  'Decade',
    scope: 'Institutional architecture across three heritage brands and joint ventures with Starbucks and PepsiCo. London-to-Mumbai global HQ relocation. Completed at 95%+ retention.',
    codified: 'Institutional architecture survives geography.',
  },
  {
    org:   'Udaan',
    year:  'Hypergrowth',
    scope: 'Scaled people architecture from 800 to over 4,000 on-roll across 22 languages and 28 states. COVID-classified as essential government infrastructure. Manning held at 95% with no productivity loss.',
    codified: 'Hypergrowth without architectural debt.',
  },
  {
    org:   'Gameskraft',
    year:  'Existential',
    scope: 'Built the operating system from nine people managing event logistics into a full institution. Navigated a 28% retroactive GST shock and state-level bans. 27% of roles impacted by strategy change. 97.1% top-performer retention. Zero involuntary layoffs.',
    codified: 'Architecture survives existential pressure.',
  },
];

/* ── Codified rows ────────────────────────────────────── */
const codified = [
  {
    no: '01',
    title: 'The BCR Framework',
    desc: 'Belief → Conviction → Rhythm. The signature methodology.',
  },
  {
    no: '02',
    title: 'Four practice doctrines',
    desc: 'Labour Codes (3i), AI Edge Lab (Four Actors / Three Laws / E.D.G.E.), People Architecture (BCR + Four Surfaces), Family Business (Five Architectures).',
  },
  {
    no: '03',
    title: 'Two forthcoming books',
    desc: 'Baptism by Chaos (with Penguin under review) and The Operating Architect.',
  },
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Founder() {
  const containerRef = useRef(null);
  const arcRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: arcScroll } = useScroll({
    target: arcRef,
    offset: ["start end", "end start"]
  });

  const arcLineY = useSpring(useTransform(arcScroll, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* ── Three.js Background Layer ────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <FounderScene scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* ── 3.1 HERO SECTION (Redesigned with Split Layout) ─────── */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 56px', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="Founder" />
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.05em', marginBottom: '40px' }}>
                <WordReveal text="Nitin Nahata converts intellect into architecture." />
              </h1>
              
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ width: '120px', height: '1px', background: GOLD, marginBottom: '40px', transformOrigin: 'left' }} 
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <p style={{ fontSize: '22px', color: TEXT, lineHeight: 1.5, marginBottom: '48px', fontStyle: 'italic', fontWeight: 300, maxWidth: '600px' }}>
                  The practitioner whose work codified the patterns Axion Index now deploys.
                </p>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <Link href="/about" className="btn-premium">About Axion Index</Link>
                  <Link href="/connect" className="btn-outline">Start Conversation</Link>
                </div>
              </motion.div>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
              <TiltCard>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#111', border: `1px solid rgba(255,255,255,0.1)`, overflow: 'hidden' }}>
                  <img src="/portrait.jpg" alt="Nitin Nahata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 40%)' }} />
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', left: '56px', opacity: 0.5, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* ── 3.2 THE INSIGHT (Redesigned) ─────────────── */}
      <section style={{ padding: '240px 56px', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Core Thesis" />
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.04em', fontStyle: 'italic', margin: 0, color: TEXT }}
          >
            &ldquo;Most failures are not strategy failures. They are <span style={{ color: GOLD, borderBottom: '1px solid ' + GOLD }}>people-system failures</span> that happen silently, long before anyone notices.&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ── 3.3 CAREER ARC (Redesigned) ──────────────── */}
      <section ref={arcRef} style={{ padding: '160px 56px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Progress Line */}
          <div style={{ position: 'absolute', left: '-40px', top: '0', bottom: '0', width: '1px', background: LINE }}>
            <motion.div style={{ width: '100%', height: arcLineY, background: GOLD, originY: 0 }} />
            <motion.div 
              style={{ 
                position: 'absolute', 
                left: '50%', 
                top: arcLineY, 
                width: '12px', 
                height: '12px', 
                background: BG, 
                border: `2px solid ${GOLD}`, 
                borderRadius: '50%', 
                x: '-50%', 
                y: '-50%',
                boxShadow: `0 0 15px ${GOLD}`
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '100px' }}>
            <div>
              <Eyebrow label="Career Arc" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 72px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>Twenty-two years inside.</h2>
            </div>
            <p style={{ fontSize: '18px', color: MUTED, maxWidth: '400px', marginBottom: '10px', lineHeight: 1.6 }}>
              Four institutions. Each taught what the doctrine had to absorb.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', alignItems: 'stretch' }}>
            {arc.map((item, i) => (
              <div key={item.org} style={{ marginTop: i % 2 === 0 ? '0' : '80px' }}>
                <TiltCard>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VP}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    whileHover={{ borderColor: 'rgba(255,255,255,0.3)' }}
                    style={{ 
                      background: 'rgba(255,255,255,0.02)', 
                      backdropFilter: 'blur(10px)',
                      padding: '60px 48px', 
                      border: `1px solid ${LINE}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '32px',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      transformStyle: "preserve-3d",
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(20px)' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: GOLD, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'monospace' }}>[ {item.year} ]</span>
                      <div style={{ width: '40px', height: '1px', background: LINE }} />
                    </div>
                    
                    <div style={{ transform: 'translateZ(30px)' }}>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 400, marginBottom: '16px', lineHeight: 1.1 }}>{item.org}</h3>
                      <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '24px' }}>{item.scope}</p>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: `1px solid rgba(255,255,255,0.05)`, transform: 'translateZ(40px)' }}>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: SOFT, letterSpacing: '0.1em', marginBottom: '12px' }}>CODIFIED_LOGIC:</div>
                      <p style={{ fontSize: '16px', color: TEXT, fontStyle: 'italic', fontWeight: 400, lineHeight: 1.5 }}>
                        &ldquo;{item.codified}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.4 CODIFICATION (Redesigned) ─────────────── */}
      <section style={{ padding: '160px 56px', background: 'rgba(5,5,5,0.9)', backdropFilter: 'blur(20px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="Codification" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                The patterns that survived 22 years of collisions.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: LINE, border: `1px solid ${LINE}` }}>
              {codified.map((row) => (
                <motion.div 
                  key={row.no}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                  style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '32px', background: BG, padding: '48px', transition: 'background 0.3s' }}
                >
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', color: SOFT }}>{row.no}</span>
                  <div>
                    <h4 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.01em' }}>{row.title}</h4>
                    <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7 }}>{row.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3.5 FINAL THESIS (Redesigned) ─────────────── */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.1, fontStyle: 'italic', color: GOLD, letterSpacing: '-0.04em', marginBottom: '80px' }}>
              &ldquo;I architect order before scale demands it. <br />
              <span style={{ color: MUTED }}>The work is to make the patterns survive the person.</span>&rdquo;
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
            >
              <Link href="/about" className="btn-premium">About Axion Index</Link>
              <Link href="/connect" className="btn-outline">Start Conversation</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 56px', borderTop: `1px solid ${LINE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.2em' }}>© 2026 AXION INDEX // FOUNDER_PLATFORM</span>
        <div style={{ display: 'flex', gap: '40px' }}>
          {[['/', 'HOME'], ['/about', 'ABOUT'], ['/connect', 'CONNECT']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.2em', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = SOFT}>{label}</Link>
          ))}
        </div>
      </footer>

      <style jsx global>{`
        .btn-premium {
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
        .btn-premium:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255,255,255,0.1);
        }
        .btn-outline {
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
        .btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          #hero > div { grid-template-columns: 1fr !important; text-align: center; }
          #codification > div { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </div>
  );
}

