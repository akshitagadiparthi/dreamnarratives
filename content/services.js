// ---------------------------------------------------------------------------
// The five services. Order here is the order everywhere on the site, and none
// is numbered: the studio's rule is that no service outranks another.
//
// ADDING WORK: you don't need to edit this file. Put photos/videos in
// incoming/<folder>/ and run `npm run images`; it fills content/work.json and
// the work appears automatically. The `work` lists below are placeholders
// used only until real work exists for that service.
// ---------------------------------------------------------------------------

import realWork from './work.json';

export const services = [
  {
    slug: 'invitation',
    name: ['The', 'Invitation'],
    label: 'Invites',
    promise: 'The first page of your story.',
    intro:
      'Wedding suites, e-invites, video invitations and printed collections, designed so the people you love feel the celebration before it begins. Every word, texture and fold is chosen to tell your story, and to be kept long after the day.',
    offers: [
      'E-invites & digital designs',
      'Video invites',
      'Wedding invitations & suites',
      'Save-the-date cards',
      'Event invitations',
      'Physical printed cards',
      'Premium invitation boxes',
      'Custom stationery',
    ],
    short: 'E-invites · Video · Print',
    hero: { src: null, caption: 'Invitation suite' },
    work: [
      { src: null, caption: 'Wedding invitation suite' },
      { src: null, caption: 'E-invite' },
      { src: null, caption: 'Video invite' },
      { src: null, caption: 'Save-the-date' },
      { src: null, caption: 'Invitation box' },
      { src: null, caption: 'Event stationery' },
    ],
    pairs: ['gift', 'identity'],
  },
  {
    slug: 'gift',
    name: ['The', 'Gift'],
    label: 'Gifting',
    promise: 'What your guests carry home.',
    intro:
      'Curated hampers, welcome boxes and wedding favours that feel deeply personal. We think about who will open each one, then build it piece by piece, from what goes inside to the ribbon that holds it together.',
    offers: [
      'Curated hampers',
      'Welcome & gift boxes',
      'Wedding favours',
      'Corporate gifting',
      'Event gifting collections',
    ],
    short: 'Hampers',
    hero: { src: null, caption: 'Wedding hamper' },
    work: [
      { src: null, caption: 'Wedding hamper' },
      { src: null, caption: 'Welcome box' },
      { src: null, caption: 'Wedding favours' },
      { src: null, caption: 'Festive collection' },
      { src: null, caption: 'Corporate gifting' },
      { src: null, caption: 'Hamper detail' },
    ],
    pairs: ['invitation', 'space'],
  },
  {
    slug: 'identity',
    name: ['The', 'Identity'],
    label: 'Branding & Social',
    leadBy: 'Nimisha',
    promise: 'Who you are, and how your story travels.',
    intro:
      'A brand is a story people recognise before they read a word. We shape the visual language that tells yours, from the mark, colours and type to the tone of every post, then carry it into the world through social media that people want to follow.',
    offers: [
      'Brand identity & visual language',
      'Logo & wordmark',
      'Brand stationery & packaging',
      'Social media management',
      'Content strategy & creation',
      'Marketing campaigns',
    ],
    short: 'Branding · Social media',
    hero: { src: null, caption: 'Brand identity' },
    work: [
      { src: null, caption: 'Brand identity' },
      { src: null, caption: 'Instagram feed' },
      { src: null, caption: 'Packaging' },
      { src: null, caption: 'Campaign' },
      { src: null, caption: 'Stationery' },
      { src: null, caption: 'Content shoot' },
    ],
    pairs: ['invitation', 'space'],
    // Instagram accounts the studio builds and manages. `image` is a screenshot
    // of the feed (kept in content/work.json under "identity").
    accounts: [
      { handle: 'verdant.stationery', name: 'Verdant Group', note: 'Stationery & office supplies', image: '/work/identity/social-media-verdant-stationery-feed.webp' },
      { handle: 'adika.vijayawada', name: 'Adika Vijayawada', note: 'Yoga, Pilates & wellness', image: '/work/identity/social-media-adika-vijayawada-feed.webp' },
      { handle: 'sassynary', name: 'Sassynary', note: 'Notebooks, planners & greetings', image: '/work/identity/social-media-sassynary-feed.webp' },
    ],
  },
  {
    slug: 'space',
    name: ['The', 'Space'],
    label: 'Interiors',
    leadBy: 'Driti',
    promise: 'Where your story lives.',
    intro:
      'Interiors and architectural consultation with an eye for proportion, texture and the quiet language of rooms. We listen to how you live, then design a space that finally feels like you.',
    offers: [
      'Interior design',
      'Architecture consultation',
      'Space planning',
      'Space styling',
      'Moodboards & concept development',
    ],
    short: 'Architecture & interiors',
    hero: { src: null, caption: 'Interior' },
    work: [
      { src: null, caption: 'Living room' },
      { src: null, caption: 'Concept moodboard' },
      { src: null, caption: 'Bedroom' },
      { src: null, caption: 'Detail' },
      { src: null, caption: 'Dining' },
      { src: null, caption: 'Styling' },
    ],
    pairs: ['gift', 'identity'],
  },
];

// Real work replaces placeholders wherever it exists.
for (const s of services) {
  const real = realWork[s.slug];
  if (real?.length) {
    real.forEach((w) => { w.alt = w.caption ? `${w.caption}, ${s.name.join(' ')} by Dream Narratives` : `${s.name.join(' ')} work by Dream Narratives`; });
    s.hero = real.find((w) => w.hero) || real.find((w) => w.src) || real[0];
    s.work = real.filter((w) => w !== s.hero || real.length === 1);
  }
}

export const getService = (slug) => services.find((s) => s.slug === slug);

// The Figma draft's "Bespoke Projects": not a service of its own, but an open door.
export const bespoke = {
  eyebrow: 'Something unique in mind?',
  title: ['We’d love to', 'hear it.'],
  body: 'Our favourite projects are the ones that don’t quite fit a category: custom commissions, art direction, special collaborations and deeply personal projects.',
};

// Pieces that drift around the moon on the home page: a mix from every service.
// Each piece shows real work from its service once there is some.
// Positions are % of the hero.
const pieces = [
  { service: 'invitation', caption: 'E-invite', src: null, left: 4, top: 14, w: 150, h: 200, tone: '', d: 22, x: 12, y: -14, r0: -3, r1: 1, m: [3, 13] },
  { service: 'gift', caption: 'Hamper', src: null, left: 2, top: 50, w: 140, h: 170, tone: 'bone', d: 28, x: -10, y: 12, r0: 2, r1: -1 },
  { service: 'space', caption: 'Interior', src: null, left: 17, top: 66, w: 170, h: 130, tone: '', d: 26, x: -16, y: 10, r0: 1, r1: 3, m: [4, 80] },
  { service: 'invitation', caption: 'Physical card', src: null, left: 82, top: 10, w: 150, h: 190, tone: 'line', d: 20, x: 10, y: -12, r0: 3, r1: 0, m: [68, 13] },
  { service: 'identity', caption: 'Brand', src: null, left: 86, top: 44, w: 120, h: 120, tone: '', d: 30, x: 14, y: -8, r0: 0, r1: 2, front: true },
  { service: 'gift', caption: 'Keepsake', src: null, left: 72, top: 64, w: 160, h: 130, tone: 'bone', d: 24, x: -12, y: -10, r0: -2, r1: 2, m: [64, 80] },
  { service: 'invitation', caption: 'Invite', src: null, left: 16, top: 30, w: 110, h: 140, tone: 'line', d: 32, x: 16, y: 8, r0: -1, r1: 1, front: true },
];

// Once there is real work, the floating tiles show only real work: the best
// pieces (heroes, then cut-out product shots) take the largest positions, and
// services are interleaved so the hero always shows the studio's range.
const rank = (w) => (w.cutout ? 0 : w.hero ? 2 : 1);
const queues = services
  .map((s) => (realWork[s.slug] || []).filter((w) => w.src && w.inHero !== false).map((w) => ({ ...w, service: s.slug })).sort((a, b) => rank(a) - rank(b)))
  .filter((q) => q.length);
const pool = [];
while (queues.some((q) => q.length)) queues.forEach((q) => q.length && pool.push(q.shift()));

export const heroPieces = pool.length
  ? [...pieces]
      .sort((a, b) => b.w - a.w)
      .slice(0, pool.length)
      .map((p, i) => {
        const w = pool[i];
        const width = Math.round(p.w * 1.15);
        const natural = Math.round((width * w.height) / w.width);
        // Photos are cropped to at most 4:5 so tall shots don't run off the screen.
        return { ...p, ...w, w: width, h: w.cutout ? natural : Math.min(natural, Math.round(width * 1.25)) };
      })
  : pieces;
