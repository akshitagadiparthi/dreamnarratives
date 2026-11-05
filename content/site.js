// ---------------------------------------------------------------------------
// Studio details. Everything a visitor uses to reach the founders lives here.
// ⚠️ CONFIRM BEFORE LAUNCH: the WhatsApp number below came from the Figma
// draft and looks like a placeholder (98765 43210). Replace with real numbers.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Dream Narratives',
  byline: 'by Driti & Nimisha',
  tagline: 'Narrating dreams through design.',
  footerLine: 'A childhood dream, thoughtfully designed into reality.',
  description:
    'Dream Narratives is a design house in Vijayawada by Driti & Nimisha: invitations, gifting, branding, social media and interiors for weddings, families and founders.',
  city: 'Vijayawada',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamnarratives.co',

  // The studio's logo: dark ink for light grounds, light for the footer.
  logo: { ink: '/images/logo-ink.webp', light: '/images/logo-light.webp', width: 600, height: 186 },

  contact: {
    // Phone numbers: digits only with country code, plus how they are shown.
    phones: [
      { name: 'Driti', display: '+91 98765 43210', tel: '919876543210' },
      { name: 'Nimisha', display: '+91 98765 43210', tel: '919876543210' },
    ],
    whatsapp: '919876543210',
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

export const whatsappHref = (text) =>
  `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
