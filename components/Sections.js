import Image from 'next/image';
import Link from 'next/link';
import { Slot, SplitTitle, TwoLine, Crescent, Stardust, Sparkles } from './Basics';
import { process } from '@/content/studio';
import { getService } from '@/content/services';

/** One service on the home scroll: image beside name, promise and offers. */
export function ServiceRow({ service, index }) {
  const flip = index % 2 === 1;
  return (
    <section className={`service-row${flip ? ' flip ground-bone' : ''}`} aria-labelledby={`svc-${service.slug}`}>
      <div className="container split">
        <Link href={`/what-we-do/${service.slug}`} className="media reveal" data-cursor="view" tabIndex={-1} aria-hidden="true">
          <Slot item={service.hero} tone={flip ? 'bone' : ''} />
        </Link>
        <div className="reveal" style={{ '--delay': '150ms' }}>
          <span className="eyebrow">{service.label}</span>
          <h2 id={`svc-${service.slug}`} className="display-l">
            {service.name[0]} <em>{service.name[1]}</em>
          </h2>
          <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{service.promise}</p>
          <MoonPhasesLeft />
          <p className="subs">{service.offers.slice(0, 4).join(' · ')}</p>
          <Link href={`/what-we-do/${service.slug}`} className="text-link">
            See the work<span className="visually-hidden"> for {service.name.join(' ')}</span>
          </Link>
          {service.leadBy ? <span className="lead-by" style={{ display: 'block' }}>Led by {service.leadBy}</span> : null}
        </div>
      </div>
    </section>
  );
}

/** The five-step Dream Process. */
export function ProcessSteps({ ground = '' }) {
  return (
    <section className={`section ${ground}`} aria-labelledby="process-title">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">The dream process</span>
            <TwoLine parts={['How we bring', 'dreams to life.']} as="h2" />
          </div>
        </div>
        <ol className="steps">
          {process.map((step, i) => (
            <li key={step.title} className="reveal" style={{ '--delay': `${i * 120}ms` }}>
              <Crescent className="phase" phase={i / 4} />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The one dusk moment per page: "What story shall we tell next?" */
export function Closing({ eyebrow = 'The next chapter awaits', title = ['What story shall we', 'tell next?'], body = 'Every great story begins with a conversation. Let’s start yours.', cta = { label: 'Begin your story', href: '/enquiries' } }) {
  return (
    <section className="section ground-dusk closing" data-cursor-dark aria-labelledby="closing-title">
      <Stardust count={34} seed={11} />
      <Sparkles items={[[62, 18, 12, 0.4], [80, 70, 9, 2], [12, 12, 8, 1.3]]} />
      <Image className="moon-small" src="/images/moon.webp" alt="" width={1254} height={1254} sizes="360px" />
      <div className="container content reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id="closing-title" className="display-l">
          {title[0]}
          <br />
          <em>{title[1]}</em>
        </h2>
        <p className="lede" style={{ marginTop: 'var(--space-4)', color: 'var(--on-dusk-muted)' }}>{body}</p>
        <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
          <Link href={cta.href} className="btn btn-moon">{cta.label}</Link>
          <Link href="/contact" className="btn btn-ghost-dusk">Contact us</Link>
        </div>
      </div>
    </section>
  );
}

/** "Often paired with": keeps the house connected. */
export function PairedWith({ slugs }) {
  const items = slugs.map(getService).filter(Boolean);
  return (
    <section className="section tight" aria-labelledby="pairs-title">
      <div className="container">
        <span className="eyebrow reveal" id="pairs-title">Often paired with</span>
        <div className="pair-grid">
          {items.map((s, i) => (
            <Link key={s.slug} href={`/what-we-do/${s.slug}`} className="pair-card reveal" style={{ '--delay': `${i * 120}ms` }}>
              <div className="media"><Slot item={s.hero} sizes="180px" /></div>
              <div>
                <SplitTitle parts={s.name} as="h3" className="" />
                <p>{s.promise}</p>
                <span className="text-link">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A client told across several services (home page). */
export function FeaturedClient({ featured }) {
  return (
    <section className="section featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">{featured.eyebrow}</span>
            <h2 id="featured-title" className="display-l">{featured.name}</h2>
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{featured.body}</p>
          </div>
        </div>
        <div className="featured-grid">
          {featured.links.map((l, i) => {
            const s = getService(l.service);
            const external = !!l.href;
            const inner = (
              <>
                <div className="media">
                  {l.href && !l.image ? (
                    <div className="ig-card">
                      <span className="eyebrow" style={{ margin: 0 }}>Instagram</span>
                      <b>@{l.href.split('/').filter(Boolean).pop()}</b>
                      <span className="text-link">View the feed</span>
                    </div>
                  ) : (
                    <Slot item={l.image ? { src: l.image, caption: l.label } : s.hero} sizes="(max-width: 900px) 100vw, 33vw" />
                  )}
                </div>
                <span className="eyebrow" style={{ margin: 'var(--space-3) 0 4px' }}>{s.name.join(' ')}</span>
                <h3>{l.label}</h3>
              </>
            );
            return external ? (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="featured-item reveal" style={{ '--delay': `${i * 120}ms` }} data-cursor="view">{inner}</a>
            ) : (
              <Link key={i} href={`/what-we-do/${l.service}`} className="featured-item reveal" style={{ '--delay': `${i * 120}ms` }} data-cursor="view">{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Instagram accounts the studio builds and manages (The Identity). */
export function Accounts({ accounts, id }) {
  return (
    <section id={id} className="section" aria-labelledby="accounts-title">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 id="accounts-title" className="heading">
              Brands we <em>tell.</em>
            </h2>
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>Feeds we plan, design and grow, in each brand’s own voice. Tap through to see them live.</p>
          </div>
        </div>
        <div className="featured-grid">
          {accounts.map((a, i) => (
            <a key={a.handle} href={`https://www.instagram.com/${a.handle}`} target="_blank" rel="noopener noreferrer" className="featured-item reveal" style={{ '--delay': `${i * 120}ms` }} data-cursor="view">
              <div className="media feed">
                {a.image ? (
                  <Slot item={{ src: a.image, caption: `The @${a.handle} Instagram feed` }} sizes="(max-width: 900px) 100vw, 33vw" />
                ) : (
                  <div className="ig-card">
                    <span className="eyebrow" style={{ margin: 0 }}>Instagram</span>
                    <b>@{a.handle}</b>
                    <span className="text-link">View the feed</span>
                  </div>
                )}
              </div>
              <span className="eyebrow" style={{ margin: 'var(--space-3) 0 4px' }}>@{a.handle}</span>
              <h3>{a.name}</h3>
              {a.note ? <p className="caption" style={{ margin: '6px 0 0' }}>{a.note}</p> : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A full-width band of night sky with one piece of work floating in it. */
export function NightStrip({ item }) {
  const ratio = item?.width && item?.height ? item.width / item.height : 4 / 3;
  return (
    <section className="night-strip" aria-label={item?.caption || 'Featured work'} data-cursor-dark>
      <div className="hero-sky" aria-hidden="true" />
      <Stardust count={60} seed={21} />
      <Sparkles items={[[14, 22, 14, 0.2], [84, 18, 11, 1.4], [76, 66, 16, 2.2], [22, 70, 10, 3], [50, 10, 9, 0.9]]} />
      <div className="strip-piece reveal" style={{ aspectRatio: String(ratio) }}>
        <Slot item={item} float sizes="(max-width: 900px) 90vw, 900px" priority />
      </div>
      {item?.caption && item?.src ? <p className="strip-caption">{item.caption}</p> : null}
    </section>
  );
}

/** The moon's phases in a row, used as a divider. */
export function MoonPhases() {
  return (
    <div className="moon-phases" aria-hidden="true">
      {[0.05, 0.3, 1, 0.3, 0.05].map((p, i) => (
        <Crescent key={i} phase={p} size={i === 2 ? 18 : 14} />
      ))}
    </div>
  );
}

function MoonPhasesLeft() {
  return (
    <div className="moon-phases left" aria-hidden="true">
      {[0.05, 0.3, 1].map((p, i) => <Crescent key={i} phase={p} size={i === 2 ? 18 : 14} />)}
    </div>
  );
}
