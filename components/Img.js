'use client'
import { useState } from 'react'

export default function Img({ src, alt, emoji = '🛍️' }) {
  const [bad, setBad] = useState(!src)
  if (bad) return <span className="emo" role="img" aria-label={alt}>{emoji}</span>
  return <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
}
