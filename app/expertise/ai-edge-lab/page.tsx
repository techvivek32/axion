'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Points, PointMaterial, Line, MeshWobbleMaterial, Float as FloatDrei } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Cybernetic Tokens ────────────────────────────────── */
const BG    = '#020202'; // Deeper black
const BG2   = '#050505';
const PANEL = 'rgba(255,255,255,0.02)';
const TEXT  = '#ffffff';
const MUTED = 'rgba(255,255,255,0.5)';
const SOFT  = 'rgba(255,255,255,0.2)';
const LINE  = 'rgba(255,255,255,0.05)';
const GLOW  = 'rgba(255,255,255,0.15)';
const ACCENT = '#ffffff';

const VP = { once: false, margin: '-100px' };

/* ── Three.js: Neural Compression Core ──────────────── */
function ConnectionLines({ count = 20 }) {
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      const end = new THREE.Vector3(0, 0, 0);
      arr.push({ start, end });
    }
    return arr;
  }, [count]);

  return (
    <group>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#ffffff"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
}

function NeuralCore({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 2]);
  const rotationSpeed = useTransform(scrollYProgress, [0, 1], [0.2, 1.5]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(time) * 0.05);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -time * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      groupRef.current.rotation.z = time * 0.05;
    }
  });

  const [particles] = useState(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 5 + Math.random() * 3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 20]} />
          <MeshDistortMaterial
            color="#ffffff"
            speed={4}
            distort={0.5}
            radius={1}
            wireframe
            transparent
            opacity={0.2}
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
          opacity={0.5}
        />
      </Points>

      <ConnectionLines count={40} />

      {/* Internal Core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        <pointLight intensity={3} distance={15} color="#ffffff" />
      </mesh>

      {/* Outer Halo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Scene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <NeuralCore scrollYProgress={scrollYProgress} />
    </>
  );
}

/* ── Three.js: Data Compression Vortex ──────────────── */
function CompressionVortex() {
  const points = useRef<THREE.Points>(null!);
  const [particles] = useState(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const angle = (i / 1500) * Math.PI * 20;
      const radius = 2 + (i / 1500) * 8;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    points.current.rotation.y = time * 0.1;
    points.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <Points ref={points} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
}

function DoctrineScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <CompressionVortex />
    </>
  );
}

/* ── 3D Tilt Component ───────────────────────────────── */
function TiltWrapper({ children }: { children: React.ReactNode }) {
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
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Background: Neural Grid ─────────────────────────── */
function NeuralGrid() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none', perspective: '1000px' }}>
      {/* 3D Floor Grid */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: '-100%', 
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transform: 'rotateX(70deg) translateY(-20%)',
          opacity: 0.15,
          y
        }} 
      />
      
      {/* Vertical Data Streams */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-around', opacity: 0.05 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <motion.div
            key={i}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'linear' }}
            style={{ width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, #fff, transparent)' }}
          />
        ))}
      </div>
      
      {/* Horizontal Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.01) 1px, rgba(255,255,255,0.01) 2px)',
        backgroundSize: '100% 4px',
        opacity: 0.3
      }} />
      
      {/* Pulse effect */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 80%)'
        }}
      />
    </div>
  );
}

/* ── 3D Floating Particles ───────────────────────────── */
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%", 
            opacity: 0,
            scale: 0 
          }}
          animate={{ 
            y: [null, "-20%"],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10 
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 0 10px #fff'
          }}
        />
      ))}
    </div>
  );
}

/* ── Component: LabCard ───────────────────────────────── */
function LabCard({ children, delay = 0, type = "default" }: { children: React.ReactNode; delay?: number; type?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          background: isHovered ? 'rgba(255,255,255,0.04)' : PANEL,
          border: '1px solid ' + (isHovered ? 'rgba(255,255,255,0.2)' : LINE),
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          height: '100%',
          transformStyle: "preserve-3d",
          borderRadius: '4px' // More industrial sharp look
        }}
      >
        {/* Cybernetic Border Corners */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: `2px solid ${isHovered ? '#fff' : 'transparent'}`, borderLeft: `2px solid ${isHovered ? '#fff' : 'transparent'}`, transition: 'all 0.3s' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', borderTop: `2px solid ${isHovered ? '#fff' : 'transparent'}`, borderRight: `2px solid ${isHovered ? '#fff' : 'transparent'}`, transition: 'all 0.3s' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '10px', height: '10px', borderBottom: `2px solid ${isHovered ? '#fff' : 'transparent'}`, borderLeft: `2px solid ${isHovered ? '#fff' : 'transparent'}`, transition: 'all 0.3s' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: `2px solid ${isHovered ? '#fff' : 'transparent'}`, borderRight: `2px solid ${isHovered ? '#fff' : 'transparent'}`, transition: 'all 0.3s' }} />

        {/* Scanning Line Effect on Hover */}
        {isHovered && (
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #fff, transparent)',
              zIndex: 1,
              opacity: 0.5
            }}
          />
        )}

        <div style={{ transform: "translateZ(30px)", position: 'relative', zIndex: 2 }}>
          {children}
        </div>

        {/* Background Decorative Element */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-20px', 
          right: '-20px', 
          fontSize: '120px', 
          fontWeight: 900, 
          color: 'rgba(255,255,255,0.03)', 
          fontFamily: 'monospace',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          {type === "actor" ? "ACT" : "LAB"}
        </div>
      </motion.div>
    </TiltWrapper>
  );
}

/* ── Component: Eyebrow ──────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
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

/* ── Motion Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } }
};
const stagger = (d = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } }
});

/* ══════════════════════════════════════════════════════
   PAGE: AI EDGE LAB
══════════════════════════════════════════════════════ */
export default function AIEdgeLab() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeLaw, setActiveLaw] = useState<number>(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />
      
      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 5.1 - HERO (Redesigned) */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Canvas>
            <Scene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>
        
        <motion.div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            width: '100%', 
            position: 'relative', 
            zIndex: 1,
            opacity: heroOpacity,
            scale: heroScale,
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px' }}>
              <Eyebrow label="AI EDGE LAB / OPERATING DOCTRINE" />
              
              <motion.h1 
                variants={stagger(0.12)} 
                initial="hidden" 
                animate="show"
                style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: '40px' }}
              >
                {['The', 'Work', 'Shift.'].map((w, i) => (
                  <motion.span key={i} 
                    variants={{
                      hidden: { opacity: 0, y: 100, rotate: 5 },
                      show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
                    }} 
                    style={{ display: 'inline-block', margin: '0 0.1em', transformOrigin: 'center' }}>
                    {w}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, width: 0 }} 
                animate={{ opacity: 1, width: '120px' }} 
                transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                style={{ height: '1px', background: ACCENT, margin: '0 auto 40px' }} 
              />

              <motion.div variants={stagger(0.15)} initial="hidden" animate="show">
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }
                  }}
                  style={{ fontSize: '22px', color: TEXT, lineHeight: 1.5, marginBottom: '24px', maxWidth: '700px', fontStyle: 'italic', fontWeight: 300, margin: '0 auto 24px' }}>
                  AI has entered as a fourth actor - not as a tool, but as a force that absorbs work and reprices human contribution.
                </motion.p>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.2 } }
                  }}
                  style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, maxWidth: '560px', marginBottom: '48px', margin: '0 auto 48px' }}>
                  The workplace now has four actors: the Employee, the CXO, the Organisation - and AI. Each faces a different structural challenge.
                </motion.p>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 1, delay: 1.4 } }
                  }}
                  style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link href="#assessments" className="lab-btn-fill">Take the Quick Mirror</Link>
                  <a href="#laws" className="lab-btn-outline">Read the Three Laws</a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Data Flow */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 0.1, x: 0 }}
          viewport={VP}
          transition={{ duration: 1.5 }}
          style={{ position: 'absolute', right: '56px', bottom: '56px', fontSize: '80px', fontWeight: 900, fontFamily: 'monospace', writingMode: 'vertical-rl', letterSpacing: '0.2em' }}
        >
          
        </motion.div>
      </section>

      {/* SECTION 5.2 - FOUR ACTORS (Redesigned with Glowing Cards) */}
      <section id="actors" style={{ background: BG2, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="System Components" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', marginBottom: '80px', alignItems: 'flex-end' }}>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1 }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Four actors.<br />Four reckonings.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ fontSize: '18px', color: MUTED, lineHeight: 1.6, maxWidth: '500px' }}>
              AI enters not as a tool, but as an actor that forces repositioning.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { num: 'I', name: 'Employee', reckoning: 'Most roles built on intelligence. AI absorbs that first.', question: '"Am I in the compression zone?"' },
              { num: 'II', name: 'CXO', reckoning: 'Information advantage gone.', question: '"What replaces it?"' },
              { num: 'III', name: 'AI', reckoning: 'Absorbs work in layers - execution to analysis to judgment.', question: '"What is the boundary?"' },
              { num: 'IV', name: 'Organisation', reckoning: 'Investment high, outcomes low.', question: '"What is structurally missing?"' },
            ].map((actor, i) => (
              <LabCard key={actor.num} delay={i * 0.1} type="actor">
                <div style={{ fontSize: '12px', color: SOFT, fontWeight: 800, marginBottom: '32px', fontFamily: 'monospace' }}>[ ACTOR_0{i+1} ]</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '16px' }}>{actor.name}</h3>
                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.7, marginBottom: '24px' }}>{actor.reckoning}</p>
                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #fff', position: 'relative', overflow: 'hidden' }}>
                  <p style={{ fontSize: '14px', color: TEXT, fontStyle: 'italic', margin: 0, position: 'relative', zIndex: 1 }}>{actor.question}</p>
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', zIndex: 0 }}
                  />
                </div>
              </LabCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.3 - THREE LAWS (Redesigned with Horizontal Expanding Cards) */}
      <section id="laws" style={{ background: BG, padding: '160px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Operational Laws" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Three laws.<br />One predictable curve.
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.6, maxWidth: '400px' }}>
              The fundamental principles governing the compression of work and the repricing of intelligence.
            </p>
          </div>
          
          <div style={{ display: 'flex', height: '480px', gap: '20px' }}>
            {[
              { num: '01', name: 'Intelligence Abundance', statement: 'As intelligence becomes cheap, its value declines.', implication: 'What was once a premium skill becomes a commodity.' },
              { num: '02', name: 'Judgment Scarcity', statement: 'Judgment becomes the premium layer.', implication: 'The scarcer the judgment, the higher the value.' },
              { num: '03', name: 'Compression Curve', statement: 'AI compresses work upward.', implication: 'Work moves from execution to analysis to judgment.' },
            ].map((law, i) => (
              <motion.div 
                key={law.num}
                animate={{ width: activeLaw === i ? '60%' : '20%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveLaw(i)}
                style={{
                  position: 'relative',
                  background: PANEL,
                  border: `1px solid ${activeLaw === i ? '#fff' : LINE}`,
                  padding: '32px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.4s'
                }}
              >
                {/* Large Outlined Background Number */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '140px',
                  fontWeight: 900,
                  fontFamily: "'Playfair Display',serif",
                  color: 'transparent',
                  WebkitTextStroke: `1px ${activeLaw === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
                  lineHeight: 1,
                  pointerEvents: 'none',
                  transition: 'all 0.4s'
                }}>
                  {law.num}
                </div>

                {/* Vertical Label (When Collapsed) */}
                <AnimatePresence>
                  {activeLaw !== i && (
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
                        fontSize: '12px',
                        fontWeight: 800,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: SOFT
                      }}
                    >
                      {law.name}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Content */}
                <motion.div
                  animate={{ opacity: activeLaw === i ? 1 : 0, y: activeLaw === i ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: activeLaw === i ? 0.3 : 0 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: activeLaw === i ? 'auto' : 'none' }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: TEXT, padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      LAW_{law.num}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '36px', fontWeight: 400, color: TEXT, marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {law.name}
                  </h3>
                  <p style={{ fontSize: '16px', color: TEXT, lineHeight: 1.5, marginBottom: '16px', maxWidth: '450px' }}>
                    {law.statement}
                  </p>
                  <div style={{ width: '32px', height: '1px', background: TEXT, marginBottom: '16px' }} />
                  <p style={{ fontSize: '13px', color: MUTED, fontStyle: 'italic', letterSpacing: '0.02em' }}>
                    Implication: {law.implication}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.4 - THREE ERAS (Redesigned with Progress Flow) */}
      <section id="eras" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Macro Shift" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', marginBottom: '80px' }}>
            Three eras of work.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', position: 'relative' }}>
            {[
              { era: 'Industrial', focus: 'Manual', desc: 'Value in physical execution' },
              { era: 'Knowledge', focus: 'Cognitive', desc: 'Value in intellectual work' },
              { era: 'AI', focus: 'Judgment', desc: 'Value in decisive choice' },
            ].map((e, i) => (
              <motion.div 
                key={e.era}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ fontSize: '12px', color: SOFT, fontWeight: 800, marginBottom: '20px', fontFamily: 'monospace' }}>ERA_0{i+1}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 400, marginBottom: '16px' }}>{e.focus}</h3>
                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.6 }}>{e.desc}</p>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: '55px', right: '-40px', width: '40px', height: '1px', background: LINE, overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '100%' }}
                      viewport={VP}
                      transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                      style={{ width: '100%', height: '100%', background: '#fff' }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.5 - DOCTRINE (Redesigned as High-Impact Quote with Three.js Vortex) */}
      <section id="doctrine" style={{ padding: '240px 56px', background: BG, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Canvas>
            <DoctrineScene />
          </Canvas>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.04em', color: TEXT, marginBottom: '40px' }}>
              AI does not eliminate work first. <br />
              <span style={{ color: MUTED }}>It eliminates the structural premium on intelligence inside work.</span>
            </p>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={VP}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '2px', background: ACCENT, margin: '0 auto 40px' }} 
            />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '12px', color: SOFT, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              - Nitin Nahata, Founder, Axion Index
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.6 - E.D.G.E FRAMEWORK (Redesigned as Feature Grid) */}
      <section id="edge" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Analytical Engine" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Four dimensions of positioning.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: LINE, border: `1px solid ${LINE}` }}>
            {[
              { letter: 'E', name: 'Exposure', question: 'How much of your work AI can replace' },
              { letter: 'D', name: 'Decision Density', question: 'How much judgment you own' },
              { letter: 'G', name: 'Growth Boundary', question: 'Is your authority expanding' },
              { letter: 'E', name: 'Economic Anchoring', question: 'Are you paid for scarcity' },
            ].map((dim, i) => (
              <motion.div 
                key={dim.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                style={{ background: BG2, padding: '64px 32px', textAlign: 'center', transition: 'background 0.3s' }}
              >
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={VP}
                  transition={{ delay: i * 0.1 + 0.2, type: 'spring' }}
                  style={{ fontFamily: "'Playfair Display',serif", fontSize: '72px', fontWeight: 400, color: SOFT, display: 'block', marginBottom: '24px' }}>{dim.letter}</motion.span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{dim.name}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.6 }}>{dim.question}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.7 - WORK TYPES (Redesigned with Technical Matrix) */}
      <section id="work-types" style={{ background: BG, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Risk Matrix" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em' }}>Six work types.</motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              style={{ fontSize: '16px', color: MUTED, maxWidth: '400px', marginBottom: '10px' }}>Work compresses upward until judgment becomes the boundary.</motion.p>
          </div>

          <div style={{ border: '1px solid ' + LINE, background: PANEL }}>
            {[
              { type: 'Framing and Problem Definition', risk: '~5%', nature: 'Judgment-dominant' },
              { type: 'Deciding and Directing', risk: '~8%', nature: 'Judgment-dominant' },
              { type: 'Influencing and Convening', risk: '~20%', nature: 'AI-assisted' },
              { type: 'Synthesising and Interpreting', risk: '~45%', nature: 'AI-assisted' },
              { type: 'Researching and Analysing', risk: '~75%', nature: 'AI-dominant' },
              { type: 'Executing and Coordinating', risk: '~85%', nature: 'AI-dominant' },
            ].map((row, i) => (
              <motion.div 
                key={row.type}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1fr 1.5fr', 
                  borderBottom: i < 5 ? '1px solid ' + LINE : 'none',
                  padding: '40px 32px',
                  alignItems: 'center',
                  transition: 'background 0.3s',
                  cursor: 'default'
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 500 }}>{row.type}</div>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', color: ACCENT }}>RISK_LEVEL: {row.risk}</div>
                <div style={{ fontSize: '14px', color: MUTED, textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{row.nature}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.8 - ASSESSMENTS (Redesigned as Action Cards) */}
      <section id="assessments" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Diagnostic Instruments" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Measure where you stand.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'stretch' }}>
            {[
              { abbr: 'ARI', name: 'AI Replaceability Index', desc: 'Individual risk index. 9 questions, ~3 min. Immediate Edge Score.', price: 'Free tier: Quick Mirror', detail: 'Full Diagnostic: Rs 499 + GST' },
              { abbr: 'BDI', name: 'Brainpower Density Index', desc: 'CXO model shift. Measure decision density across your leadership layer.', price: 'Building', detail: 'Waitlist - for leaders' },
              { abbr: 'ORG AI DARS', name: 'Org AI Decision Architecture Realignment System', desc: 'Organisation readiness. Enterprise-wide AI positioning assessment.', price: 'Building', detail: 'Enterprise engagement' },
            ].map((a, i) => (
              <div key={a.abbr} style={{ display: 'flex' }}>
                <LabCard delay={i * 0.1} type="diagnostic">
                  <span style={{ fontFamily: 'monospace', fontSize: '14px', color: SOFT, marginBottom: '32px', display: 'block' }}>[ {a.abbr} ]</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 400, marginBottom: '20px' }}>{a.name}</h3>
                  <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, marginBottom: '32px', flex: 1 }}>{a.desc}</p>
                  <div style={{ paddingTop: '24px', borderTop: '1px solid ' + LINE, marginTop: 'auto' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: TEXT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{a.price}</div>
                    <div style={{ fontSize: '12px', color: SOFT }}>{a.detail}</div>
                  </div>
                </LabCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.9 - EVIDENCE (Redesigned as Technical Signal Registry) */}
      <section id="evidence" style={{ background: BG, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Signal Registry" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.04em', marginBottom: '80px' }}>
            12 reports. 6 months.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: LINE, border: `1px solid ${LINE}` }}>
            {[
              { title: '23% scaled AI', source: 'McKinsey - State of AI 2025', timestamp: 'JAN_25' },
              { title: '90% pilot failure', source: 'McKinsey - Agentic AI 2026', timestamp: 'FEB_26' },
              { title: '78% governance lag', source: 'EY - AI Pulse Survey 2026', timestamp: 'MAR_26' },
              { title: 'HR as AI landing zone', source: 'PwC - AI Predictions 2026', timestamp: 'APR_26' },
              { title: 'CEO, not CTO, calls AI shots', source: 'BCG - AI Radar 2026', timestamp: 'MAY_26' },
              { title: '$200B value uncaptured', source: 'BCG - The $200B Opportunity 2026', timestamp: 'JUN_26' },
              { title: 'AI replacing analyst roles', source: 'McKinsey - 2025', timestamp: 'JUL_25' },
              { title: 'Judgment as premium skill', source: 'BCG - 2026', timestamp: 'AUG_26' },
              { title: 'Intelligence commoditisation', source: 'EY - 2026', timestamp: 'SEP_26' },
              { title: 'Work compression acceleration', source: 'PwC - 2026', timestamp: 'OCT_26' },
              { title: 'Decision architecture gap', source: 'McKinsey - 2026', timestamp: 'NOV_26' },
              { title: 'AI-first org design', source: 'BCG - 2026', timestamp: 'DEC_26' },
            ].map((e, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.05 }}
                whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                style={{ 
                  background: BG, 
                  padding: '24px 32px', 
                  display: 'grid', 
                  gridTemplateColumns: '120px 1fr 250px', 
                  alignItems: 'center', 
                  gap: '32px',
                  transition: 'background 0.3s',
                  cursor: 'default'
                }}
              >
                <div style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.15em', fontWeight: 800, fontFamily: 'monospace' }}>[{e.timestamp}]</div>
                <div style={{ fontSize: '18px', fontWeight: 500, color: TEXT, letterSpacing: '-0.01em' }}>{e.title}</div>
                <div style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>{e.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.11 - FAQ (Redesigned with Clean Accordion) */}
      <section id="faq" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Eyebrow label="Inquiry" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 400, marginBottom: '64px' }}>Common questions.</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { q: 'What is this?', a: 'AI Edge Lab is a diagnostic platform that maps how AI changes the structure of work. It tells you where you stand before AI decides it.' },
              { q: 'Is this predictive?', a: 'No. This is structural. We map position, not prediction. The laws are observed patterns, not forecasts.' },
              { q: 'How accurate?', a: 'The frameworks are built on 22 years of operating experience across four institutions. The evidence is sourced from McKinsey, BCG, EY, PwC.' },
              { q: 'Do I need this?', a: 'If your work involves judgment, decision-making, or intelligence - AI will reprice it. The question is not whether. It is where you stand when it happens.' },
            ].map((item, i) => (
              <div key={i} style={{ background: PANEL, border: '1px solid ' + LINE }}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: '100%', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 500 }}>{item.q}</span>
                  <motion.span animate={{ rotate: activeFaq === i ? 45 : 0 }} style={{ fontSize: '24px', fontWeight: 300 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 32px 32px', fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.12 - CTA (Redesigned with High Contrast) */}
      <section id="cta" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', background: '#000' }}>
        <NeuralGrid />
        <div style={{ maxWidth: '900px', zIndex: 1 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '60px' }}
          >
            Know where you stand<br />before AI decides it.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ delay: 0.3 }}
          >
            <Link href="/connect" className="lab-btn-fill" style={{ padding: '24px 64px', fontSize: '16px' }}>
              Request an AI Compression Diagnostic
            </Link>
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
        .lab-btn-fill {
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
        .lab-btn-fill:hover {
          background: #eee;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }
        .lab-btn-outline {
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
        .lab-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          #actors > div > div:last-child { grid-template-columns: 1fr !important; }
          #eras > div > div:last-child { grid-template-columns: 1fr !important; }
          #edge > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
          #assessments > div > div:last-child { grid-template-columns: 1fr !important; }
          #evidence > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
