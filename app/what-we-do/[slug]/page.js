import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGallery from '@/components/WorkGallery';
import { Closing, PairedWith, Accounts, Constellation } from '@/components/Sections';
import { Clouds, Sparkles } from '@/components/Basics';
import { JsonLd, serviceSchema } from '@/components/Seo';
import MonogramTeaser from '@/components/MonogramTeaser';
import { services, getService } from '@/content/services';
import { founders } from '@/content/studio';
import { site } from '@/content/site';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seoName,
    description: s.seoDescription,
    alternates: { canonical: `/what-we-do/${s.slug}` },
    openGraph: { title: `${s.seoName} · Dream Narratives`, description: s.seoDescription, url: `/what-we-do/${s.slug}` },
  };
}


export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  // Feeds already shown as account cards aren't repeated in the gallery.
  const accountImages = new Set((s.accounts || []).map((a) => a.image));
  const work = s.work.filter((w) => !accountImages.has(w.src));
  const hasRealWork = work.some((w) => w.src || w.video);
  const lead = s.leadBy ? founders.find((f) => f.name === s.leadBy) : null;

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <section className="service-hero has-clouds">
        <Clouds set="corner" />
        <Sparkles items={[[88, 34, 14, 0.4], [70, 70, 9, 1.8], [52, 26, 8, 2.6]]} />
        <div className="container service-head">
          <div className="reveal">
            <Link href="/what-we-do" className="crumb">What do we do? /</Link>
            <span className="eyebrow" style={{ marginTop: 'var(--space-5)' }}>{s.label}</span>
            <h1 className="display-l">
              {s.name[0]} <em>{s.name[1]}</em>
            </h1>
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>{s.promise}</p>
          </div>
          <div className="reveal" style={{ '--delay': '150ms' }}>
            <p className="body" style={{ margin: 0 }}>{s.intro}</p>
            {lead ? <p className="caption" style={{ marginTop: 'var(--space-3)' }}>Led by {lead.name}, {lead.role}</p> : null}
            <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
              <Link href={`/enquiries?service=${s.slug}`} className="btn btn-fill">Begin your story</Link>
              <a href="#work" className="btn btn-ghost">See the work</a>
            </div>
          </div>
        </div>
      </section>

      {s.accounts ? <Accounts accounts={s.accounts} id={hasRealWork ? 'accounts' : 'work'} /> : null}

      {hasRealWork || !s.accounts ? (
        <section id="work" className="section" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <span className="eyebrow">Selected work</span>
                <h2 id="work-title" className="heading">
                  Stories we’ve <em>designed.</em>
                </h2>
              </div>
              <a href={`https://instagram.com/${site.contact.instagram}`} className="text-link" target="_blank" rel="noopener noreferrer">More on Instagram</a>
            </div>
            <WorkGallery work={work} />
          </div>
        </section>
      ) : null}

      <Constellation offers={s.offers} />
      {s.slug === 'invitation' ? <MonogramTeaser /> : null}

      <PairedWith slugs={s.pairs} />
      <Closing
        title={['Let’s begin', 'your story.']}
        body="Tell us a little about what you’re dreaming of. We’ll take it from there."
        cta={{ label: 'Start an enquiry', href: `/enquiries?service=${s.slug}` }}
      />
    </>
  );
}
