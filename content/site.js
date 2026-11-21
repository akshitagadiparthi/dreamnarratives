// ---------------------------------------------------------------------------
// Studio details. Everything a visitor uses to reach the founders lives here.
// Phone numbers are NOT here: they're private (lib/private-contact.js) and
// only shown to visitors after they send an enquiry.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Dream Narratives',
  byline: 'by Nimisha & Driti',
  tagline: 'Narrating dreams through design.',
  footerLine: 'A childhood dream, thoughtfully designed into reality.',
  description:
    'Dream Narratives is a design house in Vijayawada by Nimisha Lingamaneni and Driti Thyagaraj: wedding invitations, e-invites, video invites and wedding logos, curated hampers, branding and social media marketing, and architecture and interiors, for families and brands across Andhra Pradesh and Telangana.',
  city: 'Vijayawada',
  region: 'Andhra Pradesh',
  country: 'IN',
  founded: '2026-01',
  founders: ['Nimisha Lingamaneni', 'Driti Thyagaraj'],
  areaServed: ['Vijayawada', 'Guntur', 'Amaravati', 'Visakhapatnam', 'Hyderabad', 'Andhra Pradesh', 'Telangana'],
  keywords: [
    // The studio
    'Dream Narratives', 'Dream Narratives Vijayawada', 'Dream Narratives Studio', 'design house Vijayawada', 'design studio Vijayawada', 'designer Vijayawada',
    // The founders: Nimisha for marketing, Driti for architecture, both for design
    'Nimisha Lingamaneni', 'Nimisha Lingamaneni marketing', 'Nimisha Lingamaneni designer', 'marketing Vijayawada', 'digital marketing Vijayawada', 'social media marketing Vijayawada', 'marketing agency Vijayawada',
    'Driti Thyagaraj', 'Driti Thyagaraj architect', 'Driti Thyagaraj designer', 'architect Vijayawada', 'architecture Vijayawada', 'interior designer Vijayawada', 'interior design Vijayawada',
    // Design, which leads to invitations
    'wedding invitation designer Vijayawada', 'invitation design Vijayawada', 'wedding invitations Vijayawada', 'e-invites Vijayawada', 'video invitations Vijayawada', 'wedding logo design', 'wedding monogram',
    'Telugu wedding invitations', 'pelli pathrika', 'wedding hampers Vijayawada', 'gift hampers Vijayawada', 'branding agency Vijayawada', 'logo design Vijayawada', 'graphic design Vijayawada',
  ],

  // The live address. Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://dreamnarratives.vercel.app'),

  // The studio's logo: dark ink for light grounds, light for the footer.
  logo: { ink: '/images/logo-ink.webp', light: '/images/logo-light.webp', width: 600, height: 186 },

  contact: {
    // Phone and WhatsApp numbers are private: see lib/private-contact.js.
    instagram: 'dream.narratives',
    email: 'hello@dreamnarratives.co',
    responseTime: 'We respond to all enquiries within 24–48 hours.',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Who are we?', href: '/who-we-are' },
  { label: 'What do we do?', href: '/what-we-do', services: true },
  { label: 'Monogram', href: '/monogram', free: true /* shown with a small “Free” tag */ },
  { label: 'Contact us', href: '/contact' },
];

export const enquireLink = { label: 'Enquire', href: '/enquiries' };
