import { writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE_URL = process.env.SITE_URL || 'https://sorowork.xyz'

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/discover', priority: '0.9', changefreq: 'daily' },
  { path: '/communities', priority: '0.7', changefreq: 'weekly' },
  { path: '/leaderboard', priority: '0.6', changefreq: 'daily' },
  { path: '/feed', priority: '0.5', changefreq: 'daily' },
]

const today = new Date().toISOString().split('T')[0]

const urls = staticRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const outPath = resolve(import.meta.dirname, '..', 'public', 'sitemap.xml')
writeFileSync(outPath, sitemap)
console.log(`Sitemap written to ${outPath} with ${staticRoutes.length} URLs`)
