import { PageIntro, Slot, TwoLine } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { founders, friendship, story, timeline, values } from '@/content/studio';
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
        lede="Dream Narratives is the creative studio born from the friendship and imagination of two people who never stopped believing in beautiful things."
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

      <section className="section ground-bone" aria-labelledby="friendship-title">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">{friendship.eyebrow}</span>
            <TwoLine parts={friendship.title} id="friendship-title" />
            <blockquote className="pull" style={{ marginTop: 'var(--space-6)' }}>“{friendship.quote}”</blockquote>
          </div>
          <div className="body reveal" style={{ '--delay': '150ms' }}>
            {friendship.body.map((p) => <p key={p.slice(0, 20)} className={p === friendship.body[0] ? 'lede' : ''} style={{ marginBottom: '1.1em' }}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="timeline-title">
        <div className="container split top">
          <div className="reveal">
            <span className="eyebrow">{story.eyebrow}</span>
            <TwoLine parts={story.title} id="timeline-title" />
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{story.body[1]}</p>
          </div>
          <ol className="timeline">
            {timeline.map((t, i) => (
              <li key={t.year} className="reveal" style={{ '--delay': `${i * 100}ms` }}>
                <span className="year">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
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
