import MonogramStudio from '@/components/MonogramStudio';
import { PageIntro } from '@/components/Basics';
import { Closing } from '@/components/Sections';

export const metadata = {
  title: 'Free Wedding Monogram Maker',
  description: 'Make your wedding monogram for free with Dream Narratives, the invitation designers in Vijayawada. Type two initials, pick a style, then download or share it.',
  alternates: { canonical: '/monogram' },
  openGraph: { url: '/monogram', title: 'Make your wedding monogram · Dream Narratives', description: 'Type two initials and get a monogram to download and share. Free, from the invitation designers in Vijayawada.' },
};

export default function Monogram() {
  return (
    <>
      <PageIntro
        eyebrow="Monogram studio"
        title={['Your initials,', 'beautifully entwined.']}
        lede="Type two initials and watch them become a monogram, the way many of our invitation suites begin. It’s free: download it, share it, put it on everything."
      />
      <section className="section" style={{ paddingTop: 'var(--space-6)' }}>
        <div className="container">
          <MonogramStudio />
        </div>
      </section>
      <Closing
        title={['From a monogram', 'to a whole suite.']}
        body="Invitations, e-invites, video invites and boxes, all carrying your story. Tell us about the day."
        cta={{ label: 'Design my invitation', href: '/enquiries?service=invitation' }}
      />
    </>
  );
}
