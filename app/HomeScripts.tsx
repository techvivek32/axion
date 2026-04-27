'use client';
import { useEffect } from 'react';

const INLINE_SCRIPTS: string[] = [
  "var signals=[\n  \"Labour Codes: 50% wage rule impact on PF exposure — are you correctly classified?\",\n  \"AI Compression: Middle-layer cognitive work compressing 3x faster than role redesign\",\n  \"Decision Risk: Most organisations cannot map who owns which decision after two layers\",\n  \"Compliance Signal: Labour Code readiness below 40% across Indian mid-market firms\",\n  \"Operating Rhythm: Organisations that scaled rhythm saw 2.4x lower regulatory exposure\",\n  \"Judgment Scarcity: As AI makes intelligence abundant, decision ownership becomes the scarce resource\"\n];\nvar idx=0;\nfunction rotateTicker(){\n  var el=document.getElementById('ticker-text');\n  var wrap=document.getElementById('ticker-inner');\n  wrap.style.opacity='0';\n  setTimeout(function(){\n    idx=(idx+1)%signals.length;\n    el.textContent=signals[idx];\n    wrap.style.opacity='1';\n  },400);\n}\ndocument.getElementById('ticker-text').textContent=signals[0];\nsetInterval(rotateTicker,7000);",
  "function setFan(i){document.querySelectorAll('.fc').forEach(function(c,j){c.classList.toggle('on',j===i)})}",
  // Mobile nav for homepage
  `(function(){
    var navLinks = document.querySelector('nav > div:last-child');
    if(!navLinks) return;

    // ── Hamburger button ──────────────────────────────────────
    var btn = document.createElement('button');
    btn.id = 'mob-btn';
    btn.setAttribute('aria-label','Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.style.cssText = [
      'display:none',
      'background:none',
      'border:none',
      'cursor:pointer',
      'padding:8px',
      'flex-direction:column',
      'gap:5px',
      'z-index:202',
      'flex-shrink:0',
    ].join(';');
    var spans = btn.querySelectorAll('span');
    spans.forEach(function(s){
      s.style.cssText = 'display:block;width:24px;height:2px;background:#c8a86c;transition:transform 0.3s,opacity 0.3s;border-radius:2px;';
    });

    // ── Overlay ───────────────────────────────────────────────
    var overlay = document.createElement('div');
    overlay.id = 'mob-overlay';
    overlay.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'background:rgba(7,7,7,0.98)',
      'z-index:199',
      'flex-direction:column',
      'align-items:center',
      'justify-content:center',
      'overflow-y:auto',
      '-webkit-overflow-scrolling:touch',
    ].join(';');

    // Inner wrapper — controls spacing responsively
    var inner = document.createElement('div');
    inner.style.cssText = [
      'display:flex',
      'flex-direction:column',
      'align-items:center',
      'width:100%',
      'max-width:400px',
      'padding:40px 24px',
      'gap:0',
    ].join(';');

    var links = [
      ['/','Home'],
      ['/founder','Founder'],
      ['/expertise','Expertise'],
      ['/research','Research'],
      ['/connect','Connect'],
      ['/about-us','About Us'],
    ];

    links.forEach(function(l, i){
      var a = document.createElement('a');
      a.href = l[0];
      a.textContent = l[1];
      a.style.cssText = [
        'display:block',
        'width:100%',
        'text-align:center',
        'font-size:clamp(16px,4vw,22px)',
        'color:rgba(245,242,235,.55)',
        'text-decoration:none',
        'letter-spacing:.06em',
        'font-weight:500',
        'padding:14px 0',
        'border-bottom:1px solid rgba(255,255,255,.06)',
        'transition:color .2s,background .2s',
        'font-family:Inter,-apple-system,sans-serif',
      ].join(';');
      a.addEventListener('touchstart', function(){ a.style.color='#c8a86c'; }, {passive:true});
      a.addEventListener('touchend',   function(){ setTimeout(function(){ a.style.color='rgba(245,242,235,.55)'; }, 300); }, {passive:true});
      a.onmouseover = function(){ a.style.color='#c8a86c'; };
      a.onmouseout  = function(){ a.style.color='rgba(245,242,235,.55)'; };
      a.onclick = function(){ toggle(); };
      inner.appendChild(a);
    });

    // CTA button
    var cta = document.createElement('a');
    cta.href = '#';
    cta.textContent = 'Book a call';
    cta.style.cssText = [
      'display:inline-block',
      'margin-top:28px',
      'padding:13px 32px',
      'background:#c8a86c',
      'color:#2a1800',
      'font-size:clamp(12px,3vw,14px)',
      'font-weight:700',
      'letter-spacing:.06em',
      'cursor:pointer',
      'border-radius:999px',
      'text-decoration:none',
      'font-family:Inter,-apple-system,sans-serif',
      'transition:background .2s',
    ].join(';');
    cta.onmouseover = function(){ cta.style.background='#e5c385'; };
    cta.onmouseout  = function(){ cta.style.background='#c8a86c'; };
    inner.appendChild(cta);

    overlay.appendChild(inner);
    document.body.appendChild(overlay);

    var nav = document.querySelector('nav');
    nav.appendChild(btn);

    // ── Toggle ────────────────────────────────────────────────
    var open = false;
    function toggle(){
      open = !open;
      overlay.style.display = open ? 'flex' : 'none';
      document.body.style.overflow = open ? 'hidden' : '';
      spans[0].style.transform = open ? 'rotate(45deg) translateY(7px)' : 'none';
      spans[1].style.opacity   = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translateY(-7px)' : 'none';
    }
    btn.onclick = toggle;
    overlay.onclick = function(e){ if(e.target === overlay) toggle(); };

    // ── Responsive check ──────────────────────────────────────
    function checkSize(){
      var w = window.innerWidth;
      if(w <= 1024){
        btn.style.display = 'flex';
        navLinks.style.display = 'none';
        // Adjust font size for small phones
        var fs = w <= 375 ? '15px' : w <= 480 ? '16px' : w <= 768 ? '18px' : '20px';
        inner.querySelectorAll('a:not(:last-child)').forEach(function(a){
          a.style.fontSize = fs;
        });
      } else {
        btn.style.display = 'none';
        navLinks.style.display = 'flex';
        if(open){ open=false; overlay.style.display='none'; document.body.style.overflow=''; }
      }
    }
    checkSize();
    window.addEventListener('resize', checkSize);
  })();`
];

export default function HomeScripts() {
  useEffect(() => {
    // ── inject scripts ──────────────────────────────────────────
    const nodes: HTMLScriptElement[] = [];
    for (const code of INLINE_SCRIPTS) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.text = code;
      document.body.appendChild(s);
      nodes.push(s);
    }

    // ── inject animation CSS ────────────────────────────────────
    const style = document.createElement('style');
    style.id = 'home-anim-css';
    style.textContent = `
      /* scroll-reveal base */
      .ax-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.65s ease, transform 0.65s ease;
      }
      .ax-reveal.ax-visible {
        opacity: 1;
        transform: translateY(0);
      }
      .ax-reveal-left {
        opacity: 0;
        transform: translateX(-32px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .ax-reveal-left.ax-visible {
        opacity: 1;
        transform: translateX(0);
      }
      .ax-reveal-scale {
        opacity: 0;
        transform: scale(0.94);
        transition: opacity 0.55s ease, transform 0.55s ease;
      }
      .ax-reveal-scale.ax-visible {
        opacity: 1;
        transform: scale(1);
      }

      /* fg-card hover */
      .fg-card {
        transition: border-color 0.22s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
      }
      .fg-card:hover {
        border-color: rgba(200,168,108,.35) !important;
        transform: translateY(-6px) !important;
        box-shadow: 0 20px 56px rgba(200,168,108,.07) !important;
      }

      /* fw-card hover */
      .fw-card {
        transition: border-color 0.22s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
      }
      .fw-card:hover {
        border-color: rgba(200,168,108,.3) !important;
        transform: translateY(-5px) !important;
        box-shadow: 0 18px 48px rgba(0,0,0,.25) !important;
      }

      /* aud-card hover */
      .aud-card {
        transition: border-color 0.22s ease, transform 0.25s ease !important;
      }
      .aud-card:hover {
        border-color: rgba(200,168,108,.35) !important;
        transform: translateY(-6px) !important;
      }

      /* hw-card hover */
      .hw-card {
        transition: border-top-color 0.2s ease, transform 0.22s ease !important;
      }
      .hw-card:hover {
        border-top-color: #e5c385 !important;
        transform: translateY(-4px) !important;
      }

      /* sc (thought leadership) hover */
      .sc {
        transition: border-color 0.2s ease, background 0.2s ease, transform 0.22s ease !important;
      }
      .sc:hover {
        border-color: rgba(200,168,108,.28) !important;
        background: #181818 !important;
        transform: translateY(-4px) !important;
      }

      /* .bp button hover */
      .bp {
        transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease !important;
      }
      .bp:hover {
        background: #e5c385 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 28px rgba(200,168,108,.22) !important;
      }

      /* .bs button hover */
      .bs {
        transition: border-color 0.2s ease, color 0.2s ease, transform 0.18s ease !important;
      }
      .bs:hover {
        border-color: var(--gold) !important;
        color: var(--gold) !important;
        transform: translateY(-2px) !important;
      }

      /* nav link hover */
      .nl {
        transition: color 0.18s ease !important;
        position: relative;
      }

      /* fc (accordion) hover */
      .fc {
        transition: flex 0.4s cubic-bezier(.4,0,.2,1), border-color 0.2s ease, filter 0.2s ease !important;
      }

      /* cmp-wrap hover on sides */
      .cmp-dark, .cmp-gold {
        transition: background 0.3s ease !important;
      }

      /* tl-item hover */
      .tl-item {
        transition: color 0.18s ease !important;
      }
      .tl-item:hover {
        color: var(--goldb) !important;
      }

      /* hero stat numbers */
      .ax-stat {
        transition: color 0.3s ease !important;
      }
      .ax-stat:hover {
        color: var(--goldb) !important;
      }
    `;
    document.head.appendChild(style);

    // ── scroll-reveal observer ──────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay || '0');
            setTimeout(() => {
              el.classList.add('ax-visible');
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // ── tag elements for reveal ─────────────────────────────────
    function tagReveal() {
      // The hero is the first big div after the live strip — it has min-height:100vh
      // We identify it as the first child div of body that is NOT nav and NOT the strip
      // Simplest: get all .sec elements — hero is NOT a .sec, so only animate .sec children

      // Section headings — ONLY inside .sec (hero is not .sec so excluded)
      document.querySelectorAll('.sec h2, .sec h1').forEach((el) => {
        if (!el.classList.contains('ax-reveal')) {
          el.classList.add('ax-reveal');
          (el as HTMLElement).dataset.delay = '0.05';
        }
      });

      // Eyebrow labels — ONLY inside .sec
      document.querySelectorAll('.sec .eyebrow').forEach((el) => {
        if (!el.classList.contains('ax-reveal-left')) {
          el.classList.add('ax-reveal-left');
          (el as HTMLElement).dataset.delay = '0';
        }
      });

      // Cards — only inside .sec
      const cardSelectors = ['.sec .fg-card', '.sec .fw-card', '.sec .aud-card', '.sec .hw-card', '.sec .sc'];
      cardSelectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, i) => {
          if (!el.classList.contains('ax-reveal-scale')) {
            el.classList.add('ax-reveal-scale');
            (el as HTMLElement).dataset.delay = String((i % 4) * 0.1);
          }
        });
      });

      // Paragraphs — only inside .sec .inner
      document.querySelectorAll('.sec .inner > p, .sec .inner > div > p').forEach((el) => {
        if (!el.classList.contains('ax-reveal')) {
          el.classList.add('ax-reveal');
          (el as HTMLElement).dataset.delay = '0.1';
        }
      });

      // fw-note — only inside .sec
      document.querySelectorAll('.sec .fw-note').forEach((el) => {
        if (!el.classList.contains('ax-reveal-left')) {
          el.classList.add('ax-reveal-left');
          (el as HTMLElement).dataset.delay = '0.2';
        }
      });

      // cta-panel — only inside .sec
      document.querySelectorAll('.sec .cta-panel').forEach((el) => {
        if (!el.classList.contains('ax-reveal-scale')) {
          el.classList.add('ax-reveal-scale');
          (el as HTMLElement).dataset.delay = '0.05';
        }
      });

      // Observe all tagged elements
      document.querySelectorAll('.ax-reveal, .ax-reveal-left, .ax-reveal-scale').forEach((el) => {
        observer.observe(el);
      });
    }

    // Run after a short delay to let the HTML render
    const timer = setTimeout(tagReveal, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      for (const n of nodes) n.remove();
      document.getElementById('home-anim-css')?.remove();
    };
  }, []);
  return null;
}
