'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const features = [
  { no: '01', name: 'Intelligent Payroll Layer',  desc: 'Wage structure validation, 50% Rule compliance, PF/ESI cascade calculations — automated and traceable.' },
  { no: '02', name: 'Compliance Intelligence',    desc: 'Labour Codes interpreted as live doctrine. Every obligation mapped to your headcount, states, and worker types in real time.' },
  { no: '03', name: 'Decision Engine',            desc: 'Six cooperating agents that route every query to the right answer — with a full audit trail and STUCK Protocol for grey areas.' },
  { no: '04', name: 'Cost Simulation',            desc: 'Total Employment Obligation modelled per employee. P&L vs balance sheet split. Three scenarios: conservative, aggressive, recommended.' },
];

const competitors = [
  { label: 'Legacy HRMS', desc: 'Checklist, not intelligence', isUs: false },
  { label: 'Big-4 Advisory', desc: 'Human-scaled, not a product', isUs: false },
  { label: 'Point Solutions', desc: 'Surface-level, no cost cascade', isUs: false },
  { label: 'HROS', desc: 'Doctrine, not a form', isUs: true },
];

export default function HROS() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Tech grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,108,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,108,.12) 1px,transparent 1px)', backgroundSize: '48px 48px', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(7,7,7,0) 30%, var(--bg) 75%)', zIndex: 1 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          className="gn-hero" style={{ fontSize: 'clamp(120px,18vw,280px)', right: '-20px', top: '-20px', zIndex: 0, letterSpacing: '-.08em' }}>
          HROS
        </motion.div>
        <div className="inner" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">HROS</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              The Operating System for<br />Modern Organisations.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              Not a tool. Not a feature. A system.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">The Problem</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px' }}>
                Compliance is treated<br />as a checklist.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                But real risk lives in interpretation. Every competitor treats Labour Codes as a form. A PDF upload. A tooltip in a payroll screen.
              </motion.p>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.85, fontStyle: 'italic' }}>
                That is the gap HROS enters through.
              </motion.p>
            </div>
            <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {competitors.map((c, i) => (
                <motion.div
                  key={i}
                  variants={fadeRight}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  style={{ padding: '16px 20px', borderRadius: 'var(--r)', border: '1px solid', borderColor: c.isUs ? 'rgba(200,168,108,.35)' : 'var(--line)', background: c.isUs ? 'rgba(200,168,108,.06)' : 'rgba(255,255,255,.02)' }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, color: c.isUs ? 'var(--gold)' : 'var(--text)', marginBottom: '4px' }}>{c.label}</div>
                  <div style={{ fontSize: '13px', color: c.isUs ? 'var(--muted)' : 'rgba(245,242,235,.3)' }}>{c.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px', maxWidth: '680px' }}>
            <div className="eyebrow">The Solution</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '16px' }}>
              HROS converts labour laws<br />into live intelligence.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8 }}>
              Intelligent payroll is the wedge. Command Centre is the moat. HROS is the destination.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="hw-grid">
            {features.map((f) => (
              <motion.div
                key={f.no}
                variants={scaleIn}
                whileHover={{ y: -6, borderTopColor: '#e5c385', transition: { duration: 0.2 } }}
                className="hw-card"
              >
                <span className="hw-step">{f.no}</span>
                <h3 className="sr" style={{ fontSize: '18px' }}>{f.name}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="sec" style={{ background: 'var(--bg2)', overflow: 'hidden' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '32px', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Dashboard Preview</div>
            <h2 className="sr" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-.02em' }}>
              One dashboard. Every decision.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            style={{ border: '1px solid rgba(200,168,108,.2)', borderRadius: 'var(--rg)', overflow: 'hidden', background: '#0a0a0a' }}
          >
            {/* Mock UI header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#ff5f57','#febc2e','#28c840'].map((c, i) => <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,.06)', borderRadius: '4px', maxWidth: '320px', margin: '0 auto' }} />
            </div>
            {/* Mock dashboard content */}
            <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
              {[
                { label: 'Compliance Score', val: '87%', color: '#86d9a2' },
                { label: 'Wage Gap', val: '₹2.4Cr', color: '#c8a86c' },
                { label: 'Workers at Risk', val: '14', color: '#e07070' },
                { label: 'Amendments', val: '3 new', color: '#8aaccc' },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  style={{ background: 'rgba(255,255,255,.03)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}
                >
                  <div style={{ fontSize: '10px', color: 'var(--soft)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '10px' }}>{m.label}</div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: m.color, letterSpacing: '-.04em' }}>{m.val}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="cta-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#86d9a2', flexShrink: 0 }} />
              <span style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#86d9a2', fontWeight: 600 }}>Currently building</span>
            </div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Intelligent payroll.<br />Compliance-native. AI-first.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Built for organisations that treat compliance as architecture, not administration.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.span whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(200,168,108,.3)' }} whileTap={{ scale: 0.97 }}
                className="bp" style={{ fontSize: '14px', padding: '13px 30px', cursor: 'pointer' }}>Talk to us →</motion.span>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bs" href="/practice" style={{ fontSize: '14px', padding: '13px 30px' }}>View Practice</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          <Link href="/" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Home</Link>
          <Link href="/practice" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Practice</Link>
          <Link href="/about" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>About</Link>
        </div>
      </footer>
    </>
  );
}
