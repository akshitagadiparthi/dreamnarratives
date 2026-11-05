'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, enquireLink } from '@/content/site';
import { services } from '@/content/services';
import { Wordmark } from './Basics';
import ThemeToggle from './ThemeToggle';

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState(false);
  const [menu, setMenu] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setPanel(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && (setMenu(false), setPanel(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const openPanel = () => {
    clearTimeout(closeTimer.current);
    setPanel(true);
  };
  const closePanelSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPanel(false), 180);
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={`site-header${scrolled ? ' scrolled' : ''}${panel ? ' panel-open' : ''}${pathname === '/' && !scrolled && !panel && !menu ? ' over-night' : ''}`} onMouseLeave={closePanelSoon}>
        <div className="container nav-bar">
          <Wordmark />
          <nav aria-label="Main">
            <ul className="nav-links">
              {nav.map((item) =>
                item.services ? (
                  <li key={item.href} onMouseEnter={openPanel}>
                    <button
                      type="button"
                      className={isActive(item.href) ? 'active' : ''}
                      aria-expanded={panel}
                      aria-controls="services-panel"
                      onClick={() => setPanel((p) => !p)}
                    >
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <li key={item.href} onMouseEnter={closePanelSoon}>
                    <Link href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
              <li onMouseEnter={closePanelSoon}>
                <Link href={enquireLink.href} className="btn btn-ghost" aria-current={isActive(enquireLink.href) ? 'page' : undefined}>
                  {enquireLink.label}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="nav-tools">
            <ThemeToggle />
            <button type="button" className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
              {menu ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        <div id="services-panel" className={`services-panel${panel ? ' open' : ''}`} onMouseEnter={openPanel}>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/what-we-do/${s.slug}`} tabIndex={panel ? 0 : -1}>
                  <b>
                    {s.name[0]} <em>{s.name[1]}</em>
                  </b>
                  <span>{s.promise}</span>
                  <i>{s.short}</i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menu ? ' open' : ''}`} aria-hidden={!menu}>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} tabIndex={menu ? 0 : -1}>{item.label}</Link>
              {item.services ? (
                <ul className="sub">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/what-we-do/${s.slug}`} tabIndex={menu ? 0 : -1}>
                        {s.name[0]} <em>{s.name[1]}</em>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <Link href={enquireLink.href} className="btn btn-fill" tabIndex={menu ? 0 : -1}>
          Begin your story
        </Link>
      </div>
    </>
  );
}
