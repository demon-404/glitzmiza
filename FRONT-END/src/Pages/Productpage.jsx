import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Css/product.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import logo from "../assets/logo.png"
import leaves from "../assets/leaves.png"

function Productpage() {
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
    window.addEventListener('products:changed', onChanged)
    return () => window.removeEventListener('products:changed', onChanged)
  }, [])
  return (
    <>
      <Header />
      
      <div class="leaves"> <img src={leaves} alt=""/> </div>

      <div className="best-selling">
        <div className="sell-1">
          <img src={logo} alt="logo" />
          <h2>Best Selling</h2>
          <h1>Latest Products</h1>
        </div>


        {/* <!-- products --> */}
        <section className="product-section">
          {loading ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div className="product-card" key={`s-${i}`}>
                  <span className="badge">&nbsp;</span>
                  <div className="icons">
                    <button>♡</button>
                    <button>👁</button>
                    <button>🛒</button>
                  </div>
                  <div className="skeleton" style={{ width: '100%', height: 220, borderRadius: 12 }} />
                  <hr />
                  <div className="skeleton" style={{ width: '60%', height: 20, marginBottom: 6 }} />
                  <div className="skeleton" style={{ width: '40%', height: 16, marginBottom: 6 }} />
                  <div className="skeleton" style={{ width: '100%', height: 48 }} />
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
              `}</style>
            </>
          ) : error ? (
            <p style={{ color: '#b91c1c' }}>{error}</p>
          ) : products.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No products available.</p>
          ) : (
            products.map((p) => {
              const hasDiscount = p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price
              const pct = hasDiscount ? Math.round((1 - Number(p.discountPrice)/Number(p.price)) * 100) : 0
              const imgSrc = (p.imageUrl ? p.imageUrl : `${apiBase}/admin/products/${p._id}/image`) + `?t=${encodeURIComponent(p.updatedAt || p.createdAt || '')}`
              return (
                <div className="product-card" key={p._id} onClick={() => navigate(`/single-product/${p._id}`)} style={{ cursor: 'pointer' }}>
                  {hasDiscount ? <span className="badge">-{pct}%</span> : <span className="badge" style={{ opacity: 0 }}>0%</span>}
                  <div className="icons">
                    <button>♡</button>
                    <button>👁</button>
                    <button>🛒</button>
                  </div>
                  <img src={imgSrc} alt={p.name} style={{ 
                    width: '100%', 
                    height: '220px', 
                    objectFit: 'cover', 
                    borderRadius: '12px' 
                  }} />
                  <hr />
                  <h3>{p.name}</h3>
                  <div className="stars">★★★★★</div>
                  <div className="price">
                    {hasDiscount ? (
                      <>₹{Number(p.discountPrice).toFixed(2)} <del>₹{Number(p.price).toFixed(2)}</del></>
                    ) : (
                      <>₹{Number(p.price).toFixed(2)}</>
                    )}
                  </div>
                  <p className="des">{p.description}</p>
                </div>
              )
            })
          )}
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Productpage;
