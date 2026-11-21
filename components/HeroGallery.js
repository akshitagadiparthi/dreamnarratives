'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Slot, Icon } from './Basics';

/**
 * The landing hero, in the manner of a product page: the logo set very large,
 * the studio's signature piece standing on a plinth in front of it, and a few
 * pieces of work around it that lean gently away from the pointer.
 */
export default function HeroGallery({ lede, primary, secondary, feature, tiles = [], meta = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = null;
    const onMove = (e) => {
      const b = el.getBoundingClientRect();
      const x = ((e.clientX - b.left) / b.width - 0.5).toFixed(3);
      const y = ((e.clientY - b.top) / b.height - 0.5).toFixed(3);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', x);
        el.style.setProperty('--my', y);
      });
    };
    const onLeave = () => { el.style.setProperty('--mx', 0); el.style.setProperty('--my', 0); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero-inner">
        <h1 id="hero-title" className="hero-mark">
          <Image className="logo-ink" src="/images/logo-ink-xl.webp" alt="Dream Narratives" width={1332} height={401} priority sizes="(max-width: 1400px) 92vw, 1300px" />
          <Image className="logo-light" src="/images/logo-light-xl.webp" alt="" aria-hidden="true" width={1332} height={401} priority sizes="(max-width: 1400px) 92vw, 1300px" />
          <span className="visually-hidden"> — a design house in Vijayawada by Nimisha Lingamaneni &amp; Driti Thyagaraj</span>
        </h1>

        <div className="hero-stage">
          {tiles.map((t, i) => (
            <Link
              key={t.src}
              href={`/what-we-do/${t.service}`}
              className={`hero-tile t${i + 1}`}
              tabIndex={-1}
              aria-hidden="true"
              data-cursor="view"
              style={{ aspectRatio: `${t.width} / ${Math.min(t.height, t.width * 1.3)}`, '--k': [1, -0.8, 0.7, -1.1][i % 4] }}
            >
              <Slot item={t} sizes="(max-width: 760px) 30vw, 220px" priority={i < 2} />
            </Link>
          ))}

          {feature ? (
            <Link href={`/what-we-do/${feature.service}`} className="hero-feature" data-cursor="view" aria-label={feature.caption}>
              <span className="plinth" aria-hidden="true" />
              <span className="feature-img" style={{ aspectRatio: `${feature.width} / ${feature.height}` }}>
                <Image src={feature.src} alt={feature.alt || feature.caption} fill priority sizes="(max-width: 760px) 62vw, 380px" style={{ objectFit: 'contain' }} />
              </span>
            </Link>
          ) : null}
        </div>

        <div className="hero-foot">
          <div className="hero-copy">
            <p className="hero-lede">{lede}</p>
            <div className="btn-row">
              <Link href={primary.href} className="btn btn-fill">{primary.label}</Link>
              <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>
            </div>
          </div>
          <div className="hero-meta">
            <ul>
              {meta.map((m) => <li key={m}>{m}</li>)}
            </ul>
            <Link href="/monogram" className="hero-mono-link">
              <Icon name="mark" size={18} /> Make your wedding monogram, free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
