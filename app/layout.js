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
import { ScrollMoon } from '@/components/Dreamy';
import { site } from '@/content/site';

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.byline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f4ec' },
    { media: '(prefers-color-scheme: dark)', color: '#1b1612' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
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
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollMoon />
        <MoonCursor />
        <RevealObserver />
      </body>
    </html>
  );
}
