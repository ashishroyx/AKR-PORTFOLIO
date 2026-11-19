export type QuixtaProject = {
  slug: string
  title: string
  techStack: string
  highlights: string[]
}

export const quixtaProjects: QuixtaProject[] = [
  {
    slug: 'quixta-revamp',
    title: 'Quixta Revamp',
    techStack:
      'Next.js 16.2, React 19.2, TypeScript 5.7, Payload CMS 3.85, PostgreSQL, Tailwind CSS 4, GSAP, Framer Motion, Three.js, AWS S3, Docker',
    highlights: [
      'Shipped the public site and CMS: 30 routes and 22 collections, including case-study draft and preview, authors, solutions, portfolio, and the Bangalore landing page.',
      'Added the Search Console 301 map, sitemap last-modified dates, and FAQ JSON-LD so old URLs and rich results resolve correctly.',
      'Put pages on ISR and deferred below-the-fold sections so the first screen does not load the rest of the page.',
      'Made production builds reliable: self-hosted fonts in Docker and CI, and Postgres connections that survive static generation.',
      'Tracked consultation leads with visit and page-journey attribution, so a lead is tied to the pages that produced it.',
      'Opened Google Maps in the content security policy so the office map renders in production instead of being blocked.',
    ],
  },
  {
    slug: 'bartendersnow',
    title: 'BartendersNow',
    techStack:
      'Next.js 14, React 18/19, TypeScript, Vite, MUI 7, Tailwind CSS 4, TanStack Query, React Hook Form, Zod, Firebase 11/12, React Router 7, Stripe, PWA',
    highlights: [
      'Built the host event wizard, about 18 steps from name and location through legal, license, beverage menu, and setup. Each step writes to Firestore immediately, the event starts as a draft, and the host can leave and resume it.',
      'Enforced booking rules: private events stay visible only to the host, Find Bartenders returns people inside the event travel range, and a request or accept is blocked until a payment method is on file.',
      'Shipped Stripe on the dashboard and event screens: identity verification, saved cards, platform fees, and payment notifications on bookings.',
      'Shipped in-app chat and Firebase push. Unread count, profile photo, character limit, and auto-scroll on the thread. A notification tap opens the matching screen.',
      'Built host bartender search on Bartender_Search: rank by event, host city, map pin, or Firestore market, using 50-mile, 300-mile, and 500-mile rules. A custom pin uses a 50-mile area, a market is capped at 300 miles, the host default is 500 miles, and anyone with a 0-mile travel limit is left out. Missing travel limits fall back to 300 miles. Event search still requires they can reach the venue.',
      'Replaced the address form with a dark Google Map. Panning the map drops the pin, reverse-geocodes the center, and searches that lat/lng. Select stays off until a point exists.',
      'Built moderation around Cloud Functions: ban and unban, report handling, and an audit row on each action. Event enforcement updates status, history, bartender visibility, and the audit log in one write.',
      'Shipped the stock-list module, about 3,500 lines: ingredients, recipes, recipe quantities, formula health, and archive, on top of the shared table that reads every Firestore timestamp shape and stays usable on a phone.',
      'Event, report, and audit dates were blank because Cloud Functions return Firestore times in different shapes. The table now reads toDate(), seconds, _seconds, a number, or a string, and falls through startTime, createdAt, status date, and dateTime.',
    ],
  },
  {
    slug: 'profx',
    title: 'ProFx',
    techStack:
      'Next.js 16.1, React 19.2, TypeScript 5.9, Tailwind CSS 4, Directus, Docker',
    highlights: [
      'Header, mega-menus, and footer were 9 Directus calls in sequence, about 1.5–3 seconds per request. They now run in one parallel fetch, cached for 1 hour, and a CMS publish clears that cache by tag.',
      'Brand, category, and series pages were firing 8–12 identical Directus queries a second during ISR warm-up. Those collections are cached for 1 hour, and the page and its metadata share one fetch.',
      'Product pages no longer pull every product with limit: -1. Category counts read only id and category, capped at 2,000.',
      'The hero downloaded the same 10–15 MB MP4 twice, once for desktop and once for mobile, during first paint. It is one video now, started after first paint with requestIdleCallback.',
      'Directus images were returning HTTP 400 on transform params, and the Next.js image proxy failed because the CMS host resolves to a private IP. A custom loader serves the asset directly, cached 24 hours.',
      'Server fetches use the Docker-internal Directus URL, so traffic stays on the container network. /sitemap.xml is cached 24 hours, capped at 500 slugs and 3,000 products.',
      'Moved Poppins off a blocking Google Fonts stylesheet onto next/font with display: swap. Junk slugs such as .php and .env 404 before any Directus call.',
    ],
  },
  {
    slug: 'nanolumi',
    title: 'Nanolumi',
    techStack:
      'Next.js 15.3, React 19.1, Payload CMS 3.53, PostgreSQL, AWS S3, GSAP, Framer Motion, Tailwind CSS, Docker',
    highlights: [
      'Stopped Docker builds from failing when global CMS data comes back null.',
      'Pinned pnpm 9.15.9 in every Docker stage so installs match local.',
      'Updated dependencies, including the React security patch.',
    ],
  },
]

export function getQuixtaProjects() {
  return quixtaProjects
}
