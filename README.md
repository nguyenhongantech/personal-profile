# My Profile Site (Next.js + Tailwind) — with Admin

## Local Dev
```bash
npm i
npm run dev
```

## Admin (Password)
- Set `ADMIN_PASSWORD` in `.env.local`
- Visit `/admin`

## Persist Content (Vercel Blob)
- Add `VERCEL_BLOB_READ_WRITE_TOKEN` to your Vercel Project (or `.env.local` for dev).
- The API will store content at `content/profile.json` in Vercel Blob.
- If no token is set, the site falls back to localStorage only.

## Deploy (Vercel)
- Push to GitHub → Import on Vercel
- Set env vars in **Project Settings → Environment Variables**:
  - `ADMIN_PASSWORD`
  - `VERCEL_BLOB_READ_WRITE_TOKEN` (optional for cloud persistence)
