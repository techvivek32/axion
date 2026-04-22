'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const services = [
  { no: '01', tag: 'COMPLIANCE',   tagBg: 'rgba(55,100,180,.12)',  tagColor: '#8aaccc', tagBorder: 'rgba(55,100,180,.22)', name: 'Labour Codes Advisory',    headline: 'Turn compliance into advantage.',          desc: 'Labour Codes interpreted as cost, classification, and operating architecture — not a checklist. The 3i framework applied to your organisation.' },
  { no: '02', tag: 'ARCHITECTURE', tagBg: 'rgba(60,140,100,.12)',  tagColor: '#7ab895', tagBorder: 'rgba(60,140,100,.22)', name: 'Organisation Design',       headline: 'Structure how decisions actually flow.',    desc: 'Workforce architecture diagnostics. Maps how work is distributed, controlled, and accounted for. From policy ownership to true operating architecture.' },
  { no: '03', tag: 'SYSTEMS',      tagBg: 'rgba(100,80,160,.12)',  tagColor: '#9b8fc0', tagBorder: 'rgba(100,80,160,.22)', name: 'Performance & Reward',      headline: 'Align incentives with outcomes.',           desc: 'Compensation structures aligned to AI-replicable vs human-irreplaceable work. Salary Disconnect Matrix applied. Value Barbell Model for defensible reward design.' },
];

const steps = [
  { no: '01', name: 'Diagnose',  desc: 'Structured assessment of workforce architecture, compliance exposure, and decision ownership. Typically 2–3 weeks.' },
  { no: '02', name: 'Design',    desc: 'Translate the diagnostic into a cost, risk, and structure map. Decision-grade clarity for CFOs, CHROs, and boards.' },
  { no: '03', name: 'Deploy',    desc: 'Architecture recommendations and implementation frameworks. Roles, accountability, governance, operating rhythm.' },
];

export default function Practice() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(200,168,108,.18), transparent 60%)', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          className="gn-hero" style={{ fontSize: 'clamp(120px,18vw,280px)', right: '-20px', top: '-20px', zIndex: 0, letterSpacing: '-.08em' }}>
          PRACTICE
        </motion.div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Practice</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              We Don&rsquo;t Give Advice.<br />We Build Operating Systems.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              We don&rsquo;t deliver reports. We design systems that operate even when you are not looking.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '36px' }}>
            <div className="eyebrow">Services</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-.02em' }}>Three practice areas. One operating doctrine.</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="fw-rail">
            {services.map((s) => (
              <motion.article
                key={s.no}
                variants={scaleIn}
                whileHover={{ y: -8, borderColor: s.tagBorder, boxShadow: '0 24px 64px rgba(0,0,0,.3)', transition: { duration: 0.22 } }}
                className="fw-card"
              >
                <span className="fw-no">{s.no}</span>
                <span style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '999px', background: s.tagBg, color: s.tagColor, border: `1px solid ${s.tagBorder}`, fontWeight: 600, letterSpacing: '.08em', display: 'inline-block', marginBottom: '16px' }}>{s.tag}</span>
                <h3>{s.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: 500, marginBottom: '10px' }}>{s.headline}</p>
                <p>{s.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPROACH — TIMELINE */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">The Approach</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px' }}>
                Every engagement answers<br />three questions.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85 }}>
                We do not optimise processes. We redesign systems. Every engagement begins with a diagnostic and ends with a structural recommendation you can act on.
              </motion.p>
            </div>
            <motion.div variants={staggerContainer} style={{ position: 'relative' }}>
              {/* Animated vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'absolute', left: '23px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, #c8a86c, rgba(200,168,108,.1))', transformOrigin: 'top', zIndex: 0 }}
              />
              {steps.map((s, i) => (
                <motion.div
                  key={s.no}
                  variants={fadeRight}
                  style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative', zIndex: 1 }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #c8a86c', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '.1em' }}>{s.no}</span>
                  </div>
                  <div style={{ paddingTop: '10px' }}>
                    <h3 className="sr" style={{ fontSize: '22px', fontWeight: 400, marginBottom: '8px', letterSpacing: '-.01em' }}>{s.name}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>The Difference</motion.div>
            <motion.p variants={fadeUp} className="sr" style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-.02em', marginBottom: '20px' }}>
              Most consultants deliver{' '}
              <motion.span style={{ textDecoration: 'line-through', opacity: 0.4 }}>reports</motion.span>
              .<br />
              We deliver{' '}
              <motion.span
                initial={{ color: 'var(--text)' }}
                whileInView={{ color: '#c8a86c' }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                systems that operate.
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Start Here</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Start building your<br />operating system.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Every engagement begins with a diagnostic. No jargon — decision-grade clarity for CFOs, CHROs, and boards.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="bp" style={{ fontSize: '14px', padding: '13px 30px', cursor: 'pointer' }}>Start a conversation →</motion.span>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bs" href="/frameworks" style={{ fontSize: '14px', padding: '13px 30px' }}>View Frameworks</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          <Link href="/" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Home</Link>
          <Link href="/frameworks" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Frameworks</Link>
          <Link href="/hros" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>HROS</Link>
        </div>
      </footer>
    </>
  );
}
