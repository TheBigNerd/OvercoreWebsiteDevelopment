const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Define your URLs
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/auth/new-verification', changefreq: 'monthly', priority: 0.8 },
  { url: '/sign-in', changefreq: 'monthly', priority: 0.8 },
  { url: '/custom-builds', changefreq: 'monthly', priority: 0.9 },
  { url: '/pre-builds', changefreq: 'monthly', priority: 0.9 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/error', changefreq: 'monthly', priority: 0.8 },
  { url: '/favourites', changefreq: 'monthly', priority: 0.8 },
  { url: '/basket', changefreq: 'monthly', priority: 0.8 },
  { url: '/business', changefreq: 'monthly', priority: 0.8 },
];

// Create a stream to write to
const sitemap = new SitemapStream({ hostname: 'https://overcore.co.uk' });
const writeStream = createWriteStream('./public/sitemap.xml');

// Pipe the stream to the write stream
sitemap.pipe(writeStream);

// Add each link to the sitemap
links.forEach(link => sitemap.write(link));

// End the stream
sitemap.end();

// Wait for the stream to finish
streamToPromise(sitemap).then(() => {
  console.log('Sitemap created successfully!');
}).catch(err => {
  console.error('Error creating sitemap:', err);
});