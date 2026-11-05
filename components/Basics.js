import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

/** "The Invitation" → The <em>Invitation</em>. One italic word per headline. */
export function SplitTitle({ parts, as: Tag = 'h2', className = 'display-l', id }) {
  const [a, b] = parts;
  return (
    <Tag className={className || undefined} id={id}>
      {a} <em>{b}</em>
    </Tag>
  );
}

/** A two-line headline whose second line is italic. */
export function TwoLine({ parts, as: Tag = 'h2', className = 'heading', id }) {
  const [a, b] = parts;
  return (
    <Tag className={className} id={id}>
      {a}
      <br />
      <em>{b}</em>
    </Tag>
  );
}

/** A small code-drawn crescent; phase 0 = thin crescent, 1 = full moon. */
export function Crescent({ phase = 0, className, size = 28 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d={crescentPath(phase)} fill="var(--champagne)" />
    </svg>
  );
}

/** The lit part of a 16-radius moon at (20,20), shaded by a 15-radius disc. Drawn as a path (no masks). */
function crescentPath(phase) {
  const R = 16, r = 15, ax = 20, ay = 20;
  const s = 6 + phase * 30;
  const bx = ax + s, by = ay - s * 0.25;
  const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy);
  if (d >= R + r) return `M${ax - R} ${ay}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0Z`;
  const a = (d * d - r * r + R * R) / (2 * d);
  const h = Math.sqrt(Math.max(0, R * R - a * a));
  const ux = dx / d, uy = dy / d;
  const px = ax + a * ux, py = ay + a * uy;
  const p1 = [px - h * uy, py + h * ux], p2 = [px + h * uy, py - h * ux];
  const f = (n) => n.toFixed(2);
  return `M${f(p1[0])} ${f(p1[1])}A${R} ${R} 0 ${a > 0 ? 1 : 0} 1 ${f(p2[0])} ${f(p2[1])}A${r} ${r} 0 ${d - a > 0 ? 0 : 1} 0 ${f(p1[0])} ${f(p1[1])}Z`;
}

/**
 * A frame for work. Shows the image or video when there is one, otherwise a
 * quiet placeholder labelled with what belongs there.
 */
export function Slot({ item = {}, tone = '', arch = false, sizes = '(max-width: 900px) 100vw, 50vw', priority = false, className = '' }) {
  const cls = ['slot', tone && `tone-${tone}`, arch && 'arch', className].filter(Boolean).join(' ');
  if (item.video) {
    return (
      <div className={cls}>
        <video src={item.video} poster={item.poster} muted loop playsInline autoPlay preload="metadata" aria-label={item.caption} />
      </div>
    );
  }
  if (item.src) {
    return (
      <div className={cls}>
        <Image src={item.src} alt={item.alt || item.caption || ''} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </div>
    );
  }
  return (
    <div className={cls} role="img" aria-label={item.caption ? `${item.caption} (image coming soon)` : 'Image coming soon'}>
      <Crescent className="slot-mark" phase={0.1} size={34} />
      {item.caption ? <span className="slot-label">{item.caption}</span> : null}
    </div>
  );
}

export function Wordmark({ dark = false }) {
  return (
    <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
      {site.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.logo} alt={site.name} />
      ) : (
        <>
          <b>
            Dream <em>Narratives</em>
          </b>
          <small>{site.byline}</small>
        </>
      )}
    </Link>
  );
}

export function PageIntro({ eyebrow, title, lede, children }) {
  return (
    <section className="page-top">
      <div className="container">
        <div className="reveal">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <TwoLine parts={title} as="h1" className="display-l" />
          {lede ? <p className="lede" style={{ marginTop: 'var(--space-5)' }}>{lede}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
