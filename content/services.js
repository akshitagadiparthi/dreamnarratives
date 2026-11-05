// ---------------------------------------------------------------------------
// The five services. Order here is the order everywhere on the site, and none
// is numbered: the studio's rule is that no service outranks another.
//
// ADDING WORK: put images in /public/work/<slug>/ and list them in `work`,
// e.g. { src: '/work/invitation/sharma-suite.jpg', caption: 'Hand-foiled suite' }.
// Video invites can use { video: '/work/invitation/reveal.mp4', poster: '…jpg' }.
// Any item without src/video shows an elegant placeholder.
// ---------------------------------------------------------------------------

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
    label: 'Branding',
    leadBy: 'Nimisha',
    promise: 'Who you are, made visible.',
    intro:
      'A brand is a story people recognise before they read a word. We shape the visual language that tells yours: the mark, the colours, the type and the tone, so every place your brand appears feels unmistakably you.',
    offers: [
      'Brand identity & visual language',
      'Logo & wordmark',
      'Creative direction',
      'Brand stationery & packaging',
      'Brand guidelines',
    ],
    short: 'Branding',
    hero: { src: null, caption: 'Brand identity' },
    work: [
      { src: null, caption: 'Brand identity' },
      { src: null, caption: 'Wordmark' },
      { src: null, caption: 'Packaging' },
      { src: null, caption: 'Stationery' },
      { src: null, caption: 'Brand guidelines' },
      { src: null, caption: 'Creative direction' },
    ],
    pairs: ['telling', 'space'],
  },
  {
    slug: 'telling',
    name: ['The', 'Telling'],
    label: 'Marketing',
    leadBy: 'Nimisha',
    promise: 'How your story travels.',
    intro:
      'Social media management, content strategy and campaigns that carry your brand into the world with the same care it was made with. We plan, design and tell, so your feed reads like a story people want to follow.',
    offers: [
      'Social media management',
      'Social media design',
      'Content strategy',
      'Marketing campaigns',
    ],
    short: 'Social media',
    hero: { src: null, caption: 'Social media' },
    work: [
      { src: null, caption: 'Instagram feed' },
      { src: null, caption: 'Campaign' },
      { src: null, caption: 'Reel' },
      { src: null, caption: 'Content shoot' },
      { src: null, caption: 'Launch campaign' },
      { src: null, caption: 'Social design' },
    ],
    pairs: ['identity', 'invitation'],
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

export const getService = (slug) => services.find((s) => s.slug === slug);

// The Figma draft's "Bespoke Projects": not a service of its own, but an open door.
export const bespoke = {
  eyebrow: 'Something unique in mind?',
  title: ['We’d love to', 'hear it.'],
  body: 'Our favourite projects are the ones that don’t quite fit a category: custom commissions, art direction, special collaborations and deeply personal projects.',
};

// Pieces that drift around the moon on the home page: a mix from every service.
// Swap `src` for real images as they arrive. Positions are % of the hero.
export const heroPieces = [
  { service: 'invitation', caption: 'E-invite', src: null, left: 5, top: 17, w: 170, h: 230, tone: '', d: 22, x: 12, y: -14, r0: -2, r1: 1, m: [5, 13] },
  { service: 'identity', caption: 'Stationery', src: null, left: 25, top: 14, w: 120, h: 84, tone: 'line', d: 27, x: 12, y: 10, r0: -2, r1: 1 },
  { service: 'space', caption: 'Interior', src: null, left: 71, top: 14, w: 210, h: 150, tone: '', d: 26, x: -16, y: 10, r0: 1, r1: 3 },
  { service: 'gift', caption: 'Keepsake', src: null, left: 88, top: 31, w: 110, h: 130, tone: 'bone', d: 19, x: -8, y: 14, r0: 3, r1: 0, front: true },
  { service: 'invitation', caption: 'Video invite', src: null, left: 2, top: 50, w: 110, h: 150, tone: 'line', d: 32, x: 16, y: 8, r0: -1, r1: 1, front: true },
  { service: 'gift', caption: 'Hamper', src: null, left: 18, top: 62, w: 150, h: 190, tone: 'bone', d: 28, x: -10, y: 12, r0: 2, r1: -1, m: [64, 79] },
  { service: 'identity', caption: 'Brand mark', src: null, left: 35, top: 80, w: 120, h: 86, tone: '', d: 30, x: 14, y: -8, r0: 0, r1: 2, front: true },
  { service: 'telling', caption: 'Social', src: null, left: 60, top: 72, w: 180, h: 130, tone: 'bone', d: 24, x: -12, y: -10, r0: 2, r1: -2, m: [6, 81] },
  { service: 'invitation', caption: 'Physical card', src: null, left: 81, top: 55, w: 140, h: 190, tone: 'line', d: 20, x: 10, y: -12, r0: -3, r1: 0, m: [72, 15] },
];
