'use client';

import { useEffect, useState } from 'react';
import { crescentPath } from './Basics';

/**
 * A small moon in the corner that waxes from crescent to full as you read
 * down the page. Tap it to float back to the top.
 */
export function ScrollMoon() {
  const [p, setP] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setP(max > 0 ? Math.min(1, y / max) : 0);
      setShow(y > window.innerHeight * 0.4);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-moon${show ? ' show' : ''}${p > 0.98 ? ' full' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        <circle cx="20" cy="20" r="16" className="ghost" />
        <path d={crescentPath(p)} className="lit" />
      </svg>
    </button>
  );
}
