# Seven Speak

Premium editorial website for **Seven Speak** — personalized English lessons by Renata.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Motion (`motion/react`)
- GSAP + ScrollTrigger
- Lenis
- Lucide React
- React Bits–inspired components (in `src/components/bits`)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content

Edit centrally:

- `src/config/site.ts` — brand, WhatsApp, social
- `src/data/plans.ts` — pricing
- `src/data/*` — steps, programs, FAQ, testimonials, resources

## Security

This is a static marketing site (no login, forms, API, or database). Hardening lives in:

- `public/_headers` — Netlify / Cloudflare Pages
- `vercel.json` — Vercel
- `index.html` — CSP + referrer meta as a fallback when the host ignores `_headers`

Headers applied:

- **CSP** — scripts only from `'self'`; styles allow `'unsafe-inline'` (Tailwind / Motion / GSAP); Google Fonts only for CSS/fonts; images `'self'` only; `object-src 'none'`; `frame-ancestors 'none'`
- **X-Frame-Options: DENY** — blocks clickjacking embeds
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** — camera, mic, geolocation, payment disabled

The WhatsApp number in `src/config/site.ts` is **public by design** (client-side `wa.me` links). Serve the site over **HTTPS** on your host; enable HSTS in the host dashboard after HTTPS is active (not configured in Vite).

If you add YouTube, analytics, or image CDNs later, tighten the CSP by allowing **only** those exact origins — never open domains “just in case”.
