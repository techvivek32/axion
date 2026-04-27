'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const products = [
  { no:'01', name:'AI Edge Lab',                  tag:'LIVE',         tagColor:'#86d9a2', tagBg:'rgba(134,217,162,.12)', desc:'A diagnostic engine that measures human vs AI leverage. Structural readiness assessment using the E-D-G-E framework.' },
  { no:'02', name:'Labour Codes Command Centre',  tag:'ACTIVE',       tagColor:'#8aaccc', tagBg:'rgba(138,172,204,.12)', desc:'Compliance intelligence system. Turns India\'s Labour Codes from a burden into an operating advantage.' },
  { no:'03', name:'Family Business HR',           tag:'ADVISORY',     tagColor:'#c4956a', tagBg:'rgba(196,149,106,.12)', desc:'Legacy architecture for family-run companies navigating generational transition and institutional scale.' },
  { no:'04', name:'HROS',                         tag:'PLATFORM',     tagColor:'#9b8fc0', tagBg:'rgba(155,143,192,.12)', desc:'The HR Operating System. People Intelligence, People Operations, and People Records — unified.' },
  { no:'05', name:'Problem Statement Engagements', tag:'CUSTOM',      tagColor:'#7ab895', tagBg:'rgba(122,184,149,.12)', desc:'Bespoke operating architecture engagements for organisations facing specific structural challenges.' },
  { no:'06', name:'Intelligent Payroll',          tag:'COMING SOON',  tagColor:'rgba(255,255,255,.4)', tagBg:'rgba(255,255,255,.05)', desc:'Compliance-native, AI-first payroll infrastructure for India. Built on the Labour Codes Command Centre.' },
];

export default function Expertise() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <section style={{ background: 'var(--navy-dark)', minHeight: '72vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '96px 56px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.12) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,.08), transparent 65%)' }} />
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Areas of Expertise</motion.div>
            <motion.h1 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', maxWidth: '820px', color: '#fff' }}>
              The Systems That Power<br />Modern Organisations.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,.6)', maxWidth: '560px', lineHeight: 1.85 }}>
              Six products. One operating doctrine. Built from real organisational breakdowns.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Products &amp; Solutions</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              Six systems. One operating doctrine.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {products.map((p) => (
              <motion.div key={p.no} variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'var(--gold)', boxShadow: '0 24px 64px rgba(201,168,76,.12)', transition: { duration: 0.22 } }}
                className="card" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700 }}>{p.no}</span>
                  <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '999px', background: p.tagBg, color: p.tagColor, fontWeight: 700, letterSpacing: '.08em' }}>{p.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--navy-dark)', marginBottom: '10px', lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{p.desc}</p>
                <motion.div whileHover={{ x: 4 }} style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '16px', fontWeight: 600, display: 'inline-block' }}>
                  {p.tag === 'COMING SOON' ? 'Join waitlist →' : 'Learn more →'}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHT — AI EDGE LAB */}
      <section className="section-navy">
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeLeft} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#86d9a2', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#86d9a2', fontWeight: 700 }}>Live — AI Edge Lab</span>
              </motion.div>
              <motion.h2 variants={fadeLeft} className="display"
                style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff', marginBottom: '20px' }}>
                A diagnostic engine that measures human vs AI leverage.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'rgba(255,255,255,.6)', lineHeight: 1.85, marginBottom: '28px' }}>
                The AI Edge Diagnostic assesses structural leverage across four dimensions — giving organisations a clear picture of where human judgment is irreplaceable and where AI compression is already happening.
              </motion.p>
              <motion.div variants={fadeLeft}>
                <Link href="/connect" className="btn-primary">Run the diagnostic →</Link>
              </motion.div>
            </div>
            {/* Mock dashboard */}
            <motion.div variants={scaleIn}
              style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', gap: '6px' }}>
                {['#ff5f57','#febc2e','#28c840'].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
                {[
                  { label: 'AI Edge Score', val: '74', unit: '/100', color: '#C9A84C' },
                  { label: 'Human Leverage', val: '68%', unit: '', color: '#86d9a2' },
                  { label: 'Compression Risk', val: 'Medium', unit: '', color: '#febc2e' },
                  { label: 'Readiness Band', val: 'Holding', unit: '', color: '#8aaccc' },
                ].map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1 + 0.3 }}
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.4)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: m.color, letterSpacing: '-.02em' }}>{m.val}<span style={{ fontSize: '14px', opacity: .6 }}>{m.unit}</span></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Start Here</motion.div>
            <motion.h2 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)', marginBottom: '18px' }}>
              Explore each solution.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
              Every product is built on the same operating doctrine — and designed to work together.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/connect" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>Start a conversation →</Link>
              <Link href="/research" className="btn-outline" style={{ fontSize: '14px', padding: '14px 32px' }}>View Research</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer style={{ background: 'var(--navy-dark)', padding: '32px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,.15)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.3)' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/founder', 'Founder'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '12px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
