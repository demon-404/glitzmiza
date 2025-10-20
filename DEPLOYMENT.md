# Deployment guide — Glitzmia (FRONT-END + BACKEND)

This repository is a small monorepo with two top-level folders:

- `FRONT-END/` — Vite React app (production build output: `dist`)
- `BACKEND/` — Express/MongoDB API server

Use this guide to deploy the frontend to Vercel and the backend to Render.

---

## Vercel (Frontend)

Important: the repository root is a monorepo. Vercel must build the `FRONT-END` folder.

1. In Vercel dashboard, create or open the project for this repo (`demon-404/glitzmiza`).
2. Project settings -> General -> Build & Development Settings:
   - Root Directory: `FRONT-END`
   - Framework Preset: Vite (or leave auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist` (Vercel auto-detects, but you can set it explicitly)
3. Environment Variables (add these to Production):
   - `VITE_API_BASE_URL` = `https://glitzmia-backend.onrender.com`
     - This is used at build time and baked into the static bundle.
4. Add `vercel.json` to the repo (already present) which tells Vercel to use `FRONT-END/package.json`.
5. Trigger a deploy (click Deploy or push a commit to `main`).
6. After a successful build, open the Production URL. In DevTools -> Network, verify:
   - `index.html` -> 200
   - `dist/assets/...` main JS -> 200
   - Requests to `${VITE_API_BASE_URL}/admin/products` return 200

If you see `DEPLOYMENT_NOT_FOUND` or 404 for the root URL, double-check Step 2 (Root Directory).

---

## Render (Backend)

1. Create a Web Service on Render and connect it to this repository. Use branch `main`.
2. Build and Start commands:
   - Build command: leave empty (Node apps do not need build)
   - Start command: `node app.js` or use the provided start script if any
3. Environment variables required:
   - `MONGODB_URI` (or `mongourl`) — MongoDB connection string. REQUIRED. The app exits on startup if not present.
   - (Optional) `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` — real Razorpay keys if you want live payments.
4. Health checks:
   - GET `/test` should return 200
   - GET `/admin/products` should return product JSON

If your Render service uses a start command like `node start-server.js`, ensure that is set correctly in the Render service settings.

---

## Useful local commands (PowerShell)

- Build and preview frontend:
```powershell
cd FRONT-END
npm install
$env:VITE_API_BASE_URL='https://glitzmia-backend.onrender.com'
npm run build
npm run preview
```

- Run smoke test (checks backend endpoints):
```powershell
node .\FRONT-END\scripts\smoke-test.cjs
```

- Test backend endpoints manually:
```powershell
Invoke-RestMethod -Uri 'https://glitzmia-backend.onrender.com/test' -Method Get
Invoke-RestMethod -Uri 'https://glitzmia-backend.onrender.com/admin/products' -Method Get
```

---

If deployment still fails or the site buffers:

1. Paste the Vercel deployment logs here (from Vercel dashboard -> Deployments -> View Logs) and I will inspect them.
2. Confirm Vercel project Root Directory is `FRONT-END` and `VITE_API_BASE_URL` is set in Production.
3. If you prefer, deploy with the Vercel CLI from the `FRONT-END` folder:
```bash
npm i -g vercel
cd FRONT-END
vercel --prod --confirm
```

If you want, I can commit and push this file for you (I will). After that, trigger a redeploy in Vercel and paste the new deployment URL if problems persist.
