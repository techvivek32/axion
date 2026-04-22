'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <div style={{lineHeight:1}}>
          <Link href="/">
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

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{display:'flex',gap:'22px',alignItems:'center'}}>
          <Link className="nl" href="/">Home</Link>
          <Link className="nl" href="/philosophy">Philosophy</Link>
          <Link className="nl" href="/frameworks">Frameworks</Link>
          <Link className="nl" href="/writing">Writing</Link>
          <Link className="nl" href="/practice">Practice</Link>
          <Link className="nl" href="/family-business">Family Business</Link>
          <Link className="nl" href="/hros">HROS</Link>
          <Link className="nl" href="/about">About</Link>
          <span className="bp" style={{padding:'8px 20px',fontSize:'11px'}}>Book a call</span>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display:'none',
            background:'none',
            border:'none',
            cursor:'pointer',
            padding:'8px',
            flexDirection:'column',
            gap:'4px',
            zIndex:201
          }}
        >
          <span style={{width:'24px',height:'2px',background:'#c8a86c',transition:'all 0.3s',transform:mobileMenuOpen?'rotate(45deg) translateY(6px)':'none'}}></span>
          <span style={{width:'24px',height:'2px',background:'#c8a86c',transition:'all 0.3s',opacity:mobileMenuOpen?0:1}}></span>
          <span style={{width:'24px',height:'2px',background:'#c8a86c',transition:'all 0.3s',transform:mobileMenuOpen?'rotate(-45deg) translateY(-6px)':'none'}}></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position:'fixed',
            inset:0,
            background:'rgba(7,7,7,0.98)',
            zIndex:199,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            gap:'24px',
            padding:'40px'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Link className="nl" href="/" style={{fontSize:'16px',letterSpacing:'.08em'}}>Home</Link>
          <Link className="nl" href="/philosophy" style={{fontSize:'16px',letterSpacing:'.08em'}}>Philosophy</Link>
          <Link className="nl" href="/frameworks" style={{fontSize:'16px',letterSpacing:'.08em'}}>Frameworks</Link>
          <Link className="nl" href="/writing" style={{fontSize:'16px',letterSpacing:'.08em'}}>Writing</Link>
          <Link className="nl" href="/practice" style={{fontSize:'16px',letterSpacing:'.08em'}}>Practice</Link>
          <Link className="nl" href="/family-business" style={{fontSize:'16px',letterSpacing:'.08em'}}>Family Business</Link>
          <Link className="nl" href="/hros" style={{fontSize:'16px',letterSpacing:'.08em'}}>HROS</Link>
          <Link className="nl" href="/about" style={{fontSize:'16px',letterSpacing:'.08em'}}>About</Link>
          <span className="bp" style={{padding:'12px 28px',fontSize:'13px',marginTop:'16px',cursor:'pointer'}}>Book a call</span>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
