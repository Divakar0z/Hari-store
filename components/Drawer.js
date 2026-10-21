'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LogoutButton } from './client'

export default function Drawer({ cats, user, store }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <>
      <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
      {open && <div className="scrim" onClick={close} />}
      <aside className={'drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="dh"><b>{store}</b><button onClick={close} aria-label="Close menu">✕</button></div>
        <form action="/search" style={{ marginBottom: 14 }}>
          <input name="q" placeholder="Search products" />
        </form>
        <div className="dsec">
          {user ? (
            <>
              <p className="muted">Hi, {user.name}</p>
              <Link href="/account" onClick={close}>My orders</Link>
              {user.role === 'admin' && <Link href="/admin" onClick={close}>Admin panel</Link>}
              <LogoutButton className="lnk" />
            </>
          ) : (
            <Link href="/login" onClick={close} className="btn" style={{ textAlign: 'center' }}>Login / Register</Link>
          )}
          <Link href="/cart" onClick={close}>Cart</Link>
        </div>
        <p className="muted" style={{ margin: '14px 0 4px', fontSize: 13 }}>Shop by category</p>
        <Link href="/" onClick={close}>All products</Link>
        {cats.map(c => (
          <Link key={c.slug} href={`/category/${c.slug}`} onClick={close}>{c.emoji} {c.name}</Link>
        ))}
      </aside>
    </>
  )
}
