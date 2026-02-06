import { writeFileSync } from 'fs';
import { blogService } from '../services/blogService';
import { serviceApi } from '../services/serviceService';

const generateSitemap = async () => {
  const baseUrl = 'https://donvik.com';
  const currentDate = new Date().toISOString();

  const staticPages = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0',
    },
    {
      url: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      url: `${baseUrl}/blogs`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9',
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7',
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6',
    },
  ];

  try {
    const blogsResponse = await blogService.getAll();
    const blogs = blogsResponse.data.blogs || [];

    const blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog._id}`,
      lastmod: new Date(blog.updatedAt).toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const allPages = [...staticPages, ...blogPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    writeFileSync('dist/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

generateSitemap();
