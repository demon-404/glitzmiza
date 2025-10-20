import apiBase from './apiBase'

// Small wrapper around fetch that prefixes apiBase for relative paths,
// supports a timeout via AbortController, and throws normalized errors.
export default async function apiFetch(pathOrUrl, options = {}, timeout = 10000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  let url = pathOrUrl
  if (!/^https?:\/\//i.test(pathOrUrl)) {
    // ensure leading slash
    url = `${apiBase}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
  }

  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  } catch (err) {
    if (err && err.name === 'AbortError') {
      throw new Error(`Request to ${url} timed out after ${timeout}ms`)
    }
    throw new Error(err?.message || `Network error when requesting ${url}`)
  } finally {
    clearTimeout(id)
  }
}
