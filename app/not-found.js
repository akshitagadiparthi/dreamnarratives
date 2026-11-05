import Link from 'next/link';
import { Crescent } from '@/components/Basics';

export default function NotFound() {
  return (
    <section className="page-top section center">
      <div className="container">
        <Crescent size={56} phase={0} />
        <span className="eyebrow" style={{ marginTop: 'var(--space-4)' }}>Page not found</span>
        <h1 className="display-l">
          This page is still
          <br />
          <em>a dream.</em>
        </h1>
        <p className="lede" style={{ margin: 'var(--space-4) auto var(--space-5)' }}>The story you were looking for isn’t here, but plenty of others are.</p>
        <Link href="/" className="btn btn-fill">Back to home</Link>
      </div>
    </section>
  );
}
