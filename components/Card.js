import Link from 'next/link'
import { money } from '@/lib/money'
import Img from './Img'

export default function Card({ p }) {
  return (
    <Link href={`/products/${p.slug}`} className="card">
      <div className="ph"><Img src={p.image} alt={p.name} emoji={p.emoji} /></div>
      <div className="in">
        <small>{p.category}</small>
        <h3>{p.name}</h3>
        <span className="price">{money(p.price)}</span>
        {p.stock < 1 && <small> · Sold out</small>}
      </div>
    </Link>
  )
}
