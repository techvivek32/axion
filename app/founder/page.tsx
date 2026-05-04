'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import NavBar from '@/components/NavBar';

/* ── 3D Background Grid ───────────────────────────────── */
function Scene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, perspective: '1000px', overflow: 'hidden', pointerEvents: 'none' }}>
      <div 
        style={{ 
          position: 'absolute', 
          inset: '-100%', 
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
          backgroundSize: '40px 40px',
          transform: 'rotateX(60deg) translateY(-20%)',
          opacity: 0.3
        }} 
      />
      {mounted && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
              animate={{ y: [null, "-10%"], opacity: [0, 0.2, 0] }}
              transition={{ duration: Math.random() * 5 + 10, repeat: Infinity, delay: Math.random() * 5 }}
              style={{ position: 'absolute', width: '2px', height: '2px', background: '#fff', borderRadius: '50%' }}
            />
          ))}
        </div>
      )}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)' 
        }} 
      />
    </div>
  );
}

/* ── 3D Card Wrapper ──────────────────────────────────── */
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Motion variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show:   { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show:   { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = (d = 0.15) => ({
  hidden: {},
  show:   { transition: { staggerChildren: d } },
});
const lineGrowX = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const VP = { once: false, margin: '-100px' };

/* ── Homepage color tokens ────────────────────────────── */
const BG    = '#050505';
const BG2   = '#0a0a0a';
const PANEL = 'rgba(255,255,255,0.03)';
const TEXT  = '#ffffff';
const MUTED = 'rgba(255,255,255,0.5)';
const SOFT  = 'rgba(255,255,255,0.25)';
const LINE  = 'rgba(255,255,255,0.08)';
const GOLD  = '#ffffff';

/* ── Eyebrow ──────────────────────────────────────────── */
function Eyebrow({ label }: { label: string }) {
  return (
    <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, marginBottom: '24px' }}>
      <span style={{ width: '32px', height: '1px', background: GOLD, flexShrink: 0 }} />
      {label}
    </motion.div>
  );
}

/* ── Word-by-word reveal ──────────────────────────────── */
function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <motion.span variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={VP}
      style={{ display: 'inline', ...style }}>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} variants={fadeUp} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    // Scroll progress bar
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:#ffffff;z-index:9999;transform-origin:left;width:100%;transform:scaleX(0);transition:transform 0.1s linear;mix-blend-mode:difference;';
    document.body.appendChild(bar);

    const handleScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.transform = `scaleX(${s / h})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (document.body.contains(bar)) document.body.removeChild(bar);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ background: BG, minHeight: '100vh', color: TEXT, fontFamily: 'Inter,-apple-system,sans-serif', overflowX: 'hidden' }}>
      <NavBar />

      {/* ── 3.1 HERO SECTION ───────────────────────── */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 56px' }}>
        <Scene3D />
        
        <motion.div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center', zIndex: 1, scale, opacity }}>
          <div>
            <Eyebrow label="Founder" />
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.05em', marginBottom: '40px' }}>
              <WordReveal text="Nitin Nahata converts intellect into architecture." />
            </h1>
            <motion.div variants={lineGrowX} initial="hidden" animate="show" style={{ width: '120px', height: '2px', background: GOLD, marginBottom: '40px' }} />
            <motion.p variants={fadeUp} initial="hidden" animate="show" style={{ fontSize: '20px', color: MUTED, lineHeight: 1.6, maxWidth: '500px' }}>
              The practitioner whose work codified the patterns Axion Index now deploys.
            </motion.p>
          </div>

          <TiltCard>
            <div style={{ position: 'relative', aspectRatio: '3/4', background: '#111', border: `1px solid ${LINE}`, overflow: 'hidden' }}>
              <img src="/portrait.jpg" alt="Nitin Nahata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505 0%, transparent 40%)' }} />
            </div>
          </TiltCard>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* ── 3.2 THE INSIGHT ────────────────────────── */}
      <section style={{ padding: '200px 56px', background: BG2, position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow label="Core Thesis" />
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em', fontStyle: 'italic', margin: 0 }}
          >
            &ldquo;Most failures are not strategy failures. They are <span style={{ color: GOLD }}>people-system failures</span> that happen silently, long before anyone notices.&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ── 3.3 CAREER ARC ──────────────────────────── */}
      <section style={{ padding: '160px 56px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <Eyebrow label="Career Arc" />
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em' }}>Twenty-two years inside.</h2>
            </div>
            <p style={{ fontSize: '16px', color: MUTED, maxWidth: '400px', marginBottom: '10px' }}>
              Four institutions. Each taught what the doctrine had to absorb.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {arc.map((item, i) => (
              <motion.div
                key={item.org}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VP}
                whileHover={{ y: -10 }}
                style={{ 
                  background: PANEL, 
                  padding: '48px', 
                  border: `1px solid ${LINE}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: SOFT, letterSpacing: '0.2em' }}>{item.year}</span>
                  <div style={{ width: '40px', height: '1px', background: LINE }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 400 }}>{item.org}</h3>
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, flex: 1 }}>{item.scope}</p>
                <div style={{ paddingTop: '24px', borderTop: `1px solid ${LINE}` }}>
                  <p style={{ fontSize: '14px', color: GOLD, fontStyle: 'italic', fontWeight: 500 }}>
                    &ldquo;{item.codified}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.4 CODIFICATION ────────────────────────── */}
      <section style={{ padding: '160px 56px', background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Eyebrow label="Codification" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', fontWeight: 400, lineHeight: 1.1 }}>
              The patterns that survived 22 years of collisions.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {codified.map((row) => (
                <motion.div 
                  key={row.no}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={VP}
                  style={{ display: 'flex', gap: '32px' }}
                >
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '24px', color: SOFT }}>{row.no}</span>
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>{row.title}</h4>
                    <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.6 }}>{row.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3.5 FINAL THESIS ────────────────────────── */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 56px', position: 'relative' }}>
        <Scene3D />
        <div style={{ maxWidth: '900px', zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.2, fontStyle: 'italic', color: GOLD }}
          >
            &ldquo;I architect order before scale demands it. The work is to make the patterns survive the person.&rdquo;
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ delay: 0.5 }}
            style={{ marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <Link href="/about" className="btn-premium">About Axion Index</Link>
            <Link href="/connect" className="btn-outline">Start Conversation</Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 56px', borderTop: `1px solid ${LINE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000' }}>
        <span style={{ fontSize: '11px', color: SOFT, letterSpacing: '0.1em' }}>© 2026 AXION INDEX</span>
        <div style={{ display: 'flex', gap: '32px' }}>
          {[['/', 'HOME'], ['/about', 'ABOUT'], ['/connect', 'CONNECT']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: SOFT, textDecoration: 'none', letterSpacing: '0.15em' }}>{label}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        .btn-premium {
          display: inline-block;
          padding: 16px 40px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .btn-premium:hover {
          background: #eee;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.1);
        }
        .btn-outline {
          display: inline-block;
          padding: 16px 40px;
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          section { padding: 100px 24px !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .arc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

