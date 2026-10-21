import Link from 'next/link'
import { session } from '@/lib/auth'
import { get } from '@/lib/db'
import { catList } from '@/lib/catalog'
import { CartLink, LogoutButton } from './client'
import Drawer from './Drawer'

export default async function Header({ s }) {
  const [u, products] = await Promise.all([session(), get('products')])
  const user = u ? { name: u.name, role: u.role } : null
  return (
    <>
      {s.announcement && <div className="bar">{s.announcement}</div>}
      <header className="head">
        <div className="left">
          <Drawer cats={catList(products)} user={user} store={s.storeName} />
          <Link href="/" className="logo">{s.storeName}</Link>
        </div>
        <form action="/search" className="hs"><input name="q" placeholder="Search products" aria-label="Search" /></form>
        <nav aria-label="Main">
          {u?.role === 'admin' && <Link href="/admin" className="dm">Admin</Link>}
          {u ? (
            <>
              <Link href="/account" className="dm">{u.name.split(' ')[0]}</Link>
              <span className="dm"><LogoutButton /></span>
            </>
          ) : (
            <Link href="/login" className="dm">Login</Link>
          )}
          <CartLink />
        </nav>
      </header>
    </>
  )
}
