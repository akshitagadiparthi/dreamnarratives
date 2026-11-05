// ---------------------------------------------------------------------------
// The founders, the studio's story, values and process.
// Portraits: add /public/images/driti.jpg and /public/images/nimisha.jpg and
// set `portrait` below. Qualifications can be added to `credentials`.
// ---------------------------------------------------------------------------

export const founders = [
  {
    name: 'Nimisha',
    role: 'Creative & Marketing Director',
    portrait: '/images/nimisha.webp',
    bio: [
      'Nimisha turns stories into brands people remember. With deep expertise in digital marketing, creative direction and content strategy, she crafts narratives that resonate, translating a brand’s soul into visuals, words and campaigns that stick.',
      'She leads The Identity, from the first sketch of a logo to the feed that carries it, and makes sure every story the studio designs finds the people it was meant for.',
    ],
    tags: ['Digital marketing', 'Branding', 'Content strategy', 'Creative campaigns'],
    credentials: [],
    leads: ['identity'],
  },
  {
    name: 'Driti',
    role: 'Creative Director',
    portrait: '/images/driti.webp',
    bio: [
      'Driti sees stories in spaces. As Creative Director specialising in architecture, interior design and spatial storytelling, she brings an architectural eye to every project, finding beauty in proportion, texture and the quiet language of rooms.',
      'She leads The Space, and her sense of proportion shapes everything the studio makes, from the fold of a card to the layout of a home.',
    ],
    tags: ['Architecture', 'Interior design', 'Spatial storytelling', 'Design concepts'],
    credentials: [], // e.g. 'B.Arch, School of Planning and Architecture'
    leads: ['space'],
  },
];

// The studio's own words (Our Story, supplied by Driti & Nimisha).
export const story = {
  eyebrow: 'Our story',
  title: ['Before it had a name,', 'it was our “big fish.”'],
  // Short version, used on the home page.
  body: [
    'In January 2026, the dream we had carried since high school became Dream Narratives—a design house by Driti and Nimisha.',
  ],
  quote: 'Every dream has a story. We narrate them through our designs.',
  photos: [
    { src: '/images/founders-walking.webp', alt: 'Driti and Nimisha laughing together as they walk across a lawn' },
    { src: '/images/founders-bench.webp', alt: 'Nimisha standing and Driti seated on a mosaic bench, sharing a laugh' },
  ],
  wide: { src: '/images/founders-wide.webp', alt: 'Driti and Nimisha sharing a laugh in a garden' },
  // Short version for Who are we?, in the founders' own words.
  short: 'Two best friends in school with a little pact: to start a business together someday. College took us in different directions, Driti to architecture and interiors, Nimisha to marketing and visual communication. Back home in Vijayawada, we picked the dream up again, and in January 2026 our “big fish” became Dream Narratives.',
};

// A client told across several services, featured on the home page.
export const featured = {
  eyebrow: 'One client, many chapters',
  name: 'Adika, Vijayawada',
  body: 'For Adika, we designed the space, the branded hampers and the story on its Instagram: one client, told across three of our crafts.',
  links: [
    { service: 'space', label: 'The façade and studio', image: '/work/space/interiors-adika-vijayawada-facade.webp' },
    { service: 'gift', label: 'Branded hampers', image: '/work/gift/adika-hamper-contents.webp' },
    { service: 'identity', label: 'Its Instagram', href: 'https://www.instagram.com/adika.vijayawada', image: '/work/identity/social-media-adika-vijayawada-feed.webp' },
  ],
};

export const values = ['Thoughtful design', 'Meaningful stories', 'Personal connection', 'Timeless creativity', 'Attention to detail'];

export const process = [
  { title: 'Discover', text: 'We listen deeply to your vision, your dreams and the story you want to tell.' },
  { title: 'Imagine', text: 'We explore concepts, moods and directions, building the world of your project.' },
  { title: 'Design', text: 'Every detail is crafted with intention, from typography to texture to tone.' },
  { title: 'Refine', text: 'We collaborate closely, polishing until everything feels exactly right.' },
  { title: 'Deliver', text: 'Your story is handed to you, complete, beautiful and ready to be remembered.' },
];

// ⚠️ CONFIRM BEFORE LAUNCH: these quotes came from the Figma draft. Only switch
// `show` to true once each is a real client's words, used with their permission.
export const testimonials = {
  show: false,
  items: [
    { quote: 'They didn’t just design our invitation. They captured our story; every element felt like it was made for us alone.', name: 'Priya & Arjun M.', project: 'Wedding suite, 2024' },
    { quote: 'Working with Dream Narratives felt like collaborating with someone who understood our brand better than we did. The result was beyond what we imagined.', name: 'Meera S.', project: 'Brand identity, 2024' },
    { quote: 'Our home finally feels like us. Driti saw something in the space that we couldn’t see ourselves, and she brought it to life beautifully.', name: 'Riya & Karan J.', project: 'Interior design, 2023' },
  ],
};

// FAQ, shown on Contact (and read by Google as an FAQ).
// ⚠️ CONFIRM BEFORE LAUNCH: answers marked "confirm" describe how the studio
// works; check them with Driti & Nimisha.
export const faq = [
  {
    q: 'How does a project with Dream Narratives work?',
    a: 'It starts with your enquiry and a discovery call, where we listen to your vision, timeline and budget. We then share a creative direction and concepts, refine them with you until everything feels right, and deliver the finished piece, whether that’s an invitation suite, a hamper, a brand or a room.',
  },
  {
    q: 'Do you only work in Vijayawada?',
    a: 'We’re based in Vijayawada and design for families and brands across Andhra Pradesh, Telangana and beyond. E-invites, video invites and branding are delivered digitally, so distance is no barrier. Interiors and physical deliveries depend on the location, so tell us where you are in your enquiry.',
  },
  {
    q: 'Can you design invitations in Telugu?',
    a: 'Yes. Many of our invitations are bilingual, in Telugu and English, from the traditional pelli pathrika to e-invites for every function. Let us know the languages you’d like and we’ll design the typography for both.',
  },
  {
    q: 'What’s the difference between an e-invite, a video invite and a physical card?',
    a: 'An e-invite is a designed image or set of images you share on WhatsApp. A video invite brings your story to life with motion and music. A physical card or invitation box is printed and handed over. Many families choose a mix: physical suites for close family, and e-invites for everyone else.',
  },
  {
    q: 'How far in advance should I book?', // confirm
    a: 'As early as you can, especially for weddings. As a guide, allow a few weeks for e-invites, and more for printed suites, invitation boxes and large hamper orders, which need time for production. If your date is close, enquire anyway and we’ll tell you honestly what’s possible.',
  },
  {
    q: 'Can you do wedding favours and corporate gifting in bulk?',
    a: 'Yes. We curate hampers from a handful of keepsakes to large wedding and corporate orders, personalised with names, monograms or a note, and delivered to one address or many.',
  },
  {
    q: 'Do you manage social media on an ongoing basis?', // confirm
    a: 'Yes. Beyond building your brand identity, Nimisha and the team plan, design and run Instagram for brands like Adika Vijayawada, Verdant and Sassynary. Tell us about your brand and goals and we’ll suggest the right scope.',
  },
  {
    q: 'What does it cost?',
    a: 'Every project is designed from scratch, so we quote each one individually. The enquiry form has optional budget ranges to help us suggest what fits, and we’ll always be clear about cost before any work begins.',
  },
  {
    q: 'How do I get your phone number?',
    a: 'Send us an enquiry, and Driti and Nimisha’s direct numbers and WhatsApp appear as soon as it’s sent. Until then, you can always reach us on Instagram or by email.',
  },
];
