'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const reports = [
  { no: '01', title: 'AI Replaceability Index',  desc: 'Measures the degree to which roles and functions are structurally replaceable by AI systems. Updated quarterly.' },
  { no: '02', title: 'Brainpower Density Index', desc: 'Assesses the concentration of human-irreplaceable cognitive work within an organisation\'s operating structure.' },
];

const books = [
  { title: 'Baptism by Chaos',       sub: 'The Operating Architect',                    desc: 'A first-person account of building systems inside organisations that break.' },
  { title: 'The Operating Architect', sub: 'Frameworks for the Modern Organisation',    desc: 'Eight signature frameworks that turn organisational complexity into operating clarity.' },
];

const frameworks = [
  { name: 'BCR Framework',          desc: 'Belief → Conviction → Rhythm. The three-stage sequence every organisation must complete to scale.' },
  { name: '3i Framework',           desc: 'Interpretation → Implication → Implementation. The operating sequence for every Labour Codes assessment.' },
  { name: 'Operating Architecture', desc: 'The three-layer system: People Intelligence, People Operations, People Records.' },
];

const media = ['Fortune India', 'Economic Times', 'YourStory', 'Inc42', 'LinkedIn Top Voice'];

export default function Research() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <div style={{ position: 'relative', padding: '80px 56px 72px', borderBottom: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', minHeight: '72vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#070707' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 60%,rgba(200,168,108,.07),transparent 60%)', zIndex: 0 }} />
        <div className="gn-hero" style={{ fontSize: 'clamp(100px,16vw,280px)', right: '-20px', top: '-20px', zIndex: 0 }}>RESEARCH</div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Research &amp; Publications</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', maxWidth: '820px', color: '#f5f2eb' }}>
              Where Thinking<br />Becomes Systems.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', maxWidth: '520px', lineHeight: 1.85, marginBottom: '36px' }}>
              Index reports, books, whitepapers, and the framework library that powers Axion Index.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/connect" className="bp">Get in touch &rarr;</Link>
              <Link href="/expertise" className="bs">View Expertise</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* INDEX REPORTS */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Index Reports</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              Proprietary data. Original research.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
            {reports.map((r) => (
              <motion.div key={r.no} variants={scaleIn}
                whileHover={{ y: -6, borderColor: 'rgba(200,168,108,.35)', boxShadow: '0 20px 48px rgba(200,168,108,.07)', transition: { duration: 0.22 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', padding: '32px', cursor: 'pointer' }}>
                <div style={{ fontSize: '11px', color: '#c8a86c', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>{r.no} — Report</div>
                <h3 className="sr" style={{ fontSize: '22px', fontWeight: 400, color: '#f5f2eb', marginBottom: '10px' }}>{r.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.7 }}>{r.desc}</p>
                <motion.div whileHover={{ x: 4 }} style={{ fontSize: '11px', color: '#c8a86c', marginTop: '16px', fontWeight: 600, display: 'inline-block' }}>
                  Access report →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* BOOKS */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Books</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              The intellectual anchors.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
            {books.map((b, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.35)', boxShadow: '0 24px 56px rgba(200,168,108,.08)', transition: { duration: 0.25 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: 'linear-gradient(135deg,#1c1b1b,#141414)', padding: '36px 28px', minHeight: '140px', display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid rgba(200,168,108,.1)' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#c8a86c', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>{b.sub}</div>
                    <h3 className="sr" style={{ fontSize: '24px', fontWeight: 400, color: '#f5f2eb', lineHeight: 1.2 }}>{b.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '22px 28px' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.7, marginBottom: '14px' }}>{b.desc}</p>
                  <span style={{ fontSize: '11px', color: '#c8a86c', fontWeight: 600 }}>Learn more →</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FRAMEWORK LIBRARY */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Framework Library</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              The operating systems behind the work.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {frameworks.map((f, i) => (
              <motion.div key={i} variants={fadeLeft}
                whileHover={{ x: 6, borderColor: 'rgba(200,168,108,.3)', transition: { duration: 0.2 } }}
                style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'center', background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '16px', padding: '22px 28px', cursor: 'pointer' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#c8a86c' }}>{f.name}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MEDIA */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '32px' }}>
            <div className="eyebrow">Media</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              Press, podcasts, and coverage.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {media.map((m, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ scale: 1.05, borderColor: '#c8a86c', color: '#c8a86c', transition: { duration: 0.2 } }}
                style={{ padding: '12px 22px', background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'rgba(245,242,235,.52)', cursor: 'pointer' }}>
                {m}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <div className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Go Deeper</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb', marginBottom: '16px' }}>
              Explore the research.
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(245,242,235,.52)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.8 }}>
              Every framework, every index, every publication is built from real operating experience.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/connect" className="bp" style={{ fontSize: '14px', padding: '13px 30px' }}>Get in touch &rarr;</Link>
              <Link href="/expertise" className="bs" style={{ fontSize: '14px', padding: '13px 30px' }}>View Expertise</Link>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/expertise', 'Expertise'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
