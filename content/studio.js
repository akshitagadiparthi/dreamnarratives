// ---------------------------------------------------------------------------
// The founders, the studio's story, values and process.
// Portraits: add /public/images/driti.jpg and /public/images/nimisha.jpg and
// set `portrait` below. Qualifications can be added to `credentials`.
// ---------------------------------------------------------------------------

export const founders = [
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
];

// The studio's own words (Our Story, supplied by Driti & Nimisha).
export const story = {
  eyebrow: 'Our story',
  title: ['Before it had a name,', 'it was our “big fish.”'],
  // Short version, used on the home page.
  body: [
    'Dream Narratives began long before we knew what it would look like—with two best friends in school, dreaming of starting a business together someday.',
    'In January 2026, the dream we had carried since high school became Dream Narratives—a design house by Driti and Nimisha.',
  ],
  quote: 'Every dream has a story. We narrate them through our designs.',
  photos: [
    { src: '/images/founders-walking.webp', alt: 'Driti and Nimisha laughing together as they walk across a lawn' },
    { src: '/images/founders-bench.webp', alt: 'Nimisha standing and Driti seated on a mosaic bench, sharing a laugh' },
  ],
  wide: { src: '/images/founders-wide.webp', alt: 'Driti and Nimisha sharing a laugh in a garden' },
  // Full version, used on Who are we? Strings are paragraphs; { pull } is a
  // pull quote and { highlight } a paragraph set larger.
  full: [
    'Dream Narratives began long before we knew what it would look like—with two best friends in school, dreaming of starting a business together someday. It was our little best-friend pact, a future we loved imagining even without knowing how we would get there.',
    'Life eventually took us in different directions. We left for college, pursued our studies, and found our own creative interests. Driti’s path led to architecture and interiors, while Nimisha’s led to marketing and visual communication. When we both returned to Vijayawada for good, we found ourselves revisiting that familiar dream, this time with different experiences and something of our own to bring to it.',
    { pull: 'Our project. Our dream. Our “big fish.”' },
    'That was what we called it in our conversations, while we were still imagining everything it could become. Then, on a seemingly ordinary day, we decided to go for it. Before we had quite caught up with ourselves, we had two clients, a name, and a logo. Everything began taking shape.',
    { highlight: 'In January 2026, the dream we had carried since high school became Dream Narratives—a design house by Driti and Nimisha.' },
    'Today, our work brings together the worlds we each love: architecture and interiors, branding and creative communication, wedding invitations, and thoughtful gifting. Across these different forms of design, our starting point is always the person behind the brief—their ideas, memories, taste, and hopes for what we can create together.',
    'Our name reflects that approach. Every project begins with a dream, whether it is clearly imagined or still finding its shape. We listen, understand, and translate it into something personal and considered. From the atmosphere of a room to the texture of an invitation, each detail helps tell the story.',
    'We are drawn to warmth, understated elegance, and designs that feel thoughtfully put together, with room for each client’s personality. We want people to recognise a little of themselves in what we create.',
    'Helping someone bring their vision to life feels especially meaningful because we remember how ours began. At its heart, Dream Narratives still holds those school-day conversations: two best friends, big ideas, and the joy of building something together.',
  ],
};

// A client told across several services, featured on the home page.
export const featured = {
  eyebrow: 'One client, many chapters',
  name: 'Adika, Vijayawada',
  body: 'For Adika, we designed the space, the branded hampers and the story on its Instagram: one client, told across three of our crafts.',
  links: [
    { service: 'space', label: 'A Pilates studio' },
    { service: 'gift', label: 'Branded hampers' },
    { service: 'identity', label: 'Its Instagram', href: 'https://www.instagram.com/adika.vijayawada' },
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

// FAQ: only questions with an answer are shown. The Figma draft listed these
// questions without answers; fill them in to make them appear.
export const faq = [
  {
    q: 'How does the process work?',
    a: 'We start with a discovery call to understand your vision, timeline and budget. From there, we build a bespoke creative direction, share concepts for your feedback, and refine until everything feels exactly right. Every project is collaborative and personal.',
  },
  { q: 'Do you work internationally?', a: null },
  { q: 'Can I request custom designs?', a: null },
  { q: 'How far in advance should I book?', a: null },
  { q: 'Do you offer printing services?', a: null },
  { q: 'Do you offer architecture consultations online?', a: null },
  { q: 'What is your pricing like?', a: null },
];
