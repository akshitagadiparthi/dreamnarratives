import { PageIntro, Slot, TwoLine, Stardust, Sparkles } from '@/components/Basics';
import { Closing, MoonPhases } from '@/components/Sections';
import { founders, story, values } from '@/content/studio';
import { getService } from '@/content/services';
import Link from 'next/link';

export const metadata = {
  title: 'Driti & Nimisha · The Founders of Dream Narratives, Vijayawada',
  description: 'Meet Driti and Nimisha, the childhood best friends behind Dream Narratives in Vijayawada. Driti leads architecture and interiors; Nimisha leads branding, marketing and social media.',
  alternates: { canonical: '/who-we-are' },
  openGraph: { url: '/who-we-are', title: 'Driti & Nimisha · Founders of Dream Narratives', description: 'The childhood best friends behind Dream Narratives, a design house in Vijayawada.' },
};

export default function WhoWeAre() {
  return (
    <>
      <PageIntro
        eyebrow="Who are we?"
        title={['The girls behind', 'the dreams.']}
        lede="Two best friends from school, one long-held dream, and a design house in Vijayawada that brings their worlds together."
      />

      <section className="section" style={{ paddingTop: 'var(--space-7)' }} aria-label="The founders">
        <div className="container founders">
          {founders.map((f, i) => (
            <article key={f.name} id={f.name.toLowerCase()} className="founder reveal" style={{ '--delay': `${i * 150}ms` }}>
              <div className="media">
                <Slot item={{ src: f.portrait, caption: `Portrait of ${f.name}`, alt: `${f.name}, ${f.role} and co-founder of Dream Narratives, Vijayawada` }} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <span className="eyebrow">{f.role}</span>
              <h2 className="display-l" style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>{f.name}</h2>
              <div className="body" style={{ marginTop: 'var(--space-4)' }}>
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
                      <Link href={`/what-we-do/${slug}`} style={{ color: 'var(--gilt)' }}>{s.name.join(' ')}</Link>
                    </span>
                  );
                })}
              </p>
            </article>
          ))}
        </div>
      </section>

      <figure className="reveal" style={{ margin: 0 }}>
        <div className="wide-photo"><Slot item={story.wide} sizes="100vw" /></div>
      </figure>

      <section id="our-story" className="section ground-dusk story-night center" aria-labelledby="story-title" data-cursor-dark>
        <Stardust count={70} seed={9} />
        <Sparkles items={[[12, 20, 14, 0.3], [86, 26, 12, 1.5], [80, 76, 16, 2.4], [16, 72, 10, 3.2]]} />
        <div className="container reveal">
          <span className="eyebrow">{story.eyebrow}</span>
          <TwoLine parts={story.title} id="story-title" className="display-l" />
          <MoonPhases />
          <p className="lede story-short">{story.short}</p>
          <p className="story-sign">{story.quote}</p>
        </div>
      </section>

      <section className="section tight ground-bone center" aria-labelledby="values-title">
        <div className="container reveal">
          <span className="eyebrow" id="values-title">Our values</span>
          <ul className="values">
            {values.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </div>
      </section>

      <Closing />
    </>
  );
}
