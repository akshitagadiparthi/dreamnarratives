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
export function crescentPath(phase) {
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
export function Slot({ item = {}, tone = '', arch = false, sizes = '(max-width: 900px) 100vw, 50vw', priority = false, className = '', float = false }) {
  const cutout = item.cutout && item.src;
  const cls = ['slot', tone && `tone-${tone}`, arch && 'arch', cutout && 'is-cutout', cutout && float && 'floating', className].filter(Boolean).join(' ');
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
        <Image src={item.src} alt={item.alt || item.caption || ''} fill sizes={sizes} priority={priority} style={{ objectFit: cutout ? 'contain' : 'cover' }} />
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
        dark ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={site.logo.light} alt={site.name} width={site.logo.width} height={site.logo.height} />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-ink" src={site.logo.ink} alt={site.name} width={site.logo.width} height={site.logo.height} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-light" src={site.logo.light} alt="" aria-hidden="true" width={site.logo.width} height={site.logo.height} />
          </>
        )
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
    <section className="page-top has-clouds">
      <Clouds set="corner" />
      <Sparkles items={[[86, 30, 12, 0.6], [74, 58, 8, 2]]} />
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

/**
 * Soft clouds, cut from the studio's own moon artwork, drifting slowly behind
 * a section. Use only on light grounds. The parent needs `position: relative`.
 */
const cloudSets = {
  // The hero's cloud layer runs past the bottom of the hero and fades out,
  // so the clouds drift into the next section instead of stopping at a line.
  hero: [
    { left: -14, top: 60, w: 50, o: 0.95, d: 90 },
    { left: 24, top: 66, w: 54, o: 0.9, d: 120, flip: true },
    { left: 60, top: 58, w: 50, o: 0.95, d: 105 },
    { left: 40, top: 74, w: 40, o: 0.6, d: 140 },
    { left: 4, top: 24, w: 22, o: 0.14, d: 150, flip: true },
    { left: 72, top: 5, w: 26, o: 0.12, d: 160 },
  ],
  dusk: [
    { left: -8, top: 70, w: 40, o: 0.14, d: 120 },
    { left: 60, top: 78, w: 44, o: 0.12, d: 140, flip: true },
  ],
  section: [
    { left: -12, top: 8, w: 34, o: 0.55, d: 120 },
    { left: 76, top: 58, w: 30, o: 0.45, d: 140, flip: true },
  ],
  low: [{ left: 58, top: 46, w: 44, o: 0.6, d: 130, flip: true }],
  corner: [{ left: 70, top: -6, w: 36, o: 0.55, d: 120 }],
};

export function Clouds({ set = 'section' }) {
  return (
    <div className="clouds" aria-hidden="true">
      {cloudSets[set].map((c, i) => (
        <span key={i} className="cloud" style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.w}vw`, opacity: c.o, '--d': `${c.d}s`, '--flip': c.flip ? -1 : 1, animationDelay: `${-i * 23}s` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/cloud.webp" alt="" width="900" height="456" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  );
}

/**
 * A few four-point gold sparkles, placed by hand (positions in %). They
 * twinkle slowly, out of step with each other.
 */
export function Sparkles({ items }) {
  return (
    <div className="sparkles" aria-hidden="true">
      {items.map(([l, t, s, delay], i) => (
        <svg key={i} viewBox="0 0 24 24" width={s} height={s} style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${delay}s` }}>
          <path d="M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z" />
        </svg>
      ))}
    </div>
  );
}

/** Faint twinkling stardust. Deterministic positions so server and client agree. */
export function Stardust({ count = 26, seed = 7 }) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const stars = Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1.5 + rand() * 2.5,
    delay: rand() * 6,
    dur: 3 + rand() * 4,
  }));
  return (
    <div className="stardust" aria-hidden="true">
      {stars.map((st, i) => (
        <i key={i} style={{ left: `${st.left.toFixed(2)}%`, top: `${st.top.toFixed(2)}%`, width: st.size.toFixed(1) + 'px', height: st.size.toFixed(1) + 'px', animationDelay: `${st.delay.toFixed(2)}s`, animationDuration: `${st.dur.toFixed(2)}s` }} />
      ))}
    </div>
  );
}
