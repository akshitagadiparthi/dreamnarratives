import Link from 'next/link';
import HeroGallery from '@/components/HeroGallery';
import MonogramTeaser from '@/components/MonogramTeaser';
import { ServiceCards, Closing, FeaturedClient } from '@/components/Sections';
import { Slot, TwoLine } from '@/components/Basics';
import { services } from '@/content/services';
import { story, testimonials, featured } from '@/content/studio';
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
        logo={site.logo}
      />

      <ServiceCards services={services} />

      <MonogramTeaser />

      <FeaturedClient featured={featured} />


      {/* Founders preview */}
      <section className="section ground-bone" aria-labelledby="story-title">
        <div className="container founder-preview">
          {story.photos.map((p, i) => (
            <figure key={p.src} className={`media reveal${i === 1 ? ' offset' : ''}`} style={{ margin: 0, '--delay': `${i * 150}ms` }}>
              <Slot item={p} sizes="(max-width: 1000px) 50vw, 30vw" />
            </figure>
          ))}
          <div className="copy reveal" style={{ '--delay': '300ms' }}>
            <span className="eyebrow">{story.eyebrow}</span>
            <TwoLine parts={story.title} id="story-title" />
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{story.body[0]}</p>
            <p className="story-sign" style={{ margin: 'var(--space-4) 0 var(--space-5)' }}>{story.quote}</p>
            <Link href="/who-we-are#our-story" className="text-link">Read our story</Link>
          </div>
        </div>
      </section>

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
