'use client';
import { useEffect } from 'react';

const INLINE_SCRIPTS: string[] = [
  "var signals=[\n  \"Labour Codes: 50% wage rule impact on PF exposure — are you correctly classified?\",\n  \"AI Compression: Middle-layer cognitive work compressing 3x faster than role redesign\",\n  \"Decision Risk: Most organisations cannot map who owns which decision after two layers\",\n  \"Compliance Signal: Labour Code readiness below 40% across Indian mid-market firms\",\n  \"Operating Rhythm: Organisations that scaled rhythm saw 2.4x lower regulatory exposure\",\n  \"Judgment Scarcity: As AI makes intelligence abundant, decision ownership becomes the scarce resource\"\n];\nvar idx=0;\nfunction rotateTicker(){\n  var el=document.getElementById('ticker-text');\n  var wrap=document.getElementById('ticker-inner');\n  wrap.style.opacity='0';\n  setTimeout(function(){\n    idx=(idx+1)%signals.length;\n    el.textContent=signals[idx];\n    wrap.style.opacity='1';\n  },400);\n}\ndocument.getElementById('ticker-text').textContent=signals[0];\nsetInterval(rotateTicker,7000);",
  "function setFan(i){document.querySelectorAll('.fc').forEach(function(c,j){c.classList.toggle('on',j===i)})}",
  // Mobile nav for homepage
  `(function(){
    var navLinks = document.querySelector('nav > div:last-child');
    if(!navLinks) return;
    // Create hamburger button
    var btn = document.createElement('button');
    btn.id = 'mob-btn';
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.style.cssText = 'display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;z-index:201;';
    var spans = btn.querySelectorAll('span');
    spans.forEach(function(s){ s.style.cssText='display:block;width:24px;height:2px;background:#c8a86c;transition:all 0.3s;'; });
    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'mob-overlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(7,7,7,0.98);z-index:199;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:40px;';
    var links = [['/', 'Home'],['/philosophy','Philosophy'],['/frameworks','Frameworks'],['/writing','Writing'],['/practice','Practice'],['/family-business','Family Business'],['/hros','HROS'],['/about','About']];
    links.forEach(function(l){
      var a = document.createElement('a');
      a.href = l[0]; a.textContent = l[1];
      a.style.cssText = 'font-size:18px;color:rgba(245,242,235,.52);text-decoration:none;letter-spacing:.08em;transition:color .2s;';
      a.onmouseover = function(){ a.style.color='#c8a86c'; };
      a.onmouseout = function(){ a.style.color='rgba(245,242,235,.52)'; };
      overlay.appendChild(a);
    });
    var cta = document.createElement('span');
    cta.textContent = 'Book a call';
    cta.style.cssText = 'margin-top:16px;display:inline-block;padding:12px 28px;background:#c8a86c;color:#2a1800;font-size:13px;font-weight:600;letter-spacing:.04em;cursor:pointer;border-radius:999px;';
    overlay.appendChild(cta);
    document.body.appendChild(overlay);
    var nav = document.querySelector('nav');
    nav.appendChild(btn);
    var open = false;
    function toggle(){
      open = !open;
      overlay.style.display = open ? 'flex' : 'none';
      spans[0].style.transform = open ? 'rotate(45deg) translateY(7px)' : 'none';
      spans[1].style.opacity = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translateY(-7px)' : 'none';
    }
    btn.onclick = toggle;
    overlay.onclick = function(e){ if(e.target===overlay) toggle(); };
    function checkSize(){
      if(window.innerWidth <= 1024){
        btn.style.display = 'flex';
        navLinks.style.display = 'none';
      } else {
        btn.style.display = 'none';
        navLinks.style.display = 'flex';
        if(open){ open=false; overlay.style.display='none'; }
      }
    }
    checkSize();
    window.addEventListener('resize', checkSize);
  })();`
];

export default function HomeScripts() {
  useEffect(() => {
    const nodes: HTMLScriptElement[] = [];
    for (const code of INLINE_SCRIPTS) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.text = code;
      document.body.appendChild(s);
      nodes.push(s);
    }
    return () => {
      for (const n of nodes) n.remove();
    };
  }, []);
  return null;
}
