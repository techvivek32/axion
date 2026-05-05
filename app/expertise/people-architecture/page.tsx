'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial, Environment, MeshTransmissionMaterial, MeshDistortMaterial, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Three.js: The Living Mesh ───────────────────────── */
function LivingMesh({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
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
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
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
          <icosahedronGeometry args={[4, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>

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
    </group>
  );
}

function StructureCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.2;
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
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

function PeopleScene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <LivingMesh scrollYProgress={scrollYProgress} />
      <StructureCore />
      <Environment preset="city" />
    </>
  );
}

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
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* ── Three.js Background Layer ────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <PeopleScene scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>

      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 7.1 - HERO (Redesigned) */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <Eyebrow label="People Architecture" />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px, 6vw, 80px)", fontWeight: 400, lineHeight: 0.9, letterSpacing: "-0.06em", marginBottom: "40px" }}
            >
              The Playbook That Defines<br />The Soul Of The Organisation.
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
              <p style={{ fontSize: '22px', color: TEXT, lineHeight: 1.5, marginBottom: '48px', fontStyle: 'italic', fontWeight: 300, maxWidth: '800px', margin: '0 auto 48px' }}>
                People Architecture is the direct expression of the platform methodology — Belief → Conviction → Rhythm — in how organisations hire, engage, reward, and assess.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#bcr" className="arch-btn-fill">Read the BCR Framework</a>
                <Link href="/connect" className="arch-btn-outline">See the Four Surfaces</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7.2 - THE BCR SEQUENCE (Redesigned with Cinematic Flow) */}
      <section id="bcr" style={{ background: 'rgba(18,18,18,0.8)', backdropFilter: 'blur(10px)', padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <Eyebrow label="Operational Framework" />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Belief &rarr; Conviction &rarr; Rhythm
            </h2>
            <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8 }}>
                Every organisation is somewhere in this sequence. The diagnostic question is not which stage you are in — it is whether you know where you are stuck.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { 
                label: 'Belief', 
                sub: 'Founder intent', 
                fail: 'Without conviction → fragility', 
                desc: 'Belief is the founding conviction — the reason the organisation exists beyond revenue. It is not a mission statement. It is the operating logic that determines which decisions are made and which are refused. Without belief, the organisation has no north star.' 
              },
              { 
                label: 'Conviction', 
                sub: 'Behaviour alignment', 
                fail: 'Without rhythm → bureaucracy', 
                desc: 'Conviction is belief tested and shared. It is the moment when the founder\'s intent becomes the organisation\'s behaviour. Conviction is what allows the organisation to make consistent decisions without the founder in the room.' 
              },
              { 
                label: 'Rhythm', 
                sub: 'Repeatable system', 
                fail: 'Without belief → empty execution', 
                desc: 'Rhythm is the operating cadence — the repeatable system that makes performance predictable. Without rhythm, the organisation depends on heroic individual effort. With rhythm, performance compounds.' 
              },
            ].map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid ' + LINE,
                  padding: '48px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: SOFT, marginBottom: '24px', fontFamily: 'monospace' }}>[ STAGE_0{i+1} ]</div>
                
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, color: TEXT, marginBottom: '8px' }}>{node.label}</h3>
                <div style={{ fontSize: '14px', color: ACCENT, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>{node.sub}</div>
                
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #fff', marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: TEXT, fontStyle: 'italic', margin: 0 }}>{node.fail}</p>
                </div>

                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{node.desc}</p>
                
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: ACCENT, scaleX: 0, transformOrigin: 'left' }} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ marginTop: '100px', padding: '60px', border: '1px solid ' + LINE, background: 'rgba(255,255,255,0.01)', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '-20px', left: '40px', background: BG, padding: '0 20px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', color: ACCENT }}>THE PRINCIPLE</div>
            <p style={{ fontSize: '24px', color: TEXT, lineHeight: 1.5, margin: 0, textAlign: 'center', fontStyle: 'italic' }}>
              &ldquo;Most organisations are stuck in Rhythm without Belief. We diagnose the break in the sequence.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7.3 - FIVE SURFACES (Redesigned with Technical Grid) */}
      <section id="surfaces" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Structural Visibility" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(25px, 4vw, 55px)', fontWeight: 400, letterSpacing: '-0.04em' }}>Four surfaces where architecture becomes visible.</h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { 
                name: 'Hire', 
                label: 'SURFACE_01', 
                def: 'The bar, the signal, the loop.', 
                fail: 'Hiring for role, not for system fit.', 
                desc: 'Hiring architecture defines what the organisation is selecting for — not just capability, but system fit. The failure mode is hiring people who can do the job but cannot operate within the belief system. The result is cultural drift that compounds with every hire.' 
              },
              { 
                name: 'Engage', 
                label: 'SURFACE_02', 
                def: 'The rhythm of work here.', 
                fail: 'Activity without direction.', 
                desc: 'Engagement architecture defines how work flows — the cadence of communication, the structure of accountability, the rhythm of feedback. Without it, people are busy but not directed. Activity accumulates without compounding.' 
              },
              { 
                name: 'Reward', 
                label: 'SURFACE_03', 
                def: 'What we pay for — and what we do not.', 
                fail: 'Misaligned incentives.', 
                desc: 'Reward architecture defines what the organisation values in practice, not in principle. The failure mode is rewarding behaviour that contradicts the belief system. When incentives are misaligned, the organisation selects against its own values over time.' 
              },
              { 
                name: 'Assess', 
                label: 'SURFACE_04', 
                def: 'Great. Good. Not here. Why.', 
                fail: 'No clear differentiation.', 
                desc: 'Assessment architecture defines how the organisation differentiates performance — not just who is performing, but why, and what the organisation will do about it. Without clear assessment, the organisation cannot develop talent or make defensible decisions about who stays and who does not.' 
              },
            ].map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                style={{ 
                  background: PANEL, 
                  border: '1px solid ' + LINE, 
                  padding: '48px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, color: SOFT, marginBottom: '24px', fontFamily: 'monospace' }}>[ {s.label} ]</div>
                
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, color: TEXT, marginBottom: '8px' }}>{s.name}</h3>
                <div style={{ fontSize: '14px', color: ACCENT, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>{s.def}</div>
                
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #fff', marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: TEXT, fontStyle: 'italic', margin: 0 }}>{s.fail}</p>
                </div>

                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: ACCENT, scaleX: 0, transformOrigin: 'left' }} />
              </motion.div>
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

      {/* SECTION 7.4 - CTA (Redesigned as Glass Monolith) */}
      <section id="cta" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, fontStyle: 'italic', marginBottom: '80px' }}>
              &ldquo;Accountability is not an org chart attribute. <br />
              <span style={{ color: MUTED }}> It is the structural integrity of the system.</span>&rdquo;
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
            >
              <Link href="/connect" className="arch-btn-fill">Request a People Architecture Scan</Link>
              <Link href="/founder" className="arch-btn-outline">Speak with the Founder</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 56px', borderTop: '1px solid ' + LINE, background: '#000', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.2em' }}>© 2026 AXION INDEX // PEOPLE_ARCHITECTURE</span>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[['/', 'HOME'], ['/about', 'ABOUT'], ['/founder', 'FOUNDER'], ['/connect', 'CONNECT']].map(([href, label]) => (
              <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.2em', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = SOFT}>{label}</Link>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .arch-btn-fill {
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
        .arch-btn-fill:hover {
          background: transparent;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255,255,255,0.1);
        }
        .arch-btn-outline {
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
        .arch-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-4px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          #hero > div { grid-template-columns: 1fr !important; text-align: center; }
          #bcr > div > div:first-child { grid-template-columns: 1fr !important; }
          #surfaces > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
