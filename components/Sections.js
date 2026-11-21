import Link from 'next/link';
import { Slot, SplitTitle, TwoLine, Icon, iconFor } from './Basics';
import { process } from '@/content/studio';
import { getService } from '@/content/services';

/** Section heading: an eyebrow, an uppercase title with an italic serif phrase, and an optional link. */
export function Head({ eyebrow, title, id, lede, link, center = false, className = '' }) {
  return (
    <div className={`section-head${center ? ' center' : ''} ${className} reveal`}>
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 id={id} className="heading">
          {title[0]} {title[1] ? <em>{title[1]}</em> : null}
        </h2>
        {lede ? <p className="lede" style={{ marginTop: 'var(--space-3)' }}>{lede}</p> : null}
      </div>
      {link ? (
        link.external ? (
          <a href={link.href} className="text-link" target="_blank" rel="noopener noreferrer">{link.label}</a>
        ) : (
          <Link href={link.href} className="text-link">{link.label}</Link>
        )
      ) : null}
    </div>
  );
}

/** The services on a black band, each with a piece of its work. */
export function ServiceBand({ services, exclude = [] }) {
  // Each card shows a piece not already in the hero above it.
  const cover = (s) => [s.hero, ...s.work].find((w) => w.src && !w.cutout && w.kind !== 'logos' && !exclude.includes(w.src)) || s.hero;
  return (
    <section id="studio" className="band" aria-labelledby="services-title" data-cursor-dark>
      <div className="band-inner">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 id="services-title" className="heading">
              Invitations to interiors, <em>one story.</em>
            </h2>
          </div>
          <Link href="/what-we-do" className="text-link">All we do</Link>
        </div>
        <div className="service-cards" role="list">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/what-we-do/${s.slug}`} className="service-card reveal" role="listitem" data-cursor="view" style={{ '--delay': `${i * 90}ms` }}>
              <div className="media">
                <Slot item={cover(s)} sizes="(max-width: 760px) 72vw, 25vw" />
              </div>
              <div className="service-card-copy">
                <span className="kicker">{s.label}</span>
                <h3>{s.name[0]} <em>{s.name[1]}</em></h3>
                <p>{s.short}</p>
                <span className="more">See the work <Icon name="arrow" size={14} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** What a service offers: a rounded dark block with a grid of line icons. */
export function Offers({ offers, eyebrow = 'What we create', title = ['Every piece,', 'made for you alone.'], id = 'offers-title' }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="container">
        <div className="block-dark" data-cursor-dark>
          <div className="center reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h2 id={id} className="heading">
              {title[0]} <em>{title[1]}</em>
            </h2>
          </div>
          <ul className={`icon-grid n${Math.min(offers.length, 8)}`}>
            {offers.map((o, i) => (
              <li key={o} className="reveal" style={{ '--delay': `${i * 70}ms` }}>
                <span className="icon-ring"><Icon name={iconFor(o)} /></span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** A quiet row of features with line icons (home page). */
export function IconRow({ items }) {
  return (
    <section className="section tight" aria-label="Why Dream Narratives">
      <div className="container">
        <ul className="icon-row">
          {items.map((it, i) => (
            <li key={it.title} className="reveal" style={{ '--delay': `${i * 90}ms` }}>
              <Icon name={it.icon} size={30} />
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** About the studio, with a photo and a grid of numbers. */
export function AboutStats({ eyebrow, title, body, photo, stats, link }) {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container about-stats">
        <div className="about-copy reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="about-title" className="display-l about-title">
            {title[0]}
            <br />
            <em>{title[1]}</em>
          </h2>
          <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{body}</p>
          {link ? <Link href={link.href} className="text-link" style={{ marginTop: 'var(--space-4)' }}>{link.label}</Link> : null}
        </div>
        <div className="about-grid reveal" style={{ '--delay': '150ms' }}>
          <div className="about-photo">
            <Slot item={photo} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <dl className="stats">
            {stats.map((s, i) => (
              <div key={s.label} className={i === stats.length - 1 ? 'dark' : ''}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
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
        <Head eyebrow="The dream process" title={['How we bring', 'dreams to life.']} id="process-title" />
        <ol className="steps">
          {process.map((step, i) => (
            <li key={step.title} className="reveal" style={{ '--delay': `${i * 120}ms` }}>
              <span className="step-no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The closing invitation at the foot of every page: a rounded black block. */
export function Closing({ eyebrow = 'The next chapter awaits', title = ['What story shall we', 'tell next?'], body = 'Every great story begins with a conversation. Let’s start yours.', cta = { label: 'Begin your story', href: '/enquiries' } }) {
  return (
    <section className="section closing-wrap" aria-labelledby="closing-title">
      <div className="container">
        <div className="block-dark closing" data-cursor-dark>
          <div className="reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h2 id="closing-title" className="display-l">
              {title[0]}
              <br />
              <em>{title[1]}</em>
            </h2>
          </div>
          <div className="closing-side reveal" style={{ '--delay': '120ms' }}>
            <p className="lede">{body}</p>
            <div className="btn-row">
              <Link href={cta.href} className="btn btn-light">{cta.label}</Link>
              <Link href="/contact" className="btn btn-ghost-light">Contact us</Link>
            </div>
          </div>
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

/** Instagram accounts the studio plans, designs and grows (The Identity). */
export function Accounts({ accounts, id, eyebrow = 'Social media marketing', title = ['Brands we', 'tell.'], lede }) {
  return (
    <section id={id} className="section" aria-labelledby="accounts-title">
      <div className="container">
        <Head
          eyebrow={eyebrow}
          title={title}
          id="accounts-title"
          lede={lede || 'Feeds we plan, design and grow, in each brand’s own voice. Tap through to see them live.'}
        />
        <div className="featured-grid">
          {accounts.map((a, i) => (
            <a key={a.handle} href={`https://www.instagram.com/${a.handle}`} target="_blank" rel="noopener noreferrer" className="featured-item reveal" style={{ '--delay': `${i * 120}ms` }} data-cursor="view">
              <div className="media feed">
                <Slot item={{ src: a.image, caption: `The @${a.handle} Instagram feed` }} sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <span className="kicker" style={{ marginTop: 'var(--space-3)' }}>@{a.handle}</span>
              <h3>{a.name}</h3>
              {a.note ? <p className="caption" style={{ margin: '4px 0 0' }}>{a.note}</p> : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TwoLine };
