// ---------------------------------------------------------------------------
// The studio's story, from the client's Figma draft, lightly extended.
// Portraits: add /public/images/driti.jpg and /public/images/nimisha.jpg and
// set `portrait` below. Qualifications can be added to `credentials`.
// ---------------------------------------------------------------------------

export const founders = [
  {
    name: 'Driti',
    role: 'Creative Director',
    portrait: null,
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
    portrait: null,
    bio: [
      'Nimisha turns stories into brands people remember. With deep expertise in digital marketing, creative direction and content strategy, she crafts narratives that resonate, translating a brand’s soul into visuals, words and campaigns that stick.',
      'She leads The Identity and The Telling, and makes sure every story the studio designs finds the people it was meant for.',
    ],
    tags: ['Digital marketing', 'Branding', 'Content strategy', 'Creative campaigns'],
    credentials: [],
    leads: ['identity', 'telling'],
  },
];

export const story = {
  eyebrow: 'Our story',
  title: ['A dream that grew', 'up with us.'],
  body: [
    'Driti and Nimisha have been dreaming together since childhood: filling notebooks with sketches, crafting gifts for everyone they loved, and imagining a world where every moment felt beautifully designed.',
    'Years later, those childhood daydreams have become Dream Narratives, a creative studio where every project carries the same warmth, care and intention that started it all.',
  ],
  quote: 'Every dream has a story. We design the narrative.',
};

export const friendship = {
  eyebrow: 'Friendship first',
  title: ['Best friends before', 'business partners.'],
  body: [
    'It started with school notebooks filled with ideas, birthday decorations made by hand, and hours of dreaming about what it would feel like to create something real together. Long before Dream Narratives had a name, it had a feeling.',
    'Driti and Nimisha grew up making things for the people they loved: crafting gifts, designing invitations, reimagining spaces. Their friendship was always creative at its core.',
    'Dream Narratives is what happens when two childhood best friends finally say yes to the dream they have been nurturing for years. It is personal. It is intentional. And it is made with love.',
  ],
  quote: 'Stories deserve beautiful beginnings.',
};

export const timeline = [
  { year: '2010', text: 'Two best friends in school who never stopped dreaming, sketching and creating together.' },
  { year: '2015', text: 'Endless mood boards, handmade gifts, and a quiet promise: someday we’ll build something real.' },
  { year: '2019', text: 'Different cities, different paths, but the same shared vision kept pulling them back.' },
  { year: '2022', text: 'Reunited by purpose, they began building what would become Dream Narratives.' },
  { year: '2024', text: 'Dream Narratives opens its doors: a studio born from friendship, imagination and love.' },
];

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
