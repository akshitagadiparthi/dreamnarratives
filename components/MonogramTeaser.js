'use client';

import '@fontsource/pinyon-script/400.css';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { drawMonogram, loadMonogramFonts } from './monogram';
import { MoonPhases } from './Sections';

const PAIRS = [['D', 'N', 'moonlit', 'night'], ['A', 'R', 'classic', 'ivory'], ['S', 'K', 'script', 'night'], ['T', 'J', 'moonlit', 'ivory']];

/** Home page invitation to try the Monogram Studio, cycling through examples. */
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
      if (!calm) timer = setInterval(paint, 2600);
    });
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="section has-clouds" aria-labelledby="monogram-title">
      <div className="container monogram-teaser">
        <div className="reveal">
          <span className="eyebrow">Try it, it’s free</span>
          <h2 id="monogram-title" className="display-l">
            Your initials,
            <br />
            <em>entwined.</em>
          </h2>
          <MoonPhasesLeftSmall />
          <p className="lede">Type two initials and our Monogram Studio turns them into a wedding monogram you can download and share in seconds.</p>
          <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
            <Link href="/monogram" className="btn btn-fill">Make your monogram</Link>
          </div>
        </div>
        <Link href="/monogram" className="reveal" data-cursor="view" aria-label="Open the Monogram Studio" style={{ '--delay': '150ms' }}>
          <canvas ref={ref} width={720} height={720} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function MoonPhasesLeftSmall() {
  return <div style={{ display: 'flex' }}><MoonPhases /></div>;
}
