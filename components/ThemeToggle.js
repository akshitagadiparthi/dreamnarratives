'use client';

import { useEffect, useState } from 'react';

const effective = () => {
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Switches between the light and dark versions of the site. */
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
        {/* a half-filled circle: light and dark */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" /></svg>
      </button>
      {withLabel ? <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span> : null}
    </span>
  );
}
