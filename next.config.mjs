/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
    }
};
// next.config.mjs
export default {
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/_next/static/sitemap.xml',
        },
        {
          source: '/robots.txt',
          destination: '/_next/static/robots.txt',
        },
      ];
    },
  };