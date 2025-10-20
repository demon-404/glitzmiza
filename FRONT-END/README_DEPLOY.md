FRONT-END deploy & test checklist

This file documents the minimal steps to deploy the frontend to Vercel and verify it talks to the Render backend.

1) Vercel env variable
   - Key: VITE_API_BASE_URL
   - Value: https://glitzmia-backend.onrender.com
   - Add it for the Production environment (and Preview if you want the same backend for previews).

2) Build configuration (Vite)
   - Build command: npm run build
   - Output directory: (default, Vercel auto-detects) — no need to change if using Vite.

3) Local checks
   - Install and run dev server:
     npm install
     $env:VITE_API_BASE_URL='https://glitzmia-backend.onrender.com'
     npm run dev
   - For production-like preview:
     $env:VITE_API_BASE_URL='https://glitzmia-backend.onrender.com'
     npm run build
     npm run preview

4) What to inspect in browser DevTools (Network & Console)
   - Requests for products should go to https://glitzmia-backend.onrender.com/admin/products
   - Product images should load either from the backend endpoints (e.g. https://glitzmia-backend.onrender.com/admin/products/<id>/image) or be bundled assets.
   - No requests should be sent to http://localhost:5010.
   - If you see 404s for images, check filename casing in src/assets/ and references in code.

5) If CORS errors appear
   - Ensure the backend allows the Vercel origin (https://glitzmiza.vercel.app) in CORS configuration.

6) Quick grep helpers
   - Find leftover local endpoints:
     Select-String -Path '.\FRONT-END\**\*.{js,jsx,css}' -Pattern 'localhost:5010' -SimpleMatch -List

7) Contact me with these outputs if trouble persists
   - Browser console + failing Network request details (URL, response code, response body)
   - Output of the health checks:
     Invoke-RestMethod -Uri 'https://glitzmia-backend.onrender.com/admin/health' -Method Get
     Invoke-RestMethod -Uri 'https://glitzmia-backend.onrender.com/admin/products' -Method Get

That's it — with `VITE_API_BASE_URL` set in Vercel to the Render backend your admin and customer flows should work in production.
