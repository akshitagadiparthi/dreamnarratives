import Image from 'next/image';
import Link from 'next/link';
import { Slot, SplitTitle, TwoLine, Crescent } from './Basics';
import { process } from '@/content/studio';
import { getService } from '@/content/services';

/** One service on the home scroll: image beside name, promise and offers. */
export function ServiceRow({ service, index }) {
  const flip = index % 2 === 1;
  const arch = index === 0 || index === 4; // the arch frame, used sparingly
  return (
    <section className={`service-row${flip ? ' flip ground-bone' : ''}`} aria-labelledby={`svc-${service.slug}`}>
      <div className="container split">
        <Link href={`/what-we-do/${service.slug}`} className="media reveal" data-cursor="view" tabIndex={-1} aria-hidden="true">
          <Slot item={service.hero} arch={arch} tone={flip ? 'bone' : ''} />
        </Link>
        <div className="reveal" style={{ '--delay': '150ms' }}>
          <span className="eyebrow">{service.label}</span>
          <h2 id={`svc-${service.slug}`} className="display-l">
            {service.name[0]} <em>{service.name[1]}</em>
          </h2>
          <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{service.promise}</p>
          <hr className="rule" />
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
