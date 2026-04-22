'use client';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const pillars = [
  { no: '01', name: 'Authority',    desc: 'Who holds decision rights across generations. Mapping authority structures that survive transition.' },
  { no: '02', name: 'Leadership',   desc: 'Developing the next generation as operating architects — not just successors.' },
  { no: '03', name: 'Governance',   desc: 'Boards, councils, and accountability structures that hold the institution together.' },
  { no: '04', name: 'Succession',   desc: 'Succession as an operating architecture problem — not a family dynamics one.' },
  { no: '05', name: 'Continuity',   desc: 'The systems, rhythms, and beliefs that carry the institution forward when leadership changes.' },
];

export default function FamilyBusiness() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="sec" style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(200,168,108,.1), transparent 65%)', zIndex: 0 }} />
        <div className="inner" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow">Family Business</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '28px', maxWidth: '820px' }}>
              Legacy Without Structure<br />Does Not Survive Scale.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '19px', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.85 }}>
              Family businesses are built on trust. But scale requires structure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <motion.div variants={fadeLeft} className="eyebrow">The Story</motion.div>
              <motion.h2 variants={fadeLeft} className="sr" style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '20px' }}>
                Legacy is not enough.<br />Structure is what survives.
              </motion.h2>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                Most family businesses are built on the founder&rsquo;s energy. That energy is real. But it is not transferable without architecture.
              </motion.p>
              <motion.p variants={fadeLeft} style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.85 }}>
                The transition from a family-run company to a structured institution is the hardest operating challenge any organisation faces.
              </motion.p>
            </div>
            <motion.div variants={fadeRight}
              style={{ background: 'linear-gradient(135deg,rgba(200,168,108,.07),rgba(200,168,108,.02))', border: '1px solid rgba(200,168,108,.18)', borderRadius: 'var(--rg)', padding: '40px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '16px' }}>Axion Index</div>
              <h3 className="sr" style={{ fontSize: '26px', fontWeight: 400, letterSpacing: '-.03em', marginBottom: '14px', lineHeight: 1.2 }}>
                A system to transform family-run companies into structured institutions.
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>
                Not a governance template. Not a succession plan. A complete operating architecture for the next generation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5 PILLARS */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '36px' }}>
            <div className="eyebrow">Five Pillars</div>
            <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-.02em' }}>
              The architecture of a lasting institution.
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
            {pillars.map((p) => (
              <motion.article
                key={p.no}
                variants={scaleIn}
                whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.4)', boxShadow: '0 20px 48px rgba(200,168,108,.07)', transition: { duration: 0.22 } }}
                className="aud-card"
              >
                <span className="aud-num">{p.no}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg2)' }}>
        <div className="inner">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="cta-panel">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Axion Index</div>
            <h2 className="sr" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', marginBottom: '18px' }}>
              Build a legacy that<br />lasts generations.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.8 }}>
              Advisory engagements for family businesses navigating generational transition. Decision ownership redesigned for the next generation.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="bp" style={{ fontSize: '14px', padding: '13px 30px', cursor: 'pointer' }}>Explore Axion Index →</motion.span>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link className="bs" href="/practice" style={{ fontSize: '14px', padding: '13px 30px' }}>View all services</Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          <Link href="/" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Home</Link>
          <Link href="/frameworks" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Frameworks</Link>
          <Link href="/practice" style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)', textDecoration: 'none' }}>Practice</Link>
        </div>
      </footer>
    </>
  );
}
