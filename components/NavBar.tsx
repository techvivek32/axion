'use client';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Founder',    href: '/founder' },
  { label: 'Expertise',  href: '/expertise' },
  { label: 'Research',   href: '/research' },
  { label: 'Connect',    href: '/connect' },
  { label: 'About Us',   href: '/about-us' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Exact same nav as homepage */}
      <nav>
        {/* Logo — identical SVG as homepage */}
        <div style={{ lineHeight: 1 }}>
          <Link href="/" style={{ display: 'block', lineHeight: 1 }}>
            <svg width="144" height="46" viewBox="0 0 360 116" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="82" fill="#f5f0e6" fontFamily="Inter,-apple-system,sans-serif" fontSize="82" fontWeight="900" letterSpacing="-5">AX</text>
              <line x1="112" y1="5" x2="112" y2="88" stroke="#c8a86c" strokeWidth="1.8" opacity="0.6"/>
              <text x="119" y="82" fill="#c8a86c" fontFamily="Inter,-apple-system,sans-serif" fontSize="82" fontWeight="300" letterSpacing="-3">ION</text>
              <polygon points="278,80 285,66 292,80" fill="#c8a86c" opacity="0.45"/>
              <polygon points="297,80 307,52 317,80" fill="#c8a86c" opacity="0.72"/>
              <polygon points="322,80 335,24 348,80" fill="#c8a86c"/>
              <rect x="0" y="94" width="348" height="20" fill="#c8a86c"/>
              <text x="174" y="108" textAnchor="middle" fill="#1a0e00" fontFamily="Inter,-apple-system,sans-serif" fontSize="9" fontWeight="900" letterSpacing="17">INDEX</text>
            </svg>
          </Link>
        </div>

        {/* Desktop links — identical style as homepage */}
        <div className="nb-desktop" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
          {navLinks.map((l) => (
            <Link key={l.href} className="nl" href={l.href}>{l.label}</Link>
          ))}
          <span className="bp" style={{ padding: '8px 20px', fontSize: '11px', cursor: 'pointer' }}>Book a call</span>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen(!open)}
          className="nb-hamburger"
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 201,
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8a86c', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8a86c', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: '#c8a86c', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay — same style as homepage */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(7,7,7,0.98)',
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '40px',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nl"
              onClick={() => setOpen(false)}
              style={{ fontSize: '18px', letterSpacing: '.08em' }}
            >
              {l.label}
            </Link>
          ))}
          <span
            className="bp"
            style={{ marginTop: '16px', padding: '12px 28px', fontSize: '13px', cursor: 'pointer' }}
            onClick={() => setOpen(false)}
          >
            Book a call
          </span>
        </div>
      )}

      {/* Show hamburger, hide desktop links on mobile/tablet */}
      <style>{`
        @media (max-width: 1024px) {
          .nb-desktop { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
