import Link from 'next/link';
import { Clouds, Sparkles } from '@/components/Basics';
import { Closing, Constellation, PairedWith } from '@/components/Sections';
import VideoReels from '@/components/VideoReels';
import { JsonLd } from '@/components/Seo';
import { getService } from '@/content/services';
import { site } from '@/content/site';

export const metadata = {
  title: 'Video Wedding Invitations in Vijayawada',
  description: 'Video invites by Dream Narratives, Vijayawada: wedding invitation films, save-the-date reels and a reel for every function, in Telugu, English or both, made for WhatsApp and Instagram.',
  alternates: { canonical: '/what-we-do/video-invites' },
  openGraph: { url: '/what-we-do/video-invites', title: 'Video Wedding Invitations · Dream Narratives, Vijayawada' },
};

const formats = [
  'Save-the-date reels',
  'Wedding invitation films',
  'A reel for every function',
  'Illustrated story invites',
  'Telugu, English or both',
  'Made for WhatsApp & Instagram',
];

const steps = [
  { t: 'Your story', d: 'Share the names, dates, functions and the feeling you want guests to have.' },
  { t: 'Storyboard', d: 'We sketch the scenes, the words and the music, frame by frame.' },
  { t: 'Motion', d: 'Illustration and animation bring it to life, in your colours and your language.' },
  { t: 'Ready to send', d: 'Delivered in vertical HD, sized for WhatsApp, Instagram and status.' },
];

export default function VideoInvites() {
  const inv = getService('invitation');
  const videos = inv.work.filter((w) => w.video || w.kind === 'video-invites');
  const stills = inv.work.filter((w) => w.src && w.kind === 'e-invites' && w.height > w.width).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Video wedding invitations',
          serviceType: formats,
          provider: { '@id': new URL('/#organization', site.url).toString() },
          areaServed: site.areaServed,
          url: new URL('/what-we-do/video-invites', site.url).toString(),
        }}
      />
      <section className="service-hero has-clouds">
        <Clouds set="corner" />
        <Sparkles items={[[88, 34, 14, 0.4], [70, 70, 9, 1.8], [52, 26, 8, 2.6]]} />
        <div className="container service-head">
          <div className="reveal">
            <Link href="/what-we-do/invitation" className="crumb">The Invitation /</Link>
            <span className="eyebrow" style={{ marginTop: 'var(--space-5)' }}>Invites in motion</span>
            <h1 className="display-l">
              Video <em>invites</em>
            </h1>
            <p className="lede" style={{ marginTop: 'var(--space-4)' }}>Your invitation, brought to life.</p>
          </div>
          <div className="reveal" style={{ '--delay': '150ms' }}>
            <p className="body" style={{ margin: 0 }}>
              A video invite is the first moment guests feel your celebration. We storyboard, illustrate and animate it around your story, set it to music, and deliver it ready to share on WhatsApp and Instagram.
            </p>
            <div className="btn-row" style={{ marginTop: 'var(--space-5)' }}>
              <Link href="/enquiries?service=invitation" className="btn btn-fill">Begin your video invite</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section reels-section" aria-labelledby="reels-title">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 id="reels-title" className="heading">
                Stories in <em>motion.</em>
              </h2>
            </div>
            <a href={`https://instagram.com/${site.contact.instagram}`} className="text-link" target="_blank" rel="noopener noreferrer">Watch on Instagram</a>
          </div>
          <VideoReels videos={videos} stills={stills} />
        </div>
      </section>

      <Constellation offers={formats} eyebrow="What a video invite can be" title={['Every frame,', 'made for you alone.']} />

      <section className="section" aria-labelledby="video-steps">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow">How it comes together</span>
              <h2 id="video-steps" className="heading">
                From story <em>to screen.</em>
              </h2>
            </div>
          </div>
          <ol className="steps four">
            {steps.map((s, i) => (
              <li key={s.t} className="reveal" style={{ '--delay': `${i * 120}ms` }}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PairedWith slugs={['invitation', 'gift']} />
      <Closing
        title={['Let’s set your story', 'in motion.']}
        body="Tell us about the day, the functions and the people you’re inviting."
        cta={{ label: 'Start an enquiry', href: '/enquiries?service=invitation' }}
      />
    </>
  );
}
