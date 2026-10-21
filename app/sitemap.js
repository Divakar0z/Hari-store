import { get } from '@/lib/db'
import { catList } from '@/lib/catalog'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
  const products = await get('products')
  return [
    { url: site, changeFrequency: 'daily', priority: 1 },
    ...catList(products).map(c => ({ url: `${site}/category/${c.slug}`, changeFrequency: 'daily', priority: 0.9 })),
    ...products.map(p => ({ url: `${site}/products/${p.slug}`, changeFrequency: 'weekly', priority: 0.7 })),
  ]
}
