'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Points, PointMaterial, Environment, MeshTransmissionMaterial, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import NavBar from '@/components/NavBar';

/* ── Three.js: The Operating Matrix ─────────────────── */
function OperatingMatrix() {
  const pointsRef = useRef<THREE.Points>(null!);
  const gridRef = useRef<THREE.Group>(null!);

  const particles = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 12 + Math.random() * 4;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (gridRef.current) {
      gridRef.current.rotation.y = -t * 0.03;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={particles} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.15}
        />
      </Points>

      <group ref={gridRef}>
        {/* Structural Grid Rings */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[5 + i * 2, 0.005, 16, 100]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05 + (5 - i) * 0.01} />
          </mesh>
        ))}
        
        {/* Central Core */}
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[3, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={1.5}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0.2}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#ffffff"
              transparent
              opacity={0.4}
            />
          </mesh>
        </Float>
      </group>

      <Environment preset="city" />
    </group>
  );
}

/* ── Practice Specific Three.js Scenes ───────────────── */
function LabourScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function AIScene() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);
  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });
  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

function PeopleScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function FamilyScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function MetricSceneCard({ type }: { type: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = t * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      {type === 0 && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {type === 1 && <tetrahedronGeometry args={[1.5, 0]} />}
      {type === 2 && <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />}
      {type === 3 && <dodecahedronGeometry args={[1.2, 0]} />}
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

function MatrixScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OperatingMatrix />
    </>
  );
}

/* ── UI Components ──────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

const stagger = (d = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: d } },
});

const VP = { once: false, margin: '-100px' };

function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div 
      variants={fadeIn} 
      initial="hidden" 
      whileInView="show" 
      viewport={VP}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}
    >
      <span style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
      {label}
    </motion.div>
  );
}

function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'inline', ...style }}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</motion.span>
      ))}
    </motion.span>
  );
}

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}

function FeatureCard({ item, index }: { item: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard style={{ height: '100%' }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        transition={{ delay: index * 0.15 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '48px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Scanning Line Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ top: '-100%' }}
              animate={{ top: '200%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '100px',
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        <span style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '32px', zIndex: 1 }}>
          {item.id} — {item.id === "01" ? "DIAGNOSE" : item.id === "02" ? "REDESIGN" : item.id === "03" ? "PREPARE" : "TRANSLATE"}
        </span>
        <h3 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '20px', lineHeight: 1.3, zIndex: 1 }}>{item.t}</h3>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '40px', zIndex: 1 }}>{item.d}</p>
        
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>
          <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>You receive</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{item.r}</p>
        </div>

        {/* Corner Accents */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ position: 'absolute', top: '10px', left: '10px', width: '20px', height: '20px', borderLeft: '1px solid #fff', borderTop: '1px solid #fff' }}
        />
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', borderRight: '1px solid #fff', borderBottom: '1px solid #fff' }}
        />
      </motion.div>
    </TiltCard>
  );
}

function MetricCard({ m, i }: { m: any, i: number }) {
  return (
    <TiltCard style={{ height: '100%' }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VP}
        transition={{ delay: i * 0.1 }}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '40px',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
          <Canvas>
            <MetricSceneCard type={i} />
          </Canvas>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', fontFamily: "'Playfair Display', serif", marginBottom: '16px', color: '#fff' }}>{m.n}</div>
          <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>{m.l}</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{m.s}</div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ── Data ───────────────────────────────────────────── */

const metrics = [
  { n: "22+", l: "Years inside complex systems", s: "Tata · StanChart · Udaan · Gameskraft" },
  { n: "4", l: "Practice lenses", s: "Labour, people, AI, succession — one doctrine" },
  { n: "∞", l: "Core scarcity", s: "When intelligence gets cheaper, judgment matters more" },
  { n: "01", l: "Driving question", s: "Where is the system broken before the cost appears?" },
];

const practices = [
  {
    id: "01",
    title: "Labour Codes",
    tag: "Beyond compliance readiness",
    head: "Labour Codes Command Centre",
    desc: "The market reads regulation as compliance. Axion Index reads it as workforce architecture: cost, classification, contractor logic, and control exposure — redesigned, not filed.",
    cta: "Map cost and control exposure →",
    color: "rgba(255,255,255,0.06)",
    scene: <LabourScene />
  },
  {
    id: "02",
    title: "AI Edge Lab",
    tag: "Beyond AI pilot labs",
    head: "AI Edge Lab",
    desc: "Map work‑layer compression, identify what must remain human, and redesign authority before intelligence abundance turns into accountability drift.",
    cta: "See the compression model →",
    scene: <AIScene />
  },
  {
    id: "03",
    title: "People Architecture",
    tag: "Beyond org charts",
    head: "People Architecture",
    desc: "Rebuild accountability for scale and continuity — for startups moving past founder improvisation and family businesses navigating professionalisation.",
    cta: "Run the people architecture scan →",
    scene: <PeopleScene />
  },
  {
    id: "04",
    title: "Family Business",
    tag: "Beyond handover plans",
    head: "Succession Architecture",
    desc: "Governance architecture for the next generation — not a handover plan, a structured transition that preserves what was built and creates what comes next.",
    cta: "Design the succession architecture →",
    scene: <FamilyScene />
  }
];

const thinking = [
  {
    type: "Featured · Long form",
    title: "The CHRO-to-CEO transition: why the next wave of CEOs will come from HR",
    desc: "The functions closest to operating rhythm will produce the next wave of enterprise leaders."
  },
  {
    type: "Essay · AI & Org design",
    title: "AI doesn’t disrupt organisations. It exposes the ones already broken.",
    desc: "Companies struggling with AI had rhythm failures long before the models arrived."
  },
  {
    type: "Essay · Compliance",
    title: "Compliance is not a backend function. It is a structural signal.",
    desc: "How organisations read compliance reveals whether they are building for durability."
  }
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */

export default function Home() {
  const containerRef = useRef(null);
  const [activePractice, setActivePractice] = useState("01");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);

  return (
    <div ref={containerRef} style={{ background: '#050505', color: '#fff', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* ── Background Layer ─────────────────────────── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas>
          <MatrixScene />
        </Canvas>
      </div>

      {/* Progress bar */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* ── Hero Section ─────────────────────────────── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 56px', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <motion.div style={{ opacity: heroOpacity, scale: heroScale, display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="Operating intelligence · Future of work" />
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '40px' }}>
                <WordReveal text="Most organisations don’t break in strategy." />
              </h1>
              <motion.p 
                variants={fadeUp} initial="hidden" animate="show"
                style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', fontWeight: 300, fontStyle: 'italic' }}
              >
                They break in how decisions actually move.
              </motion.p>
              <motion.p 
                variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
                style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}
              >
                Axion Index works with founders, boards, and operators to read the hidden operating layer beneath performance — work design, decision ownership, labour exposure, succession strain, and scale logic — and redesign what must hold.
              </motion.p>
              <motion.div 
                variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}
                style={{ display: 'flex', gap: '24px' }}
              >
                <Link href="#contact" className="btn-premium">Request architecture briefing</Link>
                <Link href="#arch" className="btn-outline">Read the architecture</Link>
              </motion.div>
            </div>
            
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* This space is visually filled by the fixed Three.js background core */}
              <div style={{ width: '100%', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', borderRadius: '50%' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Metrics Strip ────────────────────────────── */}
      <section style={{ background: '#0a0a0a', borderY: '1px solid rgba(255,255,255,0.08)', padding: '120px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {metrics.map((m, i) => (
              <MetricCard key={i} m={m} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────── */}
      <section id="what" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px' }}>
            <Eyebrow label="What Axion Index does" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '20ch' }}>
              We don’t analyse performance. <span style={{ fontStyle: 'italic', opacity: 0.7 }}>We diagnose structure.</span>
            </h2>
            <p style={{ marginTop: '32px', fontSize: '18px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '600px' }}>
              Decision-grade clarity for the people who run organisations — not advice, not software. Diagnosis, redesign, and preparation in a single operating lens.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { id: "01", t: "Diagnose where your system is already failing", d: "Work, ownership, and compliance exposure read as one architecture — structural stress identified before it shows up in margin.", r: "Workforce layer map · Labour Code exposure scan · Decision ownership audit" },
              { id: "02", t: "Redesign decision architecture, not roles", d: "Accountability and decision rights rebuilt from the operating layer up — not described in job titles — so clarity, transferability, and scale actually hold.", r: "Redesign blueprint · Decision rights specification · Implementation roadmap" },
              { id: "03", t: "Prepare for AI before accountability breaks", d: "Labour Codes and AI compression mapped to your operating layer before they hit the balance sheet.", r: "Readiness scorecard · Risk delta report · Structural advisory" },
              { id: "04", t: "Translate regulation into control, not compliance", d: "India’s Labour Codes converted into cost, classification, and operating architecture decisions — not compliance checklists.", r: "Labour Code exposure map · Classification audit · Control redesign" }
            ].map((item, i) => (
              <FeatureCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Operating Architecture ───────────────────── */}
      <section id="arch" style={{ padding: '160px 56px', background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(20px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Operating architecture" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                This is where organisations <span style={{ fontStyle: 'italic', opacity: 0.7 }}>actually break.</span>
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: '8px' }}>
              Not in strategy. Not in intent. In how work, decisions, and accountability move beneath the surface — accumulating cost long before leadership can see it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.1)' }}>
            {[
              { id: "01", t: "WORK", sub: "Tasks · Roles · Execution flow", p: "Work changes faster than structure — where AI compression hits first and where role design falls furthest behind." },
              { id: "02", t: "DECISIONS", sub: "Judgment · Ownership · Escalation", p: "Authority migrates informally while accountability maps stay frozen. Decisions move; ownership does not." },
              { id: "03", t: "ACCOUNTABILITY", sub: "Who owns the outcome", p: "Ownership becomes unclear long before leadership realises it. No redesign holds without fixing this layer first." },
              { id: "04", t: "CONSEQUENCES", sub: "Cost · Compliance · Risk", p: "Risk appears only after the structure has already weakened. The cause is always earlier — and structural." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ delay: i * 0.1 }}
                style={{ background: '#050505', padding: '48px 32px', position: 'relative' }}
              >
                <span style={{ position: 'absolute', top: '32px', right: '32px', fontSize: '48px', fontFamily: "'Playfair Display', serif", opacity: 0.05 }}>{item.id}</span>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '32px' }}>{item.id} · {item.id === "01" ? "Execution" : item.id === "02" ? "Judgment" : item.id === "03" ? "Ownership" : "Outcome"}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.05em' }}>{item.t}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', fontWeight: 600 }}>{item.sub}</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{item.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ────────────────────────────────── */}
      <section style={{ padding: '200px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>—</span>
              <p style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}>You don’t see the system breaking.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ delay: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>—</span>
              <p style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 500, color: '#fff' }}>You see the outcome.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ delay: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>—</span>
              <p style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 400, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>By then, the cost is already real.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Difference ───────────────────────────────── */}
      <section id="diff" style={{ padding: '160px 56px', background: '#0a0a0a', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Difference" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Where the market stops, <span style={{ fontStyle: 'italic', opacity: 0.7 }}>Axion Index begins.</span>
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: '8px' }}>
              We do not stop at interpretation, adoption, or organisational description. We translate structural diagnosis into redesign.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ background: '#050505', padding: '60px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginBottom: '48px', textTransform: 'uppercase' }}>Typical Advisory</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Symptoms first</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Treats hiring, execution, compliance, and leadership fatigue as separate problems while the structure producing them stays intact.</p>
                </li>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Visible layer only</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Reworks org charts, policies, or communication rituals without redesigning the deeper operating layer.</p>
                </li>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Deck-heavy outcome</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>Leaders leave with frameworks and language, not stronger operating control.</p>
                </li>
              </ul>
            </div>
            <div style={{ background: '#080808', padding: '60px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '0.2em', marginBottom: '48px', textTransform: 'uppercase' }}>Axion Index</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>System first</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>Reads labour, people, AI, and succession pressures as one operating architecture — not four disconnected categories.</p>
                </li>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Hidden layer focus</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>Works on the movement of work, ownership, escalation, and decision rights beneath the presenting problem.</p>
                </li>
                <li>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Decision-grade outcome</div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>Produces a structural recommendation leadership can act on immediately, with redesign priorities that hold under pressure.</p>
                </li>
              </ul>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
            style={{ marginTop: '80px', padding: '48px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}
          >
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, maxWidth: '900px', margin: '0 auto', fontStyle: 'italic' }}>
              That means treating Labour Codes as workforce architecture, AI as a judgment-and-ownership problem, and people design as the redesign of accountability for organisations in transition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Practices ────────────────────────────────── */}
      <section id="practices" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Practices" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Four practice areas.<br /><span style={{ fontStyle: 'italic', opacity: 0.7 }}>One operating doctrine.</span>
              </h2>
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Click to explore</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', height: '500px' }}>
            {practices.map((p) => (
              <motion.div 
                key={p.id}
                onClick={() => setActivePractice(p.id)}
                animate={{ width: activePractice === p.id ? '60%' : '13.33%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ position: 'absolute', top: '40px', left: '40px', fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>{p.id}</div>
                
                <motion.div 
                  animate={{ opacity: activePractice === p.id ? 0 : 1, rotate: -90 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap', fontSize: '24px', fontWeight: 500, letterSpacing: '0.05em' }}
                >
                  {p.title}
                </motion.div>

                <AnimatePresence>
                  {activePractice === p.id && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}
                    >
                      <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '300px', height: '300px', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
                        <Canvas>
                          {p.scene}
                        </Canvas>
                      </div>
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', width: 'fit-content', marginBottom: '32px' }}>{p.tag}</span>
                        <h3 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '24px' }}>{p.head}</h3>
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: '500px', marginBottom: '40px' }}>{p.desc}</p>
                        <Link href={`/expertise/${p.id === "01" ? "labour-codes" : p.id === "02" ? "ai-edge-lab" : p.id === "03" ? "people-architecture" : "family-business"}`} className="text-link" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em' }}>{p.cta}</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ──────────────────────────────── */}
      <section id="how" style={{ padding: '160px 56px', background: '#0a0a0a', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="How we work" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                From weak signal to <span style={{ fontStyle: 'italic', opacity: 0.7 }}>structural recommendation.</span>
              </h2>
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, paddingBottom: '8px' }}>
              Every engagement moves through the same four movements. The doctrine does not compress.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { s: "Step 01", t: "Detect", p: "Read the weak signals — regulatory shifts, AI compression, founder dependence, succession strain, and decision ambiguity.", r: "Signal map · Structural stress index · Entry diagnosis" },
              { s: "Step 02", t: "Map", p: "Locate where work, control, judgment, and accountability are no longer aligned with the operating model.", r: "Workforce layer map · Decision rights audit · Exposure scan" },
              { s: "Step 03", t: "Diagnose", p: "Define the structural failure precisely — cost risk, ownership drift, role distortion, or hidden fragility in the system.", r: "Cost/risk segmentation · Hidden exposure map · Board-grade narrative" },
              { s: "Step 04", t: "Redesign", p: "Translate diagnosis into a structural recommendation leadership can act on — not a report. A redesign blueprint, brutal for outcomes.", r: "Redesign blueprint · Role & decision spec · Implementation roadmap" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '40px', display: 'flex', flexDirection: 'column' }}
              >
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', marginBottom: '24px', textTransform: 'uppercase' }}>{step.s}</span>
                <h3 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '16px' }}>{step.t}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '32px' }}>{step.p}</p>
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>You receive</div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{step.r}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thinking / Insights ──────────────────────── */}
      <section id="thinking" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '80px' }}>
            <Eyebrow label="The Operating Architect · Latest thinking" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Signals from the <span style={{ fontStyle: 'italic', opacity: 0.7 }}>operating layer.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {thinking.map((t, i) => (
              <TiltCard key={i}>
                <motion.div 
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} transition={{ delay: i * 0.1 }}
                  style={{ background: 'linear-gradient(145deg, #121212, #080808)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', minHeight: '340px', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                    <span style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                    <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{t.type}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.3, marginBottom: '16px' }}>{t.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, flex: 1 }}>{t.desc}</p>
                  <Link href="#" style={{ marginTop: '24px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Read →</Link>
                </motion.div>
              </TiltCard>
            ))}

            {/* Newsletter Card */}
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} transition={{ delay: 0.3 }}
              style={{ background: 'linear-gradient(145deg, #121212, #080808)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '32px', minHeight: '340px', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
                <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Newsletter</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontStyle: 'italic', marginBottom: '16px' }}>“Thinking from the operating floor.”</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, flex: 1 }}>Weekly intelligence on org design, AI, and judgment in practice.</p>
              <div style={{ marginTop: '24px' }}>
                <input type="email" placeholder="your@email.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '13px', marginBottom: '8px' }} />
                <button style={{ width: '100%', background: '#fff', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subscribe →</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section id="contact" style={{ padding: '160px 56px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(145deg, #111, #050505)', border: '1px solid rgba(255,255,255,0.1)', padding: '80px', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="Start here" />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '24px' }}>
                See your structural risk <span style={{ fontStyle: 'italic', opacity: 0.7 }}>before it gets expensive.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '48px', maxWidth: '450px' }}>
                Start with a short architecture briefing. You leave with a clearer view of where control, ownership, labour exposure, and scale logic are drifting.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {[
                  { n: "01", t: "Structural map", d: "Operating layer strain identified with cause." },
                  { n: "02", t: "Decision audit", d: "Who owns decisions — and where ownership has drifted." },
                  { n: "03", t: "Redesign priority", d: "A concrete redesign priority to act on immediately." }
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>{item.n}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{item.t}</div>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '48px', borderRadius: '24px' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input type="text" placeholder="Name" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '8px', color: '#fff', fontSize: '14px' }} />
                  <input type="text" placeholder="Role" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '8px', color: '#fff', fontSize: '14px' }} />
                </div>
                <input type="email" placeholder="Work email" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '8px', color: '#fff', fontSize: '14px' }} />
                <button style={{ background: '#fff', color: '#000', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>Request briefing →</button>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6 }}>Quiet signal, serious work — built for leaders who need sharper control, not more language.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer style={{ padding: '80px 56px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px' }}>Axion<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>Index</div>
        <div style={{ display: 'flex', gap: '40px' }}>
          {[['#arch', 'ARCHITECTURE'], ['#what', 'WHAT WE DO'], ['#diff', 'DIFFERENCE'], ['#practices', 'PRACTICES'], ['#contact', 'CONTACT']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.2em', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>{label}</Link>
          ))}
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>© 2026 AXION INDEX · BENGALURU</div>
      </footer>
    </div>
  );
}
