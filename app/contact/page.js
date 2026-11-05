import Link from 'next/link';
import { PageIntro } from '@/components/Basics';
import { Closing } from '@/components/Sections';
import { site } from '@/content/site';
import DirectLines from '@/components/DirectLines';
import { JsonLd } from '@/components/Seo';
import { faq } from '@/content/studio';

export const metadata = {
  title: 'Contact & FAQ · Dream Narratives, Vijayawada',
  description: 'Contact Driti and Nimisha at Dream Narratives, a design house in Vijayawada: send an enquiry, or reach us on Instagram or by email. Answers to common questions about invitations, gifting, branding and interiors.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact' },
};

export default function Contact() {
  const { contact } = site;
  const answered = faq.filter((f) => f.a);
  const rows = [
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
          <div className="reveal">
            <DirectLines />
          </div>
          <ul className="contact-list reveal" style={{ borderTop: 0 }}>
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
        <section id="faq" className="section ground-bone" aria-labelledby="faq-title">
          <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: answered.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
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
