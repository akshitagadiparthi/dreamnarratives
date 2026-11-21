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

/** A two-line headline whose second line is set in the italic serif. */
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

/**
 * A frame for work. Shows the image or video when there is one, otherwise a
 * quiet placeholder labelled with what belongs there.
 */
export function Slot({ item = {}, tone = '', sizes = '(max-width: 900px) 100vw, 50vw', priority = false, className = '', float = false }) {
  const cutout = item.cutout && item.src;
  const cls = ['slot', tone && `tone-${tone}`, cutout && 'is-cutout', cutout && float && 'floating', className].filter(Boolean).join(' ');
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
      {item.caption ? <span className="slot-label">{item.caption}</span> : null}
    </div>
  );
}

export function Wordmark({ dark = false }) {
  return (
    <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
      {dark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.logo.light} alt={site.name} width={site.logo.width} height={site.logo.height} />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-ink" src={site.logo.ink} alt={site.name} width={site.logo.width} height={site.logo.height} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-light" src={site.logo.light} alt="" aria-hidden="true" width={site.logo.width} height={site.logo.height} />
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
          {lede ? <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{lede}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Line icons (24 × 24, drawn with a thin stroke in the current text colour).
// ---------------------------------------------------------------------------

const ICONS = {
  phone: 'M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5ZM10.5 18.5h3',
  play: 'M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5ZM10.5 9v6l5-3-5-3Z',
  triangle: 'M8.5 5.5v13l10-6.5-10-6.5Z',
  envelope: 'M3 6h18v12H3zM3 6l9 7 9-7',
  card: 'M5 3.5h14v17H5zM8.5 8h7M8.5 11h7M10 14h4',
  calendar: 'M4 5.5h16v15H4zM4 9.5h16M8 3v4M16 3v4M9 14h2M13 14h2M9 17h2',
  box: 'M3.5 8 12 4l8.5 4v9L12 21l-8.5-4zM3.5 8 12 12l8.5-4M12 12v9',
  pen: 'M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1ZM14.5 6.5l3 3',
  gift: 'M3.5 9h17v4h-17zM5 13h14v8H5zM12 9v12M12 9c-1.5-3-5.5-4-5.5-1.5S10 9 12 9Zm0 0c1.5-3 5.5-4 5.5-1.5S14 9 12 9Z',
  ribbon: 'M12 13a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM9 12.5 7.5 21l4.5-2.5 4.5 2.5-1.5-8.5',
  heart: 'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z',
  briefcase: 'M3.5 7.5h17v12h-17zM9 7.5V5h6v2.5M3.5 12.5h17',
  mark: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM8 15.5 12 8l4 7.5M9.4 13h5.2',
  palette: 'M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.4-1.3-1.8-1.3-3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.2-4-7.5-9-7.5ZM7.5 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM11 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM15.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  layout: 'M3.5 4.5h17v15h-17zM3.5 9.5h17M9.5 9.5v10',
  instagram: 'M7 3.5h10A3.5 3.5 0 0 1 20.5 7v10a3.5 3.5 0 0 1-3.5 3.5H7A3.5 3.5 0 0 1 3.5 17V7A3.5 3.5 0 0 1 7 3.5ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 6.8v.1',
  camera: 'M3.5 7.5h4l1.5-2.5h6l1.5 2.5h4v12h-17zM12 17a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z',
  megaphone: 'M4 10v4h3l8 4.5v-13L7 10H4ZM7 14l1.5 5h2.5l-1.3-4.5M18 9.5a3 3 0 0 1 0 5',
  chart: 'M4 20h16M6.5 16.5v-4M11 16.5V8M15.5 16.5v-6M20 4l-5 4-4-2.5-4.5 3.5',
  home: 'M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5',
  compass: 'M12 4v3M8.5 20 12 7l3.5 13M7 15.5h10M12 4a1.5 1.5 0 1 0 0 .01',
  plan: 'M3.5 3.5h17v17h-17zM3.5 12h8v8.5M11.5 3.5v5h9',
  sofa: 'M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 12a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3zM5 17v2.5M19 17v2.5',
  moodboard: 'M3.5 4h7v7h-7zM13.5 4h7v4h-7zM13.5 11h7v9h-7zM3.5 14h7v6h-7z',
  language: 'M3.5 5.5h9M8 3.5v2M5 5.5c.8 3 3 5.5 6 6.5M11 5.5c-.8 3-3 5.5-6 6.5M13 20.5l3.5-9 3.5 9M14.2 17.5h4.6',
  pin: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  print: 'M7 9V3.5h10V9M7 17H4.5V9h15v8H17M7 14h10v6.5H7z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20.5a7.5 7.5 0 0 1 15 0',
  arrow: 'M4 12h16M14 6l6 6-6 6',
};

export function Icon({ name, size = 26, className = '' }) {
  const d = ICONS[name] || ICONS.pen;
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** Picks a line icon for an offer from its wording. */
export function iconFor(text = '') {
  const t = text.toLowerCase();
  const rules = [
    [/video|motion|film/, 'play'],
    [/e-invite|digital/, 'phone'],
    [/save-the-date|save the date/, 'calendar'],
    [/box/, 'box'],
    [/printed|physical|print/, 'print'],
    [/suite|wedding invitation|event invitation|card/, 'card'],
    [/stationery/, 'pen'],
    [/logo|monogram|crest/, 'mark'],
    [/hamper/, 'gift'],
    [/welcome/, 'box'],
    [/favour|favor/, 'heart'],
    [/corporate/, 'briefcase'],
    [/collection|festive/, 'ribbon'],
    [/identity|visual language/, 'palette'],
    [/guideline/, 'layout'],
    [/packaging/, 'box'],
    [/social media/, 'instagram'],
    [/content|shoot/, 'camera'],
    [/campaign|launch/, 'megaphone'],
    [/strategy/, 'chart'],
    [/interior/, 'home'],
    [/architect/, 'compass'],
    [/planning/, 'plan'],
    [/styling/, 'sofa'],
    [/moodboard|concept/, 'moodboard'],
    [/telugu|english|language/, 'language'],
    [/whatsapp|instagram/, 'phone'],
  ];
  const hit = rules.find(([re]) => re.test(t));
  return hit ? hit[1] : 'pen';
}
