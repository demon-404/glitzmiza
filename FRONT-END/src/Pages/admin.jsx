import React, { useEffect, useState } from 'react'
import apiBase from '../utils/apiBase'

const Admin = () => {
  const [status, setStatus] = useState('Checking backend...')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', discountPrice: '', imageUrl: '', description: '', stock: '' })
  const [imageFileName, setImageFileName] = useState('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [imageContentType, setImageContentType] = useState('')
  // use centralized apiBase from utils

  useEffect(() => {
    const check = async () => {
      try {
        const res = await apiFetch('/admin/health')
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setStatus(`OK • ${new Date(data.timestamp).toLocaleString()}`)
      } catch (_e) {
        setStatus('Cannot reach backend')
      }
    }
    check()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
  const res = await apiFetch('/admin/products')
  if (!res.ok) throw new Error('Failed to load products')
  const data = await res.json()
      setProducts(data)
    } catch (e) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({ name: '', price: '', discountPrice: '', imageUrl: '', description: '', stock: '' })
    setEditingId(null)
    setImageFileName('')
    setImagePreviewUrl('')
    setImageBase64('')
    setImageContentType('')
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      // Frontend validation: all fields must be present; require either image URL or uploaded file
      if (!form.name.trim()) throw new Error('Name is required')
      if (!(Number(form.price) > 0)) throw new Error('Price must be greater than 0')
      if (form.discountPrice === '' || Number(form.discountPrice) < 0) throw new Error('Discount price is required (0 or more)')
      if (!(String(form.description).trim().length > 0)) throw new Error('Description is required')
      if (!(Number(form.stock) >= 0)) throw new Error('Stock must be 0 or more')
      if (!imageBase64 && !form.imageUrl.trim()) throw new Error('Image is required (upload a file or provide an Image URL)')
      if (Number(form.discountPrice) >= Number(form.price)) throw new Error('Discount price must be less than price')
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        discountPrice: Number(form.discountPrice || 0),
        imageUrl: form.imageUrl.trim(),
        description: form.description.trim(),
        stock: Number(form.stock)
      }
      if (imageBase64 && imageContentType) {
        payload.imageBase64 = imageBase64
        payload.imageContentType = imageContentType
      }
      const endpoint = editingId ? `${apiBase}/admin/products/${editingId}` : `${apiBase}/admin/products`
      const method = editingId ? 'PUT' : 'POST'
      const res = await apiFetch(endpoint.replace(apiBase, ''), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Save failed')
      }
      await loadProducts()
      window.dispatchEvent(new CustomEvent('products:changed'))
      window.dispatchEvent(new CustomEvent('products:changed'))
      resetForm()
    } catch (e) {
      setError(e.message || 'Could not save product')
    } finally {
      setSaving(false)
    }
  }

  const onEdit = (p) => {
    setEditingId(p._id)
    setForm({
      name: p.name || '',
      price: String(p.price ?? ''),
      discountPrice: String(p.discountPrice ?? ''),
      imageUrl: p.imageUrl || '',
      description: p.description || '',
      stock: String(p.stock ?? '')
    })
    setImageFileName('')
    setImagePreviewUrl('')
    setImageBase64('')
    setImageContentType('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      setSaving(true)
      setError('')
  const res = await apiFetch(`/admin/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      await loadProducts()
      window.dispatchEvent(new CustomEvent('products:changed'))
    } catch (e) {
      setError('Could not delete product')
    } finally {
      setSaving(false)
    }
  }

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) {
      setImageFileName('')
      setImagePreviewUrl('')
      setImageBase64('')
      setImageContentType('')
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }
    setError('')
    setImageFileName(file.name)
    setImageContentType(file.type)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result || ''
      // result is a data URL like: data:image/png;base64,AAAA...
      const parts = String(result).split(',')
      const base64 = parts.length > 1 ? parts[1] : ''
      setImageBase64(base64)
      setImagePreviewUrl(String(result))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '8px' }}>Admin Panel</h2>
      <p style={{ marginTop: 0, color: '#555' }}>Backend status: {status}</p>

      {error ? (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>{error}</div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <section style={{ background: '#fafafa', border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>{editingId ? 'Edit Product' : 'Add Product'}</h3>
          <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Name</label>
              <input name="name" value={form.name} onChange={onChange} placeholder="Product name" required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Price</label>
              <input name="price" type="number" step="0.01" value={form.price} onChange={onChange} placeholder="0.00" required />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Discount Price (optional)</label>
              <input name="discountPrice" type="number" step="0.01" value={form.discountPrice} onChange={onChange} placeholder="0.00" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={onChange} placeholder="0" required />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={onFileChange} />
              {imagePreviewUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={imagePreviewUrl} alt={imageFileName} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                  <span style={{ color: '#6b7280' }}>{imageFileName}</span>
                </div>
              ) : null}
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label>Description</label>
              <textarea name="description" rows={3} value={form.description} onChange={onChange} placeholder="Describe the product" required />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 14px', background: '#111827', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{saving ? 'Saving...' : editingId ? 'Update' : 'Add'}</button>
              {editingId ? (
                <button type="button" onClick={resetForm} disabled={saving} style={{ padding: '10px 14px', background: '#e5e7eb', color: '#111827', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Cancel</button>
              ) : null}
            </div>
          </form>
        </section>

        <section style={{ background: '#fafafa', border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Products</h3>
            <button onClick={loadProducts} disabled={loading} style={{ padding: '8px 12px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer' }}>{loading ? 'Refreshing...' : 'Refresh'}</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No products found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '10px 8px' }}>Image</th>
                    <th style={{ padding: '10px 8px' }}>Name</th>
                    <th style={{ padding: '10px 8px' }}>Price</th>
                    <th style={{ padding: '10px 8px' }}>Discount</th>
                    <th style={{ padding: '10px 8px' }}>Stock</th>
                    <th style={{ padding: '10px 8px' }}>Description</th>
                    <th style={{ padding: '10px 8px' }}>Updated</th>
                    <th style={{ padding: '10px 8px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '10px 8px' }}>
                        <img src={p.imageUrl ? p.imageUrl : `${apiBase}/admin/products/${p._id}/image`} alt={p.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                      </td>
                      <td style={{ padding: '10px 8px', fontWeight: 500 }}>{p.name}</td>
                      <td style={{ padding: '10px 8px' }}>${Number(p.price).toFixed(2)}</td>
                      <td style={{ padding: '10px 8px' }}>{p.discountPrice ? `$${Number(p.discountPrice).toFixed(2)}` : '-'}</td>
                      <td style={{ padding: '10px 8px' }}>{p.stock}</td>
                      <td style={{ padding: '10px 8px', maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={p.description || ''}>{(p.description || '').slice(0, 100)}</td>
                      <td style={{ padding: '10px 8px', color: '#6b7280' }}>{new Date(p.updatedAt || p.createdAt).toLocaleString()}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => onEdit(p)} style={{ padding: '6px 10px', background: '#eef2ff', color: '#3730a3', border: '1px solid #e0e7ff', borderRadius: 8, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => onDelete(p._id)} style={{ padding: '6px 10px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <style>{`
        @media (max-width: 720px) {
          form { grid-template-columns: 1fr !important; }
          table { min-width: 560px; }
        }
      `}</style>
    </div>
  )
}

export default Admin
