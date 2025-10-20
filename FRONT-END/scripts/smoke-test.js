#!/usr/bin/env node
// Simple smoke test for backend endpoints using https module (no fetch)
// Usage: node scripts/smoke-test.js [API_BASE_URL]

const { request } = require('https')
const { URL } = require('url')

const apiBase = process.argv[2] || process.env.VITE_API_BASE_URL || 'https://glitzmia-backend.onrender.com'

function getJson(path) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(path, apiBase)
      const opts = {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      }
      const req = request(url, opts, (res) => {
        let buf = ''
        res.setEncoding('utf8')
        res.on('data', (c) => buf += c)
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`Status ${res.statusCode} - ${buf.slice(0,200)}`))
          }
          try {
            const j = JSON.parse(buf || '{}')
            resolve(j)
          } catch (e) {
            // not JSON
            resolve(buf)
          }
        })
      })
      req.on('error', (err) => reject(err))
      req.end()
    } catch (err) {
      reject(err)
    }
  })
}

function headUrl(path) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(path, apiBase)
      const opts = { method: 'HEAD' }
      const req = request(url, opts, (res) => {
        resolve({ status: res.statusCode })
      })
      req.on('error', (err) => reject(err))
      req.end()
    } catch (err) { reject(err) }
  })
}

;(async () => {
  console.log('Using API base:', apiBase)
  try {
    const health = await getJson('/admin/health')
    console.log('HEALTH: OK', typeof health === 'object' ? health : String(health).slice(0,200))
  } catch (err) {
    console.error('HEALTH: FAIL', err.message)
    console.error(err.stack)
    process.exit(2)
  }

  let products
  try {
    products = await getJson('/admin/products')
    const count = Array.isArray(products) ? products.length : 'unknown'
    console.log('PRODUCTS: OK (count=' + count + ')')
  } catch (err) {
    console.error('PRODUCTS: FAIL', err.message)
    console.error(err.stack)
    process.exit(2)
  }

  if (Array.isArray(products) && products.length > 0) {
    const id = products[0]._id
    try {
      const r = await headUrl(`/admin/products/${id}/image`)
      if (r.status >= 200 && r.status < 300) {
        console.log('IMAGE: OK', `/admin/products/${id}/image`)
      } else {
        console.error('IMAGE: FAIL status', r.status)
        process.exit(2)
      }
    } catch (err) {
      console.error('IMAGE: FAIL', err.message)
      console.error(err.stack)
      process.exit(2)
    }
  } else {
    console.log('No products to test image for')
  }

  console.log('\nSMOKE TEST: PASS')
  process.exit(0)
})()
