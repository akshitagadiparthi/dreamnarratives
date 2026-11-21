import Link from 'next/link';
import { PageIntro, Slot, TwoLine } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { founders, story, values } from '@/content/studio';
import { getService } from '@/content/services';

export const metadata = {
  title: 'Nimisha Lingamaneni & Driti Thyagaraj · Founders of Dream Narratives, Vijayawada',
  description:
    'Meet Nimisha Lingamaneni and Driti Thyagaraj, the childhood best friends behind Dream Narratives, a design house in Vijayawada. Nimisha leads marketing, branding and social media; Driti leads architecture and interior design. Together they design wedding invitations and more.',
  alternates: { canonical: '/who-we-are' },
  openGraph: {
    url: '/who-we-are',
    title: 'Nimisha Lingamaneni & Driti Thyagaraj · Founders of Dream Narratives',
    description: 'A marketer and an architect, best friends since school, and the designers behind Dream Narratives in Vijayawada.',
  },
};

export default function WhoWeAre() {
  return (
    <>
      <PageIntro
        eyebrow="Who are we?"
        title={['The girls behind', 'the dreams.']}
        lede="Two best friends from school, a marketer and an architect, one long-held dream, and a design house in Vijayawada that brings their worlds together."
      />

      <section className="section" style={{ paddingTop: 'var(--space-5)' }} aria-label="The founders">
        <div className="container founders">
          {founders.map((f, i) => {
            const [first, ...rest] = (f.fullName || f.name).split(' ');
            return (
              <article key={f.name} id={f.name.toLowerCase()} className="founder reveal" style={{ '--delay': `${i * 150}ms` }}>
                <div className="media">
                  <Slot item={{ src: f.portrait, caption: `Portrait of ${f.fullName}`, alt: `${f.fullName}, ${f.role} and co-founder of Dream Narratives, Vijayawada` }} sizes="(max-width: 900px) 100vw, 50vw" />
                </div>
                <span className="eyebrow">{f.role}</span>
                <h2 className="founder-name">
                  {first} <em>{rest.join(' ')}</em>
                </h2>
                <div className="body" style={{ marginTop: 'var(--space-3)' }}>
                  {f.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
                </div>
                {f.credentials.length ? (
                  <ul className="caption" style={{ paddingLeft: '1.1em', margin: '0 0 var(--space-3)' }}>
                    {f.credentials.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                ) : null}
                <ul className="tags" aria-label={`${f.name}’s expertise`}>
                  {f.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <p style={{ marginTop: 'var(--space-4)' }} className="caption">
                  Leads{' '}
                  {f.leads.map((slug, j) => {
                    const s = getService(slug);
                    return (
                      <span key={slug}>
                        {j ? ' and ' : ''}
                        <Link href={`/what-we-do/${slug}`} className="inline-link">{s.name.join(' ')}</Link>
                      </span>
                    );
                  })}
                  , and designs across the house.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="our-story" className="section" aria-labelledby="story-title">
        <div className="container">
          <div className="story-block">
            <div className="story-photo reveal">
              <Slot item={story.wide} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="block-dark story-copy reveal" style={{ '--delay': '120ms' }} data-cursor-dark>
              <span className="eyebrow">{story.eyebrow}</span>
              <TwoLine parts={story.title} id="story-title" className="heading" />
              <p className="lede">{story.short}</p>
              <p className="story-sign">{story.quote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" aria-labelledby="values-title">
        <div className="container">
          <span className="eyebrow reveal" id="values-title">Our values</span>
          <ul className="values reveal">
            {values.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </div>
      </section>

      <Closing />
    </>
  );
}
