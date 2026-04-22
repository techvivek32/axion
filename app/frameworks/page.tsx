'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const frameworks = [
  { no: '01', name: 'Human Energy Framework',      short: 'Replace org charts with energy systems.',          desc: 'Maps how human energy moves, stalls, and compounds inside organisations.' },
  { no: '02', name: 'Coherence Equation',           short: 'Align belief, decision rights, and rhythm.',       desc: 'When these three are in sync, organisations move with clarity and compound over time.' },
  { no: '03', name: 'Unfinished Organisation',      short: 'Organisations are never complete — they evolve.',  desc: 'The three-stage sequence: Belief → Conviction → Rhythm.' },
  { no: '04', name: 'Decision Rights Architecture', short: 'Defines who decides, not just who works.',         desc: 'The four architecture primitives that determine how power actually flows.' },
  { no: '05', name: 'AI Edge Diagnostic™',          short: 'Measures human vs AI replaceability.',             desc: 'Structural leverage assessment using the E-D-G-E framework.' },
  { no: '06', name: 'Salary Disconnect Matrix™',    short: 'Aligns pay with real value creation.',             desc: 'Compensation vs. AI-replicable deliverables. The Value Barbell Model.' },
  { no: '07', name: 'Conviction Stack',             short: 'Build capabilities AI cannot replace.',            desc: 'Maps irreplaceable human skills against AI-dominated capabilities.' },
  { no: '08', name: 'BYD Blueprints',               short: 'Belief → Your Energy → Direction system.',         desc: 'The startup-stage architecture applied guide.' },
];

export default function Frameworks() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(200,168,108,.18), transparent 65%)', zIndex: 0 }}
        />
        {/* Ghost page name watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="gn-hero"
          style={{ fontSize: 'clamp(120px,18vw,280px)', right: '-20px', top: '-20px', zIndex: 0, letterSpacing: '-.08em' }}
        >
          FRAMEWORKS
        </motion.div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Frameworks</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              Frameworks That Turn<br />Complexity Into Clarity.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              These are not frameworks you read. These are systems you operate.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* GRID */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">All Frameworks</div>
            <h2 className="sr" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-.02em' }}>
              Eight systems. One operating doctrine.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}
          >
            {frameworks.map((f) => (
              <motion.div
                key={f.no}
                variants={scaleIn}
                whileHover={{ y: -6, borderColor: 'rgba(200,168,108,0.45)', boxShadow: '0 24px 64px rgba(200,168,108,0.07)', transition: { duration: 0.22 } }}
                className="fg-card"
                style={{ padding: '32px', minHeight: '180px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              >
                <span className="fg-no">{f.no}</span>
                <h3 style={{ fontFamily: 'Playfair Display,Georgia,serif', fontSize: '20px', fontWeight: 400, marginBottom: '8px', letterSpacing: '-.02em', lineHeight: 1.2 }}>{f.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>{f.short}</p>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.65 }}>{f.desc}</p>
                <motion.div
                  initial={{ x: -8, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  style={{ fontSize: '11px', color: 'var(--gold)', marginTop: '14px', fontWeight: 500 }}
                >
                  Explore →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED: COHERENCE EQUATION */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '32px' }}>
            <div className="eyebrow">Featured Framework</div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            style={{ background: 'linear-gradient(135deg,rgba(200,168,108,.07),rgba(200,168,108,.02))', border: '1px solid rgba(200,168,108,.18)', borderRadius: 'var(--rg)', padding: '56px', textAlign: 'center' }}
          >
            <motion.div variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '20px' }}>
              Coherence Equation
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="sr"
              style={{ fontSize: 'clamp(22px,3.5vw,42px)', fontWeight: 400, letterSpacing: '-.02em', color: 'var(--text)', lineHeight: 1.4, marginBottom: '24px' }}
            >
              Belief × Decision Rights × Rhythm<br />
              <motion.span
                initial={{ color: 'var(--text)' }}
                whileInView={{ color: '#c8a86c' }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                ÷ Organisational Debt
              </motion.span>
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
              When these are aligned, organisations move with clarity. When they are not, friction becomes invisible — and compounds.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Go Deeper</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Dive deeper into<br />each framework.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Each framework has a full explanation, application guide, and connection to the broader operating doctrine.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bp" href="/practice" style={{ fontSize: '14px', padding: '13px 30px' }}>See how we apply them →</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bs" href="/philosophy" style={{ fontSize: '14px', padding: '13px 30px' }}>Read the philosophy</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          <Link href="/" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Home</Link>
          <Link href="/philosophy" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Philosophy</Link>
          <Link href="/practice" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
