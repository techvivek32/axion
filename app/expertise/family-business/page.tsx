'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import NavBar from '@/components/NavBar';

/* ── Legacy Tokens ───────────────────────────────────── */
const BG    = '#050505';
const BG2   = '#080808';
const PANEL = 'rgba(255,255,255,0.02)';
const TEXT  = '#ffffff';
const MUTED = 'rgba(255,255,255,0.5)';
const SOFT  = 'rgba(255,255,255,0.2)';
const LINE  = 'rgba(255,255,255,0.06)';
const GOLD  = '#ffffff';
const ACCENT = '#ffffff';

const VP = { once: false, margin: '-100px' };

/* ── Background: Institutional Grid ──────────────────── */
function LegacyBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Subtle classical texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 80%)',
        opacity: 0.5
      }} />
      
      {/* Blueprint lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
        opacity: 0.3
      }} />

      {/* Elegant border */}
      <div style={{ position: 'absolute', inset: '40px', border: '1px solid ' + SOFT, opacity: 0.2 }} />
    </div>
  );
}

/* ── Component: TiltCard ──────────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Component: Eyebrow ──────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VP}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '10px',
        fontWeight: 800,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: ACCENT,
        marginBottom: '32px'
      }}
    >
      <div style={{ width: '32px', height: '1px', background: ACCENT }} />
      {label}
    </motion.div>
  );
}

/* ── Data ────────────────────────────────────────────── */
const architectures = [
  { num: 'I', name: 'Authority', def: 'Who decides, who escalates, who resolves.', q: 'Can every person in your organisation name who decides what — without asking?', fail: 'Founder-centric bottleneck.', detail: 'Authority architecture defines the decision rights map. Without it, every significant decision routes back to the founder — creating a bottleneck that compounds as the organisation scales. The failure is not the founder\'s capability. It is the absence of a designed system for distributing authority across generations.' },
  { num: 'II', name: 'Leadership', def: 'Family vs professional leadership roles.', q: 'Are family roles defined by capability or by birthright?', fail: 'Role confusion.', detail: 'Leadership architecture separates the family system from the professional system. When family members hold roles by default rather than by design, the organisation cannot attract or retain professional talent. The failure mode is not nepotism — it is the absence of a clear framework for how family and professional leadership coexist.' },
  { num: 'III', name: 'Governance', def: 'The daily operating system.', q: 'Does your board meet to govern — or to ratify decisions already made?', fail: 'Board exists only on paper.', detail: 'Governance architecture is the operating system of the institution. Most family businesses have governance structures that exist on paper but do not function in practice. The board meets to ratify, not to govern. The result is that the institution has no mechanism for self-correction when the operating model drifts.' },
  { num: 'IV', name: 'Succession', def: 'System, not event.', q: 'Is your succession plan a document — or a running system?', fail: 'Transition shock.', detail: 'Succession architecture treats transition as a continuous system, not a one-time event. Most family businesses treat succession as something that happens when the founder retires or dies. By then, the architecture for transition has not been built. The result is transition shock — a period of instability that destroys value and talent simultaneously.' },
  { num: 'V', name: 'Capabilities', def: 'Uncrossable competitive strengths.', q: 'What does your family business do that a PE-backed competitor cannot replicate?', fail: 'Commodity business.', detail: 'Capabilities architecture identifies and codifies the competitive strengths that are unique to the family enterprise — patient capital, long-term relationships, institutional memory, brand trust. Without this architecture, the family business competes on the same terms as any other business and loses its structural advantage.' },
];

const caseData = [
  { gen: 'Generation 1 → 2', pct: '30%', note: 'survive the transition' },
  { gen: 'Generation 2 → 3', pct: '12%', note: 'survive to the third generation' },
  { gen: 'Generation 3 → 4', pct: '3%', note: 'reach the fourth generation intact' },
];

/* ══════════════════════════════════════════════════════
   PAGE: FAMILY BUSINESS
══════════════════════════════════════════════════════ */
export default function FamilyBusiness() {
  const [activeArch, setActiveArch] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* Progress Line */}
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#fff', scaleX: progress, transformOrigin: '0%', zIndex: 1000, mixBlendMode: 'difference' }} />

      {/* SECTION 6.1 - HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '0 56px', overflow: 'hidden' }}>
        <LegacyBackground />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <Eyebrow label="Family Business Architecture" />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(44px, 7vw, 92px)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.05em', marginBottom: '40px' }}
            >
              Longevity is not inherited. It is designed.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: '1px', background: ACCENT, width: '120px', originX: 0, marginBottom: '40px' }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <p style={{ fontSize: '20px', color: TEXT, lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic', fontWeight: 300 }}>
                Family businesses do not fail because markets shift. They fail because architecture does not evolve across generations.
              </p>
              <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, maxWidth: '560px', marginBottom: '48px' }}>
                Most family enterprises scale revenue before they scale structure. The result is an institution that grows in size but not in durability — dependent on the founder&rsquo;s presence, vulnerable to transition, and unable to compound across generations.
              </p>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a href="#architectures" className="legacy-btn-fill">Design the Succession Architecture</a>
                <Link href="/connect" className="legacy-btn-outline">Request a Family Diagnostic</Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(140px, 20vw, 280px)', fontWeight: 400, color: 'rgba(255,255,255,0.05)', lineHeight: 1, userSelect: 'none' }}>V</span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6.2 - FIVE ARCHITECTURES */}
      <section id="architectures" style={{ background: BG2, padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Institutional Framework" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', marginBottom: '100px', alignItems: 'flex-end' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Five architectures.<br />One outcome — longevity.
            </h2>
            <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.6, maxWidth: '500px' }}>
              Each architecture addresses a distinct failure mode. Together they define whether the institution survives the founder.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: LINE }}>
            {architectures.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ background: BG2, borderLeft: activeArch === i ? '4px solid #fff' : '0px solid #fff', transition: 'all 0.3s ease' }}
              >
                <div
                  onClick={() => setActiveArch(activeArch === i ? null : i)}
                  style={{ padding: '48px 40px', cursor: 'pointer', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '40px', alignItems: 'center' }}
                >
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '40px', color: SOFT }}>{a.num}</span>
                  <div>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>{a.name}</h3>
                    <p style={{ fontSize: '16px', color: MUTED, margin: 0 }}>{a.def}</p>
                  </div>
                  <motion.div animate={{ rotate: activeArch === i ? 45 : 0 }} style={{ fontSize: '24px' }}>+</motion.div>
                </div>

                <AnimatePresence>
                  {activeArch === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 40px 48px 120px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>[ DIAGNOSTIC ]</div>
                          <p style={{ fontSize: '18px', color: TEXT, lineHeight: 1.5, marginBottom: '32px', fontStyle: 'italic' }}>&ldquo;{a.q}&rdquo;</p>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>[ EXPLANATION ]</div>
                          <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8 }}>{a.detail}</p>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '40px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>[ FAILURE MODE ]</div>
                          <p style={{ fontSize: '20px', color: TEXT, fontWeight: 500 }}>{a.fail}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6.3 - FRAMEWORK EXPLANATION */}
      <section style={{ padding: '160px 56px', background: BG, position: 'relative', overflow: 'hidden' }}>
        <LegacyBackground />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div>
              <Eyebrow label="System Logic" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 400, lineHeight: 1.1, marginBottom: '32px' }}>
                Five architectures operate as a system.
              </h2>
              <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.8 }}>
                These are not independent pillars. Each architecture depends on the others. Authority without governance is arbitrary. Succession without leadership architecture is destabilising. Capabilities without governance are unprotected. The system only holds when all five are designed together.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {architectures.map((a, i) => (
                <motion.div
                  key={a.num}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  style={{ background: PANEL, border: '1px solid ' + LINE, padding: '32px', textAlign: 'center' }}
                >
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: SOFT, marginBottom: '8px' }}>{a.num}</div>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>{a.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6.4 - CASE LOGIC */}
      <section id="case" style={{ background: BG2, padding: '160px 56px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Evidence" />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '80px' }}>
            Why most family businesses fail across generations.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: LINE }}>
            {caseData.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 2fr', gap: '40px', alignItems: 'center', background: BG2, padding: '40px' }}
              >
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{c.gen}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '64px', fontWeight: 400, color: ACCENT, lineHeight: 1 }}>{c.pct}</div>
                <div style={{ fontSize: '16px', color: MUTED, fontStyle: 'italic' }}>{c.note}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP}
            style={{ marginTop: '40px', padding: '32px', border: '1px solid ' + LINE, background: 'rgba(255,255,255,0.01)' }}
          >
            <p style={{ fontSize: '14px', color: SOFT, lineHeight: 1.7, margin: 0 }}>
              Source: Family Business Institute; McKinsey Global Institute; Harvard Business Review longitudinal studies on family enterprise succession. The pattern is consistent: the failure is not capability. It is architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6.5 - CTA */}
      <section id="cta" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative', background: '#000' }}>
        <LegacyBackground />
        <div style={{ maxWidth: '1000px', zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em', color: TEXT, fontStyle: 'italic', marginBottom: '60px' }}
          >
            &ldquo;Governance is not a handover plan. It is a structured transition that preserves what was built and creates what comes next.&rdquo;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Link href="/connect" className="legacy-btn-fill">Request a Succession Architecture Diagnostic</Link>
            <Link href="/founder" className="legacy-btn-outline">Speak with the Founder</Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 56px', borderTop: '1px solid ' + LINE, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000' }}>
        <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.1em' }}>© 2026 AXION INDEX</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[['/', 'HOME'], ['/about', 'ABOUT'], ['/founder', 'FOUNDER'], ['/connect', 'CONNECT']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.15em' }}>{label}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        .legacy-btn-fill {
          display: inline-block;
          padding: 16px 40px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .legacy-btn-fill:hover {
          background: #eee;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }
        .legacy-btn-outline {
          display: inline-block;
          padding: 16px 40px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .legacy-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          #hero > div { grid-template-columns: 1fr !important; text-align: center; }
          #hero > div > div:last-child { display: none !important; }
          #architectures > div > div:last-child { padding: 0 !important; }
          #framework > div > div { grid-template-columns: 1fr !important; gap: 60px !important; }
          #case > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
