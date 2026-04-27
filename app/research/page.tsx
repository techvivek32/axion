'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const reports = [
  { title: 'AI Replaceability Index', desc: 'Measures the degree to which roles and functions are structurally replaceable by AI systems. Updated quarterly.' },
  { title: 'Brainpower Density Index', desc: 'Assesses the concentration of human-irreplaceable cognitive work within an organisation\'s operating structure.' },
];
const books = [
  { title: 'Baptism by Chaos', subtitle: 'The Operating Architect', desc: 'The intellectual anchor of the Axion Index doctrine. A first-person account of building systems inside organisations that break.' },
  { title: 'The Operating Architect', subtitle: 'Frameworks for the Modern Organisation', desc: 'Eight signature frameworks that turn organisational complexity into operating clarity.' },
];
const frameworks = [
  { name: 'BCR Framework',         desc: 'Belief → Conviction → Rhythm. The three-stage sequence every organisation must complete to scale.' },
  { name: '3i Framework',          desc: 'Interpretation → Implication → Implementation. The operating sequence for every Labour Codes assessment.' },
  { name: 'Operating Architecture', desc: 'The three-layer system: People Intelligence, People Operations, People Records.' },
];

export default function Research() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <section style={{ background: 'var(--navy-dark)', minHeight: '68vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '96px 56px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 40% 60%, rgba(201,168,76,.09), transparent 60%)' }} />
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Research &amp; Publications</motion.div>
            <motion.h1 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', maxWidth: '820px', color: '#fff' }}>
              Where Thinking<br />Becomes Systems.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,.6)', maxWidth: '520px', lineHeight: 1.85 }}>
              Index reports, books, whitepapers, and the framework library that powers Axion Index.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* INDEX REPORTS */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Index Reports</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              Proprietary data. Original research.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {reports.map((r, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -6, borderColor: 'var(--gold)', boxShadow: '0 20px 48px rgba(201,168,76,.1)', transition: { duration: 0.22 } }}
                className="card" style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '11px', color: 'var(--gold)', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>
                  {String(i + 1).padStart(2, '0')} — Report
                </div>
                <h3 className="display" style={{ fontSize: '22px', fontWeight: 400, color: 'var(--navy-dark)', marginBottom: '10px' }}>{r.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{r.desc}</p>
                <motion.div whileHover={{ x: 4 }} style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '16px', fontWeight: 600, display: 'inline-block' }}>
                  Access report →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BOOKS */}
      <section className="section-card">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Books</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              The intellectual anchors.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {books.map((b, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -8, rotateY: 2, borderColor: 'var(--gold)', boxShadow: '0 24px 56px rgba(201,168,76,.12)', transition: { duration: 0.25 } }}
                style={{ background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ background: 'var(--navy)', padding: '40px 32px', minHeight: '160px', display: 'flex', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>{b.subtitle}</div>
                    <h3 className="display" style={{ fontSize: '26px', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>{b.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>{b.desc}</p>
                  <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600 }}>Learn more →</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FRAMEWORK LIBRARY */}
      <section className="section-navy">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Framework Library</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff' }}>
              The operating systems behind the work.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {frameworks.map((f, i) => (
              <motion.div key={i} variants={fadeLeft}
                whileHover={{ x: 8, borderColor: 'var(--gold)', transition: { duration: 0.2 } }}
                style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '28px', alignItems: 'center', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '16px', padding: '24px 28px', cursor: 'pointer' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--gold)' }}>{f.name}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.6)', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MEDIA */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Media</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              Press, podcasts, and coverage.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {['Fortune India', 'Economic Times', 'YourStory', 'Inc42', 'LinkedIn Top Voice'].map((m, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ scale: 1.05, borderColor: 'var(--gold)', transition: { duration: 0.2 } }}
                style={{ padding: '14px 24px', background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer' }}>
                {m}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-card">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Go Deeper</motion.div>
            <motion.h2 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)', marginBottom: '18px' }}>
              Explore the research.
            </motion.h2>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/connect" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>Get in touch →</Link>
              <Link href="/expertise" className="btn-outline" style={{ fontSize: '14px', padding: '14px 32px' }}>View Expertise</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer style={{ background: 'var(--navy-dark)', padding: '32px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,.15)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.3)' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/expertise', 'Expertise'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '12px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
