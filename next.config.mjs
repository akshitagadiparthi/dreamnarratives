/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Branding and social media were merged into The Identity.
  async redirects() {
    return [{ source: '/what-we-do/telling', destination: '/what-we-do/identity', permanent: true }];
  },
};

export default nextConfig;
