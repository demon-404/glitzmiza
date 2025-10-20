import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5010'

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${apiBase}/admin/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    load()

    const onChanged = () => load()
    const onVisible = () => { if (document.visibilityState === 'visible') load() }
    window.addEventListener('products:changed', onChanged)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('products:changed', onChanged)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return (
    <>
    <div className="products">
        {loading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div className="product" key={`skeleton-${i}`}>
                <div className="product-home-img">
                  <div style={{ width: '100%', height: 200, borderRadius: 12 }} className="skeleton" />
                </div>
                <div className="product-home-dtl">
                  <div style={{ height: 20, width: '60%', marginBottom: 8 }} className="skeleton" />
                  <div style={{ height: 14, width: '100%', marginBottom: 6 }} className="skeleton" />
                  <div style={{ height: 14, width: '90%', marginBottom: 6 }} className="skeleton" />
                  <div className="price-box">
                    <div className="price">
                      <div style={{ height: 28, width: 120 }} className="skeleton" />
                    </div>
                    <div className="bag"><div style={{ height: 28, width: 28, borderRadius: 6 }} className="skeleton" /></div>
                  </div>
                </div>
              </div>
            ))}
            <style>{`
              .skeleton {
                background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
                background-size: 400% 100%;
                animation: shimmer 1.2s ease-in-out infinite;
              }
              @keyframes shimmer {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
              @media (max-width: 720px) {
                .product-home-img .skeleton { height: 160px !important; }
              }
            `}</style>
          </>
        ) : error ? (
          <p style={{ color: '#b91c1c' }}>{error}</p>
        ) : products.length === 0 ? (
          <p style={{ color: '#6b7280' }}>No products available.</p>
        ) : (
          products.map((p) => (
            <div className="product" key={p._id} onClick={() => navigate(`/single-product/${p._id}`)} style={{ cursor: 'pointer' }}>
                <div className="product-home-img">
                    <img src={(p.imageUrl ? p.imageUrl : `${apiBase}/admin/products/${p._id}/image`) + `?t=${encodeURIComponent(p.updatedAt || p.createdAt || '')}`} alt={p.name} />
                </div>
                <div className="product-home-dtl">
                    <h3>{p.name}</h3>
                    <p className="des">{p.description}</p>
                    <div className="price-box">
                        <div className="price">
                            {p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price ? (
                              <>
                                <h2>₹{Number(p.discountPrice).toFixed(2)}</h2>
                                <p className="rate" style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ textDecoration: 'line-through' }}>₹{Number(p.price).toFixed(2)}</span>
                                  <span style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: 999 }}>
                                    -{Math.round((1 - Number(p.discountPrice)/Number(p.price)) * 100)}%
                                  </span>
                                </p>
                              </>
                            ) : (
                              <>
                                <h2>₹{Number(p.price).toFixed(2)}</h2>
                                <p className="rate">&nbsp;</p>
                              </>
                            )}
                        </div>
                        <div className="bag"><i className="ri-shopping-bag-line"></i></div>
                    </div>
                </div>
            </div>
          ))
        )}
    </div>
    </>
  )
}

export default Card