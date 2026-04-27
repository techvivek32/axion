'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeLeft, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';

const options = [
  { icon: '🔬', label: 'Run Diagnostic',    desc: 'AI Edge Diagnostic or Labour Codes readiness assessment.' },
  { icon: '🎤', label: 'Speaking',           desc: 'Keynotes, panels, and thought leadership engagements.' },
  { icon: '🏛️', label: 'Advisory',           desc: 'Board advisory, CFO roundtables, and strategic counsel.' },
  { icon: '🤝', label: 'Partnerships',       desc: 'Research partnerships, institutional advisory, co-creation.' },
  { icon: '📬', label: 'Newsletter',         desc: 'The Weekly Amendment Digest and Operating Architect Brief.' },
  { icon: '💼', label: 'LinkedIn',           desc: 'Follow for weekly frameworks, insights, and doctrine lines.' },
];

const enquiryTypes = ['Consulting / Advisory', 'Speaking / Keynote', 'Run a Diagnostic', 'Partnership', 'Media / Interview', 'General Enquiry'];

export default function Connect() {
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: '#070707', minHeight: '100vh' }}>
      <NavBar />

      {/* HERO */}
      <div style={{ position: 'relative', padding: '80px 56px 72px', borderBottom: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#070707' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%,rgba(200,168,108,.08),transparent 60%)', zIndex: 0 }} />
        <div className="gn-hero" style={{ fontSize: 'clamp(100px,16vw,280px)', right: '-20px', top: '-20px', zIndex: 0 }}>CONNECT</div>
        <div className="inner" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="eyebrow" style={{ justifyContent: 'center' }}>Connect</motion.div>
            <motion.h1 variants={fadeUp} className="sr" style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 400, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: '20px', color: '#f5f2eb' }}>
              Start Where You Are.
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: '17px', color: 'rgba(245,242,235,.52)', lineHeight: 1.85 }}>
              Whether you need a diagnostic, a conversation, or a system — this is where it begins.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* PRIMARY CTAs */}
      <div className="sec" style={{ background: '#0d0d0d' }}>
        <div className="inner">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '56px' }}>
            <motion.div variants={scaleIn}
              whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.4)', boxShadow: '0 28px 72px rgba(200,168,108,.1)', transition: { duration: 0.22 } }}
              style={{ background: '#141414', border: '1px solid rgba(200,168,108,.2)', borderRadius: '24px', padding: '40px', cursor: 'pointer' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#c8a86c', fontWeight: 700, marginBottom: '14px' }}>Primary</div>
              <h2 className="sr" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: '#f5f2eb', marginBottom: '14px', lineHeight: 1.1 }}>
                Speak With Us
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(245,242,235,.45)', lineHeight: 1.8, marginBottom: '24px' }}>
                A structured conversation about your organisation&rsquo;s operating challenges. No pitch. No deck. Just clarity.
              </p>
              <Link href="#form" className="bp" style={{ fontSize: '13px' }}>Book a conversation &rarr;</Link>
            </motion.div>
            <motion.div variants={scaleIn}
              whileHover={{ y: -8, borderColor: 'rgba(200,168,108,.3)', boxShadow: '0 28px 72px rgba(200,168,108,.07)', transition: { duration: 0.22 } }}
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '24px', padding: '40px', cursor: 'pointer' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: '#c8a86c', fontWeight: 700, marginBottom: '14px' }}>Diagnostic</div>
              <h2 className="sr" style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 400, color: '#f5f2eb', marginBottom: '14px', lineHeight: 1.1 }}>
                Run a Diagnostic
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(245,242,235,.45)', lineHeight: 1.8, marginBottom: '24px' }}>
                AI Edge Diagnostic or Labour Codes readiness assessment. Get a structured view of your exposure in under 30 minutes.
              </p>
              <Link href="/expertise" className="bs" style={{ fontSize: '13px' }}>Start diagnostic &rarr;</Link>
            </motion.div>
          </motion.div>

          {/* OPTIONS GRID */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '28px' }}>
            <div className="eyebrow">Other Ways to Connect</div>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '64px' }}>
            {options.map((o, i) => (
              <motion.div key={i} variants={scaleIn}
                whileHover={{ y: -5, borderColor: 'rgba(200,168,108,.3)', boxShadow: '0 16px 40px rgba(200,168,108,.06)', transition: { duration: 0.2 } }}
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '16px', padding: '24px', cursor: 'pointer' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{o.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#f5f2eb', marginBottom: '6px' }}>{o.label}</h3>
                <p style={{ fontSize: '12px', color: 'rgba(245,242,235,.4)', lineHeight: 1.65 }}>{o.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FORM */}
          <div id="form">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} style={{ marginBottom: '28px' }}>
              <div className="eyebrow">Submit a Request</div>
              <h2 className="sr" style={{ fontSize: 'clamp(26px,3vw,40px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.03em', color: '#f5f2eb' }}>
                Tell us what you need.
              </h2>
            </motion.div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ background: '#141414', border: '1px solid rgba(255,255,255,.07)', borderRadius: '24px', padding: '40px', maxWidth: '680px' }}>

                  {/* Type selector */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(245,242,235,.28)', letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                      Type of enquiry
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {enquiryTypes.map((t) => (
                        <motion.button key={t} onClick={() => setSelected(t)}
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          style={{ padding: '7px 16px', borderRadius: '999px', border: '1px solid', borderColor: selected === t ? '#c8a86c' : 'rgba(255,255,255,.1)', background: selected === t ? 'rgba(200,168,108,.1)' : 'transparent', color: selected === t ? '#c8a86c' : 'rgba(245,242,235,.4)', fontSize: '12px', fontWeight: selected === t ? 600 : 400, cursor: 'pointer', transition: 'all .2s', fontFamily: 'inherit' }}>
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  {[
                    { label: 'Name',         type: 'text',  placeholder: 'Your full name' },
                    { label: 'Email',        type: 'email', placeholder: 'your@email.com' },
                    { label: 'Organisation', type: 'text',  placeholder: 'Company or institution' },
                  ].map((f) => (
                    <div key={f.label} style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(245,242,235,.28)', letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', fontSize: '14px', color: '#f5f2eb', background: '#1c1b1b', outline: 'none', transition: 'border-color .2s', fontFamily: 'inherit' }}
                        onFocus={(e) => e.target.style.borderColor = '#c8a86c'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(245,242,235,.28)', letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Message</label>
                    <textarea placeholder="Tell us what you're working on..." rows={4}
                      style={{ width: '100%', padding: '12px 16px', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', fontSize: '14px', color: '#f5f2eb', background: '#1c1b1b', outline: 'none', resize: 'vertical', transition: 'border-color .2s', fontFamily: 'inherit' }}
                      onFocus={(e) => e.target.style.borderColor = '#c8a86c'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,.1)'}
                    />
                  </div>

                  <motion.button
                    onClick={() => setSubmitted(true)}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(200,168,108,.25)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bp"
                    style={{ width: '100%', textAlign: 'center', fontSize: '14px', padding: '14px', cursor: 'pointer' }}>
                    Submit Request →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="thanks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: '#141414', border: '1px solid rgba(200,168,108,.25)', borderRadius: '24px', padding: '56px 40px', maxWidth: '680px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
                  <h3 className="sr" style={{ fontSize: '28px', fontWeight: 400, color: '#f5f2eb', marginBottom: '12px' }}>Request received.</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(245,242,235,.45)', lineHeight: 1.8 }}>We&rsquo;ll respond within 48 hours. In the meantime, explore the research.</p>
                  <Link href="/research" className="bs" style={{ marginTop: '24px', display: 'inline-block', fontSize: '13px' }}>Explore Research →</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer style={{ padding: '20px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,.95)', borderTop: '1px solid rgba(255,255,255,.07)', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.16)', letterSpacing: '.04em' }}>© 2026 Axion Index</span>
        <div style={{ display: 'flex', gap: '22px' }}>
          {[['/', 'Home'], ['/about-us', 'About'], ['/founder', 'Founder'], ['/expertise', 'Expertise']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: '11px', color: 'rgba(245,242,235,.22)' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
