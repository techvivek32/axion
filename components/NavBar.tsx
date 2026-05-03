'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  const toggleMobile = (val: boolean) => {
    setMobileOpen(val);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('mob-open', val);
    }
  };

  const dropLinks = [
    { label: 'Labour Codes',       href: '/expertise/labour-codes' },
    { label: 'AI Edge Lab',        href: '/expertise/ai-edge-lab' },
    { label: 'Family Business',    href: '/expertise/family-business' },
    { label: 'People Architecture',href: '/expertise/people-architecture' },
  ];

  const navLinks = [
    { label: 'Home',     href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Founder',  href: '/founder' },
    { label: 'Connect',  href: '/connect' },
  ];

  return (
    <>
      {/* ── Exact same nav as homepage ─────────────── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 56px',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        backdropFilter: 'blur(24px)',
        background: 'rgba(7,7,6,.88)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        boxShadow: '0 4px 24px rgba(0,0,0,.4)',
      }}>

        {/* Logo — exact match */}
        <Link href="/" aria-label="AX/ON Index" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1, paddingRight: '12px', borderRight: '1.5px solid rgba(200,168,108,.55)' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '22px', fontWeight: 900, color: '#f5f0e6', letterSpacing: '-.06em', lineHeight: '.92' }}>AX</span>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '22px', fontWeight: 200, color: 'rgba(200,168,108,.8)', letterSpacing: '-.05em', lineHeight: '.92' }}>ON</span>
          </div>
          <div style={{ paddingLeft: '12px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '38px', fontWeight: 500, fontStyle: 'italic', color: '#f5f0e6', letterSpacing: '-.01em', lineHeight: '.92' }}>Index</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="nb-desktop" style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
          {navLinks.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="nl">{l.label}</Link>
          ))}

          {/* Expertise dropdown — click only */}
          <div
            style={{ position: 'relative' }}
          >
            <button
              className="nl"
              onClick={() => setDropOpen(!dropOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--muted)', letterSpacing: '.02em', display: 'flex', alignItems: 'center', gap: '5px', padding: 0, fontFamily: 'Inter,-apple-system,sans-serif' }}
            >
              Expertise <span style={{ fontSize: '9px', opacity: 0.6 }}>▾</span>
            </button>

            {dropOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(8,7,6,.97)',
                border: '1px solid rgba(200,168,108,.18)',
                borderRadius: '14px',
                padding: '8px',
                minWidth: '200px',
                zIndex: 300,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 60px rgba(0,0,0,.6)',
              }}>
                {dropLinks.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setDropOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      fontSize: '12px',
                      color: 'rgba(210,205,195,.7)',
                      letterSpacing: '.04em',
                      borderRadius: '8px',
                      transition: 'background .15s,color .15s',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(200,168,108,.08)'; e.currentTarget.style.color = '#c8a86c'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(210,205,195,.7)'; }}
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/connect" className="nl">Connect</Link>
        </div>

        {/* CTA button */}
        <div className="nb-desktop" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/connect" className="btn-primary" style={{ padding: '8px 18px', fontSize: '11px' }}>
            Book Diagnostic
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nb-hamburger"
          onClick={() => toggleMobile(!mobileOpen)}
          aria-label="Menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px', zIndex: 201 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: '#c8a86c',
              transition: 'all 0.3s',
              transform: mobileOpen
                ? i === 0 ? 'rotate(45deg) translateY(7px)'
                : i === 2 ? 'rotate(-45deg) translateY(-7px)'
                : 'none'
                : 'none',
              opacity: mobileOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(7,7,6,0.98)',
            zIndex: 199,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '40px 24px' }}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  fontSize: 'clamp(16px,4vw,20px)',
                  color: 'rgba(210,205,195,.55)',
                  textDecoration: 'none',
                  letterSpacing: '.06em',
                  fontWeight: 500,
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,.06)',
                  transition: 'color .2s',
                  fontFamily: 'Inter,-apple-system,sans-serif',
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#c8a86c'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(210,205,195,.55)'}
              >
                {l.label}
              </Link>
            ))}

            {/* Expertise in mobile — expanded list */}
            <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ textAlign: 'center', fontSize: 'clamp(16px,4vw,20px)', color: 'rgba(210,205,195,.35)', padding: '14px 0', letterSpacing: '.06em', fontWeight: 500 }}>
                Expertise
              </div>
              {dropLinks.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', textAlign: 'center',
                    fontSize: '14px',
                    color: 'rgba(200,168,108,.65)',
                    textDecoration: 'none',
                    letterSpacing: '.06em',
                    padding: '10px 0',
                    transition: 'color .2s',
                    fontFamily: 'Inter,-apple-system,sans-serif',
                  }}
                >
                  {d.label}
                </Link>
              ))}
            </div>

            <Link
              href="/connect"
              className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ marginTop: '28px', fontSize: '13px', padding: '12px 32px' }}
            >
              Book Diagnostic
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .nb-desktop { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }
        /* Prevent body scroll when mobile menu open */
        body.mob-open { overflow: hidden; }
      `}</style>
    </>
  );
}
