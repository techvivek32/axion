# Axion Index — Next.js

One-page site converted from `axionindex_homepage_v4_4.html` into a Next.js 15 (App Router) project. Every style, font, section, animation, and inline script from the original HTML is preserved byte-for-byte.

## Structure

```
axion-index-next/
├── app/
│   ├── globals.css       ← all CSS from the original <style> block
│   ├── layout.tsx        ← root layout, loads Google Fonts
│   ├── page.tsx          ← home page, renders the full body markup
│   └── HomeScripts.tsx   ← runs the original inline scripts client-side
├── scripts/
│   └── split-html.mjs    ← regenerates app/* from the source HTML
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Run it

```bash
cd axion-index-next
npm install
npm run dev        # http://localhost:3000
```

Then build for production:

```bash
npm run build
npm start
```

## Regenerating from the source HTML

If you edit `../axionindex_homepage_v4_4.html` and want the Next.js page to pick up the changes:

```bash
npm run regen
```

This re-splits the HTML into `app/globals.css`, `app/page.tsx`, and `app/HomeScripts.tsx`.

## How the conversion works

The source HTML is ~274 KB of hand-tuned markup with one large inline `<style>` block, one base64 hero image, and two inline `<script>` blocks (ticker rotation + fan accordion). The split script in `scripts/split-html.mjs`:

1. Pulls the `<style>` contents into `app/globals.css`.
2. Puts every `<link rel="stylesheet">` from the `<head>` into the `<head>` of `app/layout.tsx` (the Playfair Display + Inter Google Fonts link).
3. Injects the `<body>` innerHTML into `app/page.tsx` via `dangerouslySetInnerHTML`, so the exact original markup (including the base64 hero JPEG, SVG logo, vertical labels, ticker strip, accordions, and CTA panel) is rendered unchanged.
4. Emits the inline `<script>` blocks into `app/HomeScripts.tsx` — a client component that appends them as real `<script>` tags on mount, so the ticker interval and the `setFan(i)` accordion handler work exactly like they did in the single-file version.
