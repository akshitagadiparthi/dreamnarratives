'use client';

import { useEffect, useState } from 'react';

const effective = () => {
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Switches between the light (ivory) and dark (night) versions of the site. */
export default function ThemeToggle({ withLabel = false }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(effective());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setTheme(effective());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = effective() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('dn-theme', next); } catch {}
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <span className={withLabel ? 'theme-row' : undefined}>
      <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
        {/* a crescent in light mode (go to night), a sun in dark mode (go to day) */}
        <svg className="i-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" /></svg>
        <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" /></svg>
      </button>
      {withLabel ? <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span> : null}
    </span>
  );
}
