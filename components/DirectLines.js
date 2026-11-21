'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// The founders' numbers, revealed only to visitors who have sent an enquiry.
// After an enquiry the server hands them back once; we keep them in this
// visitor's browser so they still see them if they come back to Contact.

const KEY = 'dn-direct-lines';

export function rememberDirectLines(contact) {
  try { localStorage.setItem(KEY, JSON.stringify(contact)); } catch {}
}

function readDirectLines() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}

const wa = (n, text) => `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** The numbers themselves: WhatsApp first, then a call row per founder. */
export function DirectLinesList({ contact, name }) {
  if (!contact) return null;
  const hello = `Hello Dream Narratives${name ? `, this is ${name}` : ''}. I just sent an enquiry on your website.`;
  return (
    <ul className="contact-list direct-lines">
      {contact.whatsapp ? (
        <li>
          <a href={wa(contact.whatsapp, hello)} target="_blank" rel="noopener noreferrer">
            <span className="eyebrow" style={{ margin: 0 }}>WhatsApp</span>
            <span className="value">Chat with us directly</span>
            <span className="go" aria-hidden="true">Open</span>
          </a>
        </li>
      ) : null}
      {(contact.phones || []).map((p) => (
        <li key={p.name}>
          <a href={`tel:+${p.tel}`}>
            <span className="eyebrow" style={{ margin: 0 }}>Call {p.name}</span>
            <span className="value">{p.display}</span>
            <span className="go" aria-hidden="true">Call</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Contact page: the numbers if this visitor has enquired, otherwise a locked row. */
export default function DirectLines() {
  const [contact, setContact] = useState(null);
  useEffect(() => setContact(readDirectLines()), []);

  if (contact) return <DirectLinesList contact={contact} />;
  return (
    <div className="locked-lines">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14.5v2.5" /></svg>
      <div>
        <span className="eyebrow" style={{ margin: 0 }}>Phone &amp; WhatsApp</span>
        <p>Nimisha and Driti share their direct numbers once you’ve told us a little about your project. It keeps their phones for the people they’re designing for.</p>
        <Link href="/enquiries" className="text-link">Send an enquiry to unlock</Link>
      </div>
    </div>
  );
}
