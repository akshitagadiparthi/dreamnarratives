import EnquiryForm from '@/components/EnquiryForm';
import { PageIntro } from '@/components/Basics';
import { site } from '@/content/site';

export const metadata = {
  title: 'Enquire · Invitations, Gifting, Branding & Interiors',
  description: 'Start a project with Dream Narratives in Vijayawada: wedding invitations, hampers, branding and social media, or interiors. Tell us your dream and we reply within 48 hours.',
  alternates: { canonical: '/enquiries' },
  openGraph: { url: '/enquiries' },
};

export default function Enquiries() {
  return (
    <>
      <PageIntro
        eyebrow="Enquiries"
        title={['Let’s create something', 'beautiful together.']}
        lede="We can’t wait to hear your story. Choose what we’re creating, and we’ll ask only what matters for it."
      />
      <section className="section" style={{ paddingTop: 'var(--space-6)' }}>
        <div className="container">
          <EnquiryForm />
          <p className="caption" style={{ marginTop: 'var(--space-6)', maxWidth: '40em' }}>
            {site.contact.responseTime} For wedding and event projects, we recommend reaching out as early as possible to ensure availability. Once you send it, you’ll see Driti and Nimisha’s direct numbers and WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
