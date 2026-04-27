'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const products = [
  { no:'01', name:'AI Edge Lab',                   tag:'LIVE',        tagColor:'#86d9a2', tagBg:'rgba(134,217,162,.12)', desc:'A diagnostic engine that measures human vs AI leverage. Structural readiness assessment using the E-D-G-E framework.' },
  { no:'02', name:'Labour Codes Command Centre',   tag:'ACTIVE',      tagColor:'#8aaccc', tagBg:'rgba(138,172,204,.12)', desc:'Compliance intelligence system. Turns India\'s Labour Codes from a burden into an operating advantage.' },
  { no:'03', name:'Family Business HR',            tag:'ADVISORY',    tagColor:'#c4956a', tagBg:'rgba(196,149,106,.12)', desc:'Legacy architecture for family-run companies navigating generational transition and institutional scale.' },
  { no:'04', name:'HROS',                          tag:'PLATFORM',    tagColor:'#9b8fc0', tagBg:'rgba(155,143,192,.12)', desc:'The HR Operating System. People Intelligence, People Operations, and People Records — unified.' },
  { no:'05', name:'Problem Statement Engagements', tag:'CUSTOM',      tagColor:'#7ab895', tagBg:'rgba(122,184,149,.12)', desc:'Bespoke operating architecture engagements for organisations facing specific structural challenges.' },
  { no:'06', name:'Intelligent Payroll',           tag:'COMING SOON', tagColor:'rgba(245,242,235,.3)', tagBg:'rgba(255,255,255,.04)', desc:'Compliance-native, AI-first payroll infrastructure for India. Built on the Labour Codes Command Centre.' },
];

const dashMetrics = [
  { label: 'AI Edge Score',    val: '74',      color: '#c8a86c' },
  { label: 'Human Leverage',   val: '68%',     color: '#86d9a2' },
  { label: 'Compression Risk', val: 'Medium',  color: '#febc2e' },
  { label: 'Readiness Band',   val: 'Holding', color: '#8aaccc' },
];

export default function Expertise() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <div style={{ position: 'relative', padding: '80px 56px 72px', borderBottom: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#070707' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,108,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,108,.13) 1px,transparent 1px)', backgroundSize: '56px 56px', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%,rgba(200,168,108,.07),transparent 65%)', zIndex: 0 }} />
        <div className="gn-hero" style={{ fontSize: 'clamp(100px,16vw,280px)', right: '-20px', top: '-20px', zIndex: 0 }}>SYSTEMS</div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Areas of Expertise</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', maxWidth: '820px', color: '#f5f2eb' }}>
              The Systems That Power<br />Modern Organisations.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', maxWidth: '540px', lineHeight: 1.85, marginBottom: '36px' }}>
              Six products. One operating doctrine. Built from real organisational breakdowns.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/connect" className="bp">Start a conversation &rarr;</Link>
              <Link href="/research" className="bs">View Research</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Products &amp; Solutions</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              Six systems. One operating doctrine.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
            {products.map((p) => (
              <motion.div key={p.no} variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.35)', boxShadow: '0 24px 64px rgba(200,168,108,.08)', transition: { duration: 0.22 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', padding: '28px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', color: '#c8a86c', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700 }}>{p.no}</span>
                  <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '999px', background: p.tagBg, color: p.tagColor, fontWeight: 700, letterSpacing: '.08em' }}>{p.tag}</span>
                </div>
                <h3 className="sr" style={{ fontSize: '19px', fontWeight: 400, color: '#f5f2eb', marginBottom: '10px', lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.7 }}>{p.desc}</p>
                <motion.div whileHover={{ x: 4 }} style={{ fontSize: '11px', color: '#c8a86c', marginTop: '16px', fontWeight: 600, display: 'inline-block' }}>
                  {p.tag === 'COMING SOON' ? 'Join waitlist →' : 'Learn more →'}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FEATURE HIGHLIGHT — AI EDGE LAB */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeLeft} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#86d9a2', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#86d9a2', fontWeight: 700 }}>Live — AI Edge Lab</span>
              </motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb', marginBottom: '18px' }}>
                A diagnostic engine that measures human vs AI leverage.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '15px', color: 'rgba(245,242,235,.52)', lineHeight: 1.85, marginBottom: '28px' }}>
                The AI Edge Diagnostic assesses structural leverage across four dimensions — giving organisations a clear picture of where human judgment is irreplaceable and where AI compression is already happening.
              </motion.p>
              <motion.div variants={fadeLeft}>
                <Link href="/connect" className="bp">Run the diagnostic &rarr;</Link>
              </motion.div>
            </div>
            {/* Mock dashboard */}
            <motion.div variants={scaleIn}
              style={{ background: '#141414', border: '1px solid rgba(200,168,108,.15)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', gap: '6px' }}>
                {['#ff5f57','#febc2e','#28c840'].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
                {dashMetrics.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1 + 0.3 }}
                    style={{ background: '#1c1b1b', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '10px', color: 'rgba(245,242,235,.3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: m.color, letterSpacing: '-.02em' }}>{m.val}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Start Here</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb', marginBottom: '16px' }}>
              Explore each solution.
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(245,242,235,.52)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.8 }}>
              Every product is built on the same operating doctrine — and designed to work together.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/connect" className="bp" style={{ fontSize: '14px', padding: '13px 30px' }}>Start a conversation &rarr;</Link>
              <Link href="/research" className="bs" style={{ fontSize: '14px', padding: '13px 30px' }}>View Research</Link>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/founder', 'Founder'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
