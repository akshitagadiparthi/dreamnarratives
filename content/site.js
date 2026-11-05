// ---------------------------------------------------------------------------
// Studio details. Everything a visitor uses to reach the founders lives here.
// Phone numbers are NOT here: they're private (lib/private-contact.js) and
// only shown to visitors after they send an enquiry.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Dream Narratives',
  byline: 'by Driti & Nimisha',
  tagline: 'Narrating dreams through design.',
  footerLine: 'A childhood dream, thoughtfully designed into reality.',
  description:
    'Dream Narratives is a design house in Vijayawada by Driti and Nimisha: wedding invitations and e-invites, curated hampers, branding and social media, and architecture and interiors, for families and brands across Andhra Pradesh and Telangana.',
  city: 'Vijayawada',
  region: 'Andhra Pradesh',
  country: 'IN',
  founded: '2026-01',
  founders: ['Driti', 'Nimisha'],
  areaServed: ['Vijayawada', 'Guntur', 'Amaravati', 'Visakhapatnam', 'Hyderabad', 'Andhra Pradesh', 'Telangana'],
  keywords: [
    'Dream Narratives', 'Dream Narratives Vijayawada', 'Driti', 'Nimisha', 'Driti and Nimisha',
    'design studio Vijayawada', 'wedding invitations Vijayawada', 'e-invites Vijayawada', 'wedding invitation designer Vijayawada',
    'video invitations', 'Telugu wedding invitations', 'pelli pathrika', 'wedding hampers Vijayawada', 'gift hampers Vijayawada',
    'branding agency Vijayawada', 'social media management Vijayawada', 'interior designer Vijayawada', 'architecture Vijayawada',
  ],
  // The live address. Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://dreamnarratives.vercel.app'),

  // The studio's logo: dark ink for light grounds, light for the footer.
  logo: { ink: '/images/logo-ink.webp', light: '/images/logo-light.webp', width: 600, height: 186 },

  contact: {
    // Phone and WhatsApp numbers are private: see lib/private-contact.js.
    instagram: 'dreamnarratives',
    email: 'hello@dreamnarratives.co',
    responseTime: 'We respond to all enquiries within 24–48 hours.',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Who are we?', href: '/who-we-are' },
  { label: 'What do we do?', href: '/what-we-do', services: true },
  { label: 'Contact us', href: '/contact' },
];

export const enquireLink = { label: 'Enquire', href: '/enquiries' };
