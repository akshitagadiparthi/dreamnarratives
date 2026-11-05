import EnquiryForm from '@/components/EnquiryForm';
import { PageIntro } from '@/components/Basics';
import { site, whatsappHref } from '@/content/site';

export const metadata = {
  title: 'Enquiries',
  description: 'Begin your story with Dream Narratives: tell us about your invitation, gift, brand, social media or space.',
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
            {site.contact.responseTime} For wedding and event projects, we recommend reaching out as early as possible to ensure availability. Prefer to talk?{' '}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gilt)' }}>Message us on WhatsApp</a>.
          </p>
        </div>
      </section>
    </>
  );
}
