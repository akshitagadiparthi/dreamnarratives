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
    if (calm) return;

    // A little burst of gold sparkles wherever you click or tap.
    const STAR = 'M12 0C12.9 7.6 16.4 11.1 24 12C16.4 12.9 12.9 16.4 12 24C11.1 16.4 7.6 12.9 0 12C7.6 11.1 11.1 7.6 12 0Z';
    const onBurst = (e) => {
      const b = document.createElement('div');
      b.className = 'burst';
      b.style.left = `${e.clientX}px`;
      b.style.top = `${e.clientY}px`;
      const n = 7;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const r = 26 + Math.random() * 22;
        b.insertAdjacentHTML('beforeend', `<svg viewBox="0 0 24 24" style="--bx:${Math.cos(a) * r}px;--by:${Math.sin(a) * r}px"><path d="${STAR}"/></svg>`);
      }
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 900);
    };
    window.addEventListener('pointerdown', onBurst);
    if (!fine) return () => window.removeEventListener('pointerdown', onBurst);

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
      window.removeEventListener('pointerdown', onBurst);
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
        <img src="/images/moon-cursor.webp" alt="" width="96" height="96" />
        <span className="label">View</span>
      </div>
    </>
  );
}
