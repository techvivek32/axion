'use client';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const timeline = [
  { org: 'Tata Group',          role: 'HR Leadership',               desc: 'Built people systems inside one of India\'s most complex conglomerates.' },
  { org: 'Standard Chartered',  role: 'HR Architecture',              desc: 'Designed operating frameworks for a global financial institution.' },
  { org: 'Udaan',               role: 'People Operations',            desc: 'Scaled people infrastructure through hyper-growth and structural complexity.' },
  { org: 'Gameskraft',          role: 'CHRO / CPO',                   desc: 'Led the full people function through rapid scale and regulatory change.' },
  { org: 'Axion Index',         role: 'Founder & Operating Architect', desc: 'Building the operating system for modern organisations.' },
];

const speaking = [
  { title: 'Keynotes',           desc: 'On operating architecture, AI readiness, and the future of work.' },
  { title: 'Board Advisory',     desc: 'Strategic counsel for boards navigating workforce and compliance complexity.' },
  { title: 'CFO Roundtables',    desc: 'Translating Labour Codes and workforce cost into financial architecture.' },
  { title: 'Thought Leadership', desc: 'Essays, frameworks, and the Weekly Amendment Digest.' },
];

export default function Founder() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        padding: '80px 56px 72px',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#070707',
      }}>
        {/* Background image overlay — same as homepage hero */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,rgba(7,7,7,0.92) 0%,rgba(7,7,7,0.82) 38%,rgba(7,7,7,0.55) 62%,rgba(7,7,7,0.35) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(7,7,7,0.3) 0%,transparent 30%,transparent 65%,rgba(7,7,7,0.7) 100%)' }} />
        </div>

        {/* Ghost watermark */}
        <div className="gn-hero" style={{ fontSize: 'clamp(120px,18vw,320px)', right: '-20px', top: '-20px', zIndex: 0 }}>
          FOUNDER
        </div>

        {/* Vertical right label */}
        <div style={{ position: 'absolute', right: '20px', top: 0, bottom: 0, display: 'flex', alignItems: 'center', zIndex: 3, pointerEvents: 'none' }}>
          <span style={{ writingMode: 'vertical-rl', fontSize: '9px', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245,242,235,.16)', fontWeight: 600 }}>
            Operating Architect &middot; Axion Index
          </span>
        </div>

        {/* Content grid — same 1fr 400px as homepage */}
        <div className="inner" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'start', position: 'relative', zIndex: 1 }}>

          {/* Left — text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">
              Operating Architect &middot; Bengaluru &middot; Est. 2024
            </motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{
              fontSize: 'clamp(40px,6vw,64px)',
              lineHeight: 1.04,
              fontWeight: 400,
              marginBottom: '22px',
              letterSpacing: '-.03em',
              color: '#f5f2eb',
            }}>
              Nitin<br />
              <em style={{ color: '#e5c385', fontStyle: 'italic' }}>Nahata</em>
            </motion.h1>
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ height: '1px', width: '36px', background: '#c8a86c' }} />
              <span style={{ fontSize: '11px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,242,235,.28)', fontWeight: 600 }}>
                Operating Architect
              </span>
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: '16px', color: 'rgba(245,242,235,.52)', maxWidth: '440px', marginBottom: '32px', lineHeight: 1.8 }}>
              22+ years building systems where organisations actually break — and rebuilding them so they don&rsquo;t.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
              <Link href="/connect" className="bp">Connect with Nitin &rarr;</Link>
              <Link href="/expertise" className="bs">View Expertise</Link>
            </motion.div>

            {/* Stats — same as homepage */}
            <motion.div variants={fadeUp} style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: '22px', display: 'flex', gap: '44px', flexWrap: 'wrap' }}>
              {[
                { num: '22', label: 'Years in practice' },
                { num: '4',  label: 'Practice areas' },
                { num: '1',  label: 'Doctrine' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="sr" style={{ fontSize: '40px', fontWeight: 400, color: '#c8a86c', lineHeight: 1, letterSpacing: '-.04em' }}>{s.num}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(245,242,235,.28)', letterSpacing: '.1em', marginTop: '4px', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — portrait card — exact same as homepage */}
          <motion.div variants={scaleIn} initial="hidden" animate="show">
            <div style={{
              position: 'relative',
              padding: '22px',
              borderRadius: '36px',
              background: 'linear-gradient(180deg,rgba(10,10,10,.85),rgba(7,7,7,.9)),linear-gradient(135deg,rgba(200,168,108,.1),rgba(255,255,255,.02))',
              border: '1px solid rgba(255,255,255,.12)',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
            }}>
              {/* Glow */}
              <div style={{ position: 'absolute', right: '-10%', bottom: '-20%', width: '260px', height: '260px', background: 'radial-gradient(circle,rgba(200,168,108,.2),transparent 65%)', filter: 'blur(20px)', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ display: 'block', fontSize: '10px', color: 'rgba(245,242,235,.28)', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 600 }}>
                  The Operating Architect
                </span>
                {/* Portrait — same image as homepage hero */}
                <img
                  src="/portrait.jpg"
                  alt="Nitin Nahata"
                  style={{ width: '100%', height: '400px', objectFit: 'cover', objectPosition: 'center top', borderRadius: '18px', display: 'block' }}
                />
                {/* Name tag */}
                <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#86d9a2', flexShrink: 0, animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(245,242,235,.55)', letterSpacing: '.04em' }}>
                    Nitin Nahata &middot; Founder, Axion Index &amp; HROS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', background: 'rgba(7,7,7,.2)' }}>
            <span style={{ fontSize: '14px', color: 'rgba(245,242,235,.65)' }}>↓</span>
          </div>
          <span style={{ fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(245,242,235,.3)', fontWeight: 600 }}>Scroll</span>
        </div>
      </div>

      {/* ── BIOGRAPHY ────────────────────────────────────────── */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">Biography</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px', color: '#f5f2eb' }}>
                Built from inside the system.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'rgba(245,242,235,.52)', lineHeight: 1.85, marginBottom: '16px' }}>
                From corporate systems to startup chaos, the journey has been about understanding where organisations fail — and building the architecture to prevent it.
              </motion.p>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'rgba(245,242,235,.52)', lineHeight: 1.85 }}>
                Every engagement, every system, every framework at Axion Index is built from that experience.
              </motion.p>
            </div>
            <motion.div variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { num: '22+', label: 'Years in practice', desc: 'Inside India\'s most complex organisations.' },
                { num: '4',   label: 'Practice areas',    desc: 'Labour Codes, Org Design, AI Edge, Family Business.' },
                { num: '1',   label: 'Operating doctrine', desc: 'Belief → Conviction → Rhythm.' },
              ].map((s) => (
                <motion.div key={s.label} variants={scaleIn}
                  style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div className="sr" style={{ fontSize: '36px', fontWeight: 400, color: '#c8a86c', lineHeight: 1, letterSpacing: '-.04em', flexShrink: 0 }}>{s.num}</div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#f5f2eb', marginBottom: '4px', letterSpacing: '.04em' }}>{s.label}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(245,242,235,.4)', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────── */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '48px' }}>
            <div className="eyebrow">Journey</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              The path that built the system.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ position: 'relative' }}>
            {/* Animated timeline line */}
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={viewportOnce}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ position: 'absolute', left: '23px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom,#c8a86c,rgba(200,168,108,.1))', transformOrigin: 'top', zIndex: 0 }}
            />
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeLeft}
                style={{ display: 'flex', gap: '28px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.15, background: '#c8a86c', transition: { duration: 0.2 } }}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #c8a86c', background: '#070707', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: '#c8a86c', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                </motion.div>
                <motion.div
                  whileHover={{ borderColor: 'rgba(200,168,108,.3)', transition: { duration: 0.2 } }}
                  style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '16px', padding: '20px 24px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f5f2eb' }}>{item.org}</h3>
                    <span style={{ fontSize: '10px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(200,168,108,.1)', color: '#c8a86c', fontWeight: 600, letterSpacing: '.08em' }}>{item.role}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.65 }}>{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── POV ──────────────────────────────────────────────── */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Operating Architect Perspective</motion.div>
            <motion.blockquote variants={fadeUp} className="sr"
              style={{ fontSize: 'clamp(22px,3.5vw,36px)', fontWeight: 400, lineHeight: 1.45, letterSpacing: '-.02em', color: '#f5f2eb', fontStyle: 'italic', borderLeft: '2px solid #c8a86c', paddingLeft: '28px', textAlign: 'left', marginBottom: '16px' }}>
              &ldquo;I spent 22 years inside India&rsquo;s most complex organisations. Every intervention focused on people. None of them fixed the rhythm. That was the problem I had to solve.&rdquo;
            </motion.blockquote>
            <motion.p variants={fadeUp} style={{ fontSize: '12px', color: 'rgba(245,242,235,.28)', paddingLeft: '28px', letterSpacing: '.04em', textAlign: 'left' }}>
              &mdash; Nitin Nahata, Founder &middot; Axion Index &amp; HROS
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── SPEAKING ─────────────────────────────────────────── */}
      <div className="sec" style={{ background: '#070707' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '40px' }}>
            <div className="eyebrow">Speaking &amp; Advisory</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
              Keynotes, advisory sessions,<br />and thought leadership.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px', marginBottom: '40px' }}>
            {speaking.map((s, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -6, borderColor: 'rgba(200,168,108,.3)', boxShadow: '0 20px 48px rgba(200,168,108,.07)', transition: { duration: 0.22 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '20px', padding: '28px', cursor: 'default' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f5f2eb', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(245,242,235,.45)', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <Link href="/connect" className="bp">Connect with Nitin &rarr;</Link>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/about-us', 'About Us'], ['/expertise', 'Expertise'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
      </footer>
    </div>
  );
}
