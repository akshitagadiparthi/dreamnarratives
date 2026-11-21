import Link from 'next/link';
import { notFound } from 'next/navigation';
import WorkGallery from '@/components/WorkGallery';
import { Closing, PairedWith, Accounts, Offers, Head } from '@/components/Sections';
import { Slot, Icon } from '@/components/Basics';
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
  const all = [s.hero, ...s.work].filter((w) => (w.src || w.video) && !accountImages.has(w.src));
  const work = all.length ? all : s.work;
  const lead = s.leadBy ? founders.find((f) => f.name === s.leadBy) : null;
  const isIdentity = !!s.branding;
  const brandWork = isIdentity ? work.filter((w) => w.kind === 'branding') : [];

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <section className="service-hero">
        <div className="container service-head">
          <div className="reveal">
            <Link href="/what-we-do" className="crumb">What do we do? /</Link>
            <span className="eyebrow" style={{ marginTop: 'var(--space-4)' }}>{s.label}</span>
            <h1 className="display-l">
              {s.name[0]} <em>{s.name[1]}</em>
            </h1>
            <p className="lede" style={{ marginTop: 'var(--space-3)' }}>{s.promise}</p>
          </div>
          <div className="reveal" style={{ '--delay': '150ms' }}>
            <p className="body" style={{ margin: 0 }}>{s.intro}</p>
            {lead ? <p className="caption" style={{ marginTop: 'var(--space-3)' }}>Led by {lead.fullName}, {lead.role}</p> : null}
            <div className="btn-row" style={{ marginTop: 'var(--space-4)' }}>
              <Link href={`/enquiries?service=${s.slug}`} className="btn btn-fill">Begin your story</Link>
              <a href="#work" className="btn btn-ghost">See the work</a>
            </div>
            {isIdentity ? (
              <nav className="jump" aria-label="On this page">
                <a href="#branding">Branding</a>
                <a href="#social">Social media marketing</a>
              </nav>
            ) : null}
          </div>
        </div>
      </section>

      {isIdentity ? (
        <>
          {/* Branding */}
          <section id="work" className="section" aria-labelledby="branding-title">
            <div className="container" id="branding">
              <Head eyebrow={s.branding.eyebrow} title={s.branding.title} id="branding-title" lede={s.branding.lede} />
              <div className="brand-grid">
                {brandWork.map((w, i) => (
                  <figure key={w.src} className={`brand-piece reveal${i === 0 ? ' lead' : ''}`} style={{ '--delay': `${i * 90}ms` }} data-cursor="view">
                    <div className="media"><Slot item={w} className="zoom" sizes="(max-width: 760px) 50vw, 30vw" /></div>
                    <figcaption className="caption">{w.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <ul className="pill-list reveal">
                {s.branding.offers.map((o) => (
                  <li key={o}><Icon name={o.match(/logo/i) ? 'mark' : o.match(/stationery|packag/i) ? 'pen' : o.match(/guideline/i) ? 'layout' : 'palette'} size={18} />{o}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Social media marketing */}
          <div id="social">
            <Accounts accounts={s.accounts} eyebrow={s.social.eyebrow} title={s.social.title} lede={s.social.lede} />
          </div>
          <Offers offers={s.social.offers} eyebrow="Social media marketing" title={['From strategy', 'to the last post.']} />
        </>
      ) : (
        <>
          <section id="work" className="section" aria-labelledby="work-title">
            <div className="container">
              <Head
                eyebrow="Selected work"
                title={['Stories we’ve', 'designed.']}
                id="work-title"
                link={{ href: `https://instagram.com/${site.contact.instagram}`, label: 'More on Instagram', external: true }}
              />
              <WorkGallery work={work} />
            </div>
          </section>
          <Offers offers={s.offers} />
        </>
      )}

      {s.slug === 'invitation' ? (
        <section className="section tight" aria-labelledby="inv-motion">
          <div className="container">
            <div className="inline-banner reveal">
              <Icon name="play" size={34} />
              <div>
                <span className="eyebrow">Invites in motion</span>
                <h2 id="inv-motion" className="heading">Video <em>invites</em></h2>
                <p className="body" style={{ margin: 0 }}>Invitation films, illustrated and animated around your story, for every function.</p>
              </div>
              <Link href="/what-we-do/video-invites" className="btn btn-ghost">See video invites</Link>
            </div>
          </div>
        </section>
      ) : null}
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
