import { site } from '@/lib/site'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/account', '/cart', '/login', '/search', '/api/'] }],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  }
}
