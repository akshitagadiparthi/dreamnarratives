import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import '@fontsource/jost/300.css';
import '@fontsource/jost/400.css';
import '@fontsource/jost/500.css';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MoonCursor from '@/components/MoonCursor';
import RevealObserver from '@/components/RevealObserver';
import { site } from '@/content/site';
import { JsonLd, organisationSchema } from '@/components/Seo';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Dream Narratives · Design House in Vijayawada by Nimisha Lingamaneni & Driti Thyagaraj',
    template: '%s · Dream Narratives',
  },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: 'Nimisha Lingamaneni' }, { name: 'Driti Thyagaraj' }],
  creator: 'Dream Narratives',
  creator: 'Dream Narratives',
  publisher: 'Dream Narratives',
  category: 'Design',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Dream Narratives',
    title: 'Dream Narratives · Design House in Vijayawada by Nimisha Lingamaneni & Driti Thyagaraj',
    description: 'Wedding invitations, e-invites and video invites, curated gifting, branding & social media marketing, and architecture & interiors, designed in Vijayawada by Nimisha Lingamaneni & Driti Thyagaraj.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream Narratives · Design House in Vijayawada',
    description: 'Wedding invitations, gifting, branding & social media marketing, and interiors by Nimisha Lingamaneni & Driti Thyagaraj.',
  },
  other: { 'geo.region': 'IN-AP', 'geo.placename': 'Vijayawada' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f4ec' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1612' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className="no-js" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');try{var t=localStorage.getItem('dn-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <JsonLd data={organisationSchema()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MoonCursor />
        <RevealObserver />
      </body>
    </html>
  );
}
