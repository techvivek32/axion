// One-shot converter: takes the original HTML file and splits it into
// the pieces a Next.js App Router project needs, preserving every byte
// of markup, CSS, and JS from the source.
//
//   input : ../axionindex_homepage_v4_4.html  (sibling of the next project)
//   output: app/globals.css
//           app/page.tsx
//           app/HomeScripts.tsx
//           app/layout.tsx
//
// Run from the project root:  node scripts/split-html.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcHtml = resolve(root, '..', 'axionindex_homepage_v4_4.html');

const html = readFileSync(srcHtml, 'utf8');

// ---- extract <style>…</style> ----
const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (!styleMatch) throw new Error('no <style> block found');
const css = styleMatch[1].trim();

// ---- extract every <script>…</script> (preserve order) ----
const scripts = [];
const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRe.exec(html)) !== null) scripts.push(m[1].trim());

// ---- isolate the <body> innerHTML, minus scripts and style ----
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!bodyMatch) throw new Error('no <body> block found');
let body = bodyMatch[1];
body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
body = body.trim();

// ---- extract <title> ----
const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
const title = titleMatch ? titleMatch[1].trim() : 'Axion Index';

// ---- extract <link rel="stylesheet"> tags from <head> (fonts etc.) ----
const linkRe = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi;
const links = [];
let lm;
while ((lm = linkRe.exec(html)) !== null) links.push(lm[0]);

// ---- write files ----
const appDir = resolve(root, 'app');
mkdirSync(appDir, { recursive: true });

writeFileSync(resolve(appDir, 'globals.css'), css + '\n', 'utf8');

// layout.tsx — head links + title + font import
const layout = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: ${JSON.stringify(decodeEntities(title))},
  description: 'Operating Intelligence for the Future of Work',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
${links.map((l) => '        ' + l.replace(/\/?>$/, '/>')).join('\n')}
      </head>
      <body>{children}</body>
    </html>
  );
}
`;
writeFileSync(resolve(appDir, 'layout.tsx'), layout, 'utf8');

// HomeScripts.tsx — client component that runs the original inline scripts
const homeScripts = `'use client';
import { useEffect } from 'react';

const INLINE_SCRIPTS: string[] = ${JSON.stringify(scripts, null, 2)};

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
`;
writeFileSync(resolve(appDir, 'HomeScripts.tsx'), homeScripts, 'utf8');

// page.tsx — renders the body markup verbatim via dangerouslySetInnerHTML
// (the markup is plain HTML, so JSX conversion would be error-prone at this
// size; this preserves 100% of the original design and animations)
const page = `import HomeScripts from './HomeScripts';

const BODY_HTML = ${JSON.stringify(body)};

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <HomeScripts />
    </>
  );
}
`;
writeFileSync(resolve(appDir, 'page.tsx'), page, 'utf8');

console.log('wrote:');
console.log('  app/globals.css   ', css.length, 'chars');
console.log('  app/layout.tsx    ', links.length, 'link tag(s)');
console.log('  app/page.tsx      ', body.length, 'chars of body html');
console.log('  app/HomeScripts.tsx', scripts.length, 'inline script(s)');

// ---- tiny helper ----
function decodeEntities(s) {
  return s
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
