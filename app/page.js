import Link from 'next/link'
import { get } from '@/lib/db'
import { catList } from '@/lib/catalog'
import Card from '@/components/Card'

const SHOW = ['Electronics', 'Books', 'Mobiles', 'Mens Fashion', 'Home & Kitchen', 'Footwear']

export default async function Home() {
  const [s, products] = await Promise.all([get('settings'), get('products')])
  const cats = catList(products)
  const [first, ...rest] = s.heroTitle.split(' ')
  const rows = cats.filter(c => SHOW.includes(c.name)).sort((a, b) => SHOW.indexOf(a.name) - SHOW.indexOf(b.name))

  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <h1><span className="a">{first}</span><span className="b">{rest.join(' ')}</span></h1>
          <p>{s.heroSub}</p>
          <Link href="#categories" className="btn">Browse categories</Link>
        </div>
        <div className="orb" aria-hidden="true" />
      </section>

      <section id="categories">
        <h2>Shop by category</h2>
        <div className="tiles">
          {cats.map(c => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="tile"><span>{c.emoji}</span>{c.name}</Link>
          ))}
        </div>
      </section>

      {rows.map(c => (
        <section key={c.slug} style={{ marginTop: 40 }}>
          <div className="row" style={{ border: 0 }}>
            <h2 style={{ margin: 0 }}>{c.emoji} {c.name}</h2>
            <Link href={`/category/${c.slug}`} className="price">View all</Link>
          </div>
          <div className="grid" style={{ paddingBottom: 0 }}>
            {products.filter(p => p.category === c.name).slice(0, 4).map(p => <Card key={p.id} p={p} />)}
          </div>
        </section>
      ))}
      <div style={{ height: 60 }} />
    </div>
  )
}
