'use client';

import { useEffect, useRef } from 'react';

/**
 * The moon cursor: a small champagne crescent that trails the pointer and
 * waxes into a glowing full moon over anything you can open. Over work
 * (elements with data-cursor="view") it shows VIEW. Off on touch screens
 * and for people who prefer reduced motion.
 */
export default function MoonCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const root = document.documentElement;
    const el = ref.current;
    root.classList.add('moon-cursor');

    let tx = -100, ty = -100, x = -100, y = -100, raf;
    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const interactive = 'a, button, [role="button"], label, summary, .chip, .option, [data-cursor]';
    const typing = 'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable]';

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add('visible');
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      const overTyping = t.closest(typing);
      const view = t.closest('[data-cursor="view"]');
      const full = !overTyping && t.closest(interactive);
      el.classList.toggle('hidden', !!overTyping);
      el.classList.toggle('full', !!full);
      el.classList.toggle('view', !!view);
      el.classList.toggle('on-dark', !!t.closest('[data-cursor-dark]'));
    };
    const onLeave = () => el.classList.remove('visible');
    const onDown = () => (el.style.opacity = '0.7');
    const onUp = () => (el.style.opacity = '');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('moon-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 56 56">
        <defs>
          <mask id="moon-cursor-mask">
            <rect x="-20" y="-20" width="96" height="96" fill="#fff" />
            <circle className="shade" cx="38" cy="22" r="19" fill="#000" />
          </mask>
        </defs>
        <circle className="disc" cx="28" cy="28" r="22" mask="url(#moon-cursor-mask)" />
      </svg>
      <span className="label">VIEW</span>
    </div>
  );
}
