import { PageIntro, Slot, TwoLine } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { founders, story, values } from '@/content/studio';
import { getService } from '@/content/services';
import Link from 'next/link';

export const metadata = {
  title: 'Who are we?',
  description: 'Dream Narratives is the creative studio of childhood best friends Driti and Nimisha: architecture, interiors, branding and marketing under one roof.',
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
            <article key={f.name} className="founder reveal" style={{ '--delay': `${i * 150}ms` }}>
              <div className="media">
                <Slot item={{ src: f.portrait, caption: `Portrait of ${f.name}` }} arch={i === 0} sizes="(max-width: 900px) 100vw, 50vw" />
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

      <section id="our-story" className="section ground-bone" aria-labelledby="story-title">
        <div className="container story-layout">
          <div className="story-aside reveal">
            <span className="eyebrow">{story.eyebrow}</span>
            <TwoLine parts={story.title} id="story-title" />
            <figure className="story-photo">
              <Slot item={story.photos[1]} sizes="(max-width: 900px) 100vw, 40vw" />
            </figure>
          </div>
          <div className="story-text">
            {story.full.map((p, i) =>
              typeof p === 'string' ? (
                <p key={i} className={`reveal${i === 0 ? ' lede' : ''}`}>{p}</p>
              ) : p.pull ? (
                <blockquote key={i} className="pull reveal">{p.pull}</blockquote>
              ) : (
                <p key={i} className="story-highlight reveal">{p.highlight}</p>
              )
            )}
            <hr className="rule" />
            <p className="story-sign reveal">{story.quote}</p>
          </div>
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
