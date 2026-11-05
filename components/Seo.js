import { site } from '@/content/site';
import { services } from '@/content/services';
import { founders } from '@/content/studio';

// Structured data that tells search engines who Dream Narratives is, where it
// is, who founded it and what it does. Rendered as JSON-LD (invisible).

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

const abs = (p) => new URL(p, site.url).toString();
const orgId = () => abs('/#organization');

export function founderSchema(f) {
  return {
    '@type': 'Person',
    '@id': abs(`/who-we-are#${f.name.toLowerCase()}`),
    name: f.name,
    jobTitle: f.role,
    image: f.portrait ? abs(f.portrait) : undefined,
    worksFor: { '@id': orgId() },
    knowsAbout: f.tags,
    homeLocation: { '@type': 'City', name: site.city },
  };
}

export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': orgId(),
        name: 'Dream Narratives',
        alternateName: ['Dream Narratives Studio', 'Dream Narratives by Driti & Nimisha'],
        slogan: site.tagline,
        description: site.description,
        url: site.url,
        logo: abs('/images/logo-ink.webp'),
        image: abs('/opengraph-image.jpg'),
        foundingDate: site.founded,
        founder: founders.map((f) => ({ '@id': abs(`/who-we-are#${f.name.toLowerCase()}`) })),
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
        areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
        sameAs: [`https://www.instagram.com/${site.contact.instagram}`],
        knowsAbout: services.flatMap((s) => s.offers),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Design services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.seoName || s.name.join(' '), description: s.promise, url: abs(`/what-we-do/${s.slug}`) },
          })),
        },
      },
      ...founders.map(founderSchema),
      {
        '@type': 'WebSite',
        '@id': abs('/#website'),
        url: site.url,
        name: 'Dream Narratives',
        inLanguage: 'en-IN',
        publisher: { '@id': orgId() },
      },
    ],
  };
}

export function serviceSchema(s) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: s.seoName || s.name.join(' '),
        serviceType: s.offers,
        description: s.intro,
        provider: { '@id': orgId() },
        areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
        url: abs(`/what-we-do/${s.slug}`),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
          { '@type': 'ListItem', position: 2, name: 'What do we do?', item: abs('/what-we-do') },
          { '@type': 'ListItem', position: 3, name: s.name.join(' '), item: abs(`/what-we-do/${s.slug}`) },
        ],
      },
    ],
  };
}
