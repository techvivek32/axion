'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const timeline = [
  { org: 'Tata Group',          role: 'HR Leadership',          desc: 'Built people systems inside one of India\'s most complex conglomerates.' },
  { org: 'Standard Chartered',  role: 'HR Architecture',         desc: 'Designed operating frameworks for a global financial institution.' },
  { org: 'Udaan',               role: 'People Operations',       desc: 'Scaled people infrastructure through hyper-growth and structural complexity.' },
  { org: 'Gameskraft',          role: 'CHRO / CPO',              desc: 'Led the full people function through rapid scale and regulatory change.' },
  { org: 'Axion Index',         role: 'Founder & Operating Architect', desc: 'Building the operating system for modern organisations.' },
];

const speaking = [
  { title: 'Keynotes',          desc: 'On operating architecture, AI readiness, and the future of work.' },
  { title: 'Board Advisory',    desc: 'Strategic counsel for boards navigating workforce and compliance complexity.' },
  { title: 'CFO Roundtables',   desc: 'Translating Labour Codes and workforce cost into financial architecture.' },
  { title: 'Thought Leadership', desc: 'Essays, frameworks, and the Weekly Amendment Digest.' },
];

export default function Founder() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <section style={{ background: 'var(--navy-dark)', minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '96px 56px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(201,168,76,.1), transparent 60%)' }} />
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" animate="show"
            style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '64px', alignItems: 'center' }}>
            <div>
              <motion.div variants={fadeUp} className="eyebrow">Founder</motion.div>
              <motion.h1 variants={fadeUp} className="display"
                style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '20px', color: '#fff' }}>
                Nitin<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Nahata</em>
              </motion.h1>
              <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ height: '1.5px', width: '40px', background: 'var(--gold)' }} />
                <span style={{ fontSize: '12px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', fontWeight: 600 }}>Operating Architect</span>
              </motion.div>
              <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,.65)', maxWidth: '520px', lineHeight: 1.85, marginBottom: '32px' }}>
                Building systems where organisations actually break.
              </motion.p>
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/connect" className="btn-primary">Connect with Nitin →</Link>
                <Link href="/expertise" className="btn-gold-outline">View Expertise</Link>
              </motion.div>
            </div>
            {/* Portrait placeholder */}
            <motion.div variants={scaleIn}
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '24px', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,.3)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>👤</div>
                <div style={{ fontSize: '12px', letterSpacing: '.1em' }}>Portrait</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">Biography</motion.div>
              <motion.h2 variants={fadeLeft} className="display"
                style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px', color: 'var(--navy-dark)' }}>
                22+ years inside India&rsquo;s most complex organisations.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                From corporate systems to startup chaos, the journey has been about understanding where organisations fail — and building the architecture to prevent it.
              </motion.p>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.85 }}>
                Every engagement, every system, every framework at Axion Index is built from that experience.
              </motion.p>
            </div>
            <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['22+', 'Years in practice'], ['4', 'Practice areas'], ['1', 'Operating doctrine']].map(([num, label]) => (
                <motion.div key={label} variants={scaleIn}
                  style={{ background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div className="display" style={{ fontSize: '40px', fontWeight: 400, color: 'var(--gold)', lineHeight: 1, letterSpacing: '-.04em' }}>{num}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="section-card">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '48px' }}>
            <div className="eyebrow">Journey</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              The path that built the system.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ position: 'relative' }}>
            {/* Timeline line */}
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ position: 'absolute', left: '23px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--gold), rgba(201,168,76,.1))', transformOrigin: 'top', zIndex: 0 }} />
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeLeft}
                style={{ display: 'flex', gap: '28px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                <motion.div whileHover={{ scale: 1.2, backgroundColor: 'var(--gold)', transition: { duration: 0.2 } }}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--gold)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                </motion.div>
                <div style={{ background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '20px 24px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy-dark)' }}>{item.org}</h3>
                    <span style={{ fontSize: '11px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(201,168,76,.1)', color: 'var(--gold)', fontWeight: 600, letterSpacing: '.06em' }}>{item.role}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* POV */}
      <section className="section-navy">
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Operating Architect Perspective</motion.div>
            <motion.p variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(24px,3.5vw,42px)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-.02em', color: '#fff', marginBottom: '24px' }}>
              &ldquo;Organisations are not{' '}
              <motion.span initial={{ color: '#fff' }} whileInView={{ color: 'var(--gold)' }} viewport={viewportOnce} transition={{ delay: 0.4, duration: 0.6 }}>
                managed
              </motion.span>
              . They are{' '}
              <motion.span initial={{ color: '#fff' }} whileInView={{ color: 'var(--gold)' }} viewport={viewportOnce} transition={{ delay: 0.7, duration: 0.6 }}>
                designed
              </motion.span>
              .&rdquo;
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SPEAKING */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Speaking &amp; Advisory</div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
              Keynotes, advisory sessions,<br />and thought leadership.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px', marginBottom: '40px' }}>
            {speaking.map((s, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -6, borderColor: 'var(--gold)', boxShadow: '0 20px 48px rgba(201,168,76,.1)', transition: { duration: 0.22 } }}
                className="card">
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--navy-dark)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Link href="/connect" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>Connect with Nitin →</Link>
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
