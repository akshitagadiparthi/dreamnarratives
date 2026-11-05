import { site } from '@/content/site';
import { services } from '@/content/services';

export default function sitemap() {
  const pages = ['', '/who-we-are', '/what-we-do', '/enquiries', '/contact', ...services.map((s) => `/what-we-do/${s.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }));
}
