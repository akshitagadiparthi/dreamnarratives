'use client';

import { useEffect, useRef } from 'react';

/**
 * The moon cursor: the studio's golden crescent follows the pointer with a
 * soft lag, leaving a faint trail of stardust. Over anything you can open it
 * grows and glows; over work it also says VIEW. Off on touch screens and for
 * people who prefer reduced motion.
 */
export default function MoonCursor() {
  const ref = useRef(null);
  const dustRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const root = document.documentElement;
    const el = ref.current;
    const dust = dustRef.current;
    root.classList.add('moon-cursor');

    let tx = -100, ty = -100, x = -100, y = -100, raf, lastDust = 0, lx = 0, ly = 0;
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const sprinkle = (px, py, now) => {
      if (now - lastDust < 45 || Math.hypot(px - lx, py - ly) < 14) return;
      lastDust = now; lx = px; ly = py;
      const s = document.createElement('span');
      const size = 2 + Math.random() * 3;
      s.className = 'dust';
      s.style.cssText = `left:${px + (Math.random() - 0.5) * 18}px;top:${py + (Math.random() - 0.5) * 18}px;width:${size}px;height:${size}px;--dx:${(Math.random() - 0.5) * 30}px;--dy:${10 + Math.random() * 24}px`;
      dust.appendChild(s);
      s.addEventListener('animationend', () => s.remove(), { once: true });
      if (dust.childElementCount > 24) dust.firstElementChild?.remove();
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
      el.classList.toggle('hidden', !!overTyping);
      el.classList.toggle('full', !overTyping && !!t.closest(interactive));
      el.classList.toggle('view', !!t.closest('[data-cursor="view"]'));
      el.classList.toggle('on-dark', !!t.closest('[data-cursor-dark]'));
      if (!overTyping) sprinkle(e.clientX, e.clientY, e.timeStamp);
    };
    const onLeave = () => el.classList.remove('visible');
    const onDown = () => el.classList.add('press');
    const onUp = () => el.classList.remove('press');

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
    <>
      <div className="dust-layer" ref={dustRef} aria-hidden="true" />
      <div className="cursor" ref={ref} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/moon-cursor.webp" alt="" width="80" height="80" />
        <span className="label">View</span>
      </div>
    </>
  );
}
