'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
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

/* ── Background: Neural Grid ─────────────────────────── */
function NeuralGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Horizontal Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)',
        backgroundSize: '100% 4px',
        opacity: 0.5
      }} />
      
      {/* Pulse effect */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)'
        }}
      />
      
      {/* Decorative corner brackets */}
      <div style={{ position: 'absolute', top: '40px', left: '40px', width: '20px', height: '20px', borderTop: '1px solid ' + SOFT, borderLeft: '1px solid ' + SOFT }} />
      <div style={{ position: 'absolute', top: '40px', right: '40px', width: '20px', height: '20px', borderTop: '1px solid ' + SOFT, borderRight: '1px solid ' + SOFT }} />
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', width: '20px', height: '20px', borderBottom: '1px solid ' + SOFT, borderLeft: '1px solid ' + SOFT }} />
      <div style={{ position: 'absolute', bottom: '40px', right: '40px', width: '20px', height: '20px', borderBottom: '1px solid ' + SOFT, borderRight: '1px solid ' + SOFT }} />
    </div>
  );
}

/* ── Component: LabCard ───────────────────────────────── */
function LabCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)' }}
      style={{
        background: PANEL,
        border: '1px solid ' + LINE,
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Hover Glow Edge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #fff, transparent)'
        }}
      />
      {children}
    </motion.div>
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
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = (d = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } }
});

/* ══════════════════════════════════════════════════════
   PAGE: AI EDGE LAB
══════════════════════════════════════════════════════ */
export default function AIEdgeLab() {
  const [activeActor, setActiveActor] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<number | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />
      
      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 5.1 - HERO (Redesigned) */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden' }}>
        <NeuralGrid />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <Eyebrow label="AI EDGE LAB / OPERATING DOCTRINE" />
            
            <motion.h1 
              variants={stagger(0.08)} 
              initial="hidden" 
              animate="show"
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(48px, 8vw, 110px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: '40px' }}
            >
              {['The', 'Work', 'Shift.'].map((w, i) => (
                <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.2em' }}>{w}</motion.span>
              ))}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, width: 0 }} 
              animate={{ opacity: 1, width: '100px' }} 
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '1px', background: ACCENT, marginBottom: '40px' }} 
            />

            <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
              <motion.p variants={fadeUp} style={{ fontSize: '22px', color: TEXT, lineHeight: 1.5, marginBottom: '24px', maxWidth: '700px', fontStyle: 'italic', fontWeight: 300 }}>
                AI has entered as a fourth actor - not as a tool, but as a force that absorbs work and reprices human contribution.
              </motion.p>
              
              <motion.p variants={fadeUp} style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, maxWidth: '560px', marginBottom: '48px' }}>
                The workplace now has four actors: the Employee, the CXO, the Organisation - and AI. Each faces a different structural challenge.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link href="#assessments" className="lab-btn-fill">Take the Quick Mirror</Link>
                <a href="#laws" className="lab-btn-outline">Read the Three Laws</a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Data Flow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          style={{ position: 'absolute', right: '56px', bottom: '56px', fontSize: '120px', fontWeight: 900, fontFamily: 'monospace', writingMode: 'vertical-rl', letterSpacing: '0.2em' }}
        >
          AI_EDGE_LAB
        </motion.div>
      </section>

      {/* SECTION 5.2 - FOUR ACTORS (Redesigned with Glowing Cards) */}
      <section id="actors" style={{ background: BG2, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="System Components" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', marginBottom: '80px', alignItems: 'flex-end' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Four actors.<br />Four reckonings.
            </h2>
            <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.6, maxWidth: '500px' }}>
              AI enters not as a tool, but as an actor that forces repositioning.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              { num: 'I', name: 'Employee', reckoning: 'Most roles built on intelligence. AI absorbs that first.', question: '"Am I in the compression zone?"' },
              { num: 'II', name: 'CXO', reckoning: 'Information advantage gone.', question: '"What replaces it?"' },
              { num: 'III', name: 'AI', reckoning: 'Absorbs work in layers - execution to analysis to judgment.', question: '"What is the boundary?"' },
              { num: 'IV', name: 'Organisation', reckoning: 'Investment high, outcomes low.', question: '"What is structurally missing?"' },
            ].map((actor, i) => (
              <LabCard key={actor.num} delay={i * 0.1}>
                <div style={{ fontSize: '12px', color: SOFT, fontWeight: 800, marginBottom: '32px', fontFamily: 'monospace' }}>[ ACTOR_0{i+1} ]</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '16px' }}>{actor.name}</h3>
                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.7, marginBottom: '24px' }}>{actor.reckoning}</p>
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderLeft: '2px solid #fff' }}>
                  <p style={{ fontSize: '14px', color: TEXT, fontStyle: 'italic', margin: 0 }}>{actor.question}</p>
                </div>
              </LabCard>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.3 - THREE LAWS (Redesigned with Technical List) */}
      <section id="laws" style={{ background: BG, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow label="Operational Laws" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Three laws. One predictable curve.
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {[
              { num: 'LAW_01', name: 'Intelligence Abundance', statement: 'As intelligence becomes cheap, its value declines.', implication: 'What was once a premium skill becomes a commodity.' },
              { num: 'LAW_02', name: 'Judgment Scarcity', statement: 'Judgment becomes the premium layer.', implication: 'The scarcer the judgment, the higher the value.' },
              { num: 'LAW_03', name: 'Compression Curve', statement: 'AI compresses work upward.', implication: 'Work moves from execution to analysis to judgment.' },
            ].map((law, i) => (
              <motion.div 
                key={law.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 1, delay: i * 0.2 }}
                style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '40px', alignItems: 'flex-start' }}
              >
                <div style={{ fontFamily: 'monospace', fontSize: '14px', color: SOFT, paddingTop: '8px' }}>{law.num}</div>
                <div>
                  <h4 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.02em' }}>{law.name}</h4>
                  <p style={{ fontSize: '18px', color: TEXT, lineHeight: 1.6, marginBottom: '16px' }}>{law.statement}</p>
                  <p style={{ fontSize: '14px', color: MUTED, fontStyle: 'italic' }}>Implication: {law.implication}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.4 - THREE ERAS (Redesigned with Progress Flow) */}
      <section id="eras" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Macro Shift" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', marginBottom: '80px' }}>
            Three eras of work.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { era: 'Industrial', focus: 'Manual', desc: 'Value in physical execution' },
              { era: 'Knowledge', focus: 'Cognitive', desc: 'Value in intellectual work' },
              { era: 'AI', focus: 'Judgment', desc: 'Value in decisive choice' },
            ].map((e, i) => (
              <motion.div 
                key={e.era}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VP}
                transition={{ delay: i * 0.2 }}
                style={{ position: 'relative' }}
              >
                <div style={{ fontSize: '12px', color: SOFT, fontWeight: 800, marginBottom: '20px', fontFamily: 'monospace' }}>ERA_0{i+1}</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', fontWeight: 400, marginBottom: '16px' }}>{e.focus}</h3>
                <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.6 }}>{e.desc}</p>
                {i < 2 && (
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '40px' }}
                    style={{ position: 'absolute', top: '50px', right: '-40px', height: '1px', background: LINE, zIndex: 2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.5 - DOCTRINE (Redesigned as High-Impact Quote) */}
      <section id="doctrine" style={{ padding: '200px 56px', background: BG, position: 'relative', overflow: 'hidden' }}>
        <NeuralGrid />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.04em', color: TEXT, marginBottom: '40px' }}>
              AI does not eliminate work first. <br />
              <span style={{ color: MUTED }}>It eliminates the structural premium on intelligence inside work.</span>
            </p>
            <div style={{ width: '60px', height: '2px', background: ACCENT, margin: '0 auto 40px' }} />
            <p style={{ fontSize: '12px', color: SOFT, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              - Nitin Nahata, Founder, Axion Index
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.6 - E.D.G.E FRAMEWORK (Redesigned as Feature Grid) */}
      <section id="edge" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Analytical Engine" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Four dimensions of positioning.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', background: LINE }}>
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
                style={{ background: BG2, padding: '48px 32px', textAlign: 'center' }}
              >
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '64px', fontWeight: 400, color: SOFT, display: 'block', marginBottom: '24px' }}>{dim.letter}</span>
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
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em' }}>Six work types.</h2>
            <p style={{ fontSize: '16px', color: MUTED, maxWidth: '400px', marginBottom: '10px' }}>Work compresses upward until judgment becomes the boundary.</p>
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ delay: i * 0.05 }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1fr 1.5fr', 
                  borderBottom: i < 5 ? '1px solid ' + LINE : 'none',
                  padding: '32px',
                  alignItems: 'center'
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
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Measure where you stand.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { abbr: 'ARI', name: 'AI Replaceability Index', desc: 'Individual risk index. 9 questions, ~3 min. Immediate Edge Score.', price: 'Free tier: Quick Mirror', detail: 'Full Diagnostic: Rs 499 + GST' },
              { abbr: 'BDI', name: 'Brainpower Density Index', desc: 'CXO model shift. Measure decision density across your leadership layer.', price: 'Building', detail: 'Waitlist - for leaders' },
              { abbr: 'ORG AI DARS', name: 'Org AI Decision Architecture Realignment System', desc: 'Organisation readiness. Enterprise-wide AI positioning assessment.', price: 'Building', detail: 'Enterprise engagement' },
            ].map((a, i) => (
              <motion.div 
                key={a.abbr}
                whileHover={{ y: -10 }}
                style={{ 
                  background: PANEL, 
                  border: '1px solid ' + LINE, 
                  padding: '48px 40px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  minHeight: '400px' 
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '14px', color: SOFT, marginBottom: '32px' }}>[ {a.abbr} ]</span>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 400, marginBottom: '20px' }}>{a.name}</h3>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, marginBottom: '32px', flex: 1 }}>{a.desc}</p>
                <div style={{ paddingTop: '24px', borderTop: '1px solid ' + LINE }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: TEXT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{a.price}</div>
                  <div style={{ fontSize: '12px', color: SOFT }}>{a.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5.9 - EVIDENCE (Redesigned as Technical Log) */}
      <section id="evidence" style={{ background: BG, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Signal Registry" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            12 reports. 6 months.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: LINE }}>
            {[
              { title: '23% scaled AI', source: 'McKinsey - State of AI 2025' },
              { title: '90% pilot failure', source: 'McKinsey - Agentic AI 2026' },
              { title: '78% governance lag', source: 'EY - AI Pulse Survey 2026' },
              { title: 'HR as AI landing zone', source: 'PwC - AI Predictions 2026' },
              { title: 'CEO, not CTO, calls AI shots', source: 'BCG - AI Radar 2026' },
              { title: '$200B value uncaptured', source: 'BCG - The $200B Opportunity 2026' },
              { title: 'AI replacing analyst roles', source: 'McKinsey - 2025' },
              { title: 'Judgment as premium skill', source: 'BCG - 2026' },
              { title: 'Intelligence commoditisation', source: 'EY - 2026' },
              { title: 'Work compression acceleration', source: 'PwC - 2026' },
              { title: 'Decision architecture gap', source: 'McKinsey - 2026' },
              { title: 'AI-first org design', source: 'BCG - 2026' },
            ].map((e, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ delay: i * 0.05 }}
                style={{ background: BG, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}
              >
                <div style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.4 }}>{e.title}</div>
                <div style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '16px' }}>{e.source}</div>
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
