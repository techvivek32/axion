'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const options = [
  { icon: '🔬', label: 'Run Diagnostic',   desc: 'AI Edge Diagnostic or Labour Codes readiness assessment.' },
  { icon: '🎤', label: 'Speaking',          desc: 'Keynotes, panels, and thought leadership engagements.' },
  { icon: '🏛️', label: 'Advisory',          desc: 'Board advisory, CFO roundtables, and strategic counsel.' },
  { icon: '🤝', label: 'Partnerships',      desc: 'Research partnerships, institutional advisory, co-creation.' },
  { icon: '📬', label: 'Newsletter',        desc: 'The Weekly Amendment Digest and Operating Architect Brief.' },
  { icon: '💼', label: 'LinkedIn',          desc: 'Follow for weekly frameworks, insights, and doctrine lines.' },
];

const enquiryTypes = ['Consulting / Advisory', 'Speaking / Keynote', 'Run a Diagnostic', 'Partnership', 'Media / Interview', 'General Enquiry'];

export default function Connect() {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <section style={{ background: 'var(--navy-dark)', minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '96px 56px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,.1), transparent 60%)' }} />
        <div className="container" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Connect</motion.div>
            <motion.h1 variants={fadeUp} className="display"
              style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '24px', color: '#fff' }}>
              Start Where You Are.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '18px', color: 'rgba(255,255,255,.6)', lineHeight: 1.85 }}>
              Whether you need a diagnostic, a conversation, or a system — this is where it begins.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PRIMARY CTA */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
            <motion.div variants={scaleIn}
              whileHover={{ y: -8, boxShadow: '0 28px 72px rgba(201,168,76,.18)', borderColor: 'var(--gold)', transition: { duration: 0.22 } }}
              style={{ background: 'var(--navy)', border: '1px solid rgba(201,168,76,.2)', borderRadius: '24px', padding: '48px', cursor: 'pointer' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '16px' }}>Primary</div>
              <h2 className="display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>
                Speak With Us
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', lineHeight: 1.8, marginBottom: '28px' }}>
                A structured conversation about your organisation&rsquo;s operating challenges. No pitch. No deck. Just clarity.
              </p>
              <Link href="#form" className="btn-primary" style={{ fontSize: '13px' }}>Book a conversation →</Link>
            </motion.div>
            <motion.div variants={scaleIn}
              whileHover={{ y: -8, boxShadow: '0 28px 72px rgba(201,168,76,.1)', borderColor: 'var(--gold)', transition: { duration: 0.22 } }}
              style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '48px', cursor: 'pointer' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '16px' }}>Diagnostic</div>
              <h2 className="display" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: 'var(--navy-dark)', marginBottom: '16px', lineHeight: 1.1 }}>
                Run a Diagnostic
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '28px' }}>
                AI Edge Diagnostic or Labour Codes readiness assessment. Get a structured view of your exposure in under 30 minutes.
              </p>
              <Link href="/expertise" className="btn-outline" style={{ fontSize: '13px' }}>Start diagnostic →</Link>
            </motion.div>
          </motion.div>

          {/* OPTIONS GRID */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '32px' }}>
            <div className="eyebrow">Other Ways to Connect</div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '64px' }}>
            {options.map((o, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -5, borderColor: 'var(--gold)', boxShadow: '0 16px 40px rgba(201,168,76,.08)', transition: { duration: 0.2 } }}
                className="card" style={{ cursor: 'pointer' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{o.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--navy-dark)', marginBottom: '6px' }}>{o.label}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{o.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FORM */}
          <div id="form">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '32px' }}>
              <div className="eyebrow">Submit a Request</div>
              <h2 className="display" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: 'var(--navy-dark)' }}>
                Tell us what you need.
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ background: 'var(--white)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '48px', maxWidth: '680px' }}>

                  {/* Type selector */}
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                      Type of enquiry
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {enquiryTypes.map((t) => (
                        <motion.button key={t} onClick={() => setSelected(t)}
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          style={{ padding: '8px 18px', borderRadius: '999px', border: '1.5px solid', borderColor: selected === t ? 'var(--gold)' : 'var(--card-border)', background: selected === t ? 'rgba(201,168,76,.1)' : 'transparent', color: selected === t ? 'var(--gold)' : 'var(--text-muted)', fontSize: '13px', fontWeight: selected === t ? 600 : 400, cursor: 'pointer', transition: 'all .2s' }}>
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  {[
                    { label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { label: 'Organisation', type: 'text', placeholder: 'Company or institution' },
                  ].map((f) => (
                    <div key={f.label} style={{ marginBottom: '20px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{ width: '100%', padding: '13px 16px', border: '1.5px solid var(--card-border)', borderRadius: '12px', fontSize: '14px', color: 'var(--text)', background: 'var(--bg)', outline: 'none', transition: 'border-color .2s', fontFamily: 'inherit' }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navy)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message</label>
                    <textarea placeholder="Tell us what you're working on..." rows={4}
                      style={{ width: '100%', padding: '13px 16px', border: '1.5px solid var(--card-border)', borderRadius: '12px', fontSize: '14px', color: 'var(--text)', background: 'var(--bg)', outline: 'none', resize: 'vertical', transition: 'border-color .2s', fontFamily: 'inherit' }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                    />
                  </div>

                  <motion.button
                    onClick={() => setSubmitted(true)}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(201,168,76,.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                    style={{ width: '100%', textAlign: 'center', fontSize: '14px', padding: '15px' }}>
                    Submit Request →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="thanks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'var(--white)', border: '1px solid rgba(201,168,76,.3)', borderRadius: '24px', padding: '64px 48px', maxWidth: '680px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
                  <h3 className="display" style={{ fontSize: '28px', fontWeight: 400, color: 'var(--navy-dark)', marginBottom: '12px' }}>Request received.</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>We&rsquo;ll respond within 48 hours. In the meantime, explore the research.</p>
                  <Link href="/research" className="btn-outline" style={{ marginTop: '24px', display: 'inline-block', fontSize: '13px' }}>Explore Research →</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer style={{ background: 'var(--navy-dark)', padding: '32px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(201,168,76,.15)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,.3)' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/founder', 'Founder'], ['/expertise', 'Expertise']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '12px', color: 'rgba(255,255,255,.35)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
