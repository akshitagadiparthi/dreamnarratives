import { site } from '@/content/site';
import { services } from '@/content/services';

export default function sitemap() {
  const now = new Date();
  const pages = [
    ['', 1, 'weekly'],
    ['/what-we-do', 0.9, 'weekly'],
    ...services.map((s) => [`/what-we-do/${s.slug}`, 0.9, 'weekly']),
    ['/who-we-are', 0.8, 'monthly'],
    ['/monogram', 0.7, 'monthly'],
    ['/enquiries', 0.7, 'yearly'],
    ['/contact', 0.6, 'yearly'],
  ];
  return pages.map(([p, priority, changeFrequency]) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency, priority }));
}
