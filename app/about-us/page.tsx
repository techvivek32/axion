'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const bcr = [
  { no: '01', label: 'Belief',     desc: 'Defines direction. The founding conviction that gives the organisation its reason to exist.' },
  { no: '02', label: 'Conviction', desc: 'Drives decisions. Belief tested, shared, and internalised across the organisation.' },
  { no: '03', label: 'Rhythm',     desc: 'Sustains execution. The operating cadence that makes performance predictable.' },
];

const layers = [
  { no: '01', name: 'People Intelligence', desc: 'Understanding how human energy, decisions, and capabilities interact inside the organisation.' },
  { no: '02', name: 'People Operations',   desc: 'Designing the systems, rhythms, and structures that make work flow without friction.' },
  { no: '03', name: 'People Records',      desc: 'Building the compliance, documentation, and audit infrastructure that makes the organisation defensible.' },
];

const whatWeDo = [
  'Not HR functions.',
  'Not policies.',
  'Not reports.',
  'Systems.',
];

export default function AboutUs() {
  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <div style={{ position: 'relative', padding: '80px 56px 72px', borderBottom: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#070707' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,168,108,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,108,.13) 1px,transparent 1px)', backgroundSize: '72px 72px', zIndex: 0 }} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%,rgba(200,168,108,.08),transparent 60%)', zIndex: 0 }} />
        <div className="gn-hero" style={{ fontSize: 'clamp(100px,16vw,280px)', right: '-20px', top: '-20px', zIndex: 0 }}>AXION</div>
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">About Axion Index</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', maxWidth: '820px', color: '#f5f2eb' }}>
              Designing Organisations That Don&rsquo;t Break Under Scale.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', maxWidth: '560px', lineHeight: 1.85, marginBottom: '36px' }}>
              Axion Index is not a consulting firm. It is a system for building organisations that operate with clarity, speed, and structure.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/expertise" className="bp">Explore our expertise &rarr;</Link>
              <Link href="/connect" className="bs">Start a conversation</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">What We Do</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '16px', color: '#f5f2eb' }}>
                We build operating systems for organisations.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '15px', color: 'rgba(245,242,235,.52)', lineHeight: 1.8 }}>
                Decision-grade clarity for the people who run organisations — not advice, not software. Architecture.
              </motion.p>
            </div>
            <motion.div variants={staggerContainer}>
              {whatWeDo.map((line, i) => (
                <motion.div key={i} variants={fadeRight}
                  style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                  <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ width: '3px', height: '36px', background: '#c8a86c', flexShrink: 0, transformOrigin: 'top', borderRadius: '2px' }} />
                  <span style={{ fontSize: i === 3 ? '22px' : '17px', fontWeight: i === 3 ? 700 : 400, color: i === 3 ? '#c8a86c' : '#f5f2eb', fontFamily: i === 3 ? "'Playfair Display',serif" : 'inherit' }}>
                    {line}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* WHY AXION INDEX */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Why Axion Index</motion.div>
            <motion.div variants={fadeLeft} className="sr"
              style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '16px', color: '#f5f2eb' }}>
              <span style={{ color: '#c8a86c' }}>&ldquo;Axion&rdquo;</span> represents movement with intent.
            </motion.div>
            <motion.div variants={fadeRight} className="sr"
              style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '28px', color: '#f5f2eb' }}>
              <span style={{ color: 'rgba(245,242,235,.52)' }}>&ldquo;Index&rdquo;</span> represents measurement with precision.
            </motion.div>
            <motion.div variants={fadeUp} style={{ width: '60px', height: '2px', background: '#c8a86c', margin: '0 auto 24px', borderRadius: '2px' }} />
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', lineHeight: 1.85 }}>
              Together, it defines structured organisational intelligence.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* BCR FRAMEWORK */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>BCR Framework</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              Belief &rarr; Conviction &rarr; Rhythm
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {bcr.map((item) => (
              <motion.div key={item.no} variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.35)', boxShadow: '0 20px 56px rgba(200,168,108,.08)', transition: { duration: 0.22 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', padding: '32px', cursor: 'default' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#c8a86c', fontWeight: 700, marginBottom: '16px' }}>{item.no}</div>
                <h3 className="sr" style={{ fontSize: '30px', fontWeight: 400, color: '#f5f2eb', marginBottom: '12px', letterSpacing: '-.02em' }}>{item.label}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.75 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* THREE-LAYER ARCHITECTURE */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Three-Layer Architecture</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              How we structure every engagement.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {layers.map((layer, i) => (
              <motion.div key={i} variants={fadeLeft}
                whileHover={{ x: 6, borderColor: 'rgba(200,168,108,.3)', transition: { duration: 0.2 } }}
                style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '24px', alignItems: 'center', background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '16px', padding: '24px 28px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#c8a86c', fontWeight: 700 }}>{layer.no}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f5f2eb', marginBottom: '4px' }}>{layer.name}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.65 }}>{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MANIFESTO */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>The Manifesto</motion.div>
            <motion.h2 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb', marginBottom: '20px' }}>
              The Unfinished Organisation
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', lineHeight: 1.9, marginBottom: '36px' }}>
              Organisations are not static. They are continuously evolving systems of belief, decision, and rhythm. The ones that survive are not the ones that finish — they are the ones that keep redesigning.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/expertise" className="bp">Explore our expertise &rarr;</Link>
              <Link href="/connect" className="bs">Start a conversation</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/founder', 'Founder'], ['/expertise', 'Expertise'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
