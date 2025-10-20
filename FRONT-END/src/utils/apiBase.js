// Centralized API base URL for the frontend.
// Use Vercel environment variable VITE_API_BASE_URL if set.
// Fallback to the deployed Render backend (do NOT fallback to localhost in production builds).
const DEFAULT_BACKEND = 'https://glitzmia-backend.onrender.com'

export const apiBase = import.meta.env.VITE_API_BASE_URL || DEFAULT_BACKEND

export default apiBase
