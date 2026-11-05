import Link from 'next/link';
import { PageIntro } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { site, whatsappHref } from '@/content/site';
import { faq } from '@/content/studio';

export const metadata = {
  title: 'Contact us',
  description: 'Reach Dream Narratives on WhatsApp, by phone, on Instagram or by email.',
};

export default function Contact() {
  const { contact } = site;
  const answered = faq.filter((f) => f.a);
  const rows = [
    { label: 'WhatsApp', value: 'Chat with us directly', href: whatsappHref('Hello Dream Narratives!'), external: true },
    ...contact.phones.map((p) => ({ label: `Call ${p.name}`, value: p.display, href: `tel:+${p.tel}` })),
    { label: 'Instagram', value: `@${contact.instagram}`, href: `https://instagram.com/${contact.instagram}`, external: true },
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageIntro eyebrow="Contact us" title={['Your dream,', 'beautifully narrated.']} lede={`Based in ${site.city}, designing for celebrations, homes and brands across Andhra Pradesh and Telangana. ${contact.responseTime}`}>
        <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
          <Link href="/enquiries" className="btn btn-fill">Send an enquiry</Link>
        </div>
      </PageIntro>

      <section className="section" style={{ paddingTop: 'var(--space-7)' }} aria-label="Ways to reach us">
        <div className="container">
          <ul className="contact-list reveal">
            {rows.map((r) => (
              <li key={r.label}>
                <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="eyebrow" style={{ margin: 0 }}>{r.label}</span>
                  <span className="value">{r.value}</span>
                  <span className="go" aria-hidden="true">Open</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {answered.length ? (
        <section className="section ground-bone" aria-labelledby="faq-title">
          <div className="container split top">
            <div className="reveal">
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-title" className="heading">
                Your questions,
                <br />
                <em>answered.</em>
              </h2>
            </div>
            <div className="faq reveal" style={{ '--delay': '150ms' }}>
              {answered.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Closing />
    </>
  );
}
