import { get } from '@/lib/db'
import Card from '@/components/Card'

export const metadata = { title: 'Search', robots: { index: false } }

export default async function Search({ searchParams }) {
  const q = (searchParams?.q || '').trim()
  const products = await get('products')
  const res = q ? products.filter(p => (p.name + ' ' + p.category).toLowerCase().includes(q.toLowerCase())).slice(0, 60) : []
  return (
    <div className="wrap" style={{ padding: '30px 20px' }}>
      <form action="/search" style={{ maxWidth: 520, marginBottom: 20 }}>
        <input name="q" defaultValue={q} placeholder="Search products" aria-label="Search" />
      </form>
      {q && <p className="muted" style={{ marginBottom: 20 }}>{res.length ? `Results for "${q}"` : `No products found for "${q}". Try a shorter word or pick a category from the menu.`}</p>}
      <div className="grid">{res.map(p => <Card key={p.id} p={p} />)}</div>
    </div>
  )
}
