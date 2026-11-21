'use client';

import './monogram-fonts';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { drawMonogram, loadMonogramFonts } from './monogram';

const PAIRS = [
  ['N', 'D', 'editorial', 'cream'],
  ['A', 'R', 'heritage', 'black'],
  ['S', 'K', 'romance', 'stone'],
  ['T', 'J', 'crest', 'cream'],
  ['M', 'L', 'modern', 'black'],
  ['P', 'V', 'classic', 'stone'],
];

/** An invitation to try the Monogram Studio, cycling through its styles. */
export default function MonogramTeaser() {
  const ref = useRef(null);
  useEffect(() => {
    let i = 0, timer;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paint = () => {
      const [a, b, style, ground] = PAIRS[i % PAIRS.length];
      if (ref.current) drawMonogram(ref.current, { a, b, style, ground, line: '', watermark: false });
      i += 1;
    };
    loadMonogramFonts().then(() => {
      paint();
      if (!calm) timer = setInterval(paint, 2400);
    });
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="section" aria-labelledby="monogram-title">
      <div className="container">
        <div className="monogram-teaser block-stone">
          <div className="reveal">
            <span className="eyebrow">Monogram studio · free</span>
            <h2 id="monogram-title" className="display-l">
              Your initials,
              <br />
              <em>entwined.</em>
            </h2>
            <p className="lede">Type two initials, choose from six styles, and download a wedding monogram to share, in seconds.</p>
            <div className="btn-row" style={{ marginTop: 'var(--space-4)' }}>
              <Link href="/monogram" className="btn btn-fill">Make your monogram</Link>
            </div>
          </div>
          <Link href="/monogram" className="teaser-canvas reveal" data-cursor="view" aria-label="Open the Monogram Studio" style={{ '--delay': '150ms' }}>
            <canvas ref={ref} width={720} height={720} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
