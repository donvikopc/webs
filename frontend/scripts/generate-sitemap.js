import { writeFileSync } from 'fs';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuration
const BASE_URL = 'https://donvik.com';
const API_URL = (process.env.VITE_API_URL || 'http://localhost:5001') + '/api';

const generateSitemap = async () => {
  const currentDate = new Date().toISOString();

  // Static Pages
  const staticPages = [
    { url: BASE_URL, changefreq: 'daily', priority: '1.0' },
    { url: `${BASE_URL}/services`, changefreq: 'weekly', priority: '0.8' },
    { url: `${BASE_URL}/blogs`, changefreq: 'daily', priority: '0.9' },
    { url: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.7' },
    { url: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.6' },
    { url: `${BASE_URL}/careers`, changefreq: 'weekly', priority: '0.8' },
  ];

  try {
    // Fetch Blogs
    console.log('Fetching blogs...');
    let blogPages = [];
    try {
      const blogsResponse = await axios.get(`${API_URL}/blogs`);
      const blogs = blogsResponse.data.blogs || [];
      blogPages = blogs.map((blog) => ({
        url: `${BASE_URL}/blogs/${blog._id}`,
        lastmod: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : currentDate,
        changefreq: 'weekly',
        priority: '0.7',
      }));
    } catch (err) {
      console.warn('Warning: Could not fetch blogs. Make sure the backend is running.', err.message);
    }

    // Fetch Jobs
    console.log('Fetching jobs...');
    let jobPages = [];
    try {
      const jobsResponse = await axios.get(`${API_URL}/jobs`);
      // Assuming structure is similar to blogs or check response
      // Usually list response might be direct array or { jobs: [...] }
      // Based on typical patterns in this codebase, let's assume { jobs: [...] } or array
      const jobs = Array.isArray(jobsResponse.data) ? jobsResponse.data : (jobsResponse.data.jobs || []);
      
      jobPages = jobs.map((job) => ({
        url: `${BASE_URL}/careers/${job._id}`,
        lastmod: job.updatedAt ? new Date(job.updatedAt).toISOString() : currentDate,
        changefreq: 'weekly',
        priority: '0.7',
      }));
    } catch (err) {
      console.warn('Warning: Could not fetch jobs. Make sure the backend is running.', err.message);
    }

    const allPages = [...staticPages, ...blogPages, ...jobPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Write to public folder
    const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
    writeFileSync(publicPath, sitemap);
    console.log(`Sitemap generated successfully at ${publicPath}`);
    console.log(`Total URLs: ${allPages.length}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
};

generateSitemap();
