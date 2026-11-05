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
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <Stardust count={46} seed={5} />
      <Clouds set="hero" />
      <Sparkles items={[[33, 30, 16, 0], [66, 28, 11, 1.6], [69, 52, 18, 0.8], [30, 56, 10, 2.4], [47, 20, 9, 3.1], [58, 70, 12, 1.2], [20, 46, 8, 4], [80, 40, 9, 2.9]]} />

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
        <span className="eyebrow">{eyebrow}</span>
        <h1 id="hero-title" className="hero-logo">
          {logo ? (
            <Image src={logo.ink} alt={title.join(' ')} width={logo.width} height={logo.height} priority sizes="(max-width: 760px) 86vw, 640px" />
          ) : (
            <span className="display-xl">{title[0]} <em>{title[1]}</em></span>
          )}
        </h1>
        <p className="lede">{lede}</p>
        <div className="btn-row">
          <Link href={primary.href} className="btn btn-fill">{primary.label}</Link>
          <Link href={secondary.href} className="btn btn-ghost" style={{ background: 'rgba(248,244,236,.6)' }}>{secondary.label}</Link>
        </div>
      </div>

      <a href="#studio" className="hero-scroll">Scroll</a>
    </section>
  );
}
