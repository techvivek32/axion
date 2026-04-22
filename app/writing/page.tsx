'use client';
import Link from 'next/link';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeIn, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const categories = ['All', 'HR Tech', 'Startup', 'AI & Talent', 'Org Design', 'Family Business', 'Operating Architect'];

const articles = [
  { cat: 'Startup',            title: 'Why Most Startups Break After 50 Employees',              desc: 'The inflection point where informal systems collapse and operating architecture becomes non-negotiable.' },
  { cat: 'HR Tech',            title: 'The Hidden Cost of the 50% Wage Rule',                    desc: 'How Labour Codes wage restructuring creates a 6–12% employment cost impact most CFOs have not modelled.' },
  { cat: 'AI & Talent',        title: 'AI is Not Replacing Jobs — It\'s Replacing Structures',   desc: 'The real disruption is not at the role level. It is at the decision and accountability layer.' },
  { cat: 'Org Design',         title: 'Decision Rights: The Missing Layer in Every Company',     desc: 'Most organisations define who works. Almost none define who decides. That gap is where friction lives.' },
  { cat: 'Operating Architect',title: 'The Coherence Equation in Practice',                      desc: 'How Belief × Decision Rights × Rhythm ÷ Organisational Debt plays out inside real growth-stage companies.' },
  { cat: 'Family Business',    title: 'Succession Is an Architecture Problem',                   desc: 'Why most family business transitions fail — and what the Axion Index framework does differently.' },
];

export default function Writing() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? articles : articles.filter(a => a.cat === active);

  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.14 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(200,168,108,.2), transparent 60%)', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          className="gn-hero" style={{ fontSize: 'clamp(120px,18vw,280px)', right: '-20px', top: '-20px', zIndex: 0, letterSpacing: '-.08em' }}>
          WRITING
        </motion.div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Writing</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              Ideas That Challenge How<br />Organisations Actually Work.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              This is where thinking becomes practical. Every article connects theory with execution.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="sec" style={{ background: 'var(--bg2)', paddingBottom: '0', borderBottom: 'none' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map((c) => (
              <motion.button
                key={c}
                onClick={() => setActive(c)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '7px 18px', borderRadius: '999px', border: '1px solid',
                  borderColor: active === c ? '#c8a86c' : 'var(--line)',
                  background: active === c ? 'rgba(200,168,108,.12)' : 'rgba(255,255,255,.02)',
                  color: active === c ? '#c8a86c' : 'var(--soft)',
                  fontSize: '12px', fontWeight: active === c ? 600 : 400,
                  cursor: 'pointer', letterSpacing: '.04em', transition: 'all .2s',
                }}
              >
                {c}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="sec" style={{ background: 'var(--bg2)', paddingTop: '32px' }}>
        <div className="inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}
            >
              {filtered.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ y: -6, borderColor: 'rgba(200,168,108,.3)', background: '#181818', transition: { duration: 0.2 } }}
                  className="sc"
                >
                  <div className="sc-cat">{a.cat}</div>
                  <div className="sc-t">{a.title}</div>
                  <div className="sc-r"></div>
                  <div className="sc-b">{a.desc}</div>
                  <motion.div whileHover={{ x: 4 }} style={{ fontSize: '11px', color: 'var(--gold)', marginTop: '14px', fontWeight: 500, display: 'inline-block' }}>
                    Read →
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="sec" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '24px' }}>
            <div className="eyebrow">Featured</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            style={{ background: 'linear-gradient(135deg,rgba(200,168,108,.08),rgba(200,168,108,.02))', border: '1px solid rgba(200,168,108,.2)', borderRadius: 'var(--rg)', padding: '56px', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '16px' }}>Startup · Long Form</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '16px', maxWidth: '640px' }}>
              Why Most Startups Break After 50 Employees
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.8, marginBottom: '28px' }}>
              The inflection point where informal systems collapse and operating architecture becomes non-negotiable. What breaks, why it breaks, and what to build instead.
            </p>
            <motion.span whileHover={{ x: 6 }} style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 500, cursor: 'pointer', display: 'inline-block' }}>
              Read the full article →
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeUp} className="eyebrow">Newsletter</motion.div>
              <motion.h2 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '14px' }}>
                The Operating<br />Architect Brief.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8 }}>
                One framework insight. One uncomfortable question. One resource. Under 800 words. Every week.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '13px 18px', background: '#1c1b1b', border: '1px solid rgba(255,255,255,.08)', borderRadius: '22px', color: 'var(--text)', fontSize: '13px', marginBottom: '10px', outline: 'none', display: 'block' }} />
              <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="bp" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '13px', padding: '13px', cursor: 'pointer' }}>
                Explore all insights →
              </motion.span>
            </motion.div>
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
