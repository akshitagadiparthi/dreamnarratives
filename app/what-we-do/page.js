import Link from 'next/link';
import { PageIntro, Slot } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { services, bespoke } from '@/content/services';

export const metadata = {
  title: 'Wedding Invitations, Hampers, Branding & Interiors in Vijayawada',
  description: 'What Dream Narratives designs in Vijayawada: wedding invitations and e-invites, curated hampers and gifting, branding and social media, and interiors and architecture.',
  alternates: { canonical: '/what-we-do' },
  openGraph: { url: '/what-we-do' },
};

export default function WhatWeDo() {
  return (
    <>
      <PageIntro
        eyebrow="What do we do?"
        title={['Four ways we tell', 'your story.']}
        lede="Four disciplines, one philosophy: every project deserves to be told beautifully. Each carries its own work, so you can see the story before you begin yours."
      />

      <section className="section" style={{ paddingTop: 'var(--space-7)' }} aria-label="Services">
        <div className="container service-index">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/what-we-do/${s.slug}`} className="service-card reveal" style={{ '--delay': `${(i % 3) * 120}ms` }} data-cursor="view">
              <div className="media">
                <Slot item={s.hero} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw" />
              </div>
              <span className="eyebrow" style={{ marginBottom: 8 }}>{s.label}</span>
              <h2 style={{ fontSize: 34, lineHeight: 1.1 }}>
                {s.name[0]} <em>{s.name[1]}</em>
              </h2>
              <p>{s.promise}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section tight ground-bone center" aria-labelledby="bespoke-title">
        <div className="container reveal">
          <span className="eyebrow">{bespoke.eyebrow}</span>
          <h2 id="bespoke-title" className="heading">
            {bespoke.title[0]} <em>{bespoke.title[1]}</em>
          </h2>
          <p className="lede" style={{ margin: 'var(--space-4) auto var(--space-5)' }}>{bespoke.body}</p>
          <Link href="/enquiries?service=bespoke" className="btn btn-ghost">Get in touch</Link>
        </div>
      </section>

      <Closing />
    </>
  );
}
