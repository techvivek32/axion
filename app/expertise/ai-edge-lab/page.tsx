'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';

const BG = '#080706';
const BG2 = '#0d0c0b';
const PANEL = '#171717';
const TEXT = '#f5f2eb';
const MUTED = 'rgba(210,205,195,.62)';
const SOFT = 'rgba(210,205,195,.38)';
const LINE = 'rgba(255,255,255,.06)';
const GOLD = '#c8a86c';
const GOLDB = '#e5c385';
const RUST = '#8C3B28';

const VP = { once: false, margin: '-60px' };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const stagger = (d = 0.15) => ({ hidden: {}, show: { transition: { staggerChildren: d } } });

function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}
    >
      <span style={{ width: '24px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

export default function AIEdgeLab() {
  const [activeActor, setActiveActor] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<number | null>(null);

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif' }}>
      <NavBar />

      {/* SECTION 5.1 - HERO */}
      <section id="hero" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '0 56px', minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%,rgba(200,168,108,.05),transparent 60%)', zIndex: 0 }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%', padding: '96px 0' }}>
          <div>
            <Eyebrow label="AI EDGE LAB - FOUR ACTORS - ONE TRANSFORMATION" />

            <motion.h1 variants={stagger(0.04)} initial="hidden" animate="show" style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,6vw,72px)', fontWeight: 400, lineHeight: 1.01, letterSpacing: '-0.05em', color: TEXT, marginBottom: '20px' }}>
              {['The', 'Work', 'Shift.'].map((w, i) => (
                <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.28em' }}>{w}</motion.span>
              ))}
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="show" style={{ fontSize: '17px', color: GOLD, lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic' }}>
              AI has entered as a fourth actor - not as a tool, but as a force that absorbs work and reprices human contribution.
            </motion.p>

            <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.88, maxWidth: '520px', marginBottom: '36px' }}>
              The workplace now has four actors: the Employee, the CXO, the Organisation - and AI. Each faces a different structural challenge.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link href="#assessments" style={{ display: 'inline-block', padding: '11px 26px', background: GOLD, color: '#2a1800', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', borderRadius: '999px', textDecoration: 'none' }}>Take the Quick Mirror</Link>
              <a href="#laws" style={{ display: 'inline-block', padding: '11px 26px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.12)', color: MUTED, fontSize: '13px', letterSpacing: '0.04em', borderRadius: '999px', textDecoration: 'none' }}>Read the Three Laws</a>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.5 }} style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', fontSize: '12px', color: SOFT, letterSpacing: '0.12em' }}>
              {['4 Actors', '3 Laws', '4 E.D.G.E', '6 Work Types'].map((s, i) => (
                <span key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,.1)' : 'none', paddingLeft: i > 0 ? '32px' : '0' }}>{s}</span>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: 'easeOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            {['I', 'II', 'III', 'IV'].map((num, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 0.15 + (i * 0.05) }} transition={{ duration: 1.2, delay: 0.3 + (i * 0.2) }} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: GOLD, lineHeight: 1, userSelect: 'none', letterSpacing: '-0.04em' }}>
                {num}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.2 - FOUR ACTORS */}
      <section id="actors" style={{ background: BG2, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Four Actors" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Four actors. Four reckonings.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>AI enters not as a tool, but as an actor that forces repositioning.</motion.p>

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { num: 'I', name: 'Employee', reckoning: 'Most roles built on intelligence. AI absorbs that first.', question: '"Am I in the compression zone?"' },
              { num: 'II', name: 'CXO', reckoning: 'Information advantage gone.', question: '"What replaces it?"' },
              { num: 'III', name: 'AI', reckoning: 'Absorbs work in layers - execution to analysis to judgment.', question: '"What is the boundary?"' },
              { num: 'IV', name: 'Organisation', reckoning: 'Investment high, outcomes low.', question: '"What is structurally missing?"' },
            ].map((actor, i) => (
              <motion.div key={actor.num} variants={fadeUp} onClick={() => setActiveActor(activeActor === i ? null : i)} style={{ background: PANEL, border: '1px solid ' + (activeActor === i ? GOLD : 'rgba(255,255,255,.07)'), padding: '32px 28px', cursor: 'pointer', position: 'relative' }}>
                <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '36px', fontWeight: 400, color: 'rgba(200,168,108,.4)', lineHeight: 1, display: 'block', marginBottom: '16px' }}>{actor.num}</span>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '24px', fontWeight: 400, marginBottom: '12px', letterSpacing: '-0.02em', color: TEXT }}>{actor.name}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, marginBottom: '12px' }}>{actor.reckoning}</p>
                <p style={{ fontSize: '12px', color: SOFT, fontStyle: 'italic' }}>{actor.question}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.3 - THREE LAWS */}
      <section id="laws" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Three Laws" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Three laws. One predictable curve.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>AI does not eliminate work first. It eliminates the structural premium on intelligence inside work.</motion.p>

          <motion.div variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { num: 'I', name: 'Intelligence Abundance', statement: 'As intelligence becomes cheap, its value declines.', implication: 'What was once a premium skill becomes a commodity.' },
              { num: 'II', name: 'Judgment Scarcity', statement: 'Judgment becomes the premium layer.', implication: 'The scarcer the judgment, the higher the value.' },
              { num: 'III', name: 'Compression Curve', statement: 'AI compresses work upward.', implication: 'Work moves from execution to analysis to judgment.' },
            ].map((law) => (
              <motion.div key={law.num} variants={fadeUp} style={{ background: PANEL, borderLeft: '3px solid ' + RUST, padding: '28px 28px 28px 24px', position: 'relative', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px', alignItems: 'start' }}>
                  <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '32px', fontWeight: 400, color: 'rgba(200,168,108,.4)', lineHeight: 1 }}>{law.num}</span>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: TEXT, marginBottom: '8px', letterSpacing: '-0.01em' }}>{law.name}</div>
                    <div style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, marginBottom: '8px' }}>{law.statement}</div>
                    <div style={{ fontSize: '12px', color: SOFT, fontStyle: 'italic' }}>Implication: {law.implication}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.4 - THREE ERAS */}
      <section id="eras" style={{ background: BG2, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Three Eras" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Three eras of work.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>Each era shifts value from execution to thinking to decision.</motion.p>

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
            {[
              { era: 'Industrial', focus: 'Manual', desc: 'Value in physical execution' },
              { era: 'Knowledge', focus: 'Cognitive', desc: 'Value in intellectual work' },
              { era: 'AI', focus: 'Judgment', desc: 'Value in decisive choice' },
            ].map((e, i) => (
              <motion.div key={e.era} variants={fadeUp} style={{ flex: 1, background: PANEL, border: '1px solid rgba(255,255,255,.07)', padding: '32px 24px', position: 'relative', marginRight: i < 2 ? '-1px' : '0' }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '11px', color: GOLD, marginBottom: '12px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{e.era}</div>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '28px', fontWeight: 400, marginBottom: '12px', letterSpacing: '-0.03em', color: TEXT }}>{e.focus}</div>
                <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6 }}>{e.desc}</div>
                {i < 2 && <div style={{ position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: '24px', height: '24px', background: BG2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: GOLD, fontSize: '18px' }}>→</span></div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.5 - DOCTRINE */}
      <section id="doctrine" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ borderLeft: '4px solid ' + RUST, paddingLeft: '32px', position: 'relative' }}>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em', color: TEXT, marginBottom: '24px' }}>AI does not eliminate work first.</p>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em', color: GOLD, marginBottom: '32px' }}>It eliminates the structural premium on intelligence inside work.</p>
            <p style={{ fontSize: '12px', color: SOFT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>- Nitin Nahata, Founder, Axion Index</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.6 - E.D.G.E FRAMEWORK */}
      <section id="edge" style={{ background: BG2, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="E.D.G.E Framework" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Four dimensions of positioning.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>Measure where you stand before AI decides it.</motion.p>

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { letter: 'E', name: 'Exposure', question: 'How much of your work AI can replace' },
              { letter: 'D', name: 'Decision Density', question: 'How much judgment you own' },
              { letter: 'G', name: 'Growth Boundary', question: 'Is your authority expanding' },
              { letter: 'E', name: 'Economic Anchoring', question: 'Are you paid for scarcity' },
            ].map((dim) => (
              <motion.div key={dim.name} variants={fadeUp} style={{ background: PANEL, border: '1px solid rgba(255,255,255,.07)', padding: '28px 24px', position: 'relative' }}>
                <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '48px', fontWeight: 400, color: GOLD, lineHeight: 1, display: 'block', marginBottom: '16px' }}>{dim.letter}</span>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '18px', fontWeight: 400, marginBottom: '12px', letterSpacing: '-0.02em', color: TEXT }}>{dim.name}</h3>
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6 }}>{dim.question}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.7 - WORK TYPES */}
      <section id="work-types" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Six Work Types" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Six work types. Six risk levels.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>Work compresses upward until judgment becomes the boundary.</motion.p>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ border: '1px solid rgba(255,255,255,.07)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', background: 'rgba(255,255,255,.03)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SOFT }}>Work Type</div>
              <div style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SOFT, textAlign: 'center' }}>AI Risk</div>
              <div style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: SOFT }}>Nature</div>
            </div>
            {[
              { type: 'Framing and Problem Definition', risk: '~5%', nature: 'Judgment-dominant', riskColor: GOLD },
              { type: 'Deciding and Directing', risk: '~8%', nature: 'Judgment-dominant', riskColor: GOLD },
              { type: 'Influencing and Convening', risk: '~20%', nature: 'AI-assisted', riskColor: GOLDB },
              { type: 'Synthesising and Interpreting', risk: '~45%', nature: 'AI-assisted', riskColor: '#b87333' },
              { type: 'Researching and Analysing', risk: '~75%', nature: 'AI-dominant', riskColor: RUST },
              { type: 'Executing and Coordinating', risk: '~85%', nature: 'AI-dominant', riskColor: RUST },
            ].map((row, i) => (
              <div key={row.type} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,.02)', borderBottom: i < 5 ? '1px solid rgba(255,255,255,.04)' : 'none' }}>
                <div style={{ padding: '18px 24px', fontSize: '14px', color: TEXT }}>{row.type}</div>
                <div style={{ padding: '18px 24px', fontSize: '14px', color: row.riskColor, fontWeight: 600, textAlign: 'center' }}>{row.risk}</div>
                <div style={{ padding: '18px 24px', fontSize: '13px', color: MUTED }}>{row.nature}</div>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeIn} initial="hidden" whileInView="show" viewport={VP} style={{ marginTop: '24px', fontSize: '13px', color: SOFT, fontStyle: 'italic' }}>Work compresses upward until judgment becomes the boundary.</motion.p>
        </div>
      </section>

      {/* SECTION 5.8 - ASSESSMENTS */}
      <section id="assessments" style={{ background: BG2, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Three Instruments" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>Three instruments.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>Quick Mirror (free) - Full ARI Diagnostic (Rs 499 + GST) - Enterprise instruments.</motion.p>

          <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { abbr: 'ARI', name: 'AI Replaceability Index', desc: 'Individual risk index. 9 questions, ~3 min. Immediate Edge Score.', price: 'Free tier: Quick Mirror', detail: 'Full Diagnostic: Rs 499 + GST' },
              { abbr: 'BDI', name: 'Brainpower Density Index', desc: 'CXO model shift. Measure decision density across your leadership layer.', price: 'Building', detail: 'Waitlist - for leaders' },
              { abbr: 'ORG AI DARS', name: 'Org AI Decision Architecture Realignment System', desc: 'Organisation readiness. Enterprise-wide AI positioning assessment.', price: 'Building', detail: 'Enterprise engagement' },
            ].map((a, i) => (
              <motion.div key={a.abbr} variants={fadeUp} onClick={() => setActiveAssessment(activeAssessment === i ? null : i)} style={{ background: PANEL, border: '1px solid ' + (activeAssessment === i ? GOLD : 'rgba(255,255,255,.07)'), padding: '32px 28px', cursor: 'pointer', position: 'relative', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '42px', fontWeight: 400, color: GOLD, lineHeight: 1, display: 'block', marginBottom: '16px' }}>{a.abbr}</span>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '18px', fontWeight: 400, marginBottom: '12px', letterSpacing: '-0.02em', color: TEXT }}>{a.name}</h3>
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, marginBottom: '16px' }}>{a.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: '11px', color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{a.price}</div>
                  <div style={{ fontSize: '11px', color: SOFT }}>{a.detail}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.9 - EVIDENCE */}
      <section id="evidence" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Evidence" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>12 reports. 6 months.</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '48px', maxWidth: '600px' }}>Sourced from McKinsey, BCG, EY, PwC - the doctrine is built on signal, not opinion.</motion.p>

          <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
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
              <motion.div key={i} variants={fadeUp} style={{ background: PANEL, border: '1px solid rgba(255,255,255,.07)', padding: '20px 18px', position: 'relative' }}>
                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '15px', fontWeight: 400, marginBottom: '10px', lineHeight: 1.3, color: TEXT }}>{e.title}</div>
                <div style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.08em' }}>{e.source}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.10 - ABOUT */}
      <section id="about" style={{ background: BG2, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontSize: '17px', color: MUTED, lineHeight: 1.88, marginBottom: '36px' }}>This work is built on patterns observed over 22 years inside organisations - from Standard Chartered to Tata Global Beverages to Udaan to Gameskraft. The frameworks are not theoretical. They are extracted from operating reality.</motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}>
            <Link href="/founder" style={{ display: 'inline-block', padding: '11px 26px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.12)', color: MUTED, fontSize: '13px', letterSpacing: '0.04em', borderRadius: '999px', textDecoration: 'none' }}>Read founder</Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.11 - FAQ */}
      <section id="faq" style={{ background: BG, borderBottom: '1px solid ' + LINE, padding: '96px 56px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Eyebrow label="FAQ" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '48px' }}>Common questions.</motion.h2>

          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={VP} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { q: 'What is this?', a: 'AI Edge Lab is a diagnostic platform that maps how AI changes the structure of work. It tells you where you stand before AI decides it.' },
              { q: 'Is this predictive?', a: 'No. This is structural. We map position, not prediction. The laws are observed patterns, not forecasts.' },
              { q: 'How accurate?', a: 'The frameworks are built on 22 years of operating experience across four institutions. The evidence is sourced from McKinsey, BCG, EY, PwC.' },
              { q: 'Do I need this?', a: 'If your work involves judgment, decision-making, or intelligence - AI will reprice it. The question is not whether. It is where you stand when it happens.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ background: PANEL, border: '1px solid rgba(255,255,255,.07)', cursor: 'pointer' }}>
                <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: 500, color: TEXT }}>{item.q}</span>
                  <motion.span animate={{ rotate: activeFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '20px', color: GOLD, flexShrink: 0 }}>+</motion.span>
                </div>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 28px 24px', fontSize: '14px', color: MUTED, lineHeight: 1.8 }}>{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.12 - CTA */}
      <section id="cta" style={{ background: BG, padding: '120px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%,rgba(200,168,108,.06),transparent 60%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={VP} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.04em', color: TEXT, marginBottom: '40px' }}>
            Know where you stand<br />before AI decides it.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ delay: 0.3, duration: 0.6 }}>
            <Link href="#assessments" style={{ display: 'inline-block', padding: '14px 32px', background: GOLD, color: '#2a1800', fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em', borderRadius: '999px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(200,168,108,.3)' }}>Take the Quick Mirror</Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5.13 - FOOTER */}
      <footer style={{ background: 'rgba(5,5,4,.98)', padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid ' + LINE, flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.04em' }}>2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          <Link href="/" style={{ fontSize: '11px', color: SOFT, textDecoration: 'none' }}>Home</Link>
          <Link href="/about" style={{ fontSize: '11px', color: SOFT, textDecoration: 'none' }}>About</Link>
          <Link href="/founder" style={{ fontSize: '11px', color: SOFT, textDecoration: 'none' }}>Founder</Link>
          <Link href="/connect" style={{ fontSize: '11px', color: SOFT, textDecoration: 'none' }}>Connect</Link>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          #hero > div > div { grid-template-columns: 1fr !important; }
          #hero > div > div > div:last-child { display: none !important; }
          #actors > div > div:last-child { grid-template-columns: 1fr !important; }
          #eras > div > div:last-child { flex-direction: column !important; }
          #eras > div > div:last-child > div { margin-right: 0 !important; margin-bottom: 12px !important; }
          #eras > div > div:last-child > div:last-child { margin-bottom: 0 !important; }
          #edge > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
          #work-types > div > div:last-child { overflow-x: auto !important; }
          #assessments > div > div:last-child { grid-template-columns: 1fr !important; }
          #evidence > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          section { padding: 64px 20px !important; }
          footer { padding: 20px !important; flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
