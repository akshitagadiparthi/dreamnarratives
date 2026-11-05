import Link from 'next/link';
import HeroGallery from '@/components/HeroGallery';
import { ServiceRow, ProcessSteps, Closing } from '@/components/Sections';
import { Slot, TwoLine } from '@/components/Basics';
import { services, bespoke } from '@/content/services';
import { founders, story, testimonials } from '@/content/studio';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      <HeroGallery
        eyebrow={site.byline}
        title={['Dream', 'Narratives']}
        lede={site.tagline}
        primary={{ label: 'Start your story', href: '/enquiries' }}
        secondary={{ label: 'Explore our work', href: '/what-we-do' }}
      />

      {/* Studio statement */}
      <section id="studio" className="section center" aria-labelledby="statement">
        <div className="container reveal">
          <span className="eyebrow">A design house</span>
          <h2 id="statement" className="heading" style={{ maxWidth: '18em', margin: '0 auto' }}>
            From invitations and keepsakes to spaces and brands, we transform ideas into <em>stories worth remembering.</em>
          </h2>
          <hr className="rule center" />
          <p className="lede">
            One studio, one story told wherever it appears: the card your guests open, the gift they carry home, the brand you build, the feed that carries it, and the room where it all lives.
          </p>
        </div>
      </section>

      {/* The five services, equal weight, unnumbered */}
      <div aria-label="What we do">
        {services.map((s, i) => (
          <ServiceRow key={s.slug} service={s} index={i} />
        ))}
      </div>

      {/* Bespoke: an open door */}
      <section className="section tight center" aria-labelledby="bespoke-title">
        <div className="container reveal">
          <span className="eyebrow">{bespoke.eyebrow}</span>
          <h2 id="bespoke-title" className="heading">
            {bespoke.title[0]} <em>{bespoke.title[1]}</em>
          </h2>
          <p className="lede" style={{ margin: 'var(--space-4) auto var(--space-5)' }}>{bespoke.body}</p>
          <Link href="/enquiries?service=bespoke" className="text-link">Let’s talk</Link>
        </div>
      </section>

      {/* Founders preview */}
      <section className="section ground-bone" aria-labelledby="story-title">
        <div className="container founder-preview">
          {founders.map((f, i) => (
            <figure key={f.name} className={`media reveal${i === 1 ? ' offset' : ''}`} style={{ margin: 0, '--delay': `${i * 150}ms` }}>
              <Slot item={{ src: f.portrait, caption: f.name }} sizes="(max-width: 1000px) 50vw, 30vw" />
            </figure>
          ))}
          <div className="copy reveal" style={{ '--delay': '300ms' }}>
            <span className="eyebrow">{story.eyebrow}</span>
            <TwoLine parts={story.title} id="story-title" />
            <div className="body" style={{ marginTop: 'var(--space-4)' }}>
              {story.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>
            <blockquote className="pull" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', margin: 'var(--space-4) 0 var(--space-5)' }}>“{story.quote}”</blockquote>
            <Link href="/who-we-are" className="text-link">Meet Driti &amp; Nimisha</Link>
          </div>
        </div>
      </section>

      <ProcessSteps />

      {testimonials.show ? (
        <section className="section ground-bone" aria-labelledby="quotes-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <span className="eyebrow">Client stories</span>
                <TwoLine parts={['Stories worth', 'telling.']} id="quotes-title" />
              </div>
            </div>
            <div className="quotes">
              {testimonials.items.map((t, i) => (
                <figure key={t.name} className="reveal" style={{ '--delay': `${i * 120}ms` }}>
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <strong style={{ fontWeight: 500 }}>{t.name}</strong>
                    <br />
                    <span className="caption">{t.project}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Closing />
    </>
  );
}
