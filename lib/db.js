import { Redis } from '@upstash/redis'
import bcrypt from 'bcryptjs'
import { cache } from 'react'
import { CATALOG, slugify } from './catalog'

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const redis = url && token ? new Redis({ url, token }) : null
const mem = (globalThis.__mem ||= {})

export const uid = p => p + '_' + Math.random().toString(36).slice(2, 9)
export { slugify }

const ADJ = ['Premium', 'Classic', 'Smart', 'Ultra', 'Everyday', 'Pro', 'Urban', 'Prime', 'Eco', 'Royal']

function buildProducts() {
  const seen = new Set()
  let n = 0
  return CATALOG.flatMap(c =>
    c.items.split(',').map((it, i) => {
      n++
      const name = (c.adj === false ? '' : ADJ[(n * 7 + i) % ADJ.length] + ' ') + it.trim()
      let slug = slugify(name)
      if (seen.has(slug)) slug += '-' + n
      seen.add(slug)
      const [lo, hi] = c.range
      let price = Math.round(hi * Math.pow(lo / hi, i / 19) * (0.9 + ((n * 37) % 21) / 100))
      if (price > 100) price = Math.round(price / 10) * 10 - 1
      return {
        id: 'p_' + n, slug, name, price: Math.max(price, 19), category: c.name, emoji: c.emoji,
        desc: `${name} from our ${c.name} range. Quality checked before dispatch, delivered fast, with easy 7 day returns.`,
        image: `https://loremflickr.com/600/600/${c.kw}?lock=${n}`, stock: 10 + (n % 40), featured: true,
      }
    })
  )
}

function seed(key) {
  if (key === 'products') return buildProducts()
  if (key === 'users') return [{
    id: 'u_admin', name: 'Admin', email: (process.env.ADMIN_EMAIL || 'admin@haristore.com').toLowerCase(),
    hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10), role: 'admin', createdAt: Date.now(),
  }]
  if (key === 'orders') return []
  if (key === 'settings') return {
    storeName: 'Hari Store', tagline: 'Everything you need, one store',
    heroTitle: 'HARI STORE', heroSub: '20 categories, 400 products. Electronics, books, fashion and more, delivered to your door.',
    announcement: 'Free delivery above ₹999 · Cash on delivery available',
    seoDescription: 'Hari Store: shop electronics, mobiles, books, fashion, home, grocery and more across 20 categories. Fast delivery across India.',
  }
}

const K = key => 'hari:' + key

export async function set(key, val) {
  if (redis) await redis.set(K(key), val)
  else mem[K(key)] = val
}

export const get = cache(async key => {
  let v = redis ? await redis.get(K(key)) : mem[K(key)]
  if (v == null) { v = seed(key); await set(key, v) }
  return v
})
