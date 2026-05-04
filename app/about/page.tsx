'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import NavBar from '@/components/NavBar';

/* Animated floating dots background */
function FloatingDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const dots = Array.from({ length: 40 }, () => {
      const dot = document.createElement('div');
      const size = Math.random() * 8 + 3;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 2;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        box-shadow: 0 0 ${size * 2}px rgba(255,255,255,0.4);
        animation: float ${duration}s ease-in-out ${delay}s infinite;
      `;
      container.appendChild(dot);
      return dot;
    });
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
        25% { transform: translateY(-30px) translateX(20px); opacity: 0.6; }
        50% { transform: translateY(-60px) translateX(-20px); opacity: 0.8; }
        75% { transform: translateY(-30px) translateX(30px); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      dots.forEach(dot => dot.remove());
      style.remove();
    };
  }, []);
  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}

/* -- Motion variants -- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (d = 0.15) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});
const lineGrowY = {
  hidden: { scaleY: 0, originY: 0 },
  show:   { scaleY: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};
const lineGrowX = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const VP = { once: false, margin: '-60px' };

/* ── Color tokens — monochrome palette ───────────────── */
const BG       = '#080808';
const BG2      = '#121212';
const PANEL    = '#1a1a1a';
const PANEL2   = '#222222';
const TEXT     = '#ffffff';
const MUTED    = 'rgba(255,255,255,.6)';
const SOFT     = 'rgba(255,255,255,.35)';
const LINE     = 'rgba(255,255,255,.08)';
const LINE_STR = 'rgba(255,255,255,.15)';
const GOLD     = '#ffffff';
const GOLDB    = '#cccccc';

/* ── Word-by-word headline ────────────────────────────── */
function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={{ display: 'inline', ...style }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          variants={fadeUp}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Eyebrow ──────────────────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={VP}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: GOLD, marginBottom: '20px',
      }}
    >
      <span style={{ width: '24px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function About() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif' }}>
      <NavBar />

      {/* ── 2.1 GENESIS ─────────────────────────────── */}
      <section id="genesis" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '120px 56px', position: 'relative', overflow: 'hidden', minHeight: '600px' }}>
        {/* Floating dots background */}
        <FloatingDots />
        {/* Subtle radial glow */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,.03), transparent 60%)', zIndex: 0 }}
        />
        {/* Left gold rule */}
        <motion.div
          variants={lineGrowY}
          initial="hidden"
          whileInView="show"
          viewport={VP}
          style={{ position: 'absolute', left: '56px', top: '80px', bottom: '80px', width: '2px', background: GOLD, zIndex: 1 }}
        />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Eyebrow label="Genesis" />
          <h2 style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 'clamp(28px,4vw,52px)',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            color: TEXT,
            marginBottom: '28px',
          }}>
            <WordReveal text="Axion Index exists to codify what individual intellect cannot." />
          </h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ fontSize: '16px', color: MUTED, lineHeight: 1.9 }}
          >
            The work is pattern-codification — converting individual intellect into institutional structure. The patterns that scale organisations are not invisible. They are uncodified.
          </motion.p>
        </div>
      </section>

      {/* ── 2.2 THE GAP ─────────────────────────────── */}
      <section id="gap" style={{ background: BG2, borderBottom: `1px solid ${LINE}`, padding: '96px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
          <div>
            <Eyebrow label="The Gap" />
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={VP}
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 'clamp(22px,3vw,38px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: TEXT,
              }}
            >
              HR&rsquo;s biggest historical failure has been dependence on individual intellect.
            </motion.h2>
          </div>

          <motion.div
            variants={stagger(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ position: 'relative', paddingLeft: '24px' }}
          >
            {/* Animated left border */}
            <motion.div
              variants={lineGrowY}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: GOLD }}
            />
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '15px', color: MUTED, lineHeight: 1.88,
                marginBottom: '20px',
                background: PANEL, padding: '22px 24px',
                borderTop: `1px solid ${LINE}`,
              }}
            >
              HR has historically depended on the right person, in the right role, making the right judgment in the moment. When that person leaves, the architecture collapses. Axion Index makes the patterns explicit, transferable, and institutional, so the architecture survives the person.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '15px', color: MUTED, lineHeight: 1.88,
                background: PANEL, padding: '22px 24px',
                borderTop: `1px solid ${LINE}`,
              }}
            >
              Most organisations under-invest in the choices that look small in the moment and decide everything afterwards. By the time the cost shows, the architecture has already drifted.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2.3 WHAT WE DO ──────────────────────────── */}
      <section id="what" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="What We Do" />
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(28px,4vw,52px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: TEXT,
              marginBottom: '48px',
            }}
          >
            Diagnose. Codify. Redesign. Operate.
          </motion.h2>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}
          >
            {[
              { no: '01', verb: 'Diagnose',  body: 'Surface where the architecture has drifted before the cost becomes visible.' },
              { no: '02', verb: 'Codify',    body: 'Convert observed patterns into transferable frameworks — BCR, 3i, Five Architectures, Four Actors.' },
              { no: '03', verb: 'Redesign',  body: 'Install the architecture the operating model actually needs.' },
              { no: '04', verb: 'Operate',   body: 'Keep the redesign alive through HROS, the operating system layer.' },
            ].map((item) => (
              <motion.div
                key={item.no}
                variants={fadeUp}
                whileHover={{
                  scale: 1.03,
                  borderColor: GOLD,
                  boxShadow: `0 12px 40px rgba(255,255,255,.06)`,
                  transition: { duration: 0.2 },
                }}
                style={{
                  background: PANEL,
                  border: `1px solid ${LINE}`,
                  padding: '28px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Top gold shimmer */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent)` }} />
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: SOFT, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '1px', background: GOLD, flexShrink: 0 }} />
                  {item.no}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: '20px', fontWeight: 400,
                  color: TEXT, marginBottom: '10px', letterSpacing: '-0.02em',
                }}>
                  {item.verb}
                </h3>
                <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.75 }}>{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2.4 WHAT THIS MEANS ─────────────────────── */}
      <section id="you" style={{ background: BG2, borderBottom: `1px solid ${LINE}`, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="What This Means" />
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}
          >
            {[
              { role: 'Founder / CEO', body: 'See where the organisation will break before it does.' },
              { role: 'CFO',           body: 'Read workforce as cost, risk, and control architecture — not headcount.' },
              { role: 'CHRO',          body: 'Move from program ownership to system architecture.' },
            ].map((item) => (
              <motion.div
                key={item.role}
                variants={scaleUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                style={{
                  background: PANEL,
                  border: `1px solid ${LINE}`,
                  padding: '32px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
              >
                {/* Gold underline grows on hover */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '2px', background: GOLD, transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                />
                <div style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: GOLD, marginBottom: '14px',
                  fontFamily: 'monospace',
                }}>
                  {item.role}
                </div>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.82 }}>{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2.5 HOW WE HOLD TOGETHER ────────────────── */}
      <section id="how" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="How We Hold Together" />

          {/* BCR flow diagram */}
          <motion.div
            variants={stagger(0.18)}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '0' }}
          >
            {['Belief', 'Conviction', 'Rhythm'].map((node, i) => (
              <div key={node} style={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  variants={scaleUp}
                  whileHover={{ borderColor: GOLDB, transition: { duration: 0.2 } }}
                  style={{
                    padding: '18px 28px',
                    border: `1px solid rgba(255,255,255,.12)`,
                    background: PANEL,
                    textAlign: 'center',
                    minWidth: '140px',
                  }}
                >
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: SOFT, marginBottom: '6px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '20px', fontWeight: 400, color: TEXT }}>
                    {node}
                  </div>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    variants={lineGrowX}
                    style={{ width: '48px', height: '1px', background: GOLD, flexShrink: 0 }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Body text */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ fontSize: '15px', color: MUTED, lineHeight: 1.88, maxWidth: '640px', marginBottom: '40px' }}
          >
            Every engagement diagnoses where you are stuck in one sequence: Belief &rarr; Conviction &rarr; Rhythm. The platform itself stands on three layers — the founder&rsquo;s thinking, Axion Index as the codification platform, HROS as the operating system being built on top.
          </motion.p>

          {/* 3-layer stack */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '640px' }}
          >
            {[
              { label: 'Layer 01', name: "Founder's Thinking",  desc: 'The intellectual foundation — frameworks, doctrine, pattern library.' },
              { label: 'Layer 02', name: 'Axion Index',          desc: 'The codification platform — where patterns become transferable architecture.' },
              { label: 'Layer 03', name: 'HROS',                 desc: 'The operating system — where architecture becomes live infrastructure.' },
            ].map((layer) => (
              <motion.div
                key={layer.label}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '24px',
                  alignItems: 'center',
                  background: PANEL,
                  padding: '20px 24px',
                  borderLeft: `3px solid ${GOLD}`,
                  borderTop: `1px solid ${LINE}`,
                }}
              >
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>{layer.label}</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: TEXT, marginBottom: '3px' }}>{layer.name}</div>
                  <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.65 }}>{layer.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2.6 CLOSING ─────────────────────────────── */}
      <section id="close" style={{ background: BG2, padding: '160px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,.02), transparent 60%)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 'clamp(36px,6vw,64px)',
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: GOLD,
              textShadow: `0 0 80px rgba(255,255,255,.08)`,
              marginBottom: '40px',
            }}
          >
            From ambiguity to architecture.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link
              href="/founder"
              style={{
                display: 'inline-block',
                padding: '11px 26px',
                background: GOLD,
                color: '#080808',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.04em',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'background .2s, transform .18s, box-shadow .2s',
                boxShadow: '0 12px 40px rgba(255,255,255,.1)',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = GOLDB; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Meet the Founder
            </Link>
            <Link
              href="/connect"
              style={{
                display: 'inline-block',
                padding: '11px 26px',
                background: GOLD,
                color: '#080808',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.04em',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'background .2s, transform .18s, box-shadow .2s',
                boxShadow: '0 12px 40px rgba(255,255,255,.1)',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = GOLDB; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Book a Diagnostic &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(5,5,4,.98)', padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${LINE}`, flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/founder', 'Founder'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT }}>{label}</Link>
          ))}
        </div>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #gap > div, #how > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #what > div > div:last-child { grid-template-columns: repeat(2,1fr) !important; }
          #you > div > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          #genesis, #gap, #what, #you, #how { padding: 64px 20px !important; }
          #close { padding: 96px 20px !important; }
          #what > div > div:last-child { grid-template-columns: 1fr !important; }
          footer { padding: 20px !important; flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
