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
    seoName: 'Wedding Invitations & E-invites in Vijayawada',
    seoDescription: "Wedding invitations, e-invites, video invites, wedding logos and printed invitation boxes designed in Vijayawada by Dream Narratives: Telugu pelli pathrika, monograms, save-the-dates and stationery for every function.",
    name: ['The', 'Invitation'],
    label: 'Invites',
    promise: 'The first page of your story.',
    intro:
      'Wedding suites, e-invites, video invitations, wedding logos and printed collections, designed so the people you love feel the celebration before it begins. Every word, texture and fold is chosen to tell your story, and to be kept long after the day.',
    offers: [
      'E-invites & digital designs',
      'Video invites',
      'Wedding invitations & suites',
      'Save-the-date cards',
      'Event invitations',
      'Physical printed cards',
      'Premium invitation boxes',
      'Wedding logos & monograms',
      'Custom stationery',
    ],
    short: 'E-invites · Video · Print · Logos',
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
    seoName: 'Wedding Hampers & Gifting in Vijayawada',
    seoDescription: "Curated wedding hampers, welcome boxes, bridesmaids' gifts and corporate gifting designed in Vijayawada by Dream Narratives, personalised for every guest.",
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
    seoName: 'Branding, Logo Design & Social Media Marketing in Vijayawada',
    seoDescription: "Brand identity, logo design, stationery, packaging and social media marketing from Vijayawada. Dream Narratives designs brands and the Instagram feeds that carry them, led by Nimisha Lingamaneni.",
    name: ['The', 'Identity'],
    label: 'Branding & Social',
    leadBy: 'Nimisha',
    promise: 'Who you are, and how your story travels.',
    intro:
      'A brand is a story people recognise before they read a word. We shape the visual language that tells yours, from the mark, colours and type to the stationery and packaging, then carry it into the world through social media marketing people want to follow.',
    offers: [
      'Brand identity & visual language',
      'Logo & wordmark',
      'Brand stationery & packaging',
      'Brand guidelines',
      'Social media management',
      'Content strategy & creation',
      'Marketing campaigns',
      'Launch strategy',
    ],
    // The page is told in two parts.
    branding: {
      eyebrow: 'Branding',
      title: ['Identities,', 'made to be remembered.'],
      lede: 'The mark, the colours, the type and the paper it all lives on. We design the whole identity so a brand looks like itself everywhere.',
      offers: ['Brand identity & visual language', 'Logo & wordmark', 'Brand stationery & packaging', 'Brand guidelines'],
    },
    social: {
      eyebrow: 'Social media marketing',
      title: ['Brands we', 'tell.'],
      lede: 'We plan, design and grow Instagram feeds in each brand’s own voice: the strategy, the content calendar, the posts and the campaigns. Tap through to see them live.',
      offers: ['Social media management', 'Content strategy & creation', 'Marketing campaigns', 'Launch strategy'],
    },
    short: 'Branding · Social media marketing',
    hero: { src: null, caption: 'Brand identity' },
    work: [
      { src: null, caption: 'Brand identity' },
      { src: null, caption: 'Instagram feed' },
      { src: null, caption: 'Packaging' },
      { src: null, caption: 'Campaign' },
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
    seoName: 'Interior Design & Architecture in Vijayawada',
    seoDescription: "Interior design, architecture consultation and space styling in Vijayawada, led by architect Driti Thyagaraj of Dream Narratives: homes, studios and commercial spaces with warmth and proportion.",
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

// The home hero: the signature piece on its plinth, and a few pieces of work
// around it, one from each of the other services where there is one.
const allReal = services.flatMap((s) => (realWork[s.slug] || []).map((w) => ({ ...w, service: s.slug })));
export const heroFeature = allReal.find((w) => w.src && w.cutout && w.hero) || null;

const pickTile = (slug, test = () => true) => (realWork[slug] || []).map((w) => ({ ...w, service: slug })).find((w) => w.src && !w.cutout && w.inHero !== false && test(w));
export const heroTiles = [
  pickTile('invitation', (w) => w.kind === 'e-invites'),
  pickTile('space'),
  pickTile('gift'),
  pickTile('invitation', (w) => w.kind === 'physical-cards'),
].filter(Boolean);

// "Best of": a short selection across the house for the home page.
export const bestOf = (() => {
  const want = [
    ['invitation', (w) => w.kind === 'e-invites'],
    ['space', () => true],
    ['invitation', (w) => w.kind === 'logos'],
    ['gift', (w) => !w.cutout],
    ['identity', (w) => w.kind === 'branding'],
    ['invitation', (w) => w.kind === 'physical-cards' && !w.cutout],
  ];
  const used = new Set([heroFeature?.src, ...heroTiles.map((t) => t.src), ...services.map((s) => s.hero?.src)]);
  return want
    .map(([slug, test]) => {
      const w = (realWork[slug] || []).find((x) => x.src && !used.has(x.src) && test(x));
      if (w) used.add(w.src);
      return w ? { ...w, service: slug } : null;
    })
    .filter(Boolean);
})();
