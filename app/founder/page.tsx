'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';

/* ── Motion variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger = (d = 0.15) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});
const lineGrowY = {
  hidden: { scaleY: 0, originY: 0 },
  show:   { scaleY: 1, transition: { duration: 1, ease: 'easeOut' } },
};
const numScale = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const VP = { once: false, margin: '-60px' };

/* ── Homepage color tokens ────────────────────────────── */
const BG    = '#080706';
const BG2   = '#0d0c0b';
const PANEL = '#171717';
const TEXT  = '#f5f2eb';
const MUTED = 'rgba(210,205,195,.62)';
const SOFT  = 'rgba(210,205,195,.38)';
const LINE  = 'rgba(255,255,255,.06)';
const GOLD  = '#c8a86c';
const GOLDB = '#e5c385';
const RUST  = '#8C3B28';

/* ── Eyebrow ──────────────────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, marginBottom: '20px' }}>
      <span style={{ width: '24px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

/* ── Word-by-word reveal ──────────────────────────────── */
function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span variants={stagger(0.04)} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline', ...style }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.28em' }}>{w}</motion.span>
      ))}
    </motion.span>
  );
}

/* ── Career cards ─────────────────────────────────────── */
const arc = [
  {
    org:   'Standard Chartered',
    year:  'Early career',
    scope: 'Built rewards architecture across a 700-to-10,000 scaled operation.',
    codified: 'Data is how HR earns authority, not how it gets ignored.',
  },
  {
    org:   'Tata Global Beverages',
    year:  'Decade',
    scope: 'Institutional architecture across three heritage brands and joint ventures with Starbucks and PepsiCo. London-to-Mumbai global HQ relocation. Completed at 95%+ retention.',
    codified: 'Institutional architecture survives geography.',
  },
  {
    org:   'Udaan',
    year:  'Hypergrowth',
    scope: 'Scaled people architecture from 800 to over 4,000 on-roll across 22 languages and 28 states. COVID-classified as essential government infrastructure. Manning held at 95% with no productivity loss.',
    codified: 'Hypergrowth without architectural debt.',
  },
  {
    org:   'Gameskraft',
    year:  'Existential',
    scope: 'Built the operating system from nine people managing event logistics into a full institution. Navigated a 28% retroactive GST shock and state-level bans. 27% of roles impacted by strategy change. 97.1% top-performer retention. Zero involuntary layoffs.',
    codified: 'Architecture survives existential pressure.',
  },
];

/* ── Codified rows ────────────────────────────────────── */
const codified = [
  {
    no: '01',
    title: 'The BCR Framework',
    desc: 'Belief → Conviction → Rhythm. The signature methodology.',
  },
  {
    no: '02',
    title: 'Four practice doctrines',
    desc: 'Labour Codes (3i), AI Edge Lab (Four Actors / Three Laws / E.D.G.E.), People Architecture (BCR + Four Surfaces), Family Business (Five Architectures).',
  },
  {
    no: '03',
    title: 'Two forthcoming books',
    desc: 'Baptism by Chaos (with Penguin under review) and The Operating Architect.',
  },
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Founder() {
  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif' }}>
      <NavBar />

      {/* ── 3.1 POSITIONING LINE ────────────────────── */}
      <section id="position" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '120px 56px', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(200,168,108,.05), transparent 60%)', zIndex: 0 }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* Portrait */}
          <motion.div variants={scaleUp} initial="hidden" animate="show"
            style={{ aspectRatio: '3/4', background: PANEL, border: `1px solid ${LINE}`, overflow: 'hidden', position: 'relative' }}>
            <img src="/portrait.jpg" alt="Nitin Nahata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            {/* Gold shimmer top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,rgba(200,168,108,.5),transparent)` }} />
          </motion.div>

          {/* Text */}
          <div>
            <Eyebrow label="Founder" />
            <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.04em', color: TEXT, marginBottom: '28px' }}>
              <WordReveal text="Nitin Nahata is the Operating Architect — the practitioner whose work codified the patterns Axion Index now deploys." />
            </h1>
            {/* Gold underline */}
            <motion.div variants={lineGrowY} initial="hidden" whileInView="show" viewport={VP}
              style={{ width: '60px', height: '2px', background: GOLD, transformOrigin: 'top' }} />
          </div>
        </div>
      </section>

      {/* ── 3.2 DEFINING INSIGHT ────────────────────── */}
      <section id="insight" style={{ background: BG2, borderBottom: `1px solid ${LINE}`, padding: '96px 56px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={VP}
            style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Rust left border */}
            <motion.div variants={lineGrowY}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: RUST }} />
            <motion.blockquote variants={fadeUp}
              style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 400, lineHeight: 1.45, letterSpacing: '-0.02em', color: TEXT, fontStyle: 'italic', margin: 0 }}>
              &ldquo;Most failures are not strategy failures. They are people-system failures that happen silently, long before anyone notices. By the time they show up as attrition or culture issues, the damage is already structural.&rdquo;
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── 3.3 CAREER ARC ──────────────────────────── */}
      <section id="arc" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="Career Arc" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '12px' }}>
            Twenty-two years inside the systems beneath organisations.
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '56px', maxWidth: '640px' }}>
            Four institutions. Each carrying weight not because it is complete, but because it teaches what the doctrine had to absorb.
          </motion.p>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Animated vertical line */}
            <motion.div variants={lineGrowY} initial="hidden" whileInView="show" viewport={VP}
              style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: RUST }} />

            <motion.div variants={stagger(0.2)} initial="hidden" whileInView="show" viewport={VP}
              style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {arc.map((item, i) => (
                <motion.div key={item.org} variants={slideLeft}
                  whileHover={{ y: -5, borderColor: `rgba(200,168,108,.3)`, transition: { duration: 0.2 } }}
                  style={{ background: PANEL, border: `1px solid ${LINE}`, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                  {/* Top shimmer */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,rgba(200,168,108,.3),transparent)` }} />
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '-37px', top: '36px', width: '10px', height: '10px', borderRadius: '50%', background: RUST, border: `2px solid ${BG}` }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 400, color: TEXT, letterSpacing: '-0.03em', margin: 0 }}>
                      {item.org}
                    </h3>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SOFT, paddingTop: '6px' }}>
                      {item.year}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.8, marginBottom: '14px' }}>{item.scope}</p>
                  <p style={{ fontSize: '13px', color: GOLD, fontStyle: 'italic', lineHeight: 1.6 }}>
                    {item.codified}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3.4 WHAT GOT CODIFIED ───────────────────── */}
      <section id="codified" style={{ background: BG2, borderBottom: `1px solid ${LINE}`, padding: '96px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Eyebrow label="What Got Codified" />
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={VP}
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.04em', color: TEXT, marginBottom: '48px', maxWidth: '720px' }}>
            The patterns that survived 22 years of collisions are now the doctrine Axion Index deploys.
          </motion.h2>

          <motion.div variants={stagger(0.18)} initial="hidden" whileInView="show" viewport={VP}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {codified.map((row, i) => (
              <motion.div key={row.no} variants={fadeUp}
                style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '28px', alignItems: 'start', background: PANEL, padding: '28px 24px', borderTop: `1px solid ${LINE}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,rgba(200,168,108,.25),transparent)` }} />
                <motion.div variants={numScale}
                  style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '40px', fontWeight: 400, color: `rgba(200,168,108,.35)`, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {row.no}
                </motion.div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: TEXT, marginBottom: '6px', letterSpacing: '-0.01em' }}>{row.title}</div>
                  <div style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75 }}>{row.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3.5 THESIS ──────────────────────────────── */}
      <section id="thesis" style={{ background: BG, borderBottom: `1px solid ${LINE}`, padding: '120px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(200,168,108,.06), transparent 60%)', zIndex: 0 }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.03em', color: TEXT, fontStyle: 'italic', textShadow: `0 0 80px rgba(200,168,108,.15)` }}>
            &ldquo;I architect order before scale demands it. The work is to make the patterns survive the person.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── 3.6 CLOSING ─────────────────────────────── */}
      <section id="sign" style={{ background: BG2, padding: '80px 56px', textAlign: 'center', borderBottom: `1px solid ${LINE}` }}>
        <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', color: SOFT }}>
            — Nitin Nahata, Founder · Axion Index
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VP}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}
        >
          <Link href="/about"
            style={{ display: 'inline-block', padding: '11px 26px', background: '#c8a86c', color: '#2a1800', fontSize: '13px', fontWeight: 600, letterSpacing: '.04em', borderRadius: '999px', textDecoration: 'none', transition: 'background .2s,transform .18s', boxShadow: '0 12px 40px rgba(200,168,108,.3)', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#e5c385'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#c8a86c'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Read About Axion Index
          </Link>
          <Link href="/connect"
            style={{ display: 'inline-block', padding: '11px 26px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(210,205,195,.62)', fontSize: '13px', fontWeight: 500, letterSpacing: '.04em', borderRadius: '999px', textDecoration: 'none', transition: 'border-color .2s,color .2s,transform .18s', whiteSpace: 'nowrap' }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#c8a86c'; e.currentTarget.style.color = '#c8a86c'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.color = 'rgba(210,205,195,.62)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Start a Conversation
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(5,5,4,.98)', padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${LINE}`, flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: SOFT, letterSpacing: '0.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/connect', 'Connect']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT }}>{label}</Link>
          ))}
        </div>
      </footer>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1024px) {
          #position > div > div:first-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          #position, #insight, #arc, #codified, #thesis { padding: 64px 20px !important; }
          #sign { padding: 56px 20px !important; }
          #position > div > div { grid-template-columns: 1fr !important; gap: 32px !important; }
          #arc > div > div:last-child { padding-left: 20px !important; }
          footer { padding: 20px !important; flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}
