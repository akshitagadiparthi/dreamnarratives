import Link from 'next/link';
import { site, nav } from '@/content/site';
import { services } from '@/content/services';
import { Wordmark } from './Basics';

export default function SiteFooter() {
  const { contact } = site;
  return (
    <footer className="site-footer" data-cursor-dark>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Wordmark dark />
            <p className="tagline">{site.footerLine}</p>
            <p className="tagline" style={{ marginTop: 'var(--space-3)' }}>A design house in {site.city}, {site.region}, by Driti &amp; Nimisha.</p>
          </div>
          <div>
            <h2>Navigate</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/enquiries">Enquiries</Link></li>
              <li><Link href="/monogram">Monogram studio</Link></li>
            </ul>
          </div>
          <div>
            <h2>What we do</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/what-we-do/${s.slug}`}>
                    {s.name[0]} <em>{s.name[1]}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li><a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer">Instagram @{contact.instagram}</a></li>
              <li><Link href="/enquiries">Phone &amp; WhatsApp, after you enquire</Link></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Designed with intention.</span>
        </div>
      </div>
    </footer>
  );
}
