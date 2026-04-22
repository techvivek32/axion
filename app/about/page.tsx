'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const beliefs = [
  { word: 'Clarity', rest: 'is the most undervalued advantage in any organisation.' },
  { word: 'Systems', rest: 'create clarity. People sustain it.' },
  { word: 'Structure', rest: 'is not a constraint. It is the source of speed.' },
];

export default function About() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Grain effect */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', opacity: 0.04, zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 50%, rgba(200,168,108,.08), transparent 60%)', zIndex: 1 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          className="gn-hero" style={{ fontSize: 'clamp(120px,18vw,280px)', right: '-20px', top: '-20px', zIndex: 0, letterSpacing: '-.08em' }}>
          ABOUT
        </motion.div>
        <div className="inner" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">About</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              Built From<br />Real-World Collisions.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              This is not theory. This is built from experience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">The Story</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '24px' }}>
                Nitin<br /><em style={{ color: 'var(--goldb)', fontStyle: 'italic' }}>Nahata</em>
              </motion.h2>
              <motion.div variants={fadeLeft} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ height: '1px', width: '36px', background: 'var(--gold)' }} />
                <span style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--soft)', fontWeight: 600 }}>Operating Architect</span>
              </motion.div>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                Worked across startups, scale-ups, and complex organisations. Focused on where systems fail under growth.
              </motion.p>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '24px' }}>
                22+ years inside India&rsquo;s most complex organisations — Tata Group, Standard Chartered, Udaan, Gameskraft.
              </motion.p>
              <motion.div variants={fadeLeft} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Tata Group', 'Standard Chartered', 'Udaan', 'Gameskraft'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
                <span style={{ fontSize: '10px', padding: '5px 13px', border: '1px solid rgba(200,168,108,.28)', borderRadius: '999px', color: 'var(--gold)', letterSpacing: '.06em', fontWeight: 600 }}>CHRO / CPO · Active</span>
              </motion.div>
            </div>

            {/* EXPERIENCE STATS */}
            <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <motion.div variants={scaleIn} style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 'var(--r)', padding: '28px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '10px', fontWeight: 600 }}>Experience</div>
                <div className="sr" style={{ fontSize: '48px', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-.04em', marginBottom: '8px' }}>22+</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65 }}>Years inside India&rsquo;s most complex organisations. Every engagement focused on where systems fail under scale.</p>
              </motion.div>
              <motion.div variants={scaleIn} style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 'var(--r)', padding: '28px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--soft)', marginBottom: '12px', fontWeight: 600 }}>Currently Building</div>
                <div className="sr" style={{ fontSize: '24px', fontWeight: 400, marginBottom: '8px' }}>HROS</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '12px' }}>Intelligent payroll infrastructure for India. Compliance-native. AI-first.</p>
                <Link href="/hros" style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '.05em', fontWeight: 500, textDecoration: 'none' }}>Learn more →</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BELIEF — words highlight on scroll */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '36px' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Belief</div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {beliefs.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ padding: '24px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}
              >
                <motion.span
                  initial={{ color: 'var(--text)' }}
                  whileInView={{ color: '#c8a86c' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  className="sr"
                  style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, letterSpacing: '-.02em' }}
                >
                  {b.word}
                </motion.span>
                <span style={{ fontSize: '17px', color: 'var(--muted)', lineHeight: 1.6 }}>{b.rest}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Connect</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Let&rsquo;s connect.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Available for consulting engagements, keynotes, board advisory, CFO roundtables, and media on workforce design &amp; AI.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="bp" style={{ fontSize: '14px', padding: '13px 30px', cursor: 'pointer' }}>Connect →</motion.span>
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
          <Link href="/practice" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Practice</Link>
          <Link href="/hros" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>HROS</Link>
        </div>
      </footer>
    </>
  );
}
