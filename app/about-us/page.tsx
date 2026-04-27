'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const layers = [
  { no: '01', name: 'People Intelligence', desc: 'Understanding how human energy, decisions, and capabilities interact inside the organisation.' },
  { no: '02', name: 'People Operations',   desc: 'Designing the systems, rhythms, and structures that make work flow without friction.' },
  { no: '03', name: 'People Records',      desc: 'Building the compliance, documentation, and audit infrastructure that makes the organisation defensible.' },
];

const bcr = [
  { label: 'Belief',     desc: 'Defines direction. The founding conviction that gives the organisation its reason to exist.' },
  { label: 'Conviction', desc: 'Drives decisions. Belief tested, shared, and internalised across the organisation.' },
  { label: 'Rhythm',     desc: 'Sustains execution. The operating cadence that makes performance predictable.' },
];

export default function AboutUs() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <section style={{ background: 'var(--navy-dark)', minHeight: '88vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '96px 56px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.12) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,.1), transparent 60%)' }} />
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow" style={{ color: 'var(--gold)' }}>About Axion Index</motion.div>
            <motion.h1 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px', color: '#fff' }}>
              Designing Organisations That Don&rsquo;t Break Under Scale.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'rgba(255,255,255,.65)', maxWidth: '580px', lineHeight: 1.85 }}>
              Axion Index is not a consulting firm. It is a system for building organisations that operate with clarity, speed, and structure.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
              <Link href="/expertise" className="btn-primary">Explore our expertise â†’</Link>
              <Link href="/connect" className="btn-gold-outline">Start a conversation</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">What We Do</motion.div>
              <motion.h2 variants={fadeLeft} className="display"
                style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '24px', color: 'var(--navy-dark)' }}>
                We build operating systems for organisations.
              </motion.h2>
            </div>
            <motion.div variants={staggerContainer}>
              {['Not HR functions.', 'Not policies.', 'Not reports.', 'Systems.'].map((line, i) => (
                <motion.div key={i} variants={fadeRight}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
                  <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ width: '3px', height: '36px', background: 'var(--gold)', flexShrink: 0, transformOrigin: 'top', borderRadius: '2px' }} />
                  <span style={{ fontSize: i === 3 ? '22px' : '17px', fontWeight: i === 3 ? 700 : 400, color: i === 3 ? 'var(--gold)' : 'var(--text)', fontFamily: i === 3 ? "'Playfair Display',serif" : 'inherit' }}>
                    {line}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY AXION INDEX */}
      <section className="section-card">
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Why Axion Index</motion.div>
            <motion.div variants={fadeLeft} className="display"
              style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '24px', color: 'var(--navy-dark)' }}>
              <span style={{ color: 'var(--gold)' }}>&ldquo;Axion&rdquo;</span> represents movement with intent.
            </motion.div>
            <motion.div variants={fadeRight} className="display"
              style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '32px', color: 'var(--navy-dark)' }}>
              <span style={{ color: 'var(--navy)' }}>&ldquo;Index&rdquo;</span> represents measurement with precision.
            </motion.div>
            <motion.div variants={fadeUp}
              style={{ width: '80px', height: '2px', background: 'var(--gold)', margin: '0 auto 28px', borderRadius: '2px' }} />
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.85 }}>
              Together, it defines structured organisational intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* BCR FRAMEWORK */}
      <section className="section-navy">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '48px', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>BCR Framework</div>
            <h2 className="display" style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff' }}>
              Belief â†’ Conviction â†’ Rhythm
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {bcr.map((item, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'var(--gold)', boxShadow: '0 20px 56px rgba(201,168,76,.15)', transition: { duration: 0.22 } }}
                style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '20px', padding: '36px', cursor: 'default' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '16px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="display" style={{ fontSize: '32px', fontWeight: 400, color: '#fff', marginBottom: '14px', letterSpacing: '-.02em' }}>{item.label}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.6)', lineHeight: 1.75 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THREE-LAYER ARCHITECTURE */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '48px' }}>
            <div className="eyebrow">Three-Layer Architecture</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              How we structure every engagement.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {layers.map((layer, i) => (
              <motion.div key={i} variants={fadeLeft}
                whileHover={{ x: 8, borderColor: 'var(--gold)', transition: { duration: 0.2 } }}
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '28px', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '28px 32px', cursor: 'default' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700 }}>{layer.no}</div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--navy-dark)', marginBottom: '6px' }}>{layer.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section-dark">
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>The Manifesto</motion.div>
            <motion.h2 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#fff', marginBottom: '24px' }}>
              The Unfinished Organisation
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,.65)', lineHeight: 1.9, marginBottom: '40px' }}>
              Organisations are not static. They are continuously evolving systems of belief, decision, and rhythm. The ones that survive are not the ones that finish â€” they are the ones that keep redesigning.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/expertise" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>
                Explore our expertise â†’
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--navy-dark)', padding: '32px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,.15)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.3)', letterSpacing: '.04em' }}>Â© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Home'], ['/founder', 'Founder'], ['/expertise', 'Expertise'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '12px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
