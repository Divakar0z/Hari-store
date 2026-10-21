import { notFound } from 'next/navigation'
import { get } from '@/lib/db'
import { catList } from '@/lib/catalog'
import Card from '@/components/Card'

const load = async slug => {
  const products = await get('products')
  const cat = catList(products).find(c => c.slug === slug)
  return { cat, list: cat ? products.filter(p => p.category === cat.name) : [] }
}

export async function generateMetadata({ params }) {
  const { cat } = await load(params.slug)
  if (!cat) return { title: 'Category not found', robots: { index: false } }
  return {
    title: cat.name,
    description: `Shop ${cat.name} online at great prices. Fast delivery and easy returns.`,
    alternates: { canonical: `/category/${cat.slug}` },
  }
}

export default async function Category({ params }) {
  const { cat, list } = await load(params.slug)
  if (!cat) notFound()
  return (
    <div className="wrap" style={{ padding: '30px 20px' }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>{cat.emoji} {cat.name}</h1>
      <p className="muted" style={{ marginBottom: 24 }}>{list.length} products</p>
      <div className="grid">{list.map(p => <Card key={p.id} p={p} />)}</div>
    </div>
  )
}
