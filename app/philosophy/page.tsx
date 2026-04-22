'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeIn, fadeLeft, fadeRight, scaleIn, staggerContainer, cardHover, lineGrow, viewportOnce } from '@/lib/motion';

const doctrineCards = [
  { no: '01', title: 'Systems > People',    desc: 'Organisations that depend on specific people break when those people leave. Build systems that outlast individuals.' },
  { no: '02', title: 'Clarity > Speed',     desc: 'Speed without clarity is chaos. Clarity creates sustainable speed. Most organisations optimise for the wrong one.' },
  { no: '03', title: 'Decisions > Hierarchy', desc: 'Who decides matters more than who reports. Decision rights define real power, not job titles.' },
  { no: '04', title: 'Structure > Chaos',   desc: 'Structure is not a constraint. It is the source of speed, scale, and compounding advantage.' },
];

const breakdowns = [
  'Unclear decision rights',
  'Misaligned incentives',
  'Undefined operating rhythms',
];

export default function Philosophy() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated grid background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,108,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,108,.15) 1px,transparent 1px)', backgroundSize: '72px 72px', zIndex: 0 }}
        />
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Philosophy</motion.div>
            <motion.h1
              variants={fadeUp}
              className="sr"
              style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}
            >
              The System Beneath the<br />Organisation Defines Its Future.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.85 }}>
              Most companies optimise people. Very few design the system those people operate in.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* THE BREAKDOWN */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <motion.div variants={fadeLeft} className="eyebrow">The Breakdown</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px' }}>
                Where Organisations<br />Actually Break
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85 }}>
                Not in strategy decks. Not in hiring plans.<br />They break in invisible layers:
              </motion.p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {breakdowns.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeRight}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '20px 0', borderBottom: '1px solid var(--line)' }}
                >
                  <motion.div
                    variants={lineGrow}
                    style={{ width: '2px', height: '40px', background: '#c8a86c', flexShrink: 0, marginTop: '4px' }}
                  />
                  <span style={{ fontSize: '17px', color: 'var(--text)', lineHeight: 1.5 }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="sec" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="inner">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
            style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}
          >
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>The Shift</motion.div>
            <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-.04em', marginBottom: '24px' }}>
              From People Management<br />to System Design.
            </motion.h2>
            <motion.p variants={fadeRight} style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.85 }}>
              You don&rsquo;t scale by adding people.<br />You scale by designing clarity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CORE DOCTRINE CARDS */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <div className="eyebrow">Core Doctrine</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-.02em', marginBottom: '36px' }}>
              Four principles that define<br />operating intelligence.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="fg"
          >
            {doctrineCards.map((card) => (
              <motion.div
                key={card.no}
                variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'rgba(200,168,108,0.4)', boxShadow: '0 20px 60px rgba(200,168,108,0.08)', transition: { duration: 0.25 } }}
                className="fg-card"
                style={{ cursor: 'default' }}
              >
                <span className="fg-no">{card.no}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
            className="cta-panel"
          >
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Next Step</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Explore the frameworks<br />behind this system.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Eight signature frameworks built from real organisational collisions — each one designed to be applied, not admired.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bp" href="/frameworks" style={{ fontSize: '14px', padding: '13px 30px' }}>View Frameworks →</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bs" href="/" style={{ fontSize: '14px', padding: '13px 30px' }}>Back to Home</Link>
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
          <Link href="/practice" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
