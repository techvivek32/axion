'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobile = (val: boolean) => {
    setMobileOpen(val);
    document.body.classList.toggle('mob-open', val);
  };

  const dropLinks = [
    { label: 'Labour Codes',        href: '/expertise/labour-codes' },
    { label: 'AI Edge Lab',         href: '/expertise/ai-edge-lab' },
    { label: 'Family Business',     href: '/expertise/family-business' },
    { label: 'People Architecture', href: '/expertise/people-architecture' },
  ];

  const navLinks = [
    { label: 'Home',    href: '/' },
    { label: 'About',   href: '/about' },
    { label: 'Founder', href: '/founder' },
    { label: 'Connect', href: '/connect' },
  ];

  return (
    <>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: scrolled ? 'rgba(8,8,8,.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : 'none',
        transition: 'background .3s, border-color .3s',
      }}>

        {/* Logo */}
        <Link href="/" aria-label="Axion Index" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0, position: 'relative', zIndex: 2 }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '-.06em', lineHeight: 1 }}>AX</span>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '20px', fontWeight: 200, color: 'rgba(255,255,255,.5)', letterSpacing: '-.05em', lineHeight: 1, marginRight: '10px' }}>ON</span>
          <span style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,.15)', margin: '0 10px', display: 'inline-block' }} />
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: '26px', fontWeight: 500, fontStyle: 'italic', color: '#f8fafc', letterSpacing: '-.01em', lineHeight: 1 }}>Index</span>
        </Link>

        {/* Center pill nav */}
        <div className="nb-desktop nav-links-pill" style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '999px', padding: '5px 6px', position: 'relative' }}>

          {navLinks.slice(0, 3).map((l) => (
            <Link key={l.href} href={l.href} className="nl">{l.label}</Link>
          ))}

          {/* Expertise dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="nl"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'rgba(255,255,255,.5)', letterSpacing: '.04em', display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: '999px', fontFamily: 'Inter,-apple-system,sans-serif', transition: 'color .2s, background .2s' }}
            >
              Expertise <span style={{ fontSize: '8px', opacity: .5, marginLeft: '2px' }}>▾</span>
            </button>

            {dropOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10,10,10,.96)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '18px',
                padding: '8px',
                minWidth: '210px',
                zIndex: 300,
                backdropFilter: 'blur(24px)',
                boxShadow: '0 24px 60px rgba(0,0,0,.7)',
                animation: 'drop-in .2s cubic-bezier(.22,1,.36,1) both',
              }}>
                {dropLinks.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setDropOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', fontSize: '12px', color: 'rgba(226,232,240,.6)', letterSpacing: '.03em', borderRadius: '10px', transition: 'background .15s,color .15s', textDecoration: 'none' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(226,232,240,.6)'; }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,.2)', flexShrink: 0 }} />
                    {d.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/connect" className="nl">Connect</Link>
        </div>

        {/* CTA */}
        <div className="nb-desktop" style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <Link href="/connect" style={{
            padding: '8px 20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '.06em',
            borderRadius: '999px',
            textDecoration: 'none',
            background: '#ffffff',
            color: '#080808',
            transition: 'background .2s, transform .15s, box-shadow .2s',
            display: 'inline-block',
          }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#e8e8e8'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,.15)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Book Diagnostic
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="nb-hamburger"
          onClick={() => toggleMobile(!mobileOpen)}
          aria-label="Menu"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px', zIndex: 201 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '1.5px',
              background: '#fff', borderRadius: '2px',
              transition: 'all .3s cubic-bezier(.22,1,.36,1)',
              transform: mobileOpen ? (i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none') : 'none',
              opacity: mobileOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => toggleMobile(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,.98)', zIndex: 199, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', padding: '40px 24px' }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => toggleMobile(false)} style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: '18px', color: 'rgba(226,232,240,.55)', textDecoration: 'none', letterSpacing: '.06em', fontWeight: 500, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.06)', transition: 'color .2s', fontFamily: 'Inter,-apple-system,sans-serif' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(226,232,240,.55)'}
              >{l.label}</Link>
            ))}
            <div style={{ width: '100%', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
              <div style={{ textAlign: 'center', fontSize: '18px', color: 'rgba(226,232,240,.25)', padding: '14px 0', letterSpacing: '.06em', fontWeight: 500 }}>Expertise</div>
              {dropLinks.map((d) => (
                <Link key={d.href} href={d.href} onClick={() => toggleMobile(false)} style={{ display: 'block', textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,.55)', textDecoration: 'none', letterSpacing: '.06em', padding: '10px 0', transition: 'color .2s', fontFamily: 'Inter,-apple-system,sans-serif' }}>{d.label}</Link>
              ))}
            </div>
            <Link href="/connect" onClick={() => toggleMobile(false)} style={{ marginTop: '28px', padding: '12px 32px', background: '#ffffff', color: '#080808', fontSize: '13px', fontWeight: 700, letterSpacing: '.06em', borderRadius: '999px', textDecoration: 'none' }}>
              Book Diagnostic
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-links-pill { position: relative; }
        .nav-links-pill::before {
          content: "";
          position: absolute; inset: -1px;
          border-radius: 999px;
          padding: 1px;
          background: conic-gradient(from var(--nav-angle, 0deg), transparent 75%, rgba(255,255,255,.3) 88%, rgba(255,255,255,.5) 92%, rgba(255,255,255,.3) 96%, transparent 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: nav-border-spin 4s linear infinite;
          pointer-events: none;
        }
        @property --nav-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes nav-border-spin { to { --nav-angle: 360deg; } }
        @keyframes drop-in {
          0%  { opacity:0; transform: translateX(-50%) translateY(-8px) scale(.97); }
          100%{ opacity:1; transform: translateX(-50%) translateY(0)     scale(1);   }
        }
        .nl { font-size:11px; color:rgba(255,255,255,.5); cursor:pointer; letter-spacing:.04em; text-decoration:none; padding:6px 14px; border-radius:999px; transition:color .2s, background .2s; white-space:nowrap; }
        .nl:hover { color:#fff; background:rgba(255,255,255,.08); }
        @media (max-width: 1024px) {
          .nb-desktop { display: none !important; }
          .nb-hamburger { display: flex !important; }
        }
        body.mob-open { overflow: hidden; }
      `}</style>
    </>
  );
}
