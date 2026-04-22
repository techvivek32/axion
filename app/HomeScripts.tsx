'use client';
import { useEffect } from 'react';

const INLINE_SCRIPTS: string[] = [
  "var signals=[\n  \"Labour Codes: 50% wage rule impact on PF exposure — are you correctly classified?\",\n  \"AI Compression: Middle-layer cognitive work compressing 3x faster than role redesign\",\n  \"Decision Risk: Most organisations cannot map who owns which decision after two layers\",\n  \"Compliance Signal: Labour Code readiness below 40% across Indian mid-market firms\",\n  \"Operating Rhythm: Organisations that scaled rhythm saw 2.4x lower regulatory exposure\",\n  \"Judgment Scarcity: As AI makes intelligence abundant, decision ownership becomes the scarce resource\"\n];\nvar idx=0;\nfunction rotateTicker(){\n  var el=document.getElementById('ticker-text');\n  var wrap=document.getElementById('ticker-inner');\n  wrap.style.opacity='0';\n  setTimeout(function(){\n    idx=(idx+1)%signals.length;\n    el.textContent=signals[idx];\n    wrap.style.opacity='1';\n  },400);\n}\ndocument.getElementById('ticker-text').textContent=signals[0];\nsetInterval(rotateTicker,7000);",
  "function setFan(i){document.querySelectorAll('.fc').forEach(function(c,j){c.classList.toggle('on',j===i)})}"
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
