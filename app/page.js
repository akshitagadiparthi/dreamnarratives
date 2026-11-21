import Link from 'next/link';
import HeroGallery from '@/components/HeroGallery';
import MonogramTeaser from '@/components/MonogramTeaser';
import { ServiceBand, IconRow, AboutStats, Closing, Head } from '@/components/Sections';
import { Slot, Icon } from '@/components/Basics';
import { services, heroFeature, heroTiles, bestOf, getService } from '@/content/services';
import { story, testimonials } from '@/content/studio';
import { site } from '@/content/site';

const features = [
  { icon: 'pin', title: 'Designed in Vijayawada', text: 'For families and brands across Andhra Pradesh, Telangana and beyond.' },
  { icon: 'language', title: 'Telugu & English', text: 'Pelli pathrikas, invites and brands, in your language or both.' },
  { icon: 'print', title: 'Print & digital', text: 'E-invites, video invites, foiled boxes and printed suites.' },
  { icon: 'pen', title: 'Made from scratch', text: 'No templates. Every piece begins with your story.' },
];

export default function Home() {
  const inv = getService('invitation');
  const videoStill = inv.work.find((w) => w.video) || inv.work.find((w) => w.src && w.kind === 'e-invites' && w.height > w.width && !bestOf.some((b) => b.src === w.src) && !heroTiles.some((t) => t.src === w.src));

  return (
    <>
      <HeroGallery
        lede={site.tagline}
        primary={{ label: 'Start your story', href: '/enquiries' }}
        secondary={{ label: 'Explore our work', href: '/what-we-do' }}
        feature={heroFeature}
        tiles={heroTiles}
        meta={['A design house', 'Vijayawada, India', 'Est. 2026']}
      />

      <ServiceBand services={services} exclude={[heroFeature?.src, ...heroTiles.map((t) => t.src), ...bestOf.map((b) => b.src)]} />

      {/* Video invites */}
      <section className="section" aria-labelledby="motion-title">
        <div className="container">
          <div className="motion-banner reveal">
            <div className="motion-copy">
              <span className="eyebrow">Invites in motion</span>
              <h2 id="motion-title" className="display-l">
                Video
                <br />
                <em>invites.</em>
              </h2>
              <p className="lede">Your invitation, illustrated, animated and set to music, ready for WhatsApp and Instagram.</p>
              <Link href="/what-we-do/video-invites" className="btn btn-fill">See video invites</Link>
            </div>
            {videoStill ? (
              <Link href="/what-we-do/video-invites" className="motion-phone" tabIndex={-1} aria-hidden="true" data-cursor="view">
                <div className="phone">
                  <Slot item={videoStill} sizes="260px" />
                </div>
                <span className="play"><Icon name="triangle" size={22} /></span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <IconRow items={features} />

      {/* Best of the house */}
      <section className="section" aria-labelledby="best-title">
        <div className="container">
          <Head eyebrow="Selected work" title={['The best of', 'the house.']} id="best-title" link={{ href: '/what-we-do', label: 'See everything' }} />
          <div className="best-grid">
            {bestOf.map((w, i) => {
              const s = getService(w.service);
              return (
                <Link key={w.src} href={`/what-we-do/${w.service}`} className={`best-item b${i + 1} reveal`} style={{ '--delay': `${(i % 3) * 100}ms` }} data-cursor="view">
                  <div className="media">
                    <Slot item={w} className="zoom" sizes="(max-width: 760px) 50vw, 33vw" />
                  </div>
                  <span className="kicker">{s.name.join(' ')}</span>
                  <p>{w.caption}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <MonogramTeaser />

      <AboutStats
        eyebrow={story.eyebrow}
        title={['A marketer, an architect,', 'one childhood dream.']}
        body="Nimisha Lingamaneni and Driti Thyagaraj were best friends in school with a pact to build something together. In January 2026 their “big fish” became Dream Narratives, a design house where marketing and architecture meet."
        photo={{ src: '/images/founders-seated.webp', alt: 'Nimisha Lingamaneni and Driti Thyagaraj, founders of Dream Narratives' }}
        stats={[
          { value: '4', label: 'Crafts under one roof' },
          { value: '2', label: 'Founders, best friends' },
          { value: '2', label: 'Languages, Telugu & English' },
          { value: '2026', label: 'Established' },
        ]}
        link={{ href: '/who-we-are', label: 'Meet the founders' }}
      />

      {testimonials.show ? (
        <section className="section" aria-labelledby="quotes-title">
          <div className="container">
            <Head eyebrow="Client stories" title={['Stories worth', 'telling.']} id="quotes-title" />
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
