'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { heroPieces } from '@/content/services';
import { Slot, Clouds, Stardust, Sparkles } from './Basics';

/**
 * The landing hook. The crescent glows behind the name while pieces of work
 * drift around it at different depths. The pointer gently pushes nearby
 * pieces aside, and on scroll they part outward like clouds.
 */
export default function HeroGallery({ eyebrow, title, lede, primary, secondary, logo }) {
  const heroRef = useRef(null);
  const pieceRefs = useRef([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) return;
    const fine = window.matchMedia('(pointer: fine)').matches;

    const push = pieceRefs.current.map(() => ({ x: 0, y: 0 }));
    let part = 0;
    let raf = null;

    const apply = () => {
      raf = null;
      const b = hero.getBoundingClientRect();
      const cx = b.left + b.width / 2;
      const cy = b.top + b.height / 2;
      pieceRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const ox = r.left + r.width / 2 - cx;
        const oy = r.top + r.height / 2 - cy;
        const len = Math.hypot(ox, oy) || 1;
        const px = (ox / len) * part * 260;
        const py = (oy / len) * part * 260 - part * 60;
        el.style.transform = `translate3d(${push[i].x + px}px, ${push[i].y + py}px, 0)`;
        el.style.opacity = String(1 - part * 0.9);
      });
      hero.style.setProperty('--part', part.toFixed(3));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };

    const onMove = (e) => {
      const hb = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - hb.left) / hb.width - 0.5).toFixed(3));
      hero.style.setProperty('--my', ((e.clientY - hb.top) / hb.height - 0.5).toFixed(3));
      pieceRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - e.clientX;
        const dy = r.top + r.height / 2 - e.clientY;
        const dist = Math.hypot(dx, dy);
        const reach = 240;
        const k = dist < reach ? ((1 - dist / reach) * 26) / (dist || 1) : 0;
        push[i] = { x: dx * k, y: dy * k };
      });
      schedule();
    };
    const onLeave = () => {
      push.forEach((p) => { p.x = 0; p.y = 0; });
      schedule();
    };
    const onScroll = () => {
      part = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.8)));
      schedule();
    };

    if (fine) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero night" ref={heroRef} aria-labelledby="hero-title" data-cursor-dark>
      <div className="hero-sky" aria-hidden="true" />
      <Stardust count={110} seed={5} />
      <div className="shooting-stars" aria-hidden="true"><i /><i /><i /></div>
      <div className="moon-wrap" aria-hidden="true">
        <div className="moon-halo" />
        <Image className="hero-moon" src="/images/moon.webp" alt="" width={1254} height={1254} priority sizes="(max-width: 760px) 90vw, 620px" />
      </div>
      <Sparkles items={[[30, 24, 18, 0], [64, 16, 12, 1.6], [72, 46, 20, 0.8], [27, 52, 11, 2.4], [45, 12, 10, 3.1], [56, 62, 13, 1.2], [14, 36, 9, 4], [86, 30, 10, 2.9], [40, 66, 8, 3.6], [78, 64, 9, 0.3]]} />
      <Clouds set="hero" />
      <div className="hero-fade" aria-hidden="true" />

      {heroPieces.map((p, i) => (
        <div
          key={i}
          ref={(el) => (pieceRefs.current[i] = el)}
          className={`hero-piece${p.front ? ' front' : ''}${p.m ? '' : ' hide-mobile'}${p.cutout ? ' cutout' : ''}`}
          style={{ '--l': `${p.left}%`, '--t': `${p.top}%`, '--ml': `${(p.m || [p.left])[0]}%`, '--mt': `${(p.m || [0, p.top])[1]}%`, width: `clamp(${Math.round(p.w * 0.55)}px, ${(p.w / 14.4).toFixed(2)}vw, ${p.w}px)`, aspectRatio: `${p.w} / ${p.h}` }}
          aria-hidden="true"
        >
          <Link
            href={`/what-we-do/${p.service}`}
            className="drift"
            tabIndex={-1}
            data-cursor="view"
            style={{ display: 'block', '--d': `${p.d}s`, '--x': `${p.x}px`, '--y': `${p.y}px`, '--r0': `${p.r0}deg`, '--r1': `${p.r1}deg`, '--delay': `${0.8 + i * 0.12}s` }}
          >
            <Slot item={p} tone={p.tone} float sizes="(max-width: 760px) 40vw, 280px" priority={i < 3} />
          </Link>
        </div>
      ))}

      <div className="hero-copy">
        <h1 id="hero-title" className="hero-logo">
          {logo ? (
            <Image src={logo.light} alt={title.join(' ')} width={logo.width} height={logo.height} priority sizes="(max-width: 760px) 86vw, 640px" />
          ) : (
            <span className="display-xl">{title[0]} <em>{title[1]}</em></span>
          )}
        </h1>
        <p className="lede">{lede}</p>
        <div className="btn-row">
          <Link href={primary.href} className="btn btn-moon">{primary.label}</Link>
          <Link href={secondary.href} className="btn btn-ghost-dusk">{secondary.label}</Link>
        </div>
      </div>

      <a href="#studio" className="hero-scroll">Scroll</a>
    </section>
  );
}
